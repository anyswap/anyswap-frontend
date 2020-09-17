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
    // console.log(contract.methods)
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
function getPoolTokenBalance (token, exchangeAddress) { // exchangeTokenBalancem
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
function getPoolTokenBalance2 (token, exchangeAddress) { // exchangeTokenBalancem
  return new Promise(resolve => {
    let contract = new web3.eth.Contract(EXCHANGE_ABI, exchangeAddress)
    contract.methods.balanceOf(token).call({from: token}, (err, res) => {
      let balance = 0
      if (!err) {
        balance = res
      }
      resolve(balance)
    })
  })
}

// 获取账户地址在合约中的余额
function getAccountTokenBalance (exchangeAddress, account) {  // poolTokenBalance
  return new Promise(resolve => {
    if (!account) {
      resolve('0')
    }
    let contract = new web3.eth.Contract(ERC20_ABI, exchangeAddress)
    contract.methods.balanceOf(account).call( (err, res) => {
      let balance = 0
      if (!err) {
        balance = res
      }
      resolve(balance)
    })
  })
}

// 获取交易地址在资金池上的数量
function getPoolExchangeBalance (exchangeAddress) { // exchangeETHBalance
  return new Promise(resolve => {
    web3.eth.getBalance(exchangeAddress).then(res => {
      resolve(res)
    })
  })
}

function getDashBoards (account, token, exchangeAddress, obj, coin) {
  return new Promise(resolve => {
    // console.log(exchangeAddress)
    if (!exchangeAddress || exchangeAddress.indexOf('0x') !== 0) {
      resolve({
        ...obj,
        token,
        pecent: 0,
        balance: 0,
        poolTokenBalance: 0
      })
      return
    }
    Promise.all([
      getTotalSupply(exchangeAddress),
      getPoolTokenBalance(token, exchangeAddress), // pool token balance
      getPoolExchangeBalance(exchangeAddress), // pool coin balance
      getAccountTokenBalance(exchangeAddress, account), 
      getPoolTokenBalance2(token, exchangeAddress)
    ]).then(res => {
      // if (coin === 'ANY') {
      //   console.log(coin)
      //   console.log(token)
      //   console.log(exchangeAddress)
      //   console.log(res)
      // }
      let supply = res[0],
          exchangeTokenBalancem = res[1], // exchangeTokenBalancem
          exchangeETHBalance = res[2], // exchangeETHBalance
          poolTokenBalance = res[3] // poolTokenBalance
      let poolTokenPercentage = ethers.utils.bigNumberify(0)
      let balance = ethers.utils.bigNumberify(0), Basebalance = 0, market = ethers.utils.bigNumberify(0)
      if (Number(supply) && Number(exchangeTokenBalancem)) {
        poolTokenPercentage = ethers.utils.bigNumberify(poolTokenBalance).mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18))).div(ethers.utils.bigNumberify(supply))
        if (exchangeTokenBalancem) {
          balance = ethers.utils.bigNumberify(exchangeTokenBalancem).mul(poolTokenPercentage).div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
        }
        if (exchangeETHBalance) {
          Basebalance = ethers.utils.bigNumberify(exchangeETHBalance).mul(poolTokenPercentage).div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
          market = getMarketRate(ethers.utils.bigNumberify(exchangeETHBalance), ethers.utils.bigNumberify(exchangeTokenBalancem), obj.decimals)
        }
      }
      resolve({
        ...obj,
        token,
        pecent: poolTokenPercentage,
        balance: balance,
        poolTokenBalance: ethers.utils.bigNumberify(poolTokenBalance),
        exchangeTokenBalancem: ethers.utils.bigNumberify(exchangeTokenBalancem),
        exchangeETHBalance: ethers.utils.bigNumberify(exchangeETHBalance),
        Basebalance: ethers.utils.bigNumberify(Basebalance),
        market: market
        // poolBaseBalance
      })
    })
  })
}

export default getDashBoards
