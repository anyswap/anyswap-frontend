import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { ethers } from 'ethers'

import { INITIAL_TOKENS_CONTEXT } from '../../contexts/Tokens/index.js'
import TokenLogo from '../../components/TokenLogo'

import MasterChef from '../../constants/abis/MasterChef.json'
import ERC20_ABI from '../../constants/abis/erc20'
import STAKE_ABI from '../../constants/abis/Stake.json'
import EXCHANGE_ABI from '../../constants/abis/exchange'

import {chainInfo} from '../../config/coinbase/nodeConfig'
import Title from '../../components/Title'
import config from '../../config'

const FarmListBox = styled.div`
  ${({ theme }) => theme.FlexSC};
  flex-wrap:wrap;
  width: 100%;
  margin-top:20px;
`

const FarmList = styled.div`
width: 50%;
height: 220px;
margin-bottom: 20px;
&:nth-child(2n) {
  padding-left: 10px;
}
&:nth-child(2n-1) {
  padding-right: 10px;
}
@media screen and (max-width: 960px) {
  width: 100%;
  &:nth-child(2n) {
    padding-left: 0px;
  }
  &:nth-child(2n-1) {
    padding-right: 0px;
  }
}
`

const StyledNavLink = styled(NavLink)`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.contentBg};
  box-shadow: 0.4375rem 0.125rem 1.625rem 0 rgba(0, 0, 0, 0.06);
  display:block;
  border-radius: 10px;
  text-decoration: none;
  .default {
    ${({ theme }) => theme.FlexC};
    flex-wrap:wrap;
    width:100%;
    height:100%;
    padding: 22px 10px 0;
    border-radius: 10px;
    .img {
      ${({ theme }) => theme.FlexC};
      height:82px;
      border-radius:100%;
      margin:auth;
      img {
        display:block;
        height:100%;
      }
    }
    .info {
      width:100%;
      text-align:center;
      margin:0px 0 0;
      h3 {
        color: #fff;
        font-size:18px;
        margin:0;
        font-weight: 800;
      }
      p {
        color: #fff;
        font-size:14px;
        margin:0;
        padding:0;
        line-height: 35px;
        .pecent {
          padding: 2px 3px;
          background: #14A15E;
          border-radius:4px;
          display:inline-block;
          margin-left: 5px;
          line-height: 21px;
        }
      }
    }
    &.anyStaking {
      background: ${({ theme }) => theme.gradientPurpleLR};
    }
    &.cycStaking {
      background: linear-gradient(180deg, #81BEFA 0%, #4A8AF4 100%);
    }
  }
`
const BannerBox = styled.div`
  width:100%
  img {
    width:100%;
    display:block;
  }
`

const DoubleLogo = styled.div`
  ${({ theme }) => theme.FlexC};
  width: 100%;
  position:relaitve;
  margin-top: 30px;
  .logo {
    width: 70px;
    height: 70px;
    border-radius: 100%;
    // background:#fff;
    img {
      height: 100%;
      display:block;
    }
  }
  .left {
    z-index: 2;
  }
  .right {
    z-index: 1;
  }
  .add {
    font-size: 50px;
    color:#fff;
    display:block;
    margin:0 20px;
  }
`
const TokenLogo1 = styled(TokenLogo)`
background:none;
`


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
function formatCellData(str, len, start) {
  start = start ? start : 0
  let str1 = str.substr(start, len)
  str1 = str1.indexOf('0x') === 0 ? str1 : '0x' + str1
  return ethers.utils.bigNumberify(str1)
}

const Web3Fn = require('web3')

export default function FarmsList () {
  
  const { t } = useTranslation()

  const [StakingAPY, setStakingAPY] = useState()
  const [BSCStakingAPY, setBSCStakingAPY] = useState()

  function getStakingAPY () {
    let CHAINID = '46688'
    let useChain = chainInfo[CHAINID]
    let web3Fn = new Web3Fn(new Web3Fn.providers.HttpProvider(useChain.rpc))
    let ANY_TOKEN = '0xc20b5e92e1ce63af6fe537491f75c19016ea5fb4'
    let STAKE_TOKEN = '0xeb96e36e8269a0f0d53833bab9683f1b4e1107a8'
    if (config.env === 'main') {
      CHAINID = '32659'
      useChain = chainInfo[CHAINID]
      web3Fn = new Web3Fn(new Web3Fn.providers.HttpProvider(useChain.rpc))
      ANY_TOKEN = '0x0c74199d22f732039e843366a236ff4f61986b32'
      STAKE_TOKEN = '0x2e1f1c7620eecc7b7c571dff36e43ac7ed276779'
    }
    const batch = new web3Fn.BatchRequest()
    const web3Contract = new web3Fn.eth.Contract(STAKE_ABI, STAKE_TOKEN)
    const web3ErcContract = new web3Fn.eth.Contract(ERC20_ABI, ANY_TOKEN)
    const tsData = web3ErcContract.methods.balanceOf(STAKE_TOKEN).encodeABI()
    batch.add(web3Fn.eth.call.request({data: tsData, to: ANY_TOKEN}, 'latest'))

    const rpbData = web3Contract.methods.rewardPerBlock().encodeABI()
    batch.add(web3Fn.eth.call.request({data: rpbData, to: STAKE_TOKEN}, 'latest'))
    batch.requestManager.sendBatch(batch.requests, (err, res) => {
      // console.log(res)
      if (!err) {
        let StakePool = res[0] && res[0].result ? ethers.utils.bigNumberify(res[0].result) : ''
        let BlockReward = res[1] && res[1].result ? ethers.utils.bigNumberify(res[1].result) : ''
        if (StakePool && BlockReward) {
          setStakingAPY(BlockReward.mul(6600 * 365 * 10000).div(StakePool))
        }
      }
    })
  }

  function getBSCStakingAPY () {
    let CHAINID = '46688'
    let useChain = chainInfo[CHAINID]
    let FARMTOKEN = '0x38999f5c5be5170940d72b398569344409cd4c6e'
    let useToken = INITIAL_TOKENS_CONTEXT[CHAINID]
    let exchangeObj = {}

    let cycExchange = '0xf0f4de212b1c49e2f98fcf574e5746507a9cac44'

    if (config.env === 'main') {
      CHAINID = '56'
      useChain = chainInfo[CHAINID]
      // FARMTOKEN = '0xfbec3ec06c01fd2e742a5989c771257159d9a5f7'
      FARMTOKEN = '0x6a411104ca412c8265bd8e95d91fed72006934fd'
      useToken = INITIAL_TOKENS_CONTEXT[CHAINID]
      cycExchange = '0x0df8810714dde679107c01503e200ce300d0dcf6'
    }

    let BlockReward = '', TotalPoint = 0, allocPoint = 0, lpBalance = ''

    let web3Fn = new Web3Fn(new Web3Fn.providers.HttpProvider(useChain.rpc))

    const web3Contract = new web3Fn.eth.Contract(MasterChef, FARMTOKEN)
    const web3ErcContract = new web3Fn.eth.Contract(ERC20_ABI)
    const exchangeContract = new web3Fn.eth.Contract(EXCHANGE_ABI)

    // BlockReward.mul(6600 * 365 * 10000).mul(ethers.utils.bigNumberify(allocPoint)).div(ethers.utils.bigNumberify(TotalPoint)).div(lpBalance)
    for (let token in useToken) {
      exchangeObj[useToken[token].exchangeAddress] = {
        ...useToken[token],
        token
      }
    }

    function getTokenList(num) {
      const batch = new web3Fn.BatchRequest()
      for (let i = 0; i < num; i++) {
        const plData = web3Contract.methods.poolInfo(i).encodeABI()
        batch.add(web3Fn.eth.call.request({data: plData, to: FARMTOKEN}, 'latest'))
      }
      // console.log(arr)
      batch.requestManager.sendBatch(batch.requests, (err, res) => {
        if (!err) {
          const batch1 = new web3Fn.BatchRequest()
          let exchangeETHBalance = '', CYCMarket = '', totalSupply
          for (let obj of res) {
            let pl = obj.result? obj.result : ''
            if (pl) {
              let curPoint = ethers.utils.bigNumberify('0x' + pl.substr(66, 64)).toString()
              let exAddr = pl.substr(0, 66).replace('0x000000000000000000000000', '0x')
              if (cycExchange === exAddr) {
                allocPoint = curPoint

                // exchangeContract.options.address = obj.lpToken
                // const tsData = exchangeContract.methods.totalSupply().encodeABI()
                // batch.add(web3Fn.eth.call.request({data: tsData, to: obj.lpToken}, 'latest', (err, ts) => {

                exchangeContract.options.address = exAddr
                const tsData = exchangeContract.methods.totalSupply().encodeABI()
                batch1.add(web3Fn.eth.call.request({data: tsData, to: exAddr}, 'latest'))
    
                batch1.add(web3.eth.getBalance.request(exAddr, 'latest'))
    
                web3ErcContract.options.address = exchangeObj[exAddr].token
                let etbData = web3ErcContract.methods.balanceOf(exAddr).encodeABI()
                batch1.add(web3.eth.call.request({data: etbData, to: exchangeObj[exAddr].token, from: exAddr}, 'latest'))
              }
              TotalPoint += Number(curPoint)

            }
          }
          batch1.requestManager.sendBatch(batch1.requests, (error, res1) => {
            if (!error) {
              console.log(res1)
              totalSupply  = res1[0] && res1[0].result && res1[0].result ?  formatCellData(res1[0].result, 66) : ''
              exchangeETHBalance = res1[1] && res1[1].result ?  formatCellData(res1[1].result) : ''
              let exchangeTokenBalancem = res1[2] && res1[2].result && res1[2].result ?  formatCellData(res1[2].result) : ''
              CYCMarket = getMarketRate(exchangeETHBalance, exchangeTokenBalancem, 18)
              if (
                  BlockReward &&
                  TotalPoint &&
                  allocPoint &&
                  lpBalance
                  && BlockReward.gt(ethers.constants.Zero)
                  && lpBalance.gt(ethers.constants.Zero)
                  && exchangeETHBalance
                  && exchangeETHBalance.gt(ethers.constants.Zero)
                  && CYCMarket
                  && CYCMarket.gt(ethers.constants.Zero)
                  && totalSupply
                  && totalSupply.gt(ethers.constants.Zero)
              ) {
                let baseAmount = lpBalance.mul(exchangeETHBalance).mul(ethers.utils.bigNumberify(2)).div(totalSupply)
                let baseYear =  BlockReward.mul(28800 * 365 * 10000).mul(ethers.utils.bigNumberify(allocPoint)).div(ethers.utils.bigNumberify(TotalPoint)).div(CYCMarket).mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
                let apy = baseYear.div(baseAmount)
                apy = Number(apy.toString()) / 100
                setBSCStakingAPY(apy)
              }
            }
          })
        }
      })
    }

    function getBaseInfo () {
      const batch = new web3Fn.BatchRequest()

      const plData = web3Contract.methods.poolLength().encodeABI()
      batch.add(web3Fn.eth.call.request({data: plData, to: FARMTOKEN}, 'latest'))
      const rpbData = web3Contract.methods.rewardPerBlock().encodeABI()
      batch.add(web3Fn.eth.call.request({data: rpbData, to: FARMTOKEN}, 'latest'))

      web3ErcContract.options.address = cycExchange
      const blData = web3ErcContract.methods.balanceOf(FARMTOKEN).encodeABI()
      batch.add(web3Fn.eth.call.request({data: blData, to: cycExchange}, 'latest'))

      batch.requestManager.sendBatch(batch.requests, (err, res) => {
        if (!err) {
          let poolLength = res[0] && res[0].result ? res[0].result : ''
          BlockReward = res[1] && res[1].result ? ethers.utils.bigNumberify(res[1].result) : ''
          lpBalance = res[2] && res[2].result ? formatCellData(res[2].result, 66) : ''
          // console.log(parseInt(poolLength))
          getTokenList(parseInt(poolLength))
        }
      })
    }
    getBaseInfo()
  }

  useEffect(() => {
    getStakingAPY()
    getBSCStakingAPY()
  }, [])


  return (
    <>
      <Title
        title={t('farms')}
      ></Title>
      {/* <BannerBox>
        <img src={require('../../assets/images/banner/farm.png')} />
      </BannerBox> */}
      <FarmListBox>
        <FarmList>
          <StyledNavLink to={config.farmUrl + 'htfarming'}>
            <div className='default anyStaking'>
              {/* <div className='img'><img src={require('../../assets/images/coin/source/HT.svg')} alt=""/></div> */}
              <DoubleLogo>
                <div className="logo left"><TokenLogo1 address='ANY' size='100%'/></div>
                <span className="add">+</span>
                <div className="logo right"><TokenLogo1 address='HT' size='100%'/></div>
                
              </DoubleLogo>
              <div className='info'>
                <h3>ANY Farming</h3>
                <p>{t('LaunchTime')}</p>
              </div>
            </div>
          </StyledNavLink>
        </FarmList>
        <FarmList>
          <StyledNavLink to={config.farmUrl + 'bscfarming'}>
            <div className='default cycStaking'>
              <div className='img'><img src={require('../../assets/images/icon/cycIcon.svg')} alt=""/></div>
              <div className='info'>
                <h3>Christmas Farming</h3>
                <p>{t('BSCStakingTip')}<span className='pecent'>+{BSCStakingAPY ? (Number(BSCStakingAPY)).toFixed(2) : '0.00'}%</span></p>
              </div>
            </div>
          </StyledNavLink>
        </FarmList>
        <FarmList>
          <StyledNavLink to={config.farmUrl + 'staking'}>
            <div className='default cycStaking'>
              <div className='img'><img src={require('../../assets/images/icon/anyIcon.svg')} alt=""/></div>
              <div className='info'>
                <h3>ANY Staking</h3>
                <p>{t('ANYStakingTip')}<span className='pecent'>+{StakingAPY ? (Number(StakingAPY) / 100).toFixed(2) : '0.00'}%</span></p>
              </div>
            </div>
          </StyledNavLink>
        </FarmList>
      </FarmListBox>
    </>
  )
}