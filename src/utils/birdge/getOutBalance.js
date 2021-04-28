/*eslint-disable*/
import { ethers } from 'ethers'
import config from '../../config'
import ERC20_ABI from '../../constants/abis/erc20'
import TOKEN from '../../contexts/BridgeTokens'
import {getNodeRpc} from '../../config/getNodeRpc'
import {formatCoin, getLocalConfig, setLocalConfig} from '../tools'
import {getTRXBalance} from './TRX'

const Web3 = require('web3')
const web3 = new Web3()
let contract = new web3.eth.Contract(ERC20_ABI)

const ZERO = ethers.utils.bigNumberify('0')
const OUT_TOKEN_BALANCE = 'OUT_TOKEN_BALANCE'

const CHAINID = config.chainID



export function getLocalOutBalance (chainID, account, token) {
  let lstr = sessionStorage.getItem(OUT_TOKEN_BALANCE)
  if (!lstr) {
    return false
  } else {
    let lboj = JSON.parse(lstr)
    if (!lboj[CHAINID]) {
      return false
    } else if (!lboj[CHAINID][account]) {
      return false
    } else if (!lboj[CHAINID][account][chainID]) {
      return false
    } else if (!lboj[CHAINID][account][chainID][token]) {
      return false
    } else if ((Date.now() - lboj[CHAINID][account][chainID][token].timestamp) > (1000 * 60 * 10)) {
      return false
    } else {
      return {
        msg: 'Success',
        info: lboj[CHAINID][account][chainID][token]
      }
    }
  }
}

export function setLocalOutBalance (chainID, account, token, data) {
  let lstr = sessionStorage.getItem(OUT_TOKEN_BALANCE)
  let lboj = {}
  if (!lstr) {
    lboj[CHAINID] = {}
    lboj[CHAINID][account] = {}
    lboj[CHAINID][account][chainID] = {}
    lboj[CHAINID][account][chainID][token] = {
      ...data,
      timestamp: Date.now()
    }
  } else {
    lboj = JSON.parse(lstr)
    if (!lboj[CHAINID]) {
      lboj[CHAINID] = {}
      lboj[CHAINID][account] = {}
      lboj[CHAINID][account][chainID] = {}
      lboj[CHAINID][account][chainID][token] = {
        ...data,
        timestamp: Date.now()
      }
    } else if (!lboj[CHAINID][account]) {
      lboj[CHAINID][account] = {}
      lboj[CHAINID][account][chainID] = {}
      lboj[CHAINID][account][chainID][token] = {
        ...data,
        timestamp: Date.now()
      }
    } else if (!lboj[CHAINID][account][chainID]) {
      lboj[CHAINID][account][chainID] = {}
      lboj[CHAINID][account][chainID][token] = {
        ...data,
        timestamp: Date.now()
      }
    } else {
      lboj[CHAINID][account][chainID][token] = {
        ...data,
        timestamp: Date.now()
      }
    }
  }
  sessionStorage.setItem(OUT_TOKEN_BALANCE, JSON.stringify(lboj))
}

let blObj = {}
export function getTokenBalance (chainId, token, address, type) {
  return new Promise(resolve => {
    let lobj = getLocalConfig (address, token, config.chainID, 'APPROVE_BALANCE', Date.now() - (1000 * 60))
    // console.log(lobj)
    if (lobj && lobj.info && lobj.info.data && Number(lobj.info.data)) {
      resolve(lobj.info.data)
    } else {
      if (type) {
        web3.setProvider(config.nodeRpc)
        contract.options.address = token
        contract.methods.balanceOf(address).call((err, res) => {
          if (err) {
            resolve(0)
          } else {
            setLocalConfig (address, token, {data: res}, config.chainID, 'APPROVE_BALANCE')
            resolve(res)
          }
        })
      } else {
        // console.log(getNodeRpc(chainId))
        web3.setProvider(getNodeRpc(chainId))
        web3.eth.getBalance(address, 'latest').then(res => {
          setLocalConfig (address, token, {data: res}, config.chainID, 'APPROVE_BALANCE')
          resolve(res)
        }).catch(err => {
          resolve(0)
        })
      }
      // if (type) {
      //   web3.setProvider(config.nodeRpc)
      // } else {
      //   web3.setProvider(getNodeRpc(chainId))
      // }
      // contract.options.address = token
      // contract.methods.balanceOf(address).call((err, res) => {
      //   // console.log(err)
      //   // console.log(res)
      //   if (err) {
      //     resolve(0)
      //   } else {
      //     setLocalConfig (address, token, {data: res}, config.chainID, 'APPROVE_BALANCE')
      //     resolve(res)
      //   }
      // })
    }
  })
}

function getOutTokenBalance (chainId, account, tokenList) {
  return new Promise(resolve => {
    const batch = new web3.BatchRequest()
    let BridgeToken = TOKEN[chainId]
    chainId = Number(chainId)
    web3.setProvider(getNodeRpc(chainId))
    let isHaveoutBaseCoin = true
    for (let token in tokenList) {
      let coin = formatCoin(tokenList[token].symbol)
      // if () continue
      if (
        (coin === 'ETH' && (chainId === 1 || chainId === 4))
        || (coin === 'FSN' && (chainId === 32659 || chainId === 46688))
        || (coin === 'BNB' && (chainId === 56 || chainId === 97))
        || (coin === 'HT' && (chainId === 128 || chainId === 256))
        || (coin === 'FTM' && (chainId === 250))
      ) {
        isHaveoutBaseCoin = false
        batch.add(web3.eth.getBalance.request(account, 'latest', (err, res) => {
          let bl
          if (err) {
            bl = ZERO
          } else {
            bl = ethers.utils.bigNumberify(res)
            setLocalOutBalance(chainId, account, token, {balance: bl.toString()})
            setLocalOutBalance(chainId, account, 'BASE', {balance: bl.toString()})
          }
          resolve('OVER')
        }))
      } else {
        contract.options.address = BridgeToken[coin].token
        let etbData = contract.methods.balanceOf(account).encodeABI()
        batch.add(web3.eth.call.request({data: etbData, to: BridgeToken[coin].token, from: account}, 'latest', (err, res) => {
          let bl
          if (err) {
            bl = ZERO
          } else {
            bl = ethers.utils.bigNumberify(res)
            setLocalOutBalance(chainId, account, token, {balance: bl.toString()})
          }
        }))
      }
    }
    if (isHaveoutBaseCoin) {
      batch.add(web3.eth.getBalance.request(account, 'latest', (err, res) => {
        let bl
        if (err) {
          bl = ZERO
        } else {
          bl = ethers.utils.bigNumberify(res)
          setLocalOutBalance(chainId, account, 'BASE', {balance: bl.toString()})
        }
        resolve('OVER')
      }))
    }
    batch.execute()
  })
}

let getBalanceInterval = ''


function getAllOutBalanceFn (allToken, account) {
  if (getBalanceInterval) clearTimeout(getBalanceInterval) 
  let arr = []
  for (let chainId in allToken) {
    if (chainId === 'TRX') {
      console.log(allToken[chainId])
      getTRXBalance(account, allToken[chainId])
    } else {
      arr.push(getOutTokenBalance(chainId, account, allToken[chainId]))
    }
  }
  Promise.all(arr).then(res => {
    getBalanceInterval = setTimeout(() => {
      getAllOutBalance(allToken, account)
    }, 12000)
  })
}

export const getAllOutBalance = getAllOutBalanceFn