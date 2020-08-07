import React, { useState, useReducer, useEffect } from 'react'
// import ReactGA from 'react-ga'
import { createBrowserHistory } from 'history'
import { ethers } from 'ethers'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { useWeb3React, useSwapTokenContract } from '../../hooks'
import { brokenTokens } from '../../constants'
import { amountFormatter, isAddress } from '../../utils'

// import { useExchangeContract } from '../../hooks'
import { useTokenDetails, INITIAL_TOKENS_CONTEXT } from '../../contexts/Tokens'
import { useTransactionAdder } from '../../contexts/Transactions'
import { useAddressBalance, useExchangeReserves } from '../../contexts/Balances'
import { useAddressAllowance } from '../../contexts/Allowances'
import { useWalletModalToggle } from '../../contexts/Application'

import { Button, TitleBox } from '../../theme'
import CurrencyInputPanel from '../CurrencyInputPanel'
import AddressInputPanel from '../AddressInputPanel'
import OversizedPanel from '../OversizedPanel'
// import TransactionDetails from '../TransactionDetails'
import ArrowDown from '../../assets/svg/SVGArrowDown'
import WarningCard from '../WarningCard'
import { transparentize } from 'polished'
import WalletConnectData from '../WalletModal/WalletConnectData'
import Modal from '../Modal'
import { ReactComponent as QRcode } from '../../assets/images/QRcode.svg'
import { ReactComponent as copyICON } from '../../assets/images/copy.svg'
import TokenLogo from '../TokenLogo'

import { GetServerInfo, RegisterAddress, GetBTCtxnsAll } from '../../utils/axios'
import { copyTxt } from '../../utils/tools'

import config from '../../config'
import {getWeb3ConTract, getWeb3BaseInfo} from '../../utils/web3/txns'
import swapBTCABI from '../../constants/abis/swapBTCABI'
import swapETHABI from '../../constants/abis/swapETHABI'

import HardwareTip from '../HardwareTip'
import ResertSvg from '../../assets/images/icon/revert.svg'
import BirdgeIcon from '../../assets/images/icon/bridge-white.svg'
import BirdgeBtnIcon from '../../assets/images/icon/bridge-white-btn.svg'

import { useBetaMessageManager } from '../../contexts/LocalStorage'
import WarningTip from '../WarningTip'

import {getErcBalance} from '../../utils/web3/Erc20Web3'

const INPUT = 0
const OUTPUT = 1

const ETH_TO_TOKEN = 0
const TOKEN_TO_ETH = 1
const TOKEN_TO_TOKEN = 2

// denominated in bips
const ALLOWED_SLIPPAGE_DEFAULT = 50
const TOKEN_ALLOWED_SLIPPAGE_DEFAULT = 50

// 15 minutes, denominated in seconds
const DEFAULT_DEADLINE_FROM_NOW = 60 * 15

const DownArrowBackground = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  object-fit: contain;
  border-radius: 6px;
  margin: 3px auto;
  cursor:pointer;
`

// const WrappedArrowDown = ({ clickable, active, ...rest }) => <ArrowDown {...rest} />
// const DownArrow = styled(WrappedArrowDown)`
//   color: ${({ theme, active }) => (active ? theme.royalBlue : theme.chaliceGray)};
//   width: 0.625rem;
//   height: 0.625rem;
//   position: relative;
//   padding: 0.875rem;
//   cursor: ${({ clickable }) => clickable && 'pointer'};
// `
const DownArrow = styled.div`
  width: 32px;
  height: 32px;
  padding:8px;
  margin: 3px auto;
  cursor: pointer;
  img {
    height: 100%;
    display: block;
  }
`

const ExchangeRateWrapper = styled.div`
${({ theme }) => theme.FlexEC};
  width: 100%;
  height: 48px;
  object-fit: contain;
  border-radius: 0.5625rem;
  background: ${({ theme }) => theme.dtilContentBg};
  font-family: 'Manrope';
  font-size: 0.75rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: right;
  color: #062536;
  padding: 0 2.5rem;
  margin-top:0.625rem;
  span {
    height: 0.75rem;
    font-family: 'Manrope';
    font-size: 0.75rem;
    font-weight: 800;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: right;
    color: #062536;
  }
`

const ExchangeRate = styled.div`
  flex: 1 1 auto;
  width: 0;
  color: ${({ theme }) => theme.doveGray};
`

const Flex = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;

  button {
    max-width: 20rem;
  }
`
const InputPanel = styled.div`
${({ theme }) => theme.flexColumnNoWrap}
box-shadow: 0 0.25rem 8px 0 ${({ theme }) => transparentize(0.95, theme.shadowColor)};
position: relative;
border-radius: 1.25rem;
background: ${({theme}) => theme.contentBg};
z-index: 1;
padding: 1.5625rem 2.5rem;
margin-top: 0.625rem;
@media screen and (max-width: 960px) {
  padding: 1rem 1.5625rem;
}
`

const ContainerRow = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const InputContainer = styled.div`
flex: 1;
`

const LabelRow = styled.div`
${({ theme }) => theme.flexRowNoWrap}
align-items: center;
color: ${({ theme }) => theme.doveGray};
font-size: 0.75rem;
font-family: 'Manrope';
line-height: 1rem;
padding: 0.75rem 0;
`

const LabelContainer = styled.div`
flex: 1 1 auto;
width: 0;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
`

const InputRow = styled.div`
${({ theme }) => theme.flexRowNoWrap}
align-items: center;
padding: 0.25rem 0rem 0.75rem;
`

const Input = styled.input`
outline: none;
border: none;
flex: 1 1 auto;
width: 0;
background-color: transparent;
border-bottom: 0.0625rem solid ${({theme}) => theme.textColorBold};

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

const MintDiv = styled.div`
  width: 100%;
  padding: 1.25rem 1rem;
`

const MintList = styled.div`
  border-bottom: 0.0625rem  solid ${({ error, theme }) => (error ? theme.salmonRed : theme.mercuryGray)};
  padding: 1rem 8px;
  font-family: 'Manrope';
  font-size: 0.875rem;
`
const MintListCenter = styled(MintList)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.875rem;
`

const MintListLabel = styled.div`
  width: 100%;
`

const MintListVal = styled.div`
  width: 100%;
  cursor:pointer
`

const TokenLogoBox = styled(TokenLogo)`
  padding: 0.625rem;
  background: none;
`

const MintTip = styled.div`
  position: fixed;
  top: 100px;
  right: 80px;
  border-radius: 0.25rem;
  box-shadow:0 0 5px 0px #E1902E;
  z-index: 99;
  cursor:pointer;
  .txt {
    width: 0;height: 100%;white-space: nowrap;overflow: hidden;transition: width 0.5s;
  }
  &:hover {
    .txt {
      width: 150px;padding: 0 1.25rem;
    }
  }
`

const FlexCneter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    max-width: 20rem;
  }
`

const StyledQRcode = styled(QRcode)`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  cursor:pointer;
  margin-left: 0.625rem;
`

const MintWarningTip = styled.div`
  padding: 0.625rem 1rem;
  color:red;
  font-family: 'Manrope';
  cursor: pointer;
  flex: 1 0 auto;
  align-items: center;
  position: relative;
  padding: 0.5rem 1rem;
  padding-right: 2rem;
  margin-bottom: 1rem;
  border: 0.0625rem solid ${({ theme }) => transparentize(0.6, 'red')};
  background-color: ${({ theme }) => transparentize(0.9, 'red')};
  border-radius: 1rem;
  font-size: 0.75rem;
  line-height: 1rem;
  text-align: left;
  color: red;
  margin-top: 1.25rem;
`

// const StyledCopyICON = styled(copyICON)`
//   width: ${({ size }) => size};
//   height: ${({ size }) => size};
//   margin: 0 0.625rem;
//   cursor:pointer;
// `

const StyledBirdgeIcon = styled.div`
  ${({ theme }) => theme.FlexC};
  img {
    margin-right: 1rem
  }
`

function getSwapType(inputCurrency, outputCurrency) {
  inputCurrency = inputCurrency ? inputCurrency : 'FSN'
  // console.log(inputCurrency)
  // console.log(outputCurrency)
  if (!inputCurrency || !outputCurrency) {
    return null
  } else if (inputCurrency === 'FSN') {
    return ETH_TO_TOKEN
  }
  //  else if (outputCurrency === 'FSN') {
  //   return TOKEN_TO_ETH
  // } 
  else {
    return TOKEN_TO_TOKEN
  }
}

// this mocks the getInputPrice function, and calculates the required output
function calculateEtherTokenOutputFromInput(inputAmount, inputReserve, outputReserve) {
  const inputAmountWithFee = inputAmount.mul(ethers.utils.bigNumberify(997))
  const numerator = inputAmountWithFee.mul(outputReserve)
  const denominator = inputReserve.mul(ethers.utils.bigNumberify(1000)).add(inputAmountWithFee)
  return numerator.div(denominator)
}

// this mocks the getOutputPrice function, and calculates the required input
function calculateEtherTokenInputFromOutput(outputAmount, inputReserve, outputReserve) {
  const numerator = inputReserve.mul(outputAmount).mul(ethers.utils.bigNumberify(1000))
  const denominator = outputReserve.sub(outputAmount).mul(ethers.utils.bigNumberify(997))
  return numerator.div(denominator).add(ethers.constants.One)
}

function getInitialSwapState(state) {
  return {
    independentValue: state.exactFieldURL && state.exactAmountURL ? state.exactAmountURL : '', // this is a user input
    dependentValue: '', // this is a calculated number
    independentField: state.exactFieldURL === 'output' ? OUTPUT : INPUT,
    // inputCurrency: state.inputCurrencyURL ? state.inputCurrencyURL : state.outputCurrencyURL === 'FSN' ? '' : 'FSN',
    inputCurrency: state.inputCurrencyURL ? state.inputCurrencyURL : config.initBridge,
    outputCurrency: state.outputCurrencyURL
      ? state.outputCurrencyURL === 'FSN'
        ? !state.inputCurrencyURL || (state.inputCurrencyURL && state.inputCurrencyURL !== 'FSN')
          ? 'FSN'
          : ''
        : state.outputCurrencyURL
      : state.initialCurrency
      ? state.initialCurrency
      : config.initBridge
  }
}

function swapStateReducer(state, action) {
  switch (action.type) {
    case 'FLIP_INDEPENDENT': {
      const { independentField, inputCurrency, outputCurrency } = state
      return {
        ...state,
        dependentValue: '',
        independentField: independentField === INPUT ? OUTPUT : INPUT,
        inputCurrency: outputCurrency,
        outputCurrency: inputCurrency
      }
    }
    case 'SELECT_CURRENCY': {
      const { inputCurrency, outputCurrency } = state
      const { field, currency } = action.payload

      const newInputCurrency = field === INPUT ? currency : inputCurrency
      const newOutputCurrency = field === OUTPUT ? currency : outputCurrency

      if (newInputCurrency === newOutputCurrency) {
        return {
          ...state,
          inputCurrency: field === INPUT ? currency : '',
          outputCurrency: field === OUTPUT ? currency : ''
        }
      } else {
        return {
          ...state,
          inputCurrency: newInputCurrency,
          outputCurrency: newOutputCurrency
        }
      }
    }
    case 'UPDATE_INDEPENDENT': {
      const { field, value, realyValue } = action.payload
      const { dependentValue, independentValue } = state
      return {
        ...state,
        independentValue: value,
        dependentValue: value === independentValue ? dependentValue : '',
        independentField: field,
        realyValue: realyValue
      }
    }
    case 'UPDATE_DEPENDENT': {
      return {
        ...state,
        dependentValue: action.payload
      }
    }
    case 'UPDATE_BREDGETYPE': {
      return {
        ...state,
        bridgeType: action.payload ? action.payload : 'mint'
      }
    }
    case 'UPDATE_SWAPREGISTER': {
      return {
        ...state,
        registerAddress: action.payload
      }
    }
    case 'UPDATE_MINTTYPE': {
      return {
        ...state,
        isViewMintModel: action.payload
      }
    }
    case 'UPDATE_MINTHISTORY': {
      return {
        ...state,
        mintHistory: action.payload
      }
    }
    case 'UPDATE_MINTINFOTYPE': {
      return {
        ...state,
        isViewMintInfo: action.payload
      }
    }
    default: { //UPDATE_MINTINFOTYPE
      return getInitialSwapState()
    }
  }
}
const selfUseAllToken=[ 
  'FSN',
  config.initToken
 ]
let historyInterval 
// let swapInfo = ''

// getErcBalance('USDT')

export default function ExchangePage({ initialCurrency, sending = false, params }) {
  const { t } = useTranslation()
  let { account, chainId, error } = useWeb3React()
  const [showBetaMessage] = useBetaMessageManager()
  let walletType = sessionStorage.getItem('walletType')
  // let HDPath = sessionStorage.getItem('HDPath')
  // account = config.supportWallet.includes(walletType) ? sessionStorage.getItem('account') : account
  // console.log(useWeb3React())
  
  const urlAddedTokens = {}
  if (params.inputCurrency) {
    urlAddedTokens[params.inputCurrency] = true
  }
  if (params.outputCurrency) {
    urlAddedTokens[params.outputCurrency] = true
  }
  if (isAddress(initialCurrency)) {
    urlAddedTokens[initialCurrency] = true
  }


  // check URL params for recipient, only on send page
  const initialRecipient = () => {
    if (sending && params.recipient) {
      return params.recipient
    }
    return ''
  }


  // core swap state
  const [swapState, dispatchSwapState] = useReducer(
    swapStateReducer,
    {
      initialCurrency: initialCurrency,
      inputCurrencyURL: params.inputCurrency,
      outputCurrencyURL: params.outputCurrency,
      exactFieldURL: params.exactField,
      exactAmountURL: params.exactAmount
    },
    getInitialSwapState
  )
  const { independentValue, dependentValue, independentField, inputCurrency, outputCurrency, bridgeType, registerAddress, isViewMintModel, mintHistory, isViewMintInfo, realyValue } = swapState


  const [recipient, setRecipient] = useState({
    address: initialRecipient(),
    name: ''
  })

  // get swap type from the currency types
  const swapType = getSwapType(inputCurrency, outputCurrency)

  const [recipientError, setRecipientError] = useState()

  // get decimals and exchange address for each of the currency types
  const { symbol: inputSymbol, decimals: inputDecimals, name: inputName, maxNum , minNum, fee, isSwitch, isDeposit, isRedeem } = useTokenDetails(
    inputCurrency
  )
  // console.log(inputSymbol)
  // console.log(inputCurrency)
  const {  decimals: outputDecimals} = useTokenDetails(
    outputCurrency
  )

  useEffect(() => {

    if (config.CoinInfo[inputSymbol] && config.CoinInfo[inputSymbol].url && isSwitch) {
      GetServerInfo(config.CoinInfo[inputSymbol].url).then(res => {
        if (bridgeType && bridgeType === 'redeem') {
          
        } else {
          if (inputSymbol !== 'mBTC') {
            dispatchSwapState({
              type: 'UPDATE_SWAPREGISTER',
              payload: res.swapInfo.SrcToken.DcrmAddress
            })
          }
        }
      })
      if (account && inputSymbol === 'mBTC') {
        RegisterAddress(config.CoinInfo[inputSymbol].url, account).then(res => {
          // console.log(res)
          if (res && res.result) {
            dispatchSwapState({
              type: 'UPDATE_SWAPREGISTER',
              payload: res.result.P2shAddress
            })
          }
        })
      } else if (!account && inputSymbol === 'mBTC') {
        dispatchSwapState({
          type: 'UPDATE_SWAPREGISTER',
          payload: ''
        })
      }
      if (registerAddress && account) {
        if (historyInterval) {
          clearInterval(historyInterval)
        }
        let addrHistory = inputSymbol === 'mBTC' ? registerAddress : account
        historyInterval = setInterval(() => {
          GetBTCtxnsAll(config.CoinInfo[inputSymbol].url, addrHistory, inputSymbol, inputDecimals).then(res => {
            // console.log(res)
            dispatchSwapState({
              type: 'UPDATE_MINTHISTORY',
              payload: res
            })
          })
        }, 1000 * 30)
      }
    } else {
      clearInterval(historyInterval)
      dispatchSwapState({
        type: 'UPDATE_SWAPREGISTER',
        payload: ''
      })
    }
  }, [inputSymbol, bridgeType, account])
  // const inputExchangeContract = useExchangeContract(inputExchangeAddress)
  // const outputExchangeContract = useExchangeContract(outputExchangeAddress)
  // const contract = swapType === ETH_TO_TOKEN ? outputExchangeContract : inputExchangeContract
  // const contract = outputExchangeContract

  // fetch reserves for each of the currency types
  const { reserveETH: inputReserveETH, reserveToken: inputReserveToken } = useExchangeReserves(inputCurrency)
  const { reserveETH: outputReserveETH, reserveToken: outputReserveToken } = useExchangeReserves(outputCurrency)

  // get balances for each of the currency types
  const inputBalance = useAddressBalance(account, inputCurrency)
  // const outputBalance = useAddressBalance(account, outputCurrency)
  const inputBalanceFormatted = !!(inputBalance && Number.isInteger(inputDecimals))
    ? amountFormatter(inputBalance, inputDecimals, inputDecimals)
    : ''

  // compute useful transforms of the data above
  const independentDecimals = independentField === INPUT ? inputDecimals : outputDecimals
  const dependentDecimals = independentField === OUTPUT ? inputDecimals : outputDecimals

  // declare/get parsed and formatted versions of input/output values
  const [independentValueParsed, setIndependentValueParsed] = useState()
  const dependentValueFormatted = !!(dependentValue && (dependentDecimals || dependentDecimals === 0))
    ? amountFormatter(dependentValue, dependentDecimals, Math.min(8, dependentDecimals), false)
    : ''
  // const inputValueParsed = independentField === INPUT ? independentValueParsed : dependentValue
  const inputValueFormatted = independentField === INPUT ? independentValue : dependentValueFormatted
  // const outputValueParsed = independentField === OUTPUT ? independentValueParsed : dependentValue
  // const outputValueFormatted = independentField === OUTPUT ? independentValue : dependentValueFormatted

  // validate + parse independent value
  const [independentError, setIndependentError] = useState()
  useEffect(() => {
    if (independentValue && (independentDecimals || independentDecimals === 0)) {
      try {
        const parsedValue = ethers.utils.parseUnits(independentValue, independentDecimals)

        if (parsedValue.lte(ethers.constants.Zero) || parsedValue.gte(ethers.constants.MaxUint256)) {
          throw Error()
        } else {
          setIndependentValueParsed(parsedValue)
          setIndependentError(null)
        }
      } catch {
        setIndependentError(t('inputNotValid'))
      }

      return () => {
        setIndependentValueParsed()
        setIndependentError()
      }
    }
  }, [independentValue, independentDecimals, t])


  // calculate dependent value
  useEffect(() => {
    const amount = independentValueParsed

    if (swapType === ETH_TO_TOKEN) {
      const reserveETH = outputReserveETH
      const reserveToken = outputReserveToken

      if (amount && reserveETH && reserveToken) {
        try {
          const calculatedDependentValue =
            independentField === INPUT
              ? calculateEtherTokenOutputFromInput(amount, reserveETH, reserveToken)
              : calculateEtherTokenInputFromOutput(amount, reserveETH, reserveToken)

          if (calculatedDependentValue.lte(ethers.constants.Zero)) {
            throw Error()
          }

          dispatchSwapState({
            type: 'UPDATE_DEPENDENT',
            payload: calculatedDependentValue
          })
        } catch {
          setIndependentError(t('insufficientLiquidity'))
        }
        return () => {
          dispatchSwapState({ type: 'UPDATE_DEPENDENT', payload: '' })
        }
      }
    } else if (swapType === TOKEN_TO_ETH) {
      const reserveETH = inputReserveETH
      const reserveToken = inputReserveToken

      if (amount && reserveETH && reserveToken) {
        try {
          const calculatedDependentValue =
            independentField === INPUT
              ? calculateEtherTokenOutputFromInput(amount, reserveToken, reserveETH)
              : calculateEtherTokenInputFromOutput(amount, reserveToken, reserveETH)

          if (calculatedDependentValue.lte(ethers.constants.Zero)) {
            throw Error()
          }

          dispatchSwapState({
            type: 'UPDATE_DEPENDENT',
            payload: calculatedDependentValue
          })
        } catch {
          setIndependentError(t('insufficientLiquidity'))
        }
        return () => {
          dispatchSwapState({ type: 'UPDATE_DEPENDENT', payload: '' })
        }
      }
    } else if (swapType === TOKEN_TO_TOKEN) {
      const reserveETHFirst = inputReserveETH
      const reserveTokenFirst = inputReserveToken

      const reserveETHSecond = outputReserveETH
      const reserveTokenSecond = outputReserveToken

      if (amount && reserveETHFirst && reserveTokenFirst && reserveETHSecond && reserveTokenSecond) {
        try {
          if (independentField === INPUT) {
            const intermediateValue = calculateEtherTokenOutputFromInput(amount, reserveTokenFirst, reserveETHFirst)
            if (intermediateValue.lte(ethers.constants.Zero)) {
              throw Error()
            }
            const calculatedDependentValue = calculateEtherTokenOutputFromInput(
              intermediateValue,
              reserveETHSecond,
              reserveTokenSecond
            )
            if (calculatedDependentValue.lte(ethers.constants.Zero)) {
              throw Error()
            }
            dispatchSwapState({
              type: 'UPDATE_DEPENDENT',
              payload: calculatedDependentValue
            })
          } else {
            const intermediateValue = calculateEtherTokenInputFromOutput(amount, reserveETHSecond, reserveTokenSecond)
            if (intermediateValue.lte(ethers.constants.Zero)) {
              throw Error()
            }
            const calculatedDependentValue = calculateEtherTokenInputFromOutput(
              intermediateValue,
              reserveTokenFirst,
              reserveETHFirst
            )
            if (calculatedDependentValue.lte(ethers.constants.Zero)) {
              throw Error()
            }
            dispatchSwapState({
              type: 'UPDATE_DEPENDENT',
              payload: calculatedDependentValue
            })
          }
        } catch {
          setIndependentError(t('insufficientLiquidity'))
        }
        return () => {
          dispatchSwapState({ type: 'UPDATE_DEPENDENT', payload: '' })
        }
      }
    }
  }, [
    independentValueParsed,
    swapType,
    outputReserveETH,
    outputReserveToken,
    inputReserveETH,
    inputReserveToken,
    independentField,
    t
  ])

  function formatBalance(value) {
    return `Balance: ${value}`
  }
  const toggleWalletModal = useWalletModalToggle()

  const newInputDetected =
    inputCurrency !== 'FSN' && inputCurrency && !INITIAL_TOKENS_CONTEXT[chainId].hasOwnProperty(inputCurrency)

  const [showInputWarning, setShowInputWarning] = useState(false)
  // const [showOutputWarning, setShowOutputWarning] = useState(false)
  // console.log(inputDecimals)
  useEffect(() => {
    if (newInputDetected) {
      setShowInputWarning(true)
    } else {
      setShowInputWarning(false)
    }
  }, [newInputDetected, setShowInputWarning])

  const addTransaction = useTransactionAdder()

  const tokenContract = useSwapTokenContract(inputCurrency, swapBTCABI)
  const tokenETHContract = useSwapTokenContract(inputCurrency, swapETHABI)

  const [isHardwareTip, setIsHardwareTip] = useState(false)
  const [isHardwareError, setIsHardwareError] = useState(false)
  const [hardwareTxnsInfo, setHardwareTxnsInfo] = useState('')
  const [isDisabled, setIsDisableed] = useState(true)
  const [isMintBtn, setIsMintBtn] = useState(false)
  const [isRedeemBtn, setIsRedeem] = useState(false)

  // !account && !error && isDisabled && !isDeposit && showBetaMessage ? false : !independentValue || !recipient.address || !showBetaMessage
  useEffect(() => {
    if (
      !error
      && isDisabled 
      && isRedeem 
      && !showBetaMessage 
      && independentValue
      && recipient.address
      && Number(inputBalanceFormatted) >= Number(independentValue)
    ) {
      if (inputSymbol === 'mBTC' && config.reg[inputSymbol] && config.reg[inputSymbol].test(recipient.address)) {
        setIsRedeem(false)
      } else if (inputSymbol !== 'mBTC' && isAddress(recipient.address)) {
        setIsRedeem(false)
      } else {
        setIsRedeem(true)
      }
    } else {
      setIsRedeem(true)
    }
  }, [account, isDisabled, isRedeem, showBetaMessage, recipient.address, independentValue, inputSymbol])
  useEffect(() => {
      if (
        isDisabled 
        && isDeposit 
        && !showBetaMessage 
        && independentValue
        && registerAddress
        && Number(independentValue) <= maxNum
        && Number(independentValue) >= minNum
      ) {
        setIsMintBtn(false)
      } else {
        setIsMintBtn(true)
      }
  }, [account, isDisabled, isDeposit, showBetaMessage, registerAddress, independentValue, inputSymbol])
  function sendTxns () {
    // console.log(config)
    if (!isDisabled) return
    setIsDisableed(false)
    setTimeout(() => {
      setIsDisableed(true)
    }, 3000)
    let amountVal = Number(independentValue) * Math.pow(10, inputDecimals)
    amountVal = amountVal.toFixed(0)
    let address = recipient.address
    if (config.supportWallet.includes(walletType)) {
      setIsHardwareError(false)
      setIsHardwareTip(true)
      setHardwareTxnsInfo(inputValueFormatted + inputSymbol)
      let web3Contract = getWeb3ConTract(swapBTCABI, inputCurrency)
      // let data = web3Contract.Swapout.getData(amountVal, address)
      let data = web3Contract.methods.Swapout(amountVal, address).encodeABI()
      if (inputSymbol !== 'mBTC') {
        web3Contract = getWeb3ConTract(swapETHABI, inputCurrency)
        // data = web3Contract.Swapout.getData(amountVal)
        data = web3Contract.methods.Swapout(amountVal).encodeABI()
      }
      getWeb3BaseInfo(inputCurrency, inputCurrency, data, account).then(res => {
        if (res.msg === 'Success') {
          addTransaction(res.info)
          dispatchSwapState({
            type: 'UPDATE_INDEPENDENT',
            payload: {
              value: '',
              field: INPUT,
              realyValue: ''
            }
          })
        } else {
          alert(res.error)
        }
        setIsHardwareTip(false)
      })
      return
    }

    if (inputSymbol !== 'mBTC') {
      // console.log(amountVal)
      tokenETHContract.Swapout(amountVal, address).then(res => {
        // console.log(res)
        addTransaction(res)
        dispatchSwapState({
          type: 'UPDATE_INDEPENDENT',
          payload: {
            value: '',
            field: INPUT,
            realyValue: ''
          }
        })
        setIsHardwareTip(false)
      }).catch(err => {
        console.log(err)
        setIsHardwareTip(false)
      })
    } else {
      tokenContract.Swapout(amountVal, address).then(res => {
        addTransaction(res)
        dispatchSwapState({
          type: 'UPDATE_INDEPENDENT',
          payload: {
            value: '',
            field: INPUT,
            realyValue: ''
          }
        })
        setIsHardwareTip(false)
      }).catch(err => {
        console.log(err)
        setIsHardwareTip(false)
      })
    }
  }
  function MintModelView () {
    if (!registerAddress) return
    dispatchSwapState({
      type: 'UPDATE_MINTTYPE',
      payload: isViewMintModel ? false : true
    })
  }
  function MintInfoModelView () {
    dispatchSwapState({
      type: 'UPDATE_MINTINFOTYPE',
      payload: isViewMintInfo ? false : true
    })
  }
  function changeMorR () {
    let bt = ''
    if (bridgeType && bridgeType === 'redeem') {
      bt = 'mint'
    } else {
      bt = 'redeem'
    }
    dispatchSwapState({ type: 'UPDATE_BREDGETYPE', payload: bt })
    dispatchSwapState({
      type: 'UPDATE_INDEPENDENT',
      payload: {
        value: '',
        field: INPUT,
        realyValue: ''
      }
    })
  }
  function copyAddr () {
    copyTxt(registerAddress)
  }
  return (
    <>
      <HardwareTip
        HardwareTipOpen={isHardwareTip}
        closeHardwareTip={() => {
          setIsHardwareTip(false)
        }}
        error={isHardwareError}
        txnsInfo={hardwareTxnsInfo}
        coinType={inputSymbol}
      ></HardwareTip>
      {showInputWarning && (
        <WarningCard
          onDismiss={() => {
            setShowInputWarning(false)
          }}
          urlAddedTokens={urlAddedTokens}
          currency={inputCurrency}
        />
      )}
      <Modal isOpen={isViewMintModel} maxHeight={800}>
        <MintDiv>
          {independentValue ? (
            <>
              <MintList>
                <MintListLabel>{t('deposit1')} {inputSymbol && inputSymbol.replace('a', '')} {t('amount')}:</MintListLabel>
                <MintListVal>{independentValue}</MintListVal>
              </MintList>
            </>
          ) : ''}
          <MintList>
            <MintListLabel>{t('deposit1')} {inputSymbol && inputSymbol.replace('a', '')} {t('address')}:</MintListLabel>
            <MintListVal onClick={copyAddr}>{registerAddress ? registerAddress : ''}</MintListVal>
          </MintList>
          <MintListCenter>
            <WalletConnectData size={160} uri={registerAddress} style="marginTop:120"/>
          </MintListCenter>
          <FlexCneter>
            <Button onClick={MintModelView} >{t('close')}</Button>
          </FlexCneter>
        </MintDiv>
      </Modal>
      <Modal isOpen={isViewMintInfo} maxHeight={800}>
        <MintDiv>
          <MintList>
            <MintListLabel>{t('hash')}:</MintListLabel>
            <MintListVal>{mintHistory && mintHistory.mintHash ? mintHistory.mintHash : ''}</MintListVal>
          </MintList>
          <MintList>
            <MintListLabel>{t('from')}:</MintListLabel>
            <MintListVal>{mintHistory && mintHistory.from ? mintHistory.from : ''}</MintListVal>
          </MintList>
          <MintList>
            <MintListLabel>{t('to')}:</MintListLabel>
            <MintListVal>{registerAddress ? registerAddress : ''}</MintListVal>
          </MintList>
          <MintList>
            <MintListLabel>{t('value')}:</MintListLabel>
            <MintListVal>{mintHistory && mintHistory.mintValue ? mintHistory.mintValue : ''}</MintListVal>
          </MintList>
          <MintList>
            <MintListLabel>{t('fee')}:</MintListLabel>
            <MintListVal>{mintHistory && mintHistory.mintValue && (fee || fee === 0) ? Number(mintHistory.mintValue) * Number(fee) : 0}</MintListVal>
          </MintList>
          <MintList>
            <MintListLabel>{t('receive')}:</MintListLabel>
            <MintListVal>{mintHistory && mintHistory.mintValue && (fee || fee === 0) ? Number(mintHistory.mintValue) * (1 - Number(fee)) : ''}</MintListVal>
          </MintList>
          <MintList>
            <MintListLabel>{t('receive')} FSN {t('address')}:</MintListLabel>
            <MintListVal>{account}</MintListVal>
          </MintList>
          <FlexCneter>
            <Button onClick={MintInfoModelView} >{t('close')}</Button>
          </FlexCneter>
        </MintDiv>
      </Modal>

      { (mintHistory && mintHistory.mintTip) ?  
          (
            <>
              <MintTip onClick={MintInfoModelView}>
                <FlexCneter>
                  <FlexCneter><TokenLogoBox size={'34px'} address={inputSymbol ? 'BTC' : inputSymbol.replace('a', '')} /></FlexCneter>
                  <span className="txt"><FlexCneter>Waiting for deposit</FlexCneter></span>
                </FlexCneter>
              </MintTip>
            </>
          )
          :
          ''
      }
      <TitleBox>{t('bridge')}</TitleBox>
      <CurrencyInputPanel
        // title={t('input')}
        title={t(bridgeType && bridgeType === 'redeem' ? 'redeem' : 'deposit1')}
        urlAddedTokens={urlAddedTokens}
        extraText={bridgeType && bridgeType === 'redeem' && inputBalanceFormatted ? formatBalance(inputBalanceFormatted) : ''}
        extraTextClickHander={() => {
          if (inputBalance && inputDecimals) {
            const valueToSet = inputCurrency === 'FSN' ? inputBalance.sub(ethers.utils.parseEther('.1')) : inputBalance
            if (valueToSet.gt(ethers.constants.Zero)) {
              let inputVal = fee || fee === 0
                ? Number((( Number(inputBalance) * (1 - Number(fee)) / Math.pow(10, inputDecimals)) ).toFixed(Math.min(8, inputDecimals)))
                : 0
              dispatchSwapState({
                type: 'UPDATE_INDEPENDENT',
                payload: {
                  value: amountFormatter(valueToSet, inputDecimals, inputDecimals, false),
                  field: INPUT,
                  realyValue: inputVal
                }
              })
            }
          }
        }}
        onCurrencySelected={inputCurrency => {
          dispatchSwapState({
            type: 'SELECT_CURRENCY',
            payload: { currency: inputCurrency, field: INPUT }
          })
        }}
        onValueChange={inputValue => {
          // console.log(inputBalanceFormatted)
          let inputVal = inputValue && (fee || fee === 0)
            ? Number(( Number(inputValue) * (1 - Number(fee)) ).toFixed(Math.min(8, inputDecimals)))
            : 0
          dispatchSwapState({
            type: 'UPDATE_INDEPENDENT',
            payload: { value: inputValue, field: INPUT, realyValue: bridgeType && bridgeType === 'redeem' ? inputVal : inputValue}
          })
        }}
        isSelfSymbol={bridgeType && bridgeType === 'redeem' && inputSymbol ? inputSymbol : (inputSymbol && inputSymbol.replace('a', ''))}
        isSelfLogo={bridgeType && bridgeType === 'redeem' && inputSymbol ? '' : (inputSymbol && inputSymbol.replace('a', ''))}
        isSelfName={bridgeType && bridgeType === 'redeem' && inputName ? '' : inputName.replace('SMPC ', '')}
        showUnlock={false}
        selectedTokens={[inputCurrency, outputCurrency]}
        selectedTokenAddress={inputCurrency}
        value={inputValueFormatted}
        hideETH={true}
        selfUseAllToken={selfUseAllToken}
        errorMessage={bridgeType && bridgeType === 'redeem' && Number(inputValueFormatted) > Number(inputBalanceFormatted) ? 'Error' : '' }
      />
      <OversizedPanel>
        <DownArrowBackground  onClick={changeMorR}>
          <img src={ResertSvg} alt={''} />
        </DownArrowBackground>
      </OversizedPanel>
      <CurrencyInputPanel
        // title={t('input')}
        title={t(bridgeType && bridgeType === 'redeem' ? 'receive' : 'receive')}
        urlAddedTokens={urlAddedTokens}
        extraText={bridgeType && bridgeType === 'redeem' && inputBalanceFormatted ? '' : inputBalanceFormatted && formatBalance(inputBalanceFormatted)}
        onCurrencySelected={inputCurrency => {
          dispatchSwapState({
            type: 'SELECT_CURRENCY',
            payload: { currency: inputCurrency, field: INPUT }
          })
        }}
        isSelfSymbol={bridgeType && bridgeType === 'redeem' && inputSymbol ? inputSymbol.replace('a', '') : inputSymbol}
        isSelfLogo={bridgeType && bridgeType === 'redeem' && inputSymbol ? inputSymbol.replace('a', '') : ''}
        isSelfName={bridgeType && bridgeType === 'redeem' && inputName ? inputName.replace('SMPC ', '') : ''}
        showUnlock={false}
        disableUnlock={true}
        selectedTokens={[inputCurrency, outputCurrency]}
        selectedTokenAddress={inputCurrency}
        value={realyValue ? realyValue : ''}
        hideETH={true}
        selfUseAllToken={selfUseAllToken}
      />
      {bridgeType && bridgeType === 'redeem' ? (
        <>
          <AddressInputPanel title={t('recipient') + ' ' + (inputSymbol ? inputSymbol.replace('a', '') : inputSymbol)  + ' ' + t('address')} onChange={setRecipient} onError={setRecipientError} initialInput={recipient} isValid={true} disabled={false}/>
        </>
      ) : (
        <>
          <InputPanel>
            <ContainerRow>
              <InputContainer>
                <LabelRow>
                  <LabelContainer>
                    <span>{t('deposit1') + ' ' + (inputSymbol ? inputSymbol.replace('a', '') : inputSymbol)  + ' ' + t('address')}</span>
                  </LabelContainer>
                </LabelRow>
                <InputRow>
                  <Input type="text" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" placeholder="" value={account && registerAddress ? registerAddress : ''} readOnly/>
                  {
                    account && registerAddress ? (
                      <>
                        {/* <StyledCopyICON size={'1.25rem'} onClick={copyAddr}></StyledCopyICON> */}
                        <StyledQRcode size={'1.25rem'} onClick={MintModelView}></StyledQRcode>
                      </>
                    ) : ('')
                  }
                </InputRow>
              </InputContainer>
            </ContainerRow>
          </InputPanel>
        </>
      )}
      {/* <OversizedPanel hideBottom>
      </OversizedPanel> */}
      <ExchangeRateWrapper>
        <ExchangeRate>{t('fee')}：</ExchangeRate>
        <span>
          {independentValue && (fee || fee === 0) && bridgeType && bridgeType === 'redeem'
            ? `${Number((Number(independentValue) * Number(fee)).toFixed(Math.min(8, inputDecimals)))} ${inputSymbol}`
            : ' - '}
        </span>
      </ExchangeRateWrapper>
      {
        (bridgeType && bridgeType === 'redeem') || !account || !registerAddress || inputSymbol === 'mBTC' ? '' : (
          <>
            <MintWarningTip>
            💀 {t('bridgeMintTip', { account })}
            </MintWarningTip>
          </>
        )
      }
      <WarningTip></WarningTip>
      {/* {!account ? (
        <Flex>
          <Button onClick={toggleWalletModal} >
            {t('connectToWallet')}
          </Button>
        </Flex>
      ) : ''
      } */}
      {isSwitch ? (
        <>
          <Flex>
            {bridgeType && bridgeType === 'redeem' ? (
              account ? (<>
                <Button
                  disabled={ isRedeemBtn }
                  onClick={account && !error ? sendTxns : toggleWalletModal}
                  warning={Number(inputBalanceFormatted) < Number(independentValue)}
                  loggedOut={!account}
                >
                  {!account
                    ? t('connectToWallet')
                    : (
                      <>
                        <StyledBirdgeIcon>
                          <img src={BirdgeIcon} alt={''} />
                          {t('redeem')}
                        </StyledBirdgeIcon>
                      </>
                      )}
                </Button>
              </>) : (
                <Button disabled={showBetaMessage} onClick={toggleWalletModal} >
                  {t('connectToWallet')}
                </Button>
              )
            ) : (
              account ? (<>
                <Button
                  disabled={isMintBtn}
                  onClick={account && !error ? MintModelView : toggleWalletModal}
                  warning={account && (!independentValue || Number(independentValue) > maxNum || Number(independentValue) < minNum)}
                  loggedOut={!account}
                >
                  {!account
                    ? t('connectToWallet')
                    : (
                      <> 
                        <img alt={''} src={BirdgeBtnIcon} style={{marginRight: '15px'}} />
                        {t('confirm')}
                      </>
                      )
                    }
                </Button>
              </>) : (
                <Button disabled={showBetaMessage} onClick={toggleWalletModal} >
                  {t('connectToWallet')}
                </Button>
              )
            )}
          </Flex>
        </>
      ) : (
        <>
          <Flex>
            <Button disabled={true}>
              {t('ComineSoon')}
            </Button>
          </Flex>
        </>
      )}
      {/* getErcBalance('USDT') */}
      <Flex>
        <Button onClick={() => {
          getErcBalance('USDT')
        }}>
          {t('ComineSoon')}
        </Button>
      </Flex>
    </>
  )
}
