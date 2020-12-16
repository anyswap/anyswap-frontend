import React, {useCallback, useEffect, useState, useReducer} from 'react'
import { useTranslation } from 'react-i18next'
// import { createBrowserHistory } from 'history'
import styled from 'styled-components'
import { ethers } from 'ethers'
import { NavLink, withRouter } from 'react-router-dom'
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

import Title from '../../components/Title'
import Modal from '../../components/Modal'
import ModalContent from '../../components/Modal/ModalContent'
import HardwareTip from '../../components/HardwareTip'

import { amountFormatter } from '../../utils'
import {getWeb3BaseInfo} from '../../utils/web3/txns'
import config from '../../config'
import {chainInfo} from '../../config/coinbase/nodeConfig'
import {thousandBit, formatNum} from '../../utils/tools'

import TokenLogo from '../../components/TokenLogo'

const TokenLogo1 = styled(TokenLogo)`
background:none;
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
  ${({ theme }) => theme.FlexBC};
  width: 100%;
  flex-wrap:wrap;
`

const FarmList = styled.div`
  ${({ theme }) => theme.FlexC};
  width: 33.33%;
  padding: 0 10px;
  margin-bottom: 20px;
  @media screen and (max-width: 960px) {
    width: 50%;
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
  padding: 3px 5px;
  border-radius: 5px;
  position:absolute;
  top:20px;
  left: 20px;
  background: ${({ theme }) => theme.gradientPurpleTB};
  color:#fff;
  font-size:12px;
`

const DoubleLogo = styled.div`
  ${({ theme }) => theme.FlexC};
  width: 100%;
  position:relaitve;
  margin-top: 30px;
  .logo {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background:#fff;
    img {
      height: 100%;
      display:block;
    }
  }
  .left {
    z-index: 2;
  }
  .right {
    margin-left: -5px;
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
    .left {
      ${({ theme }) => theme.textColor};
    }
    .right {
      ${({ theme }) => theme.textColorBold};
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
      width:80px;
      height:80px;
      padding:15px;
      background:#fff;
      border-radius:100%;
      margin:auth;
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
        color: ${({ theme }) => theme.textColor};
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

const BackBox = styled.div`
  cursor:pointer;
`

function formatCellData(str, len, start) {
  start = start ? start : 0
  let str1 = str.substr(start, len)
  str1 = str1.indexOf('0x') === 0 ? str1 : '0x' + str1
  return ethers.utils.bigNumberify(str1)
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

const BSCFARMURL = '/farms/bscfarming/'

let CHAINID = '46688'
let useChain = chainInfo[CHAINID]
let FARMTOKEN = '0x281bbbebfdab3a5bcb3407d2fce71d0cec02a9fe'
let useToken = INITIAL_TOKENS_CONTEXT[CHAINID]
let exchangeObj = {}
for (let token in useToken) {
  exchangeObj[useToken[token].exchangeAddress] = {
    ...useToken[token],
    token
  }
}
// console.log(useChain)

const LPTOKEN = 'LPTOKEN'

function BSCFarming ({ params }) {
  // console.log(params)
  // console.log(params)
  // let initLpToken = params && params.lpToken ? params.lpToken : localStorage.getItem(LPTOKEN)
  // let initLpToken = params && params.lpToken ? params.lpToken : ''
  let initLpToken = ''
  // console.log(initLpToken)
  let { account, library, chainId } = useWeb3React()
  // account = '0x9059e64e4a52e4f19edea188cfb658182db35106'
  const { t } = useTranslation()
  const [isDark] = useDarkModeManager()
  const addTransaction = useTransactionAdder()
  const toggleWalletModal = useWalletModalToggle()
  const walletType = sessionStorage.getItem('walletType')

  // const history = createBrowserHistory()
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
  const [StakingAPY, setStakingAPY] = useState()

  const [exchangeAddress, setExchangeAddress] = useState(initLpToken)
  // console.log(exchangeAddress)

  const [unlocking, setUnlocking] = useState(false)
  const [approveAmount, setApproveAmount] = useState()
  const [balance, setBalance] = useState()
  const [userInfo, setUserInfo] = useState()

  const [HarvestDisabled, setHarvestDisabled] = useState(true)
  const [WithdrawDisabled, setWithdrawDisabled] = useState(true)
  const [DepositDisabled, setDepositDisabled] = useState(true)

  const [BtnDelayDisabled, setBtnDelayDisabled] = useState(0)

  const web3Contract = new web3Fn.eth.Contract(MasterChef, FARMTOKEN)
  const web3ErcContract = new web3Fn.eth.Contract(ERC20_ABI)

  const MMContract = useSwapTokenContract(FARMTOKEN, MasterChef)

  const MMErcContract = useSwapTokenContract(
    exchangeAddress,
    ERC20_ABI
  )

  const exchangeContract = new web3Fn.eth.Contract(EXCHANGE_ABI)

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
      }))
      
      web3ErcContract.options.address = obj.lpToken
      const blData = web3ErcContract.methods.balanceOf(FARMTOKEN).encodeABI()
      batch.add(web3Fn.eth.call.request({data: blData, to: obj.lpToken}, 'latest', (err, res) => {
        if (!err) {
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
    }
    batch.execute()
  }

  function getTokenList(num) {
    const batch = new web3Fn.BatchRequest()
    let arr = []
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
          
          dispatchFarmState({
            type: 'UPDATE_LP',
            index: i,
            lpToken: exAddr,
            allocPoint: ethers.utils.bigNumberify('0x' + pl.substr(66, 64)).toString(),
            lastRewardBlock: ethers.utils.bigNumberify('0x' + pl.substr(130, 64)).toString(),
            accRewardPerShare: ethers.utils.bigNumberify('0x' + pl.substr(194, 64)).toString(),
            tokenObj: exchangeObj[exAddr]
          })
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
  }

  const getBaseInfo = useCallback(() => {
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
        setBlockReward(ethers.utils.bigNumberify(res))
      }
    }))

    batch.execute()
  }, [account])

  function getStakingInfo () {
    // const curLpToken = lpObj && lpObj[exchangeAddress] && lpObj[exchangeAddress].tokenObj && lpObj[exchangeAddress].tokenObj.token ? lpObj[exchangeAddress].tokenObj.token : ''
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
          // console.log(formatCellData(userInfo, 66).toString())
          setUserInfo(formatCellData(userInfo, 66))
        }
      }))
      batch.execute()
    }
  }

  useEffect(() => {
    getStakingInfo()
  }, [exchangeAddress, account, lpObj])

  const intervalFn = useCallback(() => {
    getBaseInfo()
    getStakingInfo()
  }, [exchangeAddress, account, lpObj])

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
      setHardwareTxnsInfo('Deposit ' + stakeAmount + ' ANY')
      const data = web3Contract.methods.deposit(lpObj[exchangeAddress].index, amount).encodeABI()
      getWeb3BaseInfo(lpObj[exchangeAddress].tokenObj.token, data, account).then(res => {
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
      setHardwareTxnsInfo('Withdraw ' + stakeAmount + ' ANY')
      const data = web3Contract.methods.withdraw(lpObj[exchangeAddress].index, amount).encodeABI()
      getWeb3BaseInfo(lpObj[exchangeAddress].tokenObj.token, data, account).then(res => {
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
      setHardwareTxnsInfo('Approve ANY Token')
      web3ErcContract.options.address = curLpToken
      const data = web3ErcContract.methods.approve(FARMTOKEN, _userTokenBalance).encodeABI()
      getWeb3BaseInfo(FARMTOKEN, data, account).then(res => {
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

  function getLogoPath(symbol) {
    let path = ''
    try {
      path = require('../../assets/images/coin/source/' + symbol + '.svg')
    } catch (error) {
      try {
        path = require('../../assets/images/coin/source/' + symbol + '.png')
      } catch (error) {
        path = require('../../assets/images/question.svg')
      }
    }
    return path
  }

  function getAPY (lpBalance) {
    if (BlockReward && lpBalance && BlockReward.gt(ethers.constants.Zero) && lpBalance.gt(ethers.constants.Zero)) {
      try {
        let apy = BlockReward.mul(6600 * 365 * 10000).div(lpBalance)
        apy = Number(apy.toString()) / 100
        return apy
      } catch (error) {
        console.log(error)
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
                    <MulLabel>123</MulLabel>
                    <DoubleLogo>
                      <div className="logo left"><img src={getLogoPath(item && item.tokenObj && item.tokenObj.symbol ? item.tokenObj.symbol : '')} alt=""/></div>
                      <div className="logo right"><img src={getLogoPath(useChain.symbol)} alt=""/></div>
                    </DoubleLogo>
                    <FarmInfo>
                      <div className="item">
                        <span className="left">Deposit</span>
                        <span className="right">{formatNum(amountFormatter(item.lpBalance, 18, config.keepDec))}</span>
                      </div>
                      <div className="item">
                        <span className="left">APY</span>
                        <span className="right">{getAPY(item.lpBalance)} %</span>
                      </div>
                      <div className="item">
                        <span className="left">Total Liquidity</span>
                        <span className="right">{formatNum(amountFormatter(item.totalSupply, 18, config.keepDec))}</span>
                      </div>
                    </FarmInfo>
                    <Flex>
                      {
                        account ? (
                          <Button style={{height: '45px', maxWidth: '200px'}} onClick={() => {
                            // console.log(item)
                            // localStorage.setItem(LPTOKEN, item.lpToken)
                            // history.push(BSCFARMURL + '?lpToken=' + item.lpToken)
                            setExchangeAddress(item.lpToken)
                          }}>{t('select')}</Button>
                        ) : (
                          <Button onClick={toggleWalletModal}  style={{height: '45px',maxWidth: '200px'}}>
                            {t('connectToWallet')}
                          </Button>
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

  function stakingView () {
    let btnView = ''
    if (Number(CHAINID) !== Number(chainId)) {
      btnView = <Button onClick={() => {
        // localStorage.setItem(config.ENV_NODE_CONFIG, useChain.label)
        // history.go(0)
      }}  style={{height: '45px', maxWidth: '200px'}}>
        {t('SwitchTo')} BSC {t('mainnet')}
      </Button>
    } else if (!account) {
      btnView = <Button onClick={toggleWalletModal}  style={{height: '45px',maxWidth: '200px'}}>
        {t('connectToWallet')}
      </Button>
    } else if (approveAmount && Number(approveAmount)) {
      btnView = <>
        <Button style={{height: '45px', maxWidth: '200px'}} disabled={WithdrawDisabled} onClick={() => {
          setStakingType('Unstake')
          setStakingModal(true)
        }}>{t('Unstake')}</Button>
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
      btnView = <Button style={{height: '45px', maxWidth: '200px'}} disabled={unlocking} onClick={() => {
        approve()
      }}>{unlocking ? t('pending') : t('unlock')}</Button>
    }
    let curLpObj = lpObj && lpObj[exchangeAddress] ? lpObj[exchangeAddress] : {}
    return (
      <>
        <BackBox onClick={() => {
          // history.push(BSCFARMURL)
          // localStorage.setItem(LPTOKEN, '')
          setExchangeAddress('')
        }}>
          &lt;Back
        </BackBox>
        <StakingBox>
          <StakingList>
            <li className='item'>
              <div className='pic'><img src={require('../../assets/images/coin/source/ANY.svg')} /></div>
              <div className='info'>
                <h3>{curLpObj.pendingReward && Number(curLpObj.pendingReward.toString()) > 0 ? amountFormatter(curLpObj.pendingReward, 18, config.keepDec) : '0.00'}</h3>
                <p>
                  {curLpObj.tokenObj && curLpObj.tokenObj.symbol ? curLpObj.tokenObj.symbol : ''} {t('Earned')}
                  <span className='green' style={{marginLeft:'2px'}}>{getAPY(curLpObj.lpBalance)}%)</span>
                </p>
              </div>
              <div className='btn'><Button style={{height: '45px', maxWidth: '200px'}} disabled={HarvestDisabled} onClick={() => {
                withdraw(0)
              }}>{t('Harvest')}</Button></div>
            </li>
            <li className='item'>
              <div className='pic'><img src={require('../../assets/images/coin/source/ANY.svg')} /></div>
              <div className='info'>
                <h3>{userInfo && Number(userInfo.toString()) > 0 ? formatNum(amountFormatter(userInfo, 18, config.keepDec)) : '0.00'}</h3>
                <p>{curLpObj.tokenObj && curLpObj.tokenObj.symbol ? curLpObj.tokenObj.symbol : ''} Tokens {t('Staked')}</p>
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
              {amountView} {lpObj && lpObj[exchangeAddress] && lpObj[exchangeAddress].tokenObj && lpObj[exchangeAddress].tokenObj.symbol ? lpObj[exchangeAddress].tokenObj.symbol : ''}
            </AmountView>
            <Button style={{height: '45px',width: '150px'}} disabled={stakeDisabled} onClick={() => {
              if (stakingType === 'deposit') {
                deposit()
              } else {
                withdraw()
              }
            }}>{t(stakingType)}</Button>
          </StakingModalBox>
        </ModalContent>
      </Modal>
      {exchangeAddress ? stakingView() : farmsList()}
    </>
  )
}

export default withRouter(BSCFarming)