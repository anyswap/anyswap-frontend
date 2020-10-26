import config from '../../config'
import ERC20_ABI from '../../constants/abis/erc20'
import FACTORY_ABI from '../../constants/abis/factory'
import TOKEN from '../../contexts/BridgeTokens'
import { INITIAL_TOKENS_CONTEXT } from '../../contexts/Tokens'

import {toSign as toLedgerSign} from '../wallets/ledger/index'
import { ethers } from 'ethers'

import { amountFormatter } from '../index'
import { getChainHashStatus, getSwapoutHashStatus } from '../birdge'
import {
  BNB_MAINNET,
  BNB_TESTNET,
  FSN_MAINNET,
  FSN_TESTNET,
  ETH_MAINNET,
  ETH_TESTNET
} from '../../config/coinbase/nodeConfig'


const Web3 = require('web3')
const Tx  = require("ethereumjs-tx")

const BRIDGE_RPC = config.bridge.rpc

function getNodeRpc (node) {
  switch (node) {
    case 56:
      return BNB_MAINNET
    case 97:
      return BNB_TESTNET
    case 32659:
      return FSN_MAINNET
    case 46688:
      return FSN_TESTNET
    case 1:
      return ETH_MAINNET
    case 4:
      return ETH_TESTNET
    default: 
      return BRIDGE_RPC
  }
}

// const web3Test = new Web3(new Web3.providers.HttpProvider(config.nodeRpc))
// let factory = new web3Test.eth.Contract(FACTORY_ABI, '0xa12cba22e4c316820bf4883ebb98a3789cf194a3') // FSN-MAIN
// // let factory = new web3Test.eth.Contract(FACTORY_ABI, '0x421d35f8f8fd822f898e75db43f057f7ea448298') // FSN-test
// // let factory = new web3Test.eth.Contract(FACTORY_ABI, '0x73a001e72f0fe3ca366d6079dc3427af7865839b') // BSC-MAIN
// setTimeout(() => {

//   factory.methods.getExchange('0x20dd2f2bfa4ce3eaec5f57629583dad8a325872a').call((err, res) => {
//     console.log('USDT')
//     console.log(err)
//     console.log(res)
//   })
// }, 2000)

// console.log(BridgeToken)
const web3 = new Web3(new Web3.providers.HttpProvider(BRIDGE_RPC))
let contract = new web3.eth.Contract(ERC20_ABI)

const CUR_TOKEN = INITIAL_TOKENS_CONTEXT[config.chainID]
// console.log(CUR_TOKEN)


// console.log(web3.eth.accounts.recoverTransaction('0xf8763b844190ab008301ec309406cadd991f2ec8e156c0ae66116c5604fdcdc5b592313030303030303030303030303030303030802ba02f22fa4a0876de138c096496a6500e8489c44757ad1d5fa64510ba21191ece49a051a30d66a9accbe384bf56bc461d1630ecb2b46e96af310e46b96dd2955b345b'))
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

export function getHashStatus (hash, index, coin, status, node, account) {
  return new Promise(resolve => {
    if (status) {
      getChainHashStatus(hash, coin, account).then(result => {
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
    } else {
      web3.setProvider(getNodeRpc(node))
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

export function getWithdrawHashStatus (hash, index, coin, status, node, account) {
  return new Promise(resolve => {
    getSwapoutHashStatus(hash, coin, account).then(result => {
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
  if (coin !== 'ETH') {
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
    to: coin === 'ETH' ? to : BridgeToken[coin].token,
    value: coin === 'ETH' ? value.toHexString() : "0x0",
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