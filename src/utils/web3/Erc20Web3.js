import config from '../../config'
import ERC20_ABI from '../../constants/abis/erc20'
import TOKEN from '../../contexts/Tokens_erc20'
import {toSign as toLedgerSign} from '../wallets/ledger/index'
import { ethers } from 'ethers'


import { amountFormatter } from '../index'
import { resolve } from 'path'

const Tx  = require("ethereumjs-tx")
const ethUtil = require('ethereumjs-util')


const ERC20_RPC = config.ercConfig.nodeRpc
const allToken = TOKEN[config.ercConfig.chainID]
// console.log(ERC20_RPC)
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider(ERC20_RPC))
let contract = new web3.eth.Contract(ERC20_ABI)
// console.log(web3)
let mmWeb3
if (typeof window.ethereum !== 'undefined'|| (typeof window.web3 !== 'undefined')) {
  // Web3 browser user detected. You can now use the provider.
  mmWeb3 = window['ethereum'] || window.web3.currentProvider
}
// console.log(mmWeb3)
// console.log(window.web3.eth.sign('123'))
// console.log(window.web3.isConnected())
// console.log(window.ethereum)
// const mmWeb3 = new window.web3()
// window.web3.then(res => {
//   console.log(res)
// })
// console.log(web3.isConnected())
// console.log(web3.eth.accounts.recoverTransaction("0xf8a909843b9aca00831339e094b09bad01684f6d47fc7dc9591889cc77eaed8d2280b844a9059cbb0000000000000000000000001ec2a51c8c68071e5ec1e8b7cd0f27d5ac6f207600000000000000000000000000000000000000000000000000000000000186a02ca041484772e9da6c9e0039afd6e7cf3638b2a07e68ea036eac77190b31cecd5233a06bff8c81f095fc9590a0ad81413580138938c7077992d6f0ca8ac95056415821"))
export function test () {
  
  let mmWeb3
  if (typeof window.ethereum !== 'undefined'|| (typeof window.web3 !== 'undefined')) {
    // Web3 browser user detected. You can now use the provider.
    mmWeb3 = window['ethereum'] || window.web3.currentProvider
  }
  console.log(mmWeb3)
  let from = '0x1ec2A51c8C68071E5ec1E8B7Cd0F27D5aC6f2076'
  let msg = '0x1ec2A51c8C68071E5ec1E8B7Cd0F27D5aC6f2076'
  msg = ethUtil.bufferToHex(new Buffer(msg, 'utf8'))
  // window.web3.eth.sign(from, msg, function (err, result) {
  //   // if (err) return console.error(err)
  //   console.error(err)
  //   console.log('SIGNED:' + result)
  // })
  // window.web3.personal.sign(msg, from, function (err, result) {
  //   if (err) return console.error(err)
  //   console.log('PERSONAL SIGNED:' + result)
  // })
  var params = [msg, from]
  var method = 'personal_sign'
  mmWeb3.sendAsync({
    method,
    params,
    from,
  }, function (err, result) {
    console.log(err)
    console.log(result)
  })
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

    // var params = [msg, from]
    // var method = 'personal_sign'
    // mmWeb3.sendAsync({
    //   method,
    //   params,
    //   from,
    // }, function (err, rsv) {
    //   console.log(err)
    //   console.log(rsv)
    //   rsv = rsv.result.indexOf('0x') === 0 ? rsv.result.replace('0x', '') : rsv.result
    //   resolve({
    //     r: '0x' + rsv.substr(0, 64),
    //     s: '0x' + rsv.substr(64, 64),
    //     v: web3.utils.toHex(config.ercConfig.chainID * 2 + 35)
    //     // v: '0x' + rsv.substr(128),
    //   })
    // })
  })
}

export function getHashStatus (hash, index) {
  return new Promise(resolve => {
    web3.eth.getTransactionReceipt(hash).then(res => {
      // console.log(res)
      if (res) {
        if (res.status) {
          resolve({
            index,
            status: 1
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
  })
}

export function MMsendERC20Txns(coin, from, to, value) {
  return new Promise(resolve => {
    getBaseInfo(coin, from, to, value).then(res => {
      if (res.msg === 'Success') {
        // let eTx = new Tx(res.info)
        // console.log(eTx)
        // console.log(res.info)
        let tx = new Tx(res.info)

        // tx.sign(prvtKey)
        // let signTx = tx.serialize().toString("hex")
        // signTx = signTx.indexOf("0x") === 0 ? signTx : ("0x" + signTx)
        // console.log(tx)
        // // console.log(tx.r.toString())
        // console.log(new Buffer(tx.r, 'hex').toString('hex'))
        // console.log(new Buffer(tx.s, 'hex').toString('hex'))
        // console.log(new Buffer(tx.v, 'hex').toString('hex'))
        // // console.log(tx.s.toString())
        // // console.log(tx.v.toString())
        // console.log(signTx)
        // return
        let hash = Buffer.from(tx.hash(false)).toString('hex')
        hash = hash.indexOf('0x') == 0 ? hash : '0x' + hash
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
            if (err) {
              resolve('')
            } else {
              result = ethers.utils.bigNumberify(result)
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

function getBaseInfo (coin, from, to, value) {
  contract.options.address = allToken[coin].token
  value = ethers.utils.parseUnits(value, allToken[coin].decimals)
  // console.log(value)
  // console.log(value.toString())
  let input = contract.methods.transfer(to, value).encodeABI()
  if (coin === 'ETH') {
    input = ''
  }
  let data = {
    from,
    chainId: web3.utils.toHex(config.ercConfig.chainID),
    gas: '',
    gasPrice: "",
    nonce: "",
    to: coin === 'ETH' ? to : allToken[coin].token,
    value: coin === 'ETH' ? value : "0x0",
    data: input
  }
  // console.log(data)
  return new Promise(resolve => {
    let count = 0, time = Date.now()
    const batch = new web3.BatchRequest()
    batch.add(web3.eth.estimateGas.request({
      to: coin === 'ETH' ? to : allToken[coin].token,
      from: from,
      data: input,
      value: value
    }, (err, res) => {
      if (err) {
        // console.log(err)
        data.gas = web3.utils.toHex(12600 * 100)
        count ++
      } else {
        data.gas = web3.utils.toHex(res * 6)
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
        // console.log(3)
        data.gasPrice = web3.utils.toHex(res)
        count ++
      }
    }))
    batch.execute()
    let getDataIntervel = setInterval(() => {
      if (count >= 3 && ( (Date.now() - time) <= 30000 )) {
        // this.dataPage = data
        // this.getInputData()
        // console.log(data)
        resolve({
          msg: 'Success',
          info: data
        })
        clearInterval(getDataIntervel)
      } else if (count < 3 && ( (Date.now() - time) > 30000 )) {
        resolve({
          msg: 'Error',
          error: res.error
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

export function HDsendERC20Txns (coin, from, to, value) {
  let walletType = sessionStorage.getItem('walletType')
  let HDPath = sessionStorage.getItem('HDPath')
  return new Promise(resolve => {
    getBaseInfo(coin, from, to, value).then(res => {
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