import React, {useCallback, useEffect, useState, useReducer} from 'react'
import { useTranslation } from 'react-i18next'
import { withRouter, NavLink } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import styled from 'styled-components'
import { ethers } from 'ethers'
import { transparentize } from 'polished'
import { useWeb3React, useSwapTokenContract } from '../../hooks'
// import { useAddressAllowance } from '../../contexts/Allowances'
import { INITIAL_TOKENS_CONTEXT } from '../../contexts/Tokens/index.js'
import { useTransactionAdder } from '../../contexts/Transactions'
import { useWalletModalToggle } from '../../contexts/Application'
import { useDarkModeManager } from '../../contexts/LocalStorage'

import { Button } from '../../theme'

import MasterChef from '../../constants/abis/MasterChef.json'
import ERC20_ABI from '../../constants/abis/erc20'
import EXCHANGE_ABI from '../../constants/abis/exchange'
// import FoodToken from '../../constants/abis/FoodToken'

import Title from '../../components/Title'
import Modal from '../../components/Modal'
import ModalContent from '../../components/Modal/ModalContent'
import HardwareTip from '../../components/HardwareTip'

import { amountFormatter, getQueryParam } from '../../utils'
import {getWeb3BaseInfo} from '../../utils/web3/txns'
import config from '../../config'
import {chainInfo} from '../../config/coinbase/nodeConfig'
import {thousandBit, formatNum} from '../../utils/tools'

import TokenLogo from '../../components/TokenLogo'

import {getPrice} from '../../utils/axios'

import question from '../../assets/images/question.svg'

const TokenLogo1 = styled(TokenLogo)`
background:none;
`

const Button1 = styled(Button)`
white-space:nowrap;
`
const Button2 = styled(Button)`
white-space:nowrap;
padding:0;
background: ${({ theme }) => theme.moreBtn};
margin: 0 10px;
color:${({ theme }) => theme.textColor1};
box-shadow: none;
&:hover,&:focus {
  background: ${({ theme }) => theme.moreBtn};
}
`
const BackLink = styled(NavLink)`
  ${({ theme }) => theme.FlexC};
  width:100%;
  color:${({ theme }) => theme.textColor1};
  height: 100%;
  text-decoration: none;
`

const InputRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: 0 25px;
  width:100%;
`
const Input = styled.input`
  outline: none;
  border: none;
  flex: 1 1 auto;
  width: 0;
  background-color: transparent;
  border-bottom: 0.0625rem solid ${({theme}) => theme.inputBorder};

  color: ${({ error, theme }) => (error ? theme.salmonRed : theme.textColorBold)};
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'Manrope';
  font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: -0.0625rem;
  padding: 8px 0.75rem;
  ::placeholder {
    color: ${({ theme }) => theme.placeholderGray};
  }
`

const FarmListBox = styled.div`
  ${({ theme }) => theme.FlexSC};
  width: 100%;
  flex-wrap:wrap;
`

const FarmList = styled.div`
  ${({ theme }) => theme.FlexC};
  width: 33.33%;
  padding: 0 10px;
  margin-bottom: 20px;
  @media screen and (min-width: 761px) and (max-width: 1140px) {
    width: 50%;
  }
  @media screen and (max-width: 760px) {
    width: 100%;
  }
`
const FarmListCont = styled.div`
  width:100%;
  // height: 260px;
  background: ${({ theme }) => theme.contentBg};
  box-shadow: 0.4375rem 0.125rem 1.625rem 0 rgba(0, 0, 0, 0.06);
  display:block;
  border-radius: 10px;
  padding: 40px 10px;
  position:relative;
`

const MulLabel = styled.div`
  min-width:40px;
  padding: 3px 5px;
  border-radius: 10px;
  position:absolute;
  top:20px;
  left: 20px;
  background: ${({ theme }) => theme.gradientPurpleTB};
  color:#fff;
  font-size:16px;
  text-align:center;
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
    margin-left: -15px;
    z-index: 1;
  }
`

const FarmInfo = styled.div`
  width:100%;
  padding: 10px;
  font-size: 12px;
  margin: 30px 0;
  .item {
    ${({ theme }) => theme.FlexBC};
    width: 100%;
    margin: 10px 0;
    font-size: 16px;
    .left {
      color:#969DAC;
    }
    .right {
      color:${({ theme }) => theme.textColor1};
    }
  }
`
const Flex = styled.div`
  display: flex;
  justify-content: center;

  button {
    max-width: 20rem;
  }
`

const StakingBox = styled.div`
  width:100%;
`

const StakingList = styled.ul`
  ${({ theme }) => theme.FlexC};
  list-style:none;
  padding:0!important;

  .item {
    ${({ theme }) => theme.FlexC};
    flex-wrap:wrap;
    width:100%;
    max-width: 320px;
    background: ${({ theme }) => theme.contentBg};
    box-shadow: 0.4375rem 0.125rem 1.625rem 0 rgba(0, 0, 0, 0.06);
    margin: 15px 15px 20px;
    padding: 25px 15px 40px;
    border-radius: 10px;

    .pic {
      ${({ theme }) => theme.FlexC};
      width:70px;
      height:70px;
      // padding:15px;
      // background:#fff;
      border-radius:100%;
      margin:auth;
      margin-top:30px;
      img {
        display:block;
        width:100%;
      }
    }
    .info {
      width:100%;
      text-align:center;
      margin:30px 0;
      h3 {
        color: ${({ theme }) => theme.textColorBold};
        font-size:16px;
        margin:0;
      }
      p {
        color: #969DAC;
        font-size:14px;
        margin-bottom:0;
      }
    }
    .btn {
      ${({ theme }) => theme.FlexC};
      width:100%;
    }
  }
  .green {
    color: #2ead65;
  }
  @media screen and (max-width: 960px) {
    flex-wrap:wrap;
  }
`

const AddBox = styled(Button)`
  ${({ theme }) => theme.FlexC};
  width: 45px;
  min-width: 45px;
  height:45px;
  border: solid 0.5px ${({ theme }) => theme.tipBorder};
  box-shadow: 0 0.25rem 8px 0 ${({ theme }) => transparentize(0.95, theme.shadowColor)};
  background: ${({theme}) => theme.tipBg};
  border-radius: 9px;
  margin-left:15px;
  cursor:pointer;
  padding:0;
  &:hover, &:focus{
    border: solid 0.5px ${({ theme }) => theme.tipBorder};
    box-shadow: 0 0.25rem 8px 0 ${({ theme }) => transparentize(0.95, theme.shadowColor)};
    background: ${({theme}) => theme.tipBg};
  }
`

const StakingModalBox = styled.div`
  ${({ theme }) => theme.FlexC}
  width:100%;
  padding: 25px 15px 30px;
  flex-wrap:wrap;
`
const MaxBox = styled.div`
  ${({ theme }) => theme.FlexC};
  width:60px;
  height:50px;
  margin-left:15px;
  border-radius:10px;
  cursor:pointer;
  background:${({ theme }) => theme.tipBg};
`
const AmountView = styled.div`
  width:100%;
  padding:10px 25px;
  font-size:14px;
  color:${({ theme }) => theme.textColor};
  margin-bottom:20px;
`

const StakingLi = styled.li`
  width: 320px;
  ${({ theme }) => theme.FlexSC};
  // flex-wrap:wrap;
  background: ${({ theme }) => theme.contentBg};
  box-shadow: 0.4375rem 0.125rem 1.625rem 0 rgba(0, 0, 0, 0.06);
  margin: 20px 15px 0;
  padding: 25px 15px 25px;
  border-radius: 10px;
  .title {
    width:100%;
    margin:0;
    font-size:14px;
    color: ${({ theme }) => theme.textColorBold};
  }
  .num {
    width:100%;
    margin:10px 0 0;
    font-size:16px;
    color: ${({ theme }) => theme.textColorBold};
    p {
      margin: 0;
    }
  }
  .content {
    width:100%;
    margin-left:15px;
  }
`

const BackBox = styled.div`
  cursor:pointer;
  display:inline-block;
`

const QuestionWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  margin-left: 0.4rem;
  padding: 0.2rem;
  border: none;
  background: none;
  outline: none;
  cursor: default;
  border-radius: 36px;

  :hover,
  :focus {
    opacity: 0.7;
  }
`
const HelpCircleStyled = styled.img`
  height: 18px;
  width: 18px;
`

const ActivityInfoBox = styled.div`
  width: 100%;
  // max-height: 500px;
  overflow:auto;
  padding: 0 20px 20px;
  .header {
    font-size: 18px;
    font-weight: bold;
    text-align:center;
    color:${({ theme }) => theme.textColorBold};
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    color:${({ theme }) => theme.textColorBold};
    margin-bottom:0;
  }
  .box {
    width:100%;
    margin-top:0;
    .item {
      width: 100%;
      margin:0;
      padding-left: 10px;
      font-size: 14px;
      color:${({ theme }) => theme.textColorBold};
      white-space:normal;
      word-break: break-all;
    }
  }
`

function formatCellData(str, len, start) {
  start = start ? start : 0
  let str1 = str.substr(start, len)
  str1 = str1.indexOf('0x') === 0 ? str1 : '0x' + str1
  return ethers.utils.bigNumberify(str1)
}

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

const Web3Fn = require('web3')


function getInitialFarmState () {
  return {
    lpArr: [],
    lpObj: ''
  }
}

function farmStateReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_LP': {
      const { 
        index,
        lpToken = '',
        allocPoint = '',
        lastRewardBlock = '',
        accRewardPerShare = '',
        pendingReward = '',
        totalSupply = '',
        tokenObj,
        exchangeETHBalance,
        poolBalance,
        exchangeTokenBalancem,
        lpBalance
      } = action
      const { lpArr } = state
      let obj = {}
      if (lpArr[index]) {
        obj = {
          index: index ? index : (lpArr[index].index ? lpArr[index].index : ''),
          lpToken: lpToken ? lpToken : (lpArr[index].lpToken ? lpArr[index].lpToken : ''),
          allocPoint: allocPoint ? allocPoint : (lpArr[index].allocPoint ? lpArr[index].allocPoint : ''),
          lastRewardBlock: lastRewardBlock ? lastRewardBlock : (lpArr[index].lastRewardBlock ? lpArr[index].lastRewardBlock : ''),
          accRewardPerShare: accRewardPerShare ? accRewardPerShare : (lpArr[index].accRewardPerShare ? lpArr[index].accRewardPerShare : ''),
          pendingReward: pendingReward ? pendingReward : (lpArr[index].pendingReward ? lpArr[index].pendingReward : ''),
          totalSupply: totalSupply ? totalSupply : (lpArr[index].totalSupply ? lpArr[index].totalSupply : ''),
          tokenObj: tokenObj ? tokenObj : (lpArr[index].tokenObj ? lpArr[index].tokenObj : ''),
          exchangeETHBalance: exchangeETHBalance ? exchangeETHBalance : (lpArr[index].exchangeETHBalance ? lpArr[index].exchangeETHBalance : ''),
          poolBalance: poolBalance ? poolBalance : (lpArr[index].poolBalance ? lpArr[index].poolBalance : ''),
          exchangeTokenBalancem: exchangeTokenBalancem ? exchangeTokenBalancem : (lpArr[index].exchangeTokenBalancem ? lpArr[index].exchangeTokenBalancem : ''),
          lpBalance: lpBalance ? lpBalance : (lpArr[index].lpBalance ? lpArr[index].lpBalance : ''),
        }
      } else {
        obj = {
          index: index ? index : '',
          lpToken: lpToken ? lpToken : '',
          allocPoint: allocPoint ? allocPoint : '',
          lastRewardBlock: lastRewardBlock ? lastRewardBlock : '',
          accRewardPerShare: accRewardPerShare ? accRewardPerShare : '',
          pendingReward: pendingReward ? pendingReward : '',
          totalSupply: totalSupply ? totalSupply : '',
          tokenObj: tokenObj ? tokenObj : '',
          exchangeETHBalance: exchangeETHBalance ? exchangeETHBalance : '',
          poolBalance: poolBalance ? poolBalance : '',
          exchangeTokenBalancem: exchangeTokenBalancem ? exchangeTokenBalancem : '',
          lpBalance: lpBalance ? lpBalance : '',
        }
      }
      lpArr[index] = obj
      let lpObj = {}
      for (let exObj of lpArr) {
        lpObj[exObj.lpToken] = exObj
      }
      return {
        ...state,
        lpArr: lpArr,
        lpObj: lpObj
      }
    }
    default: { //UPDATE_MINTINFOTYPE
      return getInitialFarmState()
    }
  }
}

const BSCFARMURL = config.farmUrl + 'bscfarming'

const BASEMARKET = 100
let CHAINID = '46688'
let useChain = chainInfo[CHAINID]
let FARMTOKEN = '0x38999f5c5be5170940d72b398569344409cd4c6e'
let useToken = INITIAL_TOKENS_CONTEXT[CHAINID]
let exchangeObj = {}

if (config.env === 'main') {
  CHAINID = '56'
  // FARMTOKEN = '0xfbec3ec06c01fd2e742a5989c771257159d9a5f7'
  FARMTOKEN = '0x6a411104ca412c8265bd8e95d91fed72006934fd'
  useChain = chainInfo[CHAINID]
  useToken = INITIAL_TOKENS_CONTEXT[CHAINID]
}
for (let token in useToken) {
  exchangeObj[useToken[token].exchangeAddress] = {
    ...useToken[token],
    token
  }
}
console.log(useChain)

const BSCAGREESTAKING = 'BSCAGREESTAKING'
let onlyOne = 0

function BSCFarming ({ initialTrade }) {
  // console.log(initialTrade)
  // console.log(params)
  // let initLpToken = params && params.lpToken ? params.lpToken : localStorage.getItem(LPTOKEN)
  // let initLpToken = params && params.lpToken ? params.lpToken.toLowerCase() : ''
  let initLpToken = getQueryParam(window.location, 'lpToken')
  // console.log(initLpToken)
  let { account, library, chainId } = useWeb3React()
  // account = '0x12139f3afa1C93303e1EfE3Df142039CC05C6c58'
  const { t } = useTranslation()
  const [isDark] = useDarkModeManager()
  const addTransaction = useTransactionAdder()
  const toggleWalletModal = useWalletModalToggle()
  const walletType = sessionStorage.getItem('walletType')

  const history = createBrowserHistory()
  // history.push(window.location.pathname + '')

  const [farmState, dispatchFarmState] = useReducer( farmStateReducer, {}, getInitialFarmState )
  const {
    lpArr,
    lpObj
  } = farmState

  let web3Fn = new Web3Fn(new Web3Fn.providers.HttpProvider(useChain.rpc))


  const [BlockReward, setBlockReward] = useState()
  
  const [isHardwareTip, setIsHardwareTip] = useState(false)
  const [hardwareTxnsInfo, setHardwareTxnsInfo] = useState('')
  const [stakingType, setStakingType] = useState()
  const [stakingModal, setStakingModal] = useState(false)
  const [stakeAmount, setStakeAmount] = useState()
  const [stakeDisabled, setStakeDisabled] = useState(true)

  const [exchangeAddress, setExchangeAddress] = useState(initLpToken)
  // console.log(exchangeAddress)

  const [unlocking, setUnlocking] = useState(false)
  const [approveAmount, setApproveAmount] = useState()
  const [balance, setBalance] = useState()
  const [userInfo, setUserInfo] = useState()

  const [HarvestDisabled, setHarvestDisabled] = useState(true)
  const [WithdrawDisabled, setWithdrawDisabled] = useState(true)
  const [DepositDisabled, setDepositDisabled] = useState(true)

  const [TotalPoint, setTotalPoint] = useState()

  const [BtnDelayDisabled, setBtnDelayDisabled] = useState(0)

  const [BasePeice, setBasePeice] = useState()

  const [InterverTime, setInterverTime] = useState(0)
  const [CYCMarket, setCYCMarket] = useState()

  const [showPopup, setPopup] = useState(!localStorage.getItem(BSCAGREESTAKING))

  // const [rewardToken, setRewardToken] = useState()
  // const [perShareAmount, setPerShareAmount] = useState()

  const web3Contract = new web3Fn.eth.Contract(MasterChef, FARMTOKEN)
  const web3ErcContract = new web3Fn.eth.Contract(ERC20_ABI)
  // const web3FoodContract = new web3Fn.eth.Contract(FoodToken)

  const MMContract = useSwapTokenContract(FARMTOKEN, MasterChef)

  const MMErcContract = useSwapTokenContract(
    exchangeAddress,
    ERC20_ABI
  )

  const exchangeContract = new web3Fn.eth.Contract(EXCHANGE_ABI)

  useEffect(() => {
    getPrice(useChain.symbol).then(res => {
      // console.log(res)
      setBasePeice(res)
    })
    // web3ErcContract.options.address = '0x4028433877f9c14764eb93d0bb6570573da2726f'
    // web3ErcContract.methods.allowance(account, '0x0df8810714dde679107c01503e200ce300d0dcf6').call((err, rt) => {
    //   console.log(rt)
    // })
    // web3Contract.methods.rewardToken().call((err, rt) => {
    //   // console.log(err)
    //   // console.log(rt)
    //   if (!err) {
    //     setRewardToken(rt)
    //     web3FoodContract.options.address = rt
    //     // web3FoodContract.options.address = rewardToken
    //     web3FoodContract.methods.perShareAmount().call((error, res) => {
    //       // console.log(err)
    //       // console.log(res)
    //       if (!error) {
    //         setPerShareAmount(res)
    //       }
    //     })  
    //   }
    // })  
  }, [])

  useEffect(() => {
    let pr = lpObj && lpObj[exchangeAddress] && lpObj[exchangeAddress].pendingReward ? lpObj[exchangeAddress].pendingReward : ''
    if (approveAmount && Number(approveAmount) && account && Number(CHAINID) === Number(chainId) && exchangeAddress) {
      if (pr && Number(pr) > 0 && BtnDelayDisabled !== 2) {
        setHarvestDisabled(false)
      } else {
        setHarvestDisabled(true)
      }

      if (balance && Number(balance) > 0 && BtnDelayDisabled !== 1) {
        setDepositDisabled(false)
      } else {
        setDepositDisabled(true)
      }
      
      if (userInfo && Number(userInfo) > 0 && BtnDelayDisabled !== 2) {
        setWithdrawDisabled(false)
      } else {
        setWithdrawDisabled(true)
      }
    } else {
      setHarvestDisabled(true)
      setDepositDisabled(true)
      setWithdrawDisabled(true)
    }
  }, [approveAmount, balance, userInfo, account, BtnDelayDisabled, lpObj, exchangeAddress])

  useEffect(() => {
    let status = true
    if (stakeAmount && !isNaN(stakeAmount) && Number(stakeAmount) > 0 && !BtnDelayDisabled) {
      let amount = ethers.utils.parseUnits(stakeAmount.toString(), 18)
      if (stakingType === 'deposit') {
        if (!balance || balance.lt(amount) || balance.lte(ethers.constants.Zero)) {
          status = true
        } else {
          status = false
        }
      } else {
        if (!userInfo || userInfo.lt(amount) || userInfo.lte(ethers.constants.Zero)) {
          status = true
        } else {
          status = false
        }
      }
    } else {
      if (Number(stakeAmount) !== 0) {
        setStakeAmount('')
      }
    }
    
    setStakeDisabled(status)
  }, [stakingType, balance, stakeAmount, BtnDelayDisabled, lpObj, exchangeAddress])


  
  function getAllTotalSupply () {
    const batch = new web3Fn.BatchRequest()
    for (let i = 0,len = lpArr.length; i < len; i++) {
      let obj = lpArr[i]
      // console.log(obj)
      exchangeContract.options.address = obj.lpToken
      const tsData = exchangeContract.methods.totalSupply().encodeABI()
      batch.add(web3Fn.eth.call.request({data: tsData, to: obj.lpToken}, 'latest', (err, ts) => {
        if (!err) {
          
          dispatchFarmState({
            type: 'UPDATE_LP',
            index: i,
            totalSupply: formatCellData(ts, 66)
          })
        } else {
          dispatchFarmState({
            type: 'UPDATE_LP',
            index: i,
            totalSupply: ''
          })
        }
        if (i === (len - 1)) {
          for (let obj of lpArr) {
            if (
              obj
              && obj.tokenObj
              && obj.tokenObj.symbol === 'CYC'
              && obj.exchangeETHBalance
              && obj.exchangeETHBalance.gt(ethers.constants.Zero)
              && obj.exchangeTokenBalancem
              && obj.exchangeTokenBalancem.gt(ethers.constants.Zero)
            ) {
              // console.log(obj.exchangeETHBalance.toString())
              // console.log(obj.exchangeTokenBalancem.toString())
              let market = getMarketRate(obj.exchangeETHBalance, obj.exchangeTokenBalancem, obj.tokenObj.decimals)
              setCYCMarket(market)
              break
            }
          }
          setInterverTime(Date.now())
        }
      }))

      batch.add(web3.eth.getBalance.request(obj.lpToken, 'latest', (err, res) => {
        if (!err) {
          let bl = res.isNaN() ?  formatCellData(res) : ethers.utils.parseUnits(res.div(Math.pow(10, 18)).toString(), 18)
          dispatchFarmState({
            type: 'UPDATE_LP',
            index: i,
            exchangeETHBalance: bl
          })
        } else {
          dispatchFarmState({
            type: 'UPDATE_LP',
            index: i,
            exchangeETHBalance: ''
          })
        }
      }))

      if (obj.tokenObj && obj.tokenObj.token) {
        web3ErcContract.options.address = obj.tokenObj.token
        let etbData = web3ErcContract.methods.balanceOf(obj.lpToken).encodeABI()
        // console.log(etbData)
        batch.add(web3.eth.call.request({data: etbData, to: obj.tokenObj.token, from: obj.lpToken}, 'latest', (err, res) => {
          if (!err) {
            dispatchFarmState({
              type: 'UPDATE_LP',
              index: i,
              exchangeTokenBalancem: formatCellData(res, 66)
            })
          } else {
            dispatchFarmState({
              type: 'UPDATE_LP',
              index: i,
              exchangeTokenBalancem: ''
            })
          }
        }))
      }
      
      web3ErcContract.options.address = obj.lpToken
      const blData = web3ErcContract.methods.balanceOf(FARMTOKEN).encodeABI()
      batch.add(web3Fn.eth.call.request({data: blData, to: obj.lpToken}, 'latest', (err, res) => {
        if (!err) {
          // console.log(obj.lpToken)
          // console.log(formatCellData(res, 66).toString())
          dispatchFarmState({
            type: 'UPDATE_LP',
            index: i,
            lpBalance: formatCellData(res, 66)
          })
        } else {
          dispatchFarmState({
            type: 'UPDATE_LP',
            index: i,
            lpBalance: ''
          })
        }
      }))
      if (account) {
        web3ErcContract.options.address = obj.lpToken
        const pblData = web3ErcContract.methods.balanceOf(account).encodeABI()
        batch.add(web3Fn.eth.call.request({data: pblData, to: obj.lpToken}, 'latest', (err, bl) => {
          if (!err) {
            // console.log(formatCellData(bl, 66).toString())
            dispatchFarmState({
              type: 'UPDATE_LP',
              index: i,
              poolBalance: formatCellData(bl, 66)
            })
          } else {
            // console.log(err)
            dispatchFarmState({
              type: 'UPDATE_LP',
              index: i,
              poolBalance: ''
            })
          }
        }))
      }
    }
    batch.execute()
  }

  function getTokenList(num) {
    const batch = new web3Fn.BatchRequest()
    let arr = []
    let totalPoint = 0
    for (let i = 0; i < num; i++) {
      arr.push({
        lpToken: '',
        allocPoint: '',
        lastRewardBlock: '',
        accRewardPerShare: '',
      })
      const plData = web3Contract.methods.poolInfo(i).encodeABI()
      batch.add(web3Fn.eth.call.request({data: plData, to: FARMTOKEN}, 'latest', (err, pl) => {
        if (!err) {
          let exAddr = pl.substr(0, 66).replace('0x000000000000000000000000', '0x')
          let curPoint = ethers.utils.bigNumberify('0x' + pl.substr(66, 64)).toString()
          let trade = exchangeObj[exAddr] && exchangeObj[exAddr].symbol ? (exchangeObj[exAddr].symbol + '-' + useChain.symbol) : ''
          if (initialTrade && initialTrade === trade && !onlyOne) {
            onlyOne++
            setExchangeAddress(exAddr)
          }
          dispatchFarmState({
            type: 'UPDATE_LP',
            index: i,
            lpToken: exAddr,
            allocPoint: curPoint,
            lastRewardBlock: ethers.utils.bigNumberify('0x' + pl.substr(130, 64)).toString(),
            accRewardPerShare: ethers.utils.bigNumberify('0x' + pl.substr(194, 64)).toString(),
            tokenObj: exchangeObj[exAddr],
          })
          totalPoint += Number(curPoint)
        } else {
          dispatchFarmState({
            type: 'UPDATE_LP',
            index: i,
            lpToken: '',
            allocPoint: '',
            lastRewardBlock: '',
            accRewardPerShare: '',
          })
        }
        if (i === (num - 1)) {
          getAllTotalSupply(arr)
          setTotalPoint(totalPoint)
        }
      }))
      if (account && Number(CHAINID) === Number(chainId)) {
        const prData = web3Contract.methods.pendingReward(i, account).encodeABI()
        batch.add(web3Fn.eth.call.request({data: prData, to: FARMTOKEN}, 'latest', (err, reward) => {
          if (!err) {
            // console.log(formatCellData(reward, 66).toString())
            dispatchFarmState({
              type: 'UPDATE_LP',
              index: i,
              pendingReward: formatCellData(reward, 66)
            })
          } else {
            dispatchFarmState({
              type: 'UPDATE_LP',
              index: i,
              pendingReward: ''
            })
          }
        }))
      }
    }
    // console.log(arr)
    batch.execute()
    // web3Contract.methods.poolInfo(0).call((err,res) => {
    //   console.log(res)
    // })
  }

  function getBaseInfo () {
    const batch = new web3Fn.BatchRequest()

    const plData = web3Contract.methods.poolLength().encodeABI()

    batch.add(web3Fn.eth.call.request({data: plData, to: FARMTOKEN}, 'latest', (err, pl) => {
      if (!err) {
        getTokenList(pl)
      }
    }))
    const rpbData = web3Contract.methods.rewardPerBlock().encodeABI()
    batch.add(web3Fn.eth.call.request({data: rpbData, to: FARMTOKEN}, 'latest', (err, res) => {
      if (!err && res) {
        // console.log(res)
        setBlockReward(ethers.utils.bigNumberify(res))
      }
    }))

    batch.execute()
  }

  function getStakingInfo () {
    // const curToken = lpObj && lpObj[exchangeAddress] && lpObj[exchangeAddress].tokenObj && lpObj[exchangeAddress].tokenObj.token ? lpObj[exchangeAddress].tokenObj.token : ''
    const curLpToken = exchangeAddress
    if (account && curLpToken && lpObj && lpObj[curLpToken]) {
      // console.log(123)
      const batch = new web3Fn.BatchRequest()
      // console.log(exchangeAddress)
      web3ErcContract.options.address = curLpToken
      const blData = web3ErcContract.methods.balanceOf(account).encodeABI()
      batch.add(web3Fn.eth.call.request({data: blData, to: curLpToken}, 'latest', (err, balance) => {
        if (!err) {
          // console.log('balance')
          // console.log(formatCellData(balance, 66).toString())
          setBalance(formatCellData(balance, 66))
        }
      }))

      web3ErcContract.options.address = FARMTOKEN
      const alData = web3ErcContract.methods.allowance(account, FARMTOKEN).encodeABI()
      batch.add(web3Fn.eth.call.request({data: alData, to: curLpToken}, 'latest', (err, allowance) => {
        if (!err) {
          // console.log('allowance')
          // console.log(formatCellData(allowance, 66).toString())
          setApproveAmount(formatCellData(allowance, 66))
          if (Number(formatCellData(allowance, 66).toString()) > 0) {
            setUnlocking(false)
          }
        }
      }))

      const uiData = web3Contract.methods.userInfo(lpObj[curLpToken].index, account).encodeABI()
      batch.add(web3Fn.eth.call.request({data: uiData, to: FARMTOKEN}, 'latest', (err, userInfo) => {
        if (!err) {
          // console.log('userInfo')
          // console.log(userInfo)
          // console.log(formatCellData(userInfo, 66).toString())
          setUserInfo(formatCellData(userInfo, 66))
        }
      }))
      batch.execute()
    }
  }

  useEffect(() => {
    getStakingInfo()
  }, [exchangeAddress, account, InterverTime])

  const intervalFn = useCallback(() => {
    getBaseInfo()
  }, [account])

  useEffect(() => {
    intervalFn()
    library.on('block', intervalFn)

    return () => {
      library.removeListener('block', intervalFn)
    }
  }, [library])

  function backInit () {
    setStakingModal(false)
    setIsHardwareTip(false)
    setStakeAmount('')
    setStakingType('')
  }

  function deposit () {
    if (isNaN(stakeAmount)) {
      setStakeAmount('')
      alert('Param is error!')
      return
    } else if (Number(stakeAmount) <= 0) {
      setStakeAmount('')
      alert('Amount must be greater than 0!')
      return
    }
    setBtnDelayDisabled(1)
    setTimeout(() => {
      setBtnDelayDisabled(0)
    }, 3000)
    let amount = ethers.utils.parseUnits(stakeAmount.toString(), 18)
    amount = amount.toString()
    console.log(amount.toString())
    if (config.supportWallet.includes(walletType)) {
      setIsHardwareTip(true)
      let txnCoin = ((lpObj && lpObj[exchangeAddress] && lpObj[exchangeAddress].tokenObj && lpObj[exchangeAddress].tokenObj.symbol ? lpObj[exchangeAddress].tokenObj.symbol : '') + '-' + useChain.symbol) + ' LP Token'
      setHardwareTxnsInfo('Deposit ' + stakeAmount + ' ' + txnCoin)
      const data = web3Contract.methods.deposit(lpObj[exchangeAddress].index, amount).encodeABI()
      getWeb3BaseInfo(FARMTOKEN, data, account).then(res => {
        if (res.msg === 'Success') {
          console.log(res.info)
          addTransaction(res.info)
        } else {
          alert(res.error)
        }
        backInit()
      })
      return
    }
    MMContract.deposit(lpObj[exchangeAddress].index, amount).then(res => {
      console.log(res)
      addTransaction(res)
      backInit()
    }).catch(err => {
      console.log(err)
      backInit()
    })
  }

  function withdraw (amount) {
    if (isNaN(stakeAmount) && !amount) {
      setStakeAmount('')
      alert('Param is error!')
      return
    } else if (Number(stakeAmount) <= 0 && amount) {
      setStakeAmount('')
      alert('Amount must be greater than 0!')
      return
    }
    setBtnDelayDisabled(2)
    setTimeout(() => {
      setBtnDelayDisabled(0)
    }, 3000)
    amount = amount || amount === 0 ? amount : ethers.utils.parseUnits(stakeAmount.toString(), 18)
    console.log(amount.toString())
    if (config.supportWallet.includes(walletType)) {
      setIsHardwareTip(true)
      let txnCoin = ((lpObj && lpObj[exchangeAddress] && lpObj[exchangeAddress].tokenObj && lpObj[exchangeAddress].tokenObj.symbol ? lpObj[exchangeAddress].tokenObj.symbol : '') + '-' + useChain.symbol) + ' LP Token'
      setHardwareTxnsInfo('Withdraw ' + stakeAmount + ' ' + txnCoin)
      const data = web3Contract.methods.withdraw(lpObj[exchangeAddress].index, amount).encodeABI()
      getWeb3BaseInfo(FARMTOKEN, data, account).then(res => {
        if (res.msg === 'Success') {
          console.log(res.info)
          addTransaction(res.info)
        } else {
          alert(res.error)
        }
        backInit()
      })
      return
    }
    MMContract.withdraw(lpObj[exchangeAddress].index, amount).then(res => {
      console.log(res)
      addTransaction(res)
      backInit()
    }).catch(err => {
      console.log(err)
      backInit()
    })
  }

  function approve () {
    let _userTokenBalance = ethers.constants.MaxUint256.toString()
    // const curLpToken = lpObj[exchangeAddress].tokenObj.token
    const curLpToken = exchangeAddress
    if (config.supportWallet.includes(walletType)) {
      setIsHardwareTip(true)
      let txnCoin = ((lpObj && lpObj[exchangeAddress] && lpObj[exchangeAddress].tokenObj && lpObj[exchangeAddress].tokenObj.symbol ? lpObj[exchangeAddress].tokenObj.symbol : '') + '-' + useChain.symbol) + ' LP Token'
      setHardwareTxnsInfo('Approve ' + txnCoin)
      web3ErcContract.options.address = curLpToken
      const data = web3ErcContract.methods.approve(FARMTOKEN, _userTokenBalance).encodeABI()
      getWeb3BaseInfo(curLpToken, data, account).then(res => {
        if (res.msg === 'Success') {
          console.log(res.info)
          addTransaction(res.info)
          setUnlocking(true)
        } else {
          alert(res.error)
        }
        backInit()
      })
      return
    }
    
    MMErcContract.approve(FARMTOKEN, _userTokenBalance).then(res => {
      console.log(res)
      addTransaction(res)
      setUnlocking(true)
      backInit()
    }).catch(err => {
      console.log(err)
      backInit()
    })
  }

  function onMax () {
    let amount = ''
    if (stakingType === 'deposit') {
      let bl = ethers.utils.bigNumberify(balance)
      amount = amountFormatter(bl, 18, 18)
    } else {
      let bl = ethers.utils.bigNumberify(userInfo)
      amount = amountFormatter(bl, 18, 18)
    }
    setStakeAmount(amount)
  }

  function getAPY (allocPoint, lpBalance, exchangeETHBalance, totalSupply) {
    // , item.exchangeETHBalance, item.exchangeTokenBalancem, item && item.tokenObj && item.tokenObj.decimals ? item.tokenObj.decimals : 18
    if (
      BlockReward
      && lpBalance
      && BlockReward.gt(ethers.constants.Zero)
      && lpBalance.gt(ethers.constants.Zero)
      && TotalPoint
      && exchangeETHBalance
      && exchangeETHBalance.gt(ethers.constants.Zero)
      && CYCMarket
      && CYCMarket.gt(ethers.constants.Zero)
    ) {
      try {
        let baseAmount = lpBalance.mul(exchangeETHBalance).mul(ethers.utils.bigNumberify(2)).div(totalSupply)
        let baseYear =  BlockReward.mul(28800 * 365 * 10000).mul(ethers.utils.bigNumberify(allocPoint)).div(ethers.utils.bigNumberify(TotalPoint)).div(CYCMarket).mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
        let apy = baseYear.div(baseAmount)
        apy = Number(apy.toString()) / 100
        return apy.toFixed(2)
      } catch (error) {
        console.log(error)
        return '0.00'
      }
    }
    return '0.00'
  }

  

  function farmsList () {
    return (
      <>
        <FarmListBox>
          {
            lpArr.map((item, index) => {
              return (
                <FarmList key={index}>
                  <FarmListCont>
                    <MulLabel>{item && item.allocPoint ? (Number(item.allocPoint) / BASEMARKET).toFixed(0) : '1'} X</MulLabel>
                    <DoubleLogo>
                      <div className="logo left">
                        <TokenLogo1 address={item && item.tokenObj && item.tokenObj.symbol ? item.tokenObj.symbol : ''} size='100%'/>
                        </div>
                      <div className="logo right"><TokenLogo1 address={useChain.symbol} size='100%'/></div>
                      
                    </DoubleLogo>
                    <FarmInfo>
                      <div className="item">
                        <span className="left">Deposit</span>
                        <span className="right">{item && item.tokenObj && item.tokenObj.symbol ? item.tokenObj.symbol : ''} - {useChain.symbol} LP</span>
                      </div>
                      <div className="item">
                        <span className="left">APY</span>
                        <span className="right">{getAPY(item.allocPoint, item.lpBalance, item.exchangeETHBalance, item.totalSupply)} %</span>
                      </div>
                      <div className="item">
                        <span className="left">Total Liquidity</span>
                        <span className="right">$ {BasePeice ? formatNum(Number(amountFormatter(item.exchangeETHBalance)) * 2 * BasePeice) : '0.00'}</span>
                      </div>
                    </FarmInfo>
                    <Flex>
                      {
                        account ? (
                          <Button1 style={{height: '45px', maxWidth: '200px'}} onClick={() => {
                            // console.log(item)
                            // localStorage.setItem(LPTOKEN, item.lpToken)
                            let coin = item && item.tokenObj && item.tokenObj.symbol ? item.tokenObj.symbol : ''
                            history.push(BSCFARMURL + '/' + coin + '-' + useChain.symbol)
                            setExchangeAddress(item.lpToken.toLowerCase())
                          }}>{t('select')}</Button1>
                        ) : (
                          <Button1 onClick={toggleWalletModal}  style={{height: '45px',maxWidth: '200px'}}>
                            {t('connectToWallet')}
                          </Button1>
                        )
                      }
                    </Flex>
                  </FarmListCont>
                </FarmList>
              )
            })
          }
        </FarmListBox>
      </>
    )
  }

  function getPoolBaseBalance (exchangeETHBalance, totalSupply, lpBalance, exchangeTokenBalancem) {
    if (
      lpBalance
      && lpBalance.gt(ethers.constants.Zero)
      && exchangeETHBalance
      && exchangeETHBalance.gt(ethers.constants.Zero)
      && totalSupply
      && totalSupply.gt(ethers.constants.Zero)
      && exchangeTokenBalancem
      && exchangeTokenBalancem.gt(ethers.constants.Zero)
    ) {
      let baseAmount = lpBalance.mul(exchangeETHBalance).div(totalSupply)
      let tokenAmount = lpBalance.mul(exchangeTokenBalancem).div(totalSupply)
      if (userInfo && userInfo.gt(ethers.constants.Zero)) {
        let userBaseBalance = userInfo.mul(baseAmount).div(lpBalance)
        let userTokenBalance = userInfo.mul(tokenAmount).div(lpBalance)
        // console.log(userBaseBalance.toString())
        // console.log(userTokenBalance.toString())
        return {
          ba: baseAmount,
          ta: tokenAmount,
          ubb: userBaseBalance,
          utb: userTokenBalance,
        }
      } else {
        return {
          ba: baseAmount,
          ta: tokenAmount,
          ubb: '',
          utb: '',
        }
      }
    }
    return {
      ba: '',
      ta: '',
      ubb: '',
      utb: '',
    }
    // userInfo
  }

  function stakingView () {
    let btnView = ''
    if (Number(CHAINID) !== Number(chainId)) {
      btnView = <Button1 onClick={() => {
        localStorage.setItem(config.ENV_NODE_CONFIG, useChain.label)
        history.go(0)
      }}  style={{height: '45px', maxWidth: '200px'}}>
        {t('SwitchTo')} BSC {t('mainnet')}
      </Button1>
    } else if (!account) {
      btnView = <Button1 onClick={toggleWalletModal}  style={{height: '45px',maxWidth: '200px'}}>
        {t('connectToWallet')}
      </Button1>
    } else if (approveAmount && Number(approveAmount)) {
      btnView = <>
        <Button1 style={{height: '45px', maxWidth: '200px'}} disabled={WithdrawDisabled} onClick={() => {
          setStakingType('Unstake')
          setStakingModal(true)
        }}>{t('Unstake')}</Button1>
        <AddBox disabled={DepositDisabled} onClick={() => {
          setStakingType('deposit')
          setStakingModal(true)
        }}>
          {
            isDark ? (
              <img src={require('../../assets/images/icon/add-fff.svg')} alt='' />
            ) : (
              <img src={require('../../assets/images/icon/add.svg')} alt='' />
            )
          }
        </AddBox>
      </>
    } else {
      btnView = <Button1 style={{height: '45px', maxWidth: '200px'}} disabled={unlocking} onClick={() => {
        approve()
      }}>{unlocking ? t('pending') : t('unlock')}</Button1>
    }
    let curLpObj = lpObj && lpObj[exchangeAddress] ? lpObj[exchangeAddress] : {}
    // let prd = perShareAmount && curLpObj.pendingReward && Number(curLpObj.pendingReward.toString()) > 0 ? Number(perShareAmount) * Number(curLpObj.pendingReward) : ''
    let prd = curLpObj.pendingReward && Number(curLpObj.pendingReward.toString()) > 0 ? curLpObj.pendingReward : ''
    // console.log(prd)
    prd = prd ? ethers.utils.bigNumberify(prd.toString()) : ''
    prd = prd ? formatNum(amountFormatter(prd, 18, config.keepDec)) : '0.00'

    let pbaObj = curLpObj && curLpObj.exchangeETHBalance && curLpObj.totalSupply && curLpObj.lpBalance && curLpObj.exchangeTokenBalancem ? getPoolBaseBalance(curLpObj.exchangeETHBalance, curLpObj.totalSupply, curLpObj.lpBalance, curLpObj.exchangeTokenBalancem) : ''

    let dec = curLpObj && curLpObj.tokenObj && curLpObj.tokenObj.decimals ? curLpObj.tokenObj.decimals : 18

    return (
      <>
        <BackBox onClick={() => {
          history.push(BSCFARMURL)
          // localStorage.setItem(LPTOKEN, '')
          setExchangeAddress('')
        }}>
          &lt;Back
        </BackBox>
        <StakingBox>
          <StakingList>
            <StakingLi>
              <TokenLogo1 address={useChain.symbol} size='48px'></TokenLogo1>
              <div className='content'>
                <h2 className='title'>{t('TotalStaking')}</h2>
                <h3 className='num'>
                  <p>{pbaObj.ta ? formatNum(amountFormatter(pbaObj.ta, dec), config.keepDec) : '0.00'} {(curLpObj && curLpObj.tokenObj && curLpObj.tokenObj.symbol ? curLpObj.tokenObj.symbol : '')}</p>
                  <p>{pbaObj.ba ? formatNum(amountFormatter(pbaObj.ba), config.keepDec) : '0.00'} {useChain.symbol}</p>
                </h3>
              </div>
            </StakingLi>
            <StakingLi>
              {/* <h2 className='title'>Total ANY Supply</h2> */}
              <div className='content'>
                <h2 className='title'>{t('MyStaking')}</h2>
                <h3 className='num'>
                  <p>{pbaObj.utb ? formatNum(amountFormatter(pbaObj.utb, dec), config.keepDec) : '0.00'} {(curLpObj && curLpObj.tokenObj && curLpObj.tokenObj.symbol ? curLpObj.tokenObj.symbol : '')}</p>
                  <p>{pbaObj.ubb ? formatNum(amountFormatter(pbaObj.ubb), config.keepDec) : '0.00'} {useChain.symbol}</p>
                  {/* {pbaObj.ubb ? 
                (thousandBit(amountFormatter(pbaObj.utb), 2) + '-' + thousandBit(amountFormatter(pbaObj.ubb), 2))
                 : '0.00'} */}
                 </h3>
              </div>
            </StakingLi>
          </StakingList>
        </StakingBox>
        <StakingBox>
          <StakingList>
            <li className='item'>
              <div className='pic'><img src={require('../../assets/images/coin/source/CYC.svg')} /></div>
              <div className='info'>
                <h3>{prd}</h3>
                <p>
                  CYC {t('Earned')}
                  <span className='green' style={{marginLeft:'2px'}}>({getAPY(curLpObj.allocPoint, curLpObj.lpBalance, curLpObj.exchangeETHBalance, curLpObj.totalSupply)}%)</span>
                </p>
              </div>
              <div className='btn'><Button1 style={{height: '45px', maxWidth: '200px'}} disabled={HarvestDisabled} onClick={() => {
                withdraw(0)
              }}>{t('Harvest')}</Button1></div>
            </li>
            <li className='item'>
              {/* <div className='pic'>
                <TokenLogo1 address={curLpObj && curLpObj.tokenObj && curLpObj.tokenObj.symbol ? curLpObj.tokenObj.symbol : ''} size='100%'/>
              </div> */}
              <DoubleLogo>
                <div className="logo left">
                  <TokenLogo1 address={curLpObj && curLpObj.tokenObj && curLpObj.tokenObj.symbol ? curLpObj.tokenObj.symbol : ''} size='100%'/>
                  </div>
                <div className="logo right"><TokenLogo1 address={useChain.symbol} size='100%'/></div>
                
              </DoubleLogo>
              <div className='info'>
                <h3>{userInfo && Number(userInfo.toString()) > 0 ? formatNum(amountFormatter(userInfo, 18, config.keepDec)) : '0.00'}</h3>
                <p>{curLpObj.tokenObj && curLpObj.tokenObj.symbol ? curLpObj.tokenObj.symbol : ''} - {useChain.symbol} LP {t('Staked')}</p>
              </div>
              <div className='btn'>
                {btnView}
              </div>
            </li>
          </StakingList>
        </StakingBox>
      </>
    )
  }

  let amountView = ''
  if (stakingType === 'deposit') {
    amountView = balance ? amountFormatter(ethers.utils.bigNumberify(balance), 18, config.keepDec) : '0.00'
  } else {
    amountView = userInfo ? amountFormatter(ethers.utils.bigNumberify(userInfo), 18, config.keepDec) : '0.00'
  }

  return (
    <>
      <HardwareTip
        HardwareTipOpen={isHardwareTip}
        closeHardwareTip={() => {
          setIsHardwareTip(false)
        }}
        txnsInfo={hardwareTxnsInfo}
        title={t(stakingType ? stakingType : 'deposit')}
      >
      </HardwareTip>
      <Modal
        style={{ userSelect: 'none' }}
        isOpen={stakingModal}
        onDismiss={() => {
          setStakingModal(!stakingModal)
        }}
        minHeight={null}
        maxHeight={90}
      >
        <ModalContent
          title={t(stakingType ? stakingType : 'deposit')}
          onClose={setStakingModal}
        >
          <StakingModalBox>
            <InputRow>
              <Input type="text"  placeholder="" value={stakeAmount || ''} onChange={e => {
                setStakeAmount(e.target.value)
              }}/>
              <MaxBox onClick={() => {onMax()}}>Max</MaxBox>
            </InputRow>
            <AmountView>
              {amountView} {lpObj && lpObj[exchangeAddress] && lpObj[exchangeAddress].tokenObj && lpObj[exchangeAddress].tokenObj.symbol ? lpObj[exchangeAddress].tokenObj.symbol : ''} - {useChain.symbol} LP Token
              
            </AmountView>
            <Button1 style={{height: '45px',width: '150px'}} disabled={stakeDisabled} onClick={() => {
              if (stakingType === 'deposit') {
                deposit()
              } else {
                withdraw()
              }
            }}>{t(stakingType)}</Button1>
          </StakingModalBox>
        </ModalContent>
      </Modal>

      <Modal
        style={{ userSelect: 'none' }}
        isOpen={showPopup}
        // onDismiss={() => {
        //   setPopup(!showPopup)
        // }}
        minHeight={null}
        maxHeight={90}
      >
        <ModalContent
          // title={t('anyBscStakingTip0')}
          onClose={setPopup}
          isShowClose={!!localStorage.getItem(BSCAGREESTAKING)}
        >
          <ActivityInfoBox>
            <h1 className='header'>{t('anyBscStakingTip0')}</h1>

            <h3 className='title'>{t('anyBscStakingTip10')}</h3>
            <dl className='box'>
              <dd className='item'>{t('anyBscStakingTip11')}</dd>
            </dl>

            <h3 className='title'>{t('anyBscStakingTip20')}</h3>
            <dl className='box'>
              <dd className='item'>{t('anyBscStakingTip21')}</dd>
              <dd className='item'>{t('anyBscStakingTip22')}</dd>
            </dl>

            <h3 className='title'>{t('anyBscStakingTip30')}</h3>
            <dl className='box'>
              <dd className='item' dangerouslySetInnerHTML = { 
                {__html: t('anyBscStakingTip31')}
              }></dd>
              <dd className='item'>{t('anyBscStakingTip32')}</dd>
              <dd className='item'>{t('anyBscStakingTip33')}</dd>
              <dd className='item'>{t('anyBscStakingTip34')}</dd>
              <dd className='item'>{t('anyBscStakingTip35')}</dd>
            </dl>

            <h3 className='title'>{t('anyBscStakingTip40')}</h3>
            <dl className='box'>
              <dd className='item'>{t('anyBscStakingTip41')}</dd>
            </dl>
            {
              !localStorage.getItem(BSCAGREESTAKING) ? (
                <Flex>
                  <Button2 style={{height: '45px',maxWidth: '200px'}}>
                    <BackLink to={config.farmUrl}>
                      {t('disagree')}
                    </BackLink>
                  </Button2>
                  <Button1 onClick={() => {
                    localStorage.setItem(BSCAGREESTAKING, 1)
                    setPopup(false)
                  }}  style={{height: '45px',maxWidth: '200px'}}>
                    {t('agree')}
                  </Button1>
                </Flex>
              ) : ''
            }
          </ActivityInfoBox>
        </ModalContent>
      </Modal>
      {/* <Title title={t('farms')}></Title> */}
      <Title title='Stake LP tokens to earn CYC'>
        <QuestionWrapper
          onClick={() => {
            setPopup(!showPopup)
          }}
        >
          <HelpCircleStyled src={question} alt="popup" />
        </QuestionWrapper>
        {/* {showPopup ? (
          <Popup>
            <Text>
              {t('tokenByUserTip')}
            </Text>
          </Popup>
        ) : (
          ''
        )} */}
      </Title>
      {exchangeAddress ? stakingView() : farmsList()}
    </>
  )
}

export default withRouter(BSCFarming)