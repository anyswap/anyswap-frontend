import { ethers } from 'ethers'
import web3 from './web3'
import ERC20_ABI from '../constants/abis/erc20'

// 获取交易地址在合约中的余额
function getAllTokenBalance (token, exchangeAddress) {
  return new Promise(resolve => {
    let contract = new web3.eth.Contract(ERC20_ABI, token)
    contract.methods.balanceOf(exchangeAddress).call({from: exchangeAddress}, (err, res) => {
      let balance = 0
      if (!err) {
        balance = res
      }
      resolve(balance)
    })
  })
}

// 获取账户地址在合约中的余额
function getAccountTokenBalance (token, account) {
  return new Promise(resolve => {
    let contract = new web3.eth.Contract(ERC20_ABI, token)
    contract.methods.balanceOf(account).call({from: account}, (err, res) => {
      let balance = 0
      if (!err) {
        balance = res
      }
      // console.log(res)
      resolve(balance)
    })
  })
}

// 获取交易地址在节点上的余额
function getAllExchangeBalance (exchangeAddress) {
  return new Promise(resolve => {
    web3.eth.getBalance(exchangeAddress).then(res => {
      // console.log(res)
      resolve(res)
    })
  })
}
