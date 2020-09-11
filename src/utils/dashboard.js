import { ethers } from 'ethers'
import web3 from './web3'
import ERC20_ABI from '../constants/abis/erc20'
import EXCHANGE_ABI from '../constants/abis/exchange'

function getExchangeRate(inputValue, inputDecimals, outputValue, outputDecimals, invert = false) {
  try {
    if (
      inputValue &&
      (inputDecimals || inputDecimals === 0) &&
      outputValue &&
      (outputDecimals || outputDecimals === 0)
    ) {
      const factor = ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18))

      if (invert) {
        return inputValue
          .mul(factor)
          .mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(outputDecimals)))
          .div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(inputDecimals)))
          .div(outputValue)
      } else {
        return outputValue
          .mul(factor)
          .mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(inputDecimals)))
          .div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(outputDecimals)))
          .div(inputValue)
      }
    }
  } catch {}
}

function getMarketRate(reserveETH, reserveToken, decimals, invert = false) {
  return getExchangeRate(reserveETH, 18, reserveToken, decimals, invert)
}

function getTotalSupply (exchangeAddress) {
  return new Promise(resolve => {
    let contract = new web3.eth.Contract(EXCHANGE_ABI, exchangeAddress)
    contract.methods.totalSupply().call((err, res) => {
      let balance = 0
      if (!err) {
        balance = res
      }
      resolve(balance)
    })
  })
}

// 获取交易地址在资金池上的数量
function getPoolTokenBalance (token, exchangeAddress) {
  return new Promise(resolve => {
    let contract = new web3.eth.Contract(ERC20_ABI, token)
    contract.methods.balanceOf(exchangeAddress).call({from: exchangeAddress}, (err, res) => {
      let balance = 0
      if (!err) {
        balance = res
      }
      // console.log('getPoolTokenBalance')
      // console.log(balance)
      resolve(balance)
    })
  })
}

// 获取账户地址在合约中的余额
function getAccountTokenBalance (exchangeAddress, account) {
  return new Promise(resolve => {
    let contract = new web3.eth.Contract(ERC20_ABI, exchangeAddress)
    contract.methods.balanceOf(account).call({from: account}, (err, res) => {
      let balance = 0
      if (!err) {
        balance = res
      }
      // console.log('getAccountTokenBalance')
      // console.log(balance)
      resolve(balance)
    })
  })
}

// 获取交易地址在资金池上的数量
function getPoolExchangeBalance (exchangeAddress) {
  return new Promise(resolve => {
    web3.eth.getBalance(exchangeAddress).then(res => {
      // console.log(res)
      // console.log('getPoolExchangeBalance')
      // console.log(res)
      resolve(res)
    })
  })
}

function getDashBoards (account, token, exchangeAddress, obj) {
  return new Promise(resolve => {
    console.log(exchangeAddress)
    if (!exchangeAddress || exchangeAddress.indexOf('0x') !== 0) {
      resolve({
        ...obj,
        token,
        pecent: 0,
        balance: 0,
        coinBalance: 0
      })
      return
    }
    Promise.all([
      getTotalSupply(exchangeAddress),
      getPoolTokenBalance(token, exchangeAddress),
      getPoolExchangeBalance(exchangeAddress),
      getAccountTokenBalance(exchangeAddress, account),
    ]).then(res => {
      console.log(res)
      // let pecent = getMarketRate(ethers.utils.bigNumberify(res[0]), ethers.utils.bigNumberify(res[1]), 18)
      // console.log(res[4])
      // console.log(ethers.utils.bigNumberify(res[4]))
      // console.log(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
      let supply = res[0],
          coinBalance = res[1],
          poolBalance = res[2],
          accountBalance = res[3]
      let pecent = 0
      let balance = 0
      if (supply && accountBalance) {
        pecent = ethers.utils.bigNumberify(accountBalance).mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18))).div(ethers.utils.bigNumberify(supply))
        if (poolBalance) {
          balance = ethers.utils.bigNumberify(poolBalance).mul(pecent).div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
        }
      }
      // console.log(pecent)
      // console.log(pecent.toString())
      // console.log(balance)
      console.log(res[0])
      resolve({
        ...obj,
        token,
        pecent,
        balance,
        coinBalance
      })
    })
  })
}

export default getDashBoards
