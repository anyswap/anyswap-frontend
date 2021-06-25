import config from '../../config'
import ERC20_ABI from '../../constants/abis/erc20'
import FACTORY_ABI from '../../constants/abis/factory'
import {FACTORY_ADDRESSES} from '../../constants'

import TOKEN from '../../contexts/BridgeTokens'
import { INITIAL_TOKENS_CONTEXT } from '../../contexts/Tokens/index.js'


import {toSign as toLedgerSign} from '../wallets/ledger/index'
import { ethers } from 'ethers'

import { amountFormatter } from '../index'
import { getChainHashStatus, getSwapoutHashStatus } from '../birdge'
import {getTRXTxnsStatus} from '../birdge/TRX'
import {getNodeRpc} from '../../config/getNodeRpc'


const Web3 = require('web3')
const Tx  = require("ethereumjs-tx")


// const web3Test = new Web3(new Web3.providers.HttpProvider(config.nodeRpc))
// const factory = new web3Test.eth.Contract(FACTORY_ABI, FACTORY_ADDRESSES[config.chainID])
// setTimeout(() => {
//   const batch = new web3Test.BatchRequest()
//   const arr = [
//     '0xf98f70c265093a3b3adbef84ddc29eace900685b',
//     '0x306377cfa2ac72e757151591e9ecf0135d7c9613',
//     '0xe56979f6ada241c1bed92e68535dcead9de2a5ef',
//     '0xcaf870dad882b00f4b20d714bbf7fceada5e4195',
//     '0x6d2a71f4edf10ab1e821b9b373363e1e24e5df6b',
//     '0x70a20ccb2a35f47ed90c4460ca9f8e660107344b',
//   ]
//   for (const token of arr) {
//     const plData = factory.methods.getExchange(token).encodeABI()
  
//     batch.add(web3Test.eth.call.request({data: plData, to: FACTORY_ADDRESSES[config.chainID]}, 'latest', (err, res) => {
//       if (!err) {
//         console.log('token:' + token)
//         console.log(res.replace('0x000000000000000000000000', '0x').replace(/\s/g, '').toLowerCase())
//       }
//     }))
//   }
//   batch.execute()
// }, 1000)



// console.log(BridgeToken)
// const web3 = new Web3(new Web3.providers.HttpProvider(BRIDGE_RPC))
const web3 = new Web3()
let contract = new web3.eth.Contract(ERC20_ABI)

const CUR_TOKEN = INITIAL_TOKENS_CONTEXT[config.chainID]
// console.log(CUR_TOKEN)



let mmWeb3
if (typeof window.ethereum !== 'undefined'|| (typeof window.web3 !== 'undefined')) {
  // Web3 browser user detected. You can now use the provider.
  mmWeb3 = window['ethereum'] || window.web3.currentProvider
}

function MMsign (from, msg, node) {
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
        let v = '0x' + rsv.substr(128)
        v = Number(node) * 2 + 35 + parseInt(v) - 27
        // console.log(v)
        resolve({
          msg: 'Success',
          info: {
            r: '0x' + rsv.substr(0, 64),
            s: '0x' + rsv.substr(64, 64),
            v: web3.utils.toHex(v)
          }
        })
      } else {
        console.log(err)
        resolve({
          msg: 'Error',
          error: err.message ? err.message : err.toString()
        })
      }
    })
  })
}

export function getHashStatus (hash, index, coin, status, node, account, version, pairid) {
  return new Promise(resolve => {
    if (status) {
      getChainHashStatus(hash, coin, account, version, node, pairid).then(result => {
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
            hash,
            status
          })
        }
      })
    } else if (node === 'TRX') {
      console.log(node)
      getTRXTxnsStatus(hash).then(res => {
        if (res) {
          if (res.status) {
            getChainHashStatus(hash, coin, account, version, node).then(result => {
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
                  hash,
                  status: 1
                })
              }
            })
          } else {
            resolve({
              index,
              hash,
              status: 2
            })
          }
        } else {
          resolve({
            index,
            hash,
            status: 0
          })
        }
      })
    } else {
      web3.setProvider(getNodeRpc(node))
      web3.eth.getTransactionReceipt(hash).then(res => {
        // console.log(res)
        if (res) {
          if (res.status) {
            getChainHashStatus(hash, coin, account, version, node).then(result => {
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
                  hash,
                  status: 1
                })
              }
            })
          } else {
            resolve({
              index,
              hash,
              status: 2
            })
          }
        } else {
          resolve({
            index,
            hash,
            status: 0
          })
        }
      })
    }
  })
}

export function getWithdrawHashStatus (hash, index, coin, status, node, account, version, pairid) {
  return new Promise(resolve => {
    getSwapoutHashStatus(hash, coin, account, version, node, pairid).then(result => {
      if (result) {
        resolve({
          ...result,
          index,
          hash
        })
      } else {
        resolve({
          index,
          status
        })
      }
    })
    // if (status) {
    // }
  })
}

export function MMsendERC20Txns(coin, from, to, value, PlusGasPricePercentage, node, inputCurrency) {
  return new Promise(resolve => {
    if (CUR_TOKEN[inputCurrency].depositAddress.toLowerCase() !== to.toLowerCase()) {
      resolve({
        msg: 'Error',
        error: 'Data error, please refresh and try again!'
      })
      return
    }
    getBaseInfo(coin, from, to, value, PlusGasPricePercentage, node).then(res => {
      if (res.msg === 'Success') {
        // let eTx = new Tx(res.info)
        // console.log(eTx)
        // console.log(res.info)
        let tx = new Tx(res.info)

        let hash = Buffer.from(tx.hash(false)).toString('hex')
        hash = hash.indexOf('0x') === 0 ? hash : '0x' + hash
        // console.log(hash)

        MMsign(from, hash, node).then(rsv => {
          // console.log(rsv)
          if (res.msg === 'Success') {
            let rawTx = {
              ...res.info,
              ...rsv.info
            }
            let tx2 = new Tx(rawTx)
            let signTx = tx2.serialize().toString("hex")
            signTx = signTx.indexOf("0x") === 0 ? signTx : ("0x" + signTx)
            // console.log(rawTx)
            // console.log(signTx)
            sendTxns(signTx, node).then(hash => {
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
          } else {
            resolve({
              msg: 'Error',
              error: rsv.error
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


export const getErcBalance = (coin, from, dec, node) => {
  return new Promise(resolve => {
    if (!coin) {
      resolve('')
    } else {
      coin = coin.replace('a', '')
      web3.setProvider(getNodeRpc(node))
      let BridgeToken = TOKEN[node]
      if (coin === 'ETH' || (BridgeToken[coin] && BridgeToken[coin].token && BridgeToken[coin].decimals === dec)) {
        web3.eth.getBalance(from).then(res => {
          // console.log(res)
          res = ethers.utils.bigNumberify(res)
          // resolve(amountFormatter(res))
          if (coin !== 'ETH') {
            contract.options.address = BridgeToken[coin].token
            contract.methods.balanceOf(from).call({from: from}, (err, result) => {
              // console.log(err)
              if (err) {
                resolve('')
              } else {
                result = ethers.utils.bigNumberify(result)
                // console.log(result)
                // resolve(amountFormatter(result, BridgeToken[coin].decimals))
                resolve({
                  ETH: amountFormatter(res),
                  TOKEN: amountFormatter(result, dec)
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
      } else {
        resolve({
          ETH: '',
          TOKEN: ''
        })
      }
    }
  })
}

function getBaseInfo (coin, from, to, value, PlusGasPricePercentage, node) {
  let input = ''
  let BridgeToken = TOKEN[node]
  console.log(node)
  let isBridgeBaseCoin = false
  if (
    (coin === 'ETH' && (node === 1 || node === 4)) || 
    (coin === 'FSN' && (node === 32659 || node === 46688)) ||
    (coin === 'BNB' && (node === 97 || node === 56)) ||
    (coin === 'HT' && (node === 128 || node === 256)) ||
    (coin === 'FTM' && (node === 250)) ||
    (coin === 'ONE' && (node === 1666600000))
  ) {
    isBridgeBaseCoin = true
  }
  if (!isBridgeBaseCoin) {
    contract.options.address = BridgeToken[coin].token
    value = ethers.utils.parseUnits(value.toString(), BridgeToken[coin].decimals)
    input = contract.methods.transfer(to, value).encodeABI()
  } else {
    value = ethers.utils.parseUnits(value.toString(), 18)
  }
  // console.log(value)
  let data = {
    from,
    chainId: web3.utils.toHex(node),
    gas: '',
    gasPrice: "",
    nonce: "",
    to: isBridgeBaseCoin ? to : BridgeToken[coin].token,
    value: isBridgeBaseCoin ? value.toHexString() : "0x0",
    data: input
  }
  web3.setProvider(getNodeRpc(node))
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

function sendTxns (signedTx, node) {
  return new Promise(resolve => {
    web3.setProvider(getNodeRpc(node))
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

export function HDsendERC20Txns (coin, from, to, value, PlusGasPricePercentage, node, inputCurrency) {
  let walletType = sessionStorage.getItem('walletType')
  let HDPath = sessionStorage.getItem('HDPath')
  return new Promise(resolve => {
    if (CUR_TOKEN[inputCurrency].depositAddress.toLowerCase() !== to.toLowerCase()) {
      resolve({
        msg: 'Error',
        error: 'Data error, please refresh and try again!'
      })
      return
    }
    getBaseInfo(coin, from, to, value, PlusGasPricePercentage, node).then(res => {
      if (res.msg === 'Success') {
        let data = res.info
        toLedgerSign(HDPath, data).then(res => {
          if (res.msg === 'Success') {
            sendTxns(res.info.signedTx, node).then(result => {
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