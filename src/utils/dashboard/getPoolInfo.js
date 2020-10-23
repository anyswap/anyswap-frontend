import * as multicall from '@makerdao/multicall'
import { ethers } from 'ethers'
import config from '../../config'

const multicallConfig = {
  rpcUrl: config.nodeRpc,
  multicallAddress: config.queryToken
}

const ZERO = ethers.utils.bigNumberify('0')

// multicall.aggregate([
//   {
//     call: ['getEthBalance(address)(uint256)', '0xE000E632124aa65B80f74E3e4cc06DC761610583'],
//     returns: [['BALANCE_OF_MKR_WHALE', val => val / 10 ** 18]]
//   },
//   {
//     target: '0xC20b5E92E1ce63Af6FE537491f75C19016ea5fb4',
//     call: ['balanceOf(address)(uint256)', '0xE000E632124aa65B80f74E3e4cc06DC761610583'],
//     returns: [['BALANCE_OF_MKR_WHALE', val => val / 10 ** 18]]
//   }
// ], multicallConfig).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })

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

export function getPoolInfo (arr) {
  return new Promise(resolve => {
    let callArr = []
    for (let obj of arr) {
      if (!obj.exchangeAddress || obj.exchangeAddress.indexOf('0x') !== 0) continue
      callArr.push(...[
        {
          target: obj.exchangeAddress,
          call: ['totalSupply()(uint256)'],
          returns: [['TS_' + obj.symbol, val => val / 10 ** 18]]
        },
        {
          target: obj.token,
          call: ['balanceOf(address)(uint256)', obj.exchangeAddress],
          returns: [['exchangeTokenBalancem_' + obj.symbol, val => val / 10 ** Number(obj.decimals)]]
        },
        {
          call: ['getEthBalance(address)(uint256)', obj.exchangeAddress],
          returns: [['exchangeETHBalance_' + obj.symbol, val => val / 10 ** Number(obj.decimals)]]
        }
      ])
      if (obj.account) {
        callArr.push({
          target: obj.exchangeAddress,
          call: ['balanceOf(address)(uint256)', obj.account],
          returns: [['poolTokenBalance_' + obj.symbol, val => val / 10 ** Number(obj.decimals)]]
        })
      }
    }
    // console.log(callArr)
    // console.log(multicallConfig)
    multicall.aggregate([...callArr], multicallConfig).then(res => {
      // console.log(res)
      if (res.results) {
        let result = res.results.original
        for (let i = 0, len = arr.length; i < len; i++) {
          let obj = arr[i]
          let poolTokenPercentage = ZERO
          let balance = ZERO, Basebalance = 0, market = ZERO
          if (Number(result['TS_' + obj.symbol]) && Number(result['poolTokenBalance_' + obj.symbol])) {
            poolTokenPercentage = result['poolTokenBalance_' + obj.symbol].mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18))).div(result['TS_' + obj.symbol])
            if (Number(result['exchangeTokenBalancem_' + obj.symbol])) {
              balance = result['exchangeTokenBalancem_' + obj.symbol].mul(poolTokenPercentage).div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
            }
            if (Number(result['exchangeETHBalance_' + obj.symbol])) {
              Basebalance = result['exchangeETHBalance_' + obj.symbol].mul(poolTokenPercentage).div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
            }
          }
          if (Number(result['exchangeETHBalance_' + obj.symbol]) && Number(result['exchangeTokenBalancem_' + obj.symbol])) {
            market = getMarketRate(result['exchangeETHBalance_' + obj.symbol], result['exchangeTokenBalancem_' + obj.symbol], obj.decimals)
          }
          arr[i].supply = result['TS_' + obj.symbol] ? result['TS_' + obj.symbol] : ZERO
          arr[i].exchangeTokenBalancem = result['exchangeTokenBalancem_' + obj.symbol] ? result['exchangeTokenBalancem_' + obj.symbol] : ZERO
          arr[i].exchangeETHBalance = result['exchangeETHBalance_' + obj.symbol] ? result['exchangeETHBalance_' + obj.symbol] : ZERO
          arr[i].poolTokenBalance = result['poolTokenBalance_' + obj.symbol] ? result['poolTokenBalance_' + obj.symbol] : ZERO
          arr[i].pecent = poolTokenPercentage
          arr[i].balance = balance
          arr[i].Basebalance = Basebalance
          arr[i].market = market
        }
      }
      // console.log(arr)
      resolve(arr)
    }).catch(err => {
      console.log(err)
    })
  })
}
