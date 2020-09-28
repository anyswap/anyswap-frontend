import { ethers } from 'ethers'
import web3 from '../web3'
import ERC20_ABI from '../../constants/abis/erc20'
import EXCHANGE_ABI from '../../constants/abis/exchange'

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


function formatCellData(str, len) {
  let str1 = str.substr(0, len)
  return ethers.utils.bigNumberify(str1)
}

const ZERO = ethers.utils.bigNumberify('0')
// web3.eth.call.
export function getDashBoards (arr) {
  // console.log(arr)
  return new Promise(resolve => {

    let exchangeContract = new web3.eth.Contract(EXCHANGE_ABI)
    let tokenContract = new web3.eth.Contract(ERC20_ABI)
    const batch = new web3.BatchRequest()
    let count = 0, time = Date.now()
    for (let i = 0, len = arr.length; i < len; i++) {
      let obj = arr[i]
      if (!obj.exchangeAddress || obj.exchangeAddress.indexOf('0x') !== 0) continue
      // totalSupply
      exchangeContract.options.address = obj.exchangeAddress
      let tsData = exchangeContract.methods.totalSupply().encodeABI()
      batch.add(web3.eth.call.request({data: tsData, to: obj.exchangeAddress}, 'latest', (err, res) => {
        let bl
        if (err) {
          bl = ZERO
        } else {
          bl = formatCellData(res, 66)
        }
        arr[i].supply = bl
        count ++
        // console.log(web3.utils.toWei(res))
      }))
  
      // exchangeTokenBalancem
      tokenContract.options.address = obj.token
      let etbData = tokenContract.methods.balanceOf(obj.exchangeAddress).encodeABI()
      // console.log(etbData)
      batch.add(web3.eth.call.request({data: etbData, to: obj.token, from: obj.exchangeAddress}, 'latest', (err, res) => {
        let bl
        if (err) {
          bl = ZERO
        } else {
          bl = formatCellData(res, 66)
        }
        arr[i].exchangeTokenBalancem = bl
        count ++
      }))
  
      // exchangeETHBalance 
      batch.add(web3.eth.getBalance.request(obj.exchangeAddress, 'latest', (err, res) => {
        let bl
        if (err) {
          bl = ZERO
        } else {
          bl = ethers.utils.bigNumberify(res)
        }
        arr[i].exchangeETHBalance = bl
        count ++
      }))

            
      // poolTokenBalance
      tokenContract.options.address = obj.exchangeAddress
      let ptbData = tokenContract.methods.balanceOf(obj.account).encodeABI()
      // console.log(ptbData)
      batch.add(web3.eth.call.request({data: ptbData, to: obj.exchangeAddress}, 'latest', (err, res) => {
        let bl
        if (err) {
          bl = ZERO
        } else {
          bl = formatCellData(res, 66)
        }
        arr[i].poolTokenBalance = bl
        count ++
      }))
    }
    // console.log(batch)
    batch.execute()
  
    let getDataIntervel = setInterval(() => {
      if (count >= 4 && ( (Date.now() - time) <= 60000 )) {
        // console.log(arr)
        for (let i = 0, len = arr.length; i < len; i++) {
          let obj = arr[i]
          let poolTokenPercentage = ethers.utils.bigNumberify(0)
          let balance = ethers.utils.bigNumberify(0), Basebalance = 0, market = ethers.utils.bigNumberify(0)
          if (Number(obj.supply) && Number(obj.exchangeTokenBalancem)) {
            poolTokenPercentage = obj.poolTokenBalance.mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18))).div(obj.supply)
            if (Number(obj.exchangeTokenBalancem)) {
              balance = obj.exchangeTokenBalancem.mul(poolTokenPercentage).div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
            }
            if (Number(obj.exchangeETHBalance)) {
              Basebalance = obj.exchangeETHBalance.mul(poolTokenPercentage).div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
              market = getMarketRate(obj.exchangeETHBalance, obj.exchangeTokenBalancem, obj.decimals)
            }
          }
          arr[i].pecent = poolTokenPercentage
          arr[i].balance = balance
          arr[i].Basebalance = Basebalance
          arr[i].market = market
        }
        resolve(arr)
        clearInterval(getDataIntervel)
      } else if (count < 4 && ( (Date.now() - time) > 30000 )) {
        // console.log(arr)
        clearInterval(getDataIntervel)
      }
    }, 500)
  })
  
}
