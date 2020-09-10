import config from '../../config'
import ERC20_ABI from '../../constants/abis/erc20'
import TOKEN from '../../contexts/Tokens_erc20'
import {toSign as toLedgerSign} from '../wallets/ledger/index'
import { ethers } from 'ethers'
import axios from 'axios'

import { amountFormatter } from '../index'


const Tx  = require("ethereumjs-tx")


const ERC20_RPC = config.ercConfig.nodeRpc
const allToken = TOKEN[config.ercConfig.chainID]
// console.log(ERC20_RPC)
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider(ERC20_RPC))
let contract = new web3.eth.Contract(ERC20_ABI)
// console.log(web3.eth.accounts.recoverTransaction('0xf8763b844190ab008301ec309406cadd991f2ec8e156c0ae66116c5604fdcdc5b592313030303030303030303030303030303030802ba02f22fa4a0876de138c096496a6500e8489c44757ad1d5fa64510ba21191ece49a051a30d66a9accbe384bf56bc461d1630ecb2b46e96af310e46b96dd2955b345b'))
let mmWeb3
if (typeof window.ethereum !== 'undefined'|| (typeof window.web3 !== 'undefined')) {
  // Web3 browser user detected. You can now use the provider.
  mmWeb3 = window['ethereum'] || window.web3.currentProvider
}

function MMsign (from, msg) {
  return new Promise(resolve => {
    var params = [from, msg]
    var method = 'eth_sign'
    mmWeb3.sendAsync({
      method,
      params,
      // from,
    }, (err, rsv) => {
      // console.log(rsv)
      if (!err || rsv.result) {
        rsv = rsv.result.indexOf('0x') === 0 ? rsv.result.replace('0x', '') : rsv.result
        // console.log(rsv.substr(128))
        // console.log(parseInt(rsv.substr(128)))
        let v = '0x' + rsv.substr(128)
        // v = parseInt(v) + 8 + config.ercConfig.chainID * 2
        v = config.ercConfig.chainID * 2 + 35 + parseInt(v) - 27
        // console.log(v)
        resolve({
          r: '0x' + rsv.substr(0, 64),
          s: '0x' + rsv.substr(64, 64),
          // v: web3.utils.toHex(config.ercConfig.chainID * 2 + 35 + parseInt(rsv.substr(128)))
          v: web3.utils.toHex(v)
          // v: '0x' + rsv.substr(128),
        })
      } else {
        console.log(err)
        resolve('')
      }
    })
  })
}

function GetTxnStatusAPI (url, hash) {
  return new Promise(resolve => {
    axios.post(url, {
      id:0,
      jsonrpc:"2.0",
      method:"swap.GetSwapin",
      params:[hash]
    }).then(res => {
      // console.log(res)
      resolve(res.data)
    }).catch(err => {
      console.log(err)
      resolve(err)
    })
  })
}

function getChainHashStatus (hash, coin) {
  // console.log(coin)
  return new Promise(resolve => {
    coin = coin.indexOf(config.prefix) === -1 ? (config.prefix + coin) : coin
    if (config.coininfo[coin] && config.coininfo[coin].url) {
      let url = config.coininfo[coin].url
      GetTxnStatusAPI(url, hash).then(res => {
        // console.log(res)
        if (res && res.result) {
          let status = res.result.status,
              statusType = ''
          if ([0, 5, 8].includes(status)) {
            // obj = { status: this.$t('state').confirming, class: 'color_green' }
            statusType = 'confirming'
          } else if ([7, 9].includes(status)) {
            // obj = { status: this.$t('state').minting, class: 'color_green' }
            statusType = 'minting'
          } else if ([10].includes(status)) {
            // obj = { status: this.$t('state').success, class: 'color_green' }
            statusType = 'success'
          } else if ([1, 2, 3, 4, 6, 11].includes(status)) {
            // obj = { status: this.$t('state').fail, class: 'color_red' }
            statusType = 'failure'
          } else if ([20].includes(status)) {
            // obj = { status: this.$t('state').timeout, class: 'color_red' }
            statusType = 'timeout'
          }
          resolve({
            swapHash: res.result.swaptx,
            swapStatus: statusType,
            swapTime: res.result.txtime,
          })
        } else {
          resolve('')
        }
      })
    } else {
      resolve('')
    }
  })
}
// getChainHashStatus('0x7bf684076b373de6d7b5ff43fddf0b15d580bfc38773d90b4c89fea3388e17d0', 'aUSDT')

export function getHashStatus (hash, index, coin, status) {
  return new Promise(resolve => {
    if (status) {
      getChainHashStatus(hash, coin).then(result => {
        if (result) {
          resolve({
            ...result,
            index,
            hash,
            status
          })
        } else {
          resolve({
            index,
            status
          })
        }
      })
    } else {
      web3.eth.getTransactionReceipt(hash).then(res => {
        // console.log(res)
        if (res) {
          if (res.status) {
            getChainHashStatus(hash, coin).then(result => {
              if (result) {
                resolve({
                  ...result,
                  index,
                  hash,
                  status: 1
                })
              } else {
                resolve({
                  index,
                  status: 1
                })
              }
            })
          } else {
            resolve({
              index,
              status: 2
            })
          }
        } else {
          resolve({
            index,
            status: 0
          })
        }
      })
    }
  })
}

export function MMsendERC20Txns(coin, from, to, value, PlusGasPricePercentage) {
  return new Promise(resolve => {
    getBaseInfo(coin, from, to, value, PlusGasPricePercentage).then(res => {
      if (res.msg === 'Success') {
        // let eTx = new Tx(res.info)
        // console.log(eTx)
        console.log(res.info)
        let tx = new Tx(res.info)

        let hash = Buffer.from(tx.hash(false)).toString('hex')
        hash = hash.indexOf('0x') === 0 ? hash : '0x' + hash
        // console.log(hash)

        MMsign(from, hash).then(rsv => {
          let rawTx = {
            ...res.info,
            ...rsv
          }
          let tx2 = new Tx(rawTx)
          let signTx = tx2.serialize().toString("hex")
          signTx = signTx.indexOf("0x") === 0 ? signTx : ("0x" + signTx)
          // console.log(rawTx)
          // console.log(signTx)
          sendTxns(signTx).then(hash => {
            if (hash.msg === 'Success') {
              res.info.hash = hash.info
              resolve({
                msg: 'Success',
                info: res.info
              })
            } else {
              resolve({
                msg: 'Error',
                error: hash.error
              })
            }
          })
        })
      } else {
        resolve({
          msg: 'Error',
          error: res.error
        })
      }
    })
  })
}

export const getErcBalance = (coin, from) => {
  return new Promise(resolve => {
    if (!coin) {
      resolve('')
    } else {
      coin = coin.replace('a', '')
      web3.eth.getBalance(from).then(res => {
        // console.log(res)
        res = ethers.utils.bigNumberify(res)
        // resolve(amountFormatter(res))
        if (coin !== 'ETH') {
          contract.options.address = allToken[coin].token
          contract.methods.balanceOf(from).call({from: from}, (err, result) => {
            // console.log(err)
            if (err) {
              resolve('')
            } else {
              result = ethers.utils.bigNumberify(result)
              // console.log(result)
              // resolve(amountFormatter(result, allToken[coin].decimals))
              resolve({
                ETH: amountFormatter(res),
                TOKEN: amountFormatter(result, allToken[coin].decimals)
              })
            }
          })
        } else {
          resolve({
            ETH: amountFormatter(res),
            TOKEN: amountFormatter(res)
          })
        }
      })
    }
  })
  // web3.eth.getBalance(from).then(res => {
  //   console.log(res)
  // })
}

function getBaseInfo (coin, from, to, value, PlusGasPricePercentage) {
  let input = ''
  if (coin !== 'ETH') {
    contract.options.address = allToken[coin].token
    value = ethers.utils.parseUnits(value.toString(), allToken[coin].decimals)
    input = contract.methods.transfer(to, value).encodeABI()
  } else {
    value = ethers.utils.parseUnits(value.toString(), 18)
  }
  // console.log(value)
  let data = {
    from,
    chainId: web3.utils.toHex(config.ercConfig.chainID),
    gas: '',
    gasPrice: "",
    nonce: "",
    to: coin === 'ETH' ? to : allToken[coin].token,
    value: coin === 'ETH' ? value.toHexString() : "0x0",
    data: input
  }
  // console.log(data)
  return new Promise(resolve => {
    let count = 0, time = Date.now()
    const batch = new web3.BatchRequest()
    batch.add(web3.eth.estimateGas.request(data, (err, res) => {
      if (err) {
        // console.log(err)
        data.gas = web3.utils.toHex(90000)
        count ++
      } else {
        // console.log(parseInt(Number(res) * 1.1))
        data.gas = web3.utils.toHex(parseInt(Number(res) * 1.2))
        count ++
      }
    }))
    batch.add(web3.eth.getTransactionCount.request(from, (err, res) => {
      if (err) {
        console.log(err)
      } else {
        // console.log(2)
        // let nonce = web3.utils.hexToNumber(res)
        // data.nonce = web3.utils.toHex(nonce + 1)
        data.nonce = web3.utils.toHex(res)
        // data.nonce = web3.utils.toHex(2)
        count ++
      }
    }))
    batch.add(web3.eth.getGasPrice.request((err, res) => {
      if (err) {
        console.log(err)
      } else {
        // console.log(res)
        // console.log(PlusGasPricePercentage)
        let pecent = 1
        if (PlusGasPricePercentage) {
          pecent = (100 + PlusGasPricePercentage) / 100
        }
        let _gasPrice = pecent * parseInt(res)
        data.gasPrice = web3.utils.toHex(parseInt(_gasPrice))
        count ++
      }
    }))
    batch.execute()
    let getDataIntervel = setInterval(() => {
      if (count >= 3 && ( (Date.now() - time) <= 30000 )) {
        resolve({
          msg: 'Success',
          info: data
        })
        clearInterval(getDataIntervel)
      } else if (count < 3 && ( (Date.now() - time) > 30000 )) {
        resolve({
          msg: 'Error',
          error: 'Timeout'
        })
        clearInterval(getDataIntervel)
      }
    }, 1000)
  })
}

function sendTxns (signedTx) {
  return new Promise(resolve => {
    web3.eth.sendSignedTransaction(signedTx, (err, hash) => {
      // console.log(err)
      // console.log(hash)
      if (err) {
        resolve({
          msg: 'Error',
          error: err
        })
      } else {
        resolve({
          msg: 'Success',
          info: hash
        })
      }
    })
  })
}

export function HDsendERC20Txns (coin, from, to, value, PlusGasPricePercentage) {
  let walletType = sessionStorage.getItem('walletType')
  let HDPath = sessionStorage.getItem('HDPath')
  return new Promise(resolve => {
    getBaseInfo(coin, from, to, value, PlusGasPricePercentage).then(res => {
      if (res.msg === 'Success') {
        let data = res.info
        toLedgerSign(HDPath, data).then(res => {
          if (res.msg === 'Success') {
            sendTxns(res.info.signedTx).then(result => {
              if (result.msg === 'Success') {
                data.hash = result.info
                resolve({
                  msg: 'Success',
                  info: data
                })
              } else {
                resolve({
                  msg: 'Error',
                  error: result.error
                })
              }
            })
          } else {
            resolve({
              msg: 'Error',
              error: res.error
            })
          }
        })
      } else {
        resolve({
          msg: 'Error',
          error: res.error
        })
      }
    })
  })
}
// export default erc20Web3