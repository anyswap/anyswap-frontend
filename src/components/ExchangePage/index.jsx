import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { darken } from 'polished'
import { ethers } from 'ethers'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { useWeb3React } from '../../hooks'
import { brokenTokens } from '../../constants'
import { amountFormatter, calculateGasMargin, isAddress } from '../../utils'

import { useExchangeContract } from '../../hooks'
import { useTokenDetails, INITIAL_TOKENS_CONTEXT } from '../../contexts/Tokens/index.js'
import { useTransactionAdder } from '../../contexts/Transactions'
import { useAddressBalance, useExchangeReserves } from '../../contexts/Balances'
import { useAddressAllowance } from '../../contexts/Allowances'
import { useWalletModalToggle } from '../../contexts/Application'

import { Button } from '../../theme'
import CurrencyInputPanel from '../CurrencyInputPanel'
import AddressInputPanel from '../AddressInputPanel'
import OversizedPanel from '../OversizedPanel'
import TransactionDetails from '../TransactionDetails'
import Modal from '../Modal'
import ModalContent from '../Modal/ModalContent'
// import ArrowDown from '../../assets/svg/SVGArrowDown'
import WarningCard from '../WarningCard'
import config from '../../config'

import {getWeb3ConTract, getWeb3BaseInfo} from '../../utils/web3/txns'
import EXCHANGE_ABI from '../../constants/abis/exchange'

import HardwareTip from '../HardwareTip'

import ResertSvg from '../../assets/images/icon/revert.svg'

import { ReactComponent as Dropup } from '../../assets/images/dropup-blue.svg'
import { ReactComponent as Dropdown } from '../../assets/images/dropdown-blue.svg'
import SwapWhiteIcon from '../../assets/images/icon/swap-white.svg'
import SendWhiteIcon from '../../assets/images/icon/send-white.svg'

import { useBetaMessageManager } from '../../contexts/LocalStorage'
import WarningTip from '../WarningTip'

import {recordTxns} from '../../utils/records'

import Title from '../Title'
import {
  DownArrowBackground,
  Flex
} from '../Styled'


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

// % above the calculated gas cost that we actually send, denominated in bips
const GAS_MARGIN = ethers.utils.bigNumberify(1000)


// const WrappedArrowDown = ({ clickable, active, ...rest }) => <ArrowDown {...rest} />
// const DownArrow = styled(WrappedArrowDown)`
//   color: ${({ theme, active }) => (active ? theme.textColorBold : theme.textColorBold)};
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
  background: rgba(255,255,255,.3);
  img {
    height: 100%;
    display: block;
  }
`
const ExchangeRateWrapperBox = styled.div`
${({ theme }) => theme.FlexBC};
width: 100%;
height: 48px;
object-fit: contain;
border-radius: 0.5625rem;
background: ${({ theme }) => theme.tipContentBg};
padding: 0 2.5rem;
margin-top:0.625rem;
@media screen and (max-width: 960px) {
  padding:0;
  height: auto;
  justify-content:center;;
  background: none;
  flex-wrap:wrap;
  flex-direction: column;
}
`

const ExchangeRateWrapper = styled.div`
${({ theme }) => theme.FlexEC};
  width: 70%;
  font-family: 'Manrope';
  font-size: 0.75rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: right;
  color: ${({ theme }) => theme.textColorBold};
  span {
    height: 0.75rem;
    font-size: 0.75rem;
    font-weight: 800;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: right;
    color: ${({ theme }) => theme.textColorBold};
  }
  @media screen and (max-width: 960px) {
    width: 100%;
    background-color: ${({ theme }) => theme.tipContentBg};
    padding: 8px 1rem;
    ${({ theme }) => theme.FlexSC};
  }
`

const ExchangeRate = styled.div`
  flex: 1 1 auto;
  width: 0;
  color: ${({ theme }) => theme.doveGray};
`

const WrappedDropup = ({ isError, highSlippageWarning, ...rest }) => <Dropup {...rest} />
const ColoredDropup = styled(WrappedDropup)`
margin-right: 0.625rem;
  path {
    stroke: ${({ theme }) => theme.royalBlue};
  }
`

const WrappedDropdown = ({ isError, highSlippageWarning, ...rest }) => <Dropdown {...rest} />
const ColoredDropdown = styled(WrappedDropdown)`
margin-right: 0.625rem;
  path {
    stroke: ${({ theme }) => theme.royalBlue};
  }
`
const TxnsDtilBtn = styled.div`
  ${({ theme }) => theme.FlexC};
  height: 34px;
  object-fit: contain;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.moreBtn};
  font-family: 'Manrope';
  font-size: 0.75rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #734be2;
  cursor:pointer;
  padding: 0 0.625rem;
  .left {
    
  }
  .red {
    color:red;
  }
  .slippage {
    ${({ theme }) => theme.FlexC};
    height: 100%;
    font-size: 0.75rem;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.83;
    letter-spacing: normal;
    color: ${({ theme }) => theme.textColorBold};
    padding-left:0.75rem;
    border-left:0.0625rem solid ${({ theme }) => theme.tipContentBg};
    img {
      margin-right: 0.4375rem;
    }
  }
  @media screen and (max-width: 960px) {
    padding: 8px 0.625rem;
    height: auto;
    marign: auto;
    margin-bottom:0.625rem;
  }
`
const TransactionInfo = styled.div`
font-family: 'Manrope';
  padding: 2rem 1.25rem 1.5625rem;
  border-bottom: 0.0625rem solid #dadada;
  @media screen and (max-width: 960px) {
    padding: 0 0.625rem 0.625rem;
    height: auto;
  }
`
const LastSummaryText = styled.div`
${({ theme }) => theme.FlexSC}
font-family: 'Manrope';
  font-size: 0.75rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: normal;
  color: ${({ theme }) => theme.textColorBold};
  height: 32px;
  margin-bottom: 0.625rem;
  .icon {
    width: 32px;
    height: 32px;
    padding: 8px;
    object-fit: contain;
    border: solid 0.5px #c0d6ea;
    background-color: #ecf6ff;
    border-radius: 100%;
    margin-right: 0.625rem;
    img {
      height: 100%;
      display:block;
    }
  }
`
const ValueWrapper = styled.span`
${({ theme }) => theme.FlexC};
  font-family: 'Manrope';
  padding: 0.125rem 0.3rem 0.1rem 0.3rem;
  // background-color: ${({ theme }) => darken(0.04, theme.concreteGray)};
  background-color: ${({ theme }) => theme.dtilTxtBg};
  border-radius: 0.75rem;
  font-variant: tabular-nums;
`
const Bold = styled.span`
  font-size: 0.75rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: normal;
  white-space:nowrap;
  color: ${({ theme }) => theme.textColorBold};
  margin: 0 5px;
`

function calculateSlippageBounds(value, token = false, tokenAllowedSlippage, allowedSlippage) {
  if (value) {
    const offset = value.mul(token ? tokenAllowedSlippage : allowedSlippage).div(ethers.utils.bigNumberify(10000))
    const minimum = value.sub(offset)
    const maximum = value.add(offset)
    return {
      minimum: minimum.lt(ethers.constants.Zero) ? ethers.constants.Zero : minimum,
      maximum: maximum.gt(ethers.constants.MaxUint256) ? ethers.constants.MaxUint256 : maximum
    }
  } else {
    return {}
  }
}

function getSwapType(inputCurrency, outputCurrency) {
  if (!inputCurrency || !outputCurrency) {
    return null
  } else if (inputCurrency === config.symbol) {
    return ETH_TO_TOKEN
  } else if (outputCurrency === config.symbol) {
    return TOKEN_TO_ETH
  } else {
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
    inputCurrency: state.inputCurrencyURL ? state.inputCurrencyURL : state.outputCurrencyURL === config.symbol ? '' : config.symbol,
    outputCurrency: state.outputCurrencyURL
      ? state.outputCurrencyURL === config.symbol
        ? !state.inputCurrencyURL || (state.inputCurrencyURL && state.inputCurrencyURL !== config.symbol)
          ? config.symbol
          : ''
        : state.outputCurrencyURL
      : state.initialCurrency
      ? state.initialCurrency
      : config.initToken
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
      const { field, value } = action.payload
      const { dependentValue, independentValue } = state
      return {
        ...state,
        independentValue: value,
        dependentValue: value === independentValue ? dependentValue : '',
        independentField: field
      }
    }
    case 'UPDATE_DEPENDENT': {
      return {
        ...state,
        dependentValue: action.payload
      }
    }
    default: {
      return getInitialSwapState()
    }
  }
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
      // console.log(invert)
      // console.log(factor)
      // console.log(inputValue)
      // console.log(outputValue)
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

function getMarketRate(
  swapType,
  inputReserveETH,
  inputReserveToken,
  inputDecimals,
  outputReserveETH,
  outputReserveToken,
  outputDecimals,
  invert = false
) {
  if (swapType === ETH_TO_TOKEN) {
    return getExchangeRate(outputReserveETH, 18, outputReserveToken, outputDecimals, invert)
  } else if (swapType === TOKEN_TO_ETH) {
    return getExchangeRate(inputReserveToken, inputDecimals, inputReserveETH, 18, invert)
  } else if (swapType === TOKEN_TO_TOKEN) {
    const factor = ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18))
    const firstRate = getExchangeRate(inputReserveToken, inputDecimals, inputReserveETH, 18)
    const secondRate = getExchangeRate(outputReserveETH, 18, outputReserveToken, outputDecimals)
    try {
      return !!(firstRate && secondRate) ? firstRate.mul(secondRate).div(factor) : undefined
    } catch {}
  }
}

// export default function ExchangePage({ initialCurrency, sending = false, params }) {
export default function ExchangePage({ initialCurrency, params }) {
  const { t } = useTranslation()
  let { account, chainId, error } = useWeb3React()
  const [showBetaMessage] = useBetaMessageManager()
  let walletType = sessionStorage.getItem('walletType')
  let HDPath = sessionStorage.getItem('HDPath')
  params = params ? params : {}
  // account = config.supportWallet.includes(walletType) ? sessionStorage.getItem('account') : account
  const urlAddedTokens = {}
  if (params && params.inputCurrency) {
    urlAddedTokens[params.inputCurrency] = true
  }
  if (params && params.outputCurrency) {
    urlAddedTokens[params.outputCurrency] = true
  }
  if (params && params.tokenAddress) {
    urlAddedTokens[params.tokenAddress] = true
  }
  if (isAddress(initialCurrency)) {
    urlAddedTokens[initialCurrency] = true
  }
  // console.log(urlAddedTokens)

  const addTransaction = useTransactionAdder()

  // check if URL specifies valid slippage, if so use as default
  const initialSlippage = (token = false) => {
    let slippage = Number.parseInt(params.slippage)
    if (!isNaN(slippage) && (slippage === 0 || slippage >= 1)) {
      return slippage // round to match custom input availability
    }
    // check for token <-> token slippage option
    return token ? TOKEN_ALLOWED_SLIPPAGE_DEFAULT : ALLOWED_SLIPPAGE_DEFAULT
  }

  // check URL params for recipient, only on send page
  const initialRecipient = () => {
    if (sending && params.recipient) {
      return params.recipient
    }
    return ''
  }

  const [sending, setSending] = useState(false)

  const [brokenTokenWarning, setBrokenTokenWarning] = useState()

  const [deadlineFromNow, setDeadlineFromNow] = useState(DEFAULT_DEADLINE_FROM_NOW)

  const [rawSlippage, setRawSlippage] = useState(() => initialSlippage())
  const [rawTokenSlippage, setRawTokenSlippage] = useState(() => initialSlippage(true))

  const [slippageView, setSlippageView] = useState(false)

  const allowedSlippageBig = ethers.utils.bigNumberify(rawSlippage)
  const tokenAllowedSlippageBig = ethers.utils.bigNumberify(rawTokenSlippage)

  // analytics
  // useEffect(() => {
  //   ReactGA.pageview(window.location.pathname + window.location.search)
  // }, [])

  // core swap state
  const [swapState, dispatchSwapState] = useReducer(
    swapStateReducer,
    {
      initialCurrency: initialCurrency,
      inputCurrencyURL: params.inputCurrency,
      outputCurrencyURL: params.outputCurrency || params.tokenAddress,
      exactFieldURL: params.exactField,
      exactAmountURL: params.exactAmount
    },
    getInitialSwapState
  )

  const { independentValue, dependentValue, independentField, inputCurrency, outputCurrency } = swapState

  useEffect(() => {
    setBrokenTokenWarning(false)
    for (let i = 0; i < brokenTokens.length; i++) {
      if (
        brokenTokens[i].toLowerCase() === outputCurrency.toLowerCase() ||
        brokenTokens[i].toLowerCase() === inputCurrency.toLowerCase()
      ) {
        setBrokenTokenWarning(true)
      }
    }
  }, [outputCurrency, inputCurrency])

  const [recipient, setRecipient] = useState({
    address: initialRecipient(),
    name: ''
  })
  const [recipientError, setRecipientError] = useState()

  // get swap type from the currency types
  const swapType = getSwapType(inputCurrency, outputCurrency)

  // get decimals and exchange address for each of the currency types
  const { symbol: inputSymbol, decimals: inputDecimals, exchangeAddress: inputExchangeAddress, isSwitch: inputIsSwitch } = useTokenDetails(
    inputCurrency
  )
  const { symbol: outputSymbol, decimals: outputDecimals, exchangeAddress: outputExchangeAddress, isSwitch: outputIsSwitch } = useTokenDetails(
    outputCurrency
  )

  const inputExchangeContract = useExchangeContract(inputExchangeAddress)
  const outputExchangeContract = useExchangeContract(outputExchangeAddress)
  const contract = swapType === ETH_TO_TOKEN ? outputExchangeContract : inputExchangeContract

  // get input allowance
  const inputAllowance = useAddressAllowance(account, inputCurrency, inputExchangeAddress)

  // fetch reserves for each of the currency types
  const { reserveETH: inputReserveETH, reserveToken: inputReserveToken } = useExchangeReserves(inputCurrency)
  const { reserveETH: outputReserveETH, reserveToken: outputReserveToken } = useExchangeReserves(outputCurrency)

  // get balances for each of the currency types
  const inputBalance = useAddressBalance(account, inputCurrency)
  const outputBalance = useAddressBalance(account, outputCurrency)
  const inputBalanceFormatted = !!(inputBalance && Number.isInteger(inputDecimals))
    ? amountFormatter(inputBalance, inputDecimals, Math.min(6, inputDecimals))
    : ''
  const outputBalanceFormatted = !!(outputBalance && Number.isInteger(outputDecimals))
    ? amountFormatter(outputBalance, outputDecimals, Math.min(6, outputDecimals))
    : ''

  // compute useful transforms of the data above
  const independentDecimals = independentField === INPUT ? inputDecimals : outputDecimals
  const dependentDecimals = independentField === OUTPUT ? inputDecimals : outputDecimals

  // declare/get parsed and formatted versions of input/output values
  const [independentValueParsed, setIndependentValueParsed] = useState()
  const dependentValueFormatted = !!(dependentValue && (dependentDecimals || dependentDecimals === 0))
    ? amountFormatter(dependentValue, dependentDecimals, dependentDecimals, false)
    // ? amountFormatter(dependentValue, dependentDecimals, Math.min(6, dependentDecimals), false)
    : ''
  const inputValueParsed = independentField === INPUT ? independentValueParsed : dependentValue
  const outputValueParsed = independentField === OUTPUT ? independentValueParsed : dependentValue
  let inputValueFormatted = independentField === INPUT ? independentValue : dependentValueFormatted
  let outputValueFormatted = independentField === OUTPUT ? independentValue : dependentValueFormatted
  if (independentField) {
    inputValueFormatted *= 1 + 0.001
    inputValueFormatted = Number(inputValueFormatted.toFixed(dependentDecimals)) ? Number(inputValueFormatted.toFixed(Math.min(8, dependentDecimals))) : ''
  } else {
    outputValueFormatted *= 1 - 0.001
    outputValueFormatted = Number(outputValueFormatted.toFixed(dependentDecimals)) ? Number(outputValueFormatted.toFixed(Math.min(8, dependentDecimals))) : ''
    // console.log(outputValueFormatted)
    // outputValueFormatted = outputValueFormatted ? ethers.utils.bigNumberify(outputValueFormatted).toString() : ''
  }
  // console.log(ethers.utils.bigNumberify(''))
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

  // calculate slippage from target rate
  const { minimum: dependentValueMinumum, maximum: dependentValueMaximum } = calculateSlippageBounds(
    dependentValue,
    swapType === TOKEN_TO_TOKEN,
    tokenAllowedSlippageBig,
    allowedSlippageBig
  )

  // validate input allowance + balance
  const [inputError, setInputError] = useState()
  const [showUnlock, setShowUnlock] = useState(false)
  useEffect(() => {
    const inputValueCalculation = independentField === INPUT ? independentValueParsed : dependentValueMaximum
    if (inputBalance && (inputAllowance || inputCurrency === config.symbol) && inputValueCalculation) {
      if (inputBalance.lt(inputValueCalculation)) {
        setInputError(t('insufficientBalance'))
      } else if (inputCurrency !== config.symbol && inputAllowance.lt(inputValueCalculation)) {
        setInputError(t('unlockTokenCont'))
        setShowUnlock(true)
      } else {
        setInputError(null)
        setShowUnlock(false)
      }
      return () => {
        setInputError()
        setShowUnlock(false)
      }
    }
  }, [independentField, independentValueParsed, dependentValueMaximum, inputBalance, inputCurrency, inputAllowance, t])

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

  // useEffect(() => {
  //   const history = createBrowserHistory()
  //   history.push(window.location.pathname + '')
  // }, [])

  const [inverted, setInverted] = useState(false)
  const exchangeRate = getExchangeRate(inputValueParsed, inputDecimals, outputValueParsed, outputDecimals)
  const exchangeRateInverted = getExchangeRate(inputValueParsed, inputDecimals, outputValueParsed, outputDecimals, true)

  const marketRate = getMarketRate(
    swapType,
    inputReserveETH,
    inputReserveToken,
    inputDecimals,
    outputReserveETH,
    outputReserveToken,
    outputDecimals
  )

  const percentSlippage =
    exchangeRate && marketRate && !marketRate.isZero()
      ? exchangeRate
          .sub(marketRate)
          .abs()
          .mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
          .div(marketRate)
          .sub(ethers.utils.bigNumberify(3).mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(15))))
      : undefined
  const percentSlippageFormatted = percentSlippage && amountFormatter(percentSlippage, 16, 2)
  const slippageWarning =
    percentSlippage &&
    percentSlippage.gte(ethers.utils.parseEther('.05')) &&
    percentSlippage.lt(ethers.utils.parseEther('.2')) // [5% - 20%)
  const highSlippageWarning = percentSlippage && percentSlippage.gte(ethers.utils.parseEther('.2')) // [20+%

  const isValid = sending
    ? exchangeRate && inputError === null && independentError === null && recipientError === null && deadlineFromNow
    : exchangeRate && inputError === null && independentError === null && deadlineFromNow

  const estimatedText = `(${t('estimated')})`
  function formatBalance(value) {
    return `Balance: ${value}`
  }

  const [isDisabled, setIsDisableed] = useState(true)

  const onSwapValid = useCallback(() => {
    if (!isNaN(percentSlippageFormatted) && Number(percentSlippageFormatted) >= 5) {
      setSlippageView(true)
    } else {
      onSwap()
    }
  }, [percentSlippageFormatted, onSwap])

  async function onSwap() {
    if (!isDisabled) return
    setIsDisableed(false)
    setTimeout(() => {
      setIsDisableed(true)
    }, 3000)
    const deadline = Math.ceil(Date.now() / 1000) + deadlineFromNow

    let estimate, method, args, value
    let txnsType = sending ? 'SEND' : 'SWAP'

    
    // if (config.supportWallet.includes(walletType)) {
    if (config.supportWallet.includes(walletType)) {
      setIsHardwareError(false)
      setIsHardwareTip(true)
      setHardwareTxnsInfo(inputValueFormatted + inputSymbol)
      let contractAddress = swapType === ETH_TO_TOKEN ? outputExchangeAddress : inputExchangeAddress
      let web3Contract = getWeb3ConTract(EXCHANGE_ABI, contractAddress)
      let data = ''
      if (independentField === INPUT) {
  
        if (swapType === ETH_TO_TOKEN) {
          value = independentValueParsed
          data = sending ? 
          // web3Contract.ethToTokenTransferInput.getData(dependentValueMinumum.toHexString(), deadline, recipient.address)
          web3Contract.methods.ethToTokenTransferInput(dependentValueMinumum.toHexString(), deadline, recipient.address).encodeABI()
          :
          // web3Contract.ethToTokenSwapInput.getData(dependentValueMinumum.toHexString(), deadline)
          web3Contract.methods.ethToTokenSwapInput(dependentValueMinumum.toHexString(), deadline).encodeABI()
        } else if (swapType === TOKEN_TO_ETH) {
          value = ethers.constants.Zero
          data = sending ? 
                    // web3Contract.tokenToEthTransferInput.getData(independentValueParsed.toString(), dependentValueMinumum.toString(), deadline, recipient.address) 
                    web3Contract.methods.tokenToEthTransferInput(independentValueParsed.toString(), dependentValueMinumum.toString(), deadline, recipient.address).encodeABI()
                    : 
                    // web3Contract.tokenToEthSwapInput.getData(independentValueParsed.toString(), dependentValueMinumum.toString(), deadline)
                    web3Contract.methods.tokenToEthSwapInput(independentValueParsed.toString(), dependentValueMinumum.toString(), deadline).encodeABI()
        } else if (swapType === TOKEN_TO_TOKEN) {
          value = ethers.constants.Zero
          data = sending ?
                  // web3Contract.tokenToTokenTransferInput.getData(
                  // independentValueParsed.toHexString(),
                  // dependentValueMinumum.toHexString(),
                  // ethers.constants.One.toHexString(),
                  // deadline,
                  // recipient.address,
                  // outputCurrency)
                  web3Contract.methods.tokenToTokenTransferInput(
                    independentValueParsed.toHexString(),
                    dependentValueMinumum.toHexString(),
                    ethers.constants.One.toHexString(),
                    deadline,
                    recipient.address,
                    outputCurrency).encodeABI()
                  :
                  // web3Contract.tokenToTokenSwapInput.getData(independentValueParsed.toHexString(), dependentValueMinumum.toHexString(), ethers.constants.One.toHexString(), deadline, outputCurrency)
                  web3Contract.methods.tokenToTokenSwapInput(independentValueParsed.toHexString(), dependentValueMinumum.toHexString(), ethers.constants.One.toHexString(), deadline, outputCurrency).encodeABI()
        }
      } else if (independentField === OUTPUT) {
  
        if (swapType === ETH_TO_TOKEN) {
          value = dependentValueMaximum
          data = sending ?
            // web3Contract.ethToTokenTransferOutput.getData(independentValueParsed.toHexString(), deadline, recipient.address)
            web3Contract.methods.ethToTokenTransferOutput(independentValueParsed.toHexString(), deadline, recipient.address).encodeABI()
            :
            web3Contract.methods.ethToTokenSwapOutput(independentValueParsed.toHexString(), deadline).encodeABI()
        } else if (swapType === TOKEN_TO_ETH) {
          value = ethers.constants.Zero
          data = sending ?
            // web3Contract.tokenToEthTransferOutput.getData(independentValueParsed.toHexString(), dependentValueMaximum.toHexString(), deadline, recipient.address)
            web3Contract.methods.tokenToEthTransferOutput(independentValueParsed.toHexString(), dependentValueMaximum.toHexString(), deadline, recipient.address).encodeABI()
            : 
            // web3Contract.tokenToEthSwapOutput.getData(independentValueParsed.toHexString(), dependentValueMaximum.toHexString(), deadline)
            web3Contract.methods.tokenToEthSwapOutput(independentValueParsed.toHexString(), dependentValueMaximum.toHexString(), deadline).encodeABI()
        } else if (swapType === TOKEN_TO_TOKEN) {
          value = ethers.constants.Zero
          data = sending ?
          web3Contract.methods.tokenToTokenTransferOutput(
                independentValueParsed.toHexString(),
                dependentValueMaximum.toHexString(),
                ethers.constants.MaxUint256.toHexString(),
                deadline,
                recipient.address,
                outputCurrency
          ).encodeABI()
          :
          // web3Contract.tokenToTokenSwapOutput.getData(independentValueParsed.toHexString(), dependentValueMaximum.toHexString(), ethers.constants.MaxUint256.toHexString(), deadline, outputCurrency)
          web3Contract.methods.tokenToTokenSwapOutput(independentValueParsed.toHexString(), dependentValueMaximum.toHexString(), ethers.constants.MaxUint256.toHexString(), deadline, outputCurrency).encodeABI()
        }
      }
      // console.log(data)
      value = swapType === ETH_TO_TOKEN ? value.toHexString() : 0
      // console.log(value)
      
      getWeb3BaseInfo(contractAddress, data, account, value).then(res => {
        // console.log(res)
        if (res.msg === 'Success') {
          addTransaction(res.info)
          recordTxns(res.info, txnsType, inputSymbol + '/' + outputSymbol, account, recipient.address)
          setIsHardwareTip(false)
          dispatchSwapState({
            type: 'UPDATE_INDEPENDENT',
            payload: { value: '', field: INPUT }
          })
          dispatchSwapState({
            type: 'UPDATE_INDEPENDENT',
            payload: { value: '', field: OUTPUT }
          })
          setIsViewTxnsDtil(false)
        } else {
          setIsHardwareError(true)
        }
      })
      return
    }

    if (independentField === INPUT) {

      if (swapType === ETH_TO_TOKEN) {
        estimate = sending ? contract.estimate.ethToTokenTransferInput : contract.estimate.ethToTokenSwapInput
        method = sending ? contract.ethToTokenTransferInput : contract.ethToTokenSwapInput
        args = sending ? [dependentValueMinumum, deadline, recipient.address] : [dependentValueMinumum, deadline]
        value = independentValueParsed
      } else if (swapType === TOKEN_TO_ETH) {
        estimate = sending ? contract.estimate.tokenToEthTransferInput : contract.estimate.tokenToEthSwapInput
        method = sending ? contract.tokenToEthTransferInput : contract.tokenToEthSwapInput
        args = sending
          ? [independentValueParsed, dependentValueMinumum, deadline, recipient.address]
          : [independentValueParsed, dependentValueMinumum, deadline]
        value = ethers.constants.Zero
        
      } else if (swapType === TOKEN_TO_TOKEN) {
        estimate = sending ? contract.estimate.tokenToTokenTransferInput : contract.estimate.tokenToTokenSwapInput
        method = sending ? contract.tokenToTokenTransferInput : contract.tokenToTokenSwapInput
        args = sending
          ? [
              independentValueParsed,
              dependentValueMinumum,
              ethers.constants.One,
              deadline,
              recipient.address,
              outputCurrency
            ]
          : [independentValueParsed, dependentValueMinumum, ethers.constants.One, deadline, outputCurrency]
        value = ethers.constants.Zero
      }
    } else if (independentField === OUTPUT) {

      if (swapType === ETH_TO_TOKEN) {
        estimate = sending ? contract.estimate.ethToTokenTransferOutput : contract.estimate.ethToTokenSwapOutput
        method = sending ? contract.ethToTokenTransferOutput : contract.ethToTokenSwapOutput
        args = sending ? [independentValueParsed, deadline, recipient.address] : [independentValueParsed, deadline]
        value = dependentValueMaximum
      } else if (swapType === TOKEN_TO_ETH) {
        estimate = sending ? contract.estimate.tokenToEthTransferOutput : contract.estimate.tokenToEthSwapOutput
        method = sending ? contract.tokenToEthTransferOutput : contract.tokenToEthSwapOutput
        args = sending
          ? [independentValueParsed, dependentValueMaximum, deadline, recipient.address]
          : [independentValueParsed, dependentValueMaximum, deadline]
        value = ethers.constants.Zero
      } else if (swapType === TOKEN_TO_TOKEN) {
        estimate = sending ? contract.estimate.tokenToTokenTransferOutput : contract.estimate.tokenToTokenSwapOutput
        method = sending ? contract.tokenToTokenTransferOutput : contract.tokenToTokenSwapOutput
        args = sending
          ? [
              independentValueParsed,
              dependentValueMaximum,
              ethers.constants.MaxUint256,
              deadline,
              recipient.address,
              outputCurrency
            ]
          : [independentValueParsed, dependentValueMaximum, ethers.constants.MaxUint256, deadline, outputCurrency]
        value = ethers.constants.Zero
      }
    }
    
    const estimatedGasLimit = await estimate(...args, { value })
    method(...args, {
      value,
      gasLimit: calculateGasMargin(estimatedGasLimit, GAS_MARGIN)
    }).then(response => {
      // console.log(response)
      addTransaction(response)
      recordTxns(response, txnsType, inputSymbol + '/' + outputSymbol, account, recipient.address)
      dispatchSwapState({
        type: 'UPDATE_INDEPENDENT',
        payload: { value: '', field: INPUT }
      })
      dispatchSwapState({
        type: 'UPDATE_INDEPENDENT',
        payload: { value: '', field: OUTPUT }
      })
      setIsViewTxnsDtil(false)
    }).catch(err => {
      console.log(err)
    })
  }

  const [customSlippageError, setcustomSlippageError] = useState('')

  const toggleWalletModal = useWalletModalToggle()

  const newInputDetected =
    inputCurrency !== config.symbol && inputCurrency && !INITIAL_TOKENS_CONTEXT[chainId].hasOwnProperty(inputCurrency)

  const newOutputDetected =
    outputCurrency !== config.symbol && outputCurrency && !INITIAL_TOKENS_CONTEXT[chainId].hasOwnProperty(outputCurrency)

  const [showInputWarning, setShowInputWarning] = useState(false)
  const [showOutputWarning, setShowOutputWarning] = useState(false)
  
  const [isHardwareTip, setIsHardwareTip] = useState(false)
  const [isHardwareError, setIsHardwareError] = useState(false)
  const [hardwareTxnsInfo, setHardwareTxnsInfo] = useState('')

  const b = text => <Bold>{text}</Bold>

  useEffect(() => {
    if (newInputDetected) {
      setShowInputWarning(true)
    } else {
      setShowInputWarning(false)
    }
  }, [newInputDetected, setShowInputWarning])

  useEffect(() => {
    if (newOutputDetected) {
      setShowOutputWarning(true)
    } else {
      setShowOutputWarning(false)
    }
  }, [newOutputDetected, setShowOutputWarning])

  const [isViewTxnsDtil, setIsViewTxnsDtil] = useState(false)
  function txnsInfoTaggle () {
    let contextualInfo = ''
    let isError = false
    if (brokenTokenWarning) {
      contextualInfo = t('brokenToken')
      isError = true
    } else if (inputError || independentError) {
      contextualInfo = inputError || independentError
      isError = true
    } else if (!inputCurrency || !outputCurrency) {
      contextualInfo = t('selectTokenCont')
    } else if (!independentValue) {
      contextualInfo = t('enterValueCont')
    } else if (sending && !recipient.address) {
      contextualInfo = t('noRecipient')
    } else if (sending && !isAddress(recipient.address)) {
      contextualInfo = t('invalidRecipient')
    } else if (!account) {
      contextualInfo = t('noWallet')
      isError = true
    }

    const slippageWarningText = highSlippageWarning
      ? t('highSlippageWarning')
      : slippageWarning
      ? t('slippageWarning')
      : ''

    contextualInfo = slippageWarningText ? slippageWarningText : contextualInfo 
    let allowExpand= !!(
      !brokenTokenWarning &&
      inputCurrency &&
      outputCurrency &&
      inputValueParsed &&
      outputValueParsed &&
      (sending ? recipient.address : true)
    )

    return (
      <>
        {config.dirSwitchFn(inputIsSwitch) && config.dirSwitchFn(outputIsSwitch) ? (
          <TxnsDtilBtn>
            <div className={'left' + (isError ? ' red' : '')}>
              {!allowExpand && contextualInfo ? contextualInfo : (
                <>
                <div onClick={() => {
                  setIsViewTxnsDtil(!isViewTxnsDtil)
                }}>
                  {
                    isViewTxnsDtil ? (
                      <ColoredDropup></ColoredDropup>
                    ) : (
                      <ColoredDropdown></ColoredDropdown>
                    )
                  }
                  {
                    contextualInfo ? contextualInfo : isViewTxnsDtil ? t('hideDetails') : t('transactionDetails')
                  }
                </div>
                </>
              )}
            </div>
            {/* <div className='slippage'>
              <img src={AlippageIcon}/>
              Slippage Warning
            </div> */}
          </TxnsDtilBtn>
        ) : (<div></div>) }
      </>
    )
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
      {showOutputWarning && (
        <WarningCard
          onDismiss={() => {
            setShowOutputWarning(false)
          }}
          urlAddedTokens={urlAddedTokens}
          currency={outputCurrency}
        />
      )}
      <Modal isOpen={slippageView} maxHeight={800}>
        <ModalContent onClose={() => {setSlippageView(false)}}>
          <TransactionInfo>
            <LastSummaryText>
              {t('youAreSelling')}{' '}
              <ValueWrapper>
                {b(
                  `${amountFormatter(
                    independentValueParsed,
                    independentDecimals,
                    Math.min(6, independentDecimals)
                  )} ${inputSymbol}`
                )}
              </ValueWrapper>{' '}
              {t('forAtLeast')}
              <ValueWrapper>
                {b(
                  `${amountFormatter(
                    dependentValueMinumum,
                    dependentDecimals,
                    Math.min(6, dependentDecimals)
                  )} ${outputSymbol}`
                )}
              </ValueWrapper>
            </LastSummaryText>
            <LastSummaryText>
              {t('priceChange')} <ValueWrapper>{b(`${percentSlippageFormatted}%`)}</ValueWrapper>
            </LastSummaryText>
          </TransactionInfo>
          <Flex>
            <Button onClick={onSwap} disabled={
              brokenTokenWarning || !isDisabled || showBetaMessage ? true : !account && !error ? false : !isValid || customSlippageError === 'invalid'
            }>
              {t('swapAnyway')}
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
      <Title
        title={t('swap')}
        tabList={[
          {
            name: t('swap'),
            onTabClick: name => {
              setSending(false)
            },
            iconUrl: require('../../assets/images/icon/swap.svg'),
            iconActiveUrl: require('../../assets/images/icon/swap-white.svg')
          },
          {
            name: t('send'),
            onTabClick: name => {
              setSending(true)
            },
            iconUrl: require('../../assets/images/icon/send.svg'),
            iconActiveUrl: require('../../assets/images/icon/send-white.svg')
          }
        ]}
      ></Title>
      <CurrencyInputPanel
        title={t('input')}
        urlAddedTokens={urlAddedTokens}
        description={inputValueFormatted && independentField === OUTPUT ? estimatedText : ''}
        extraText={inputBalanceFormatted && formatBalance(inputBalanceFormatted)}
        extraTextClickHander={() => {
          if (inputBalance && inputDecimals) {
            const valueToSet = inputCurrency === config.symbol ? inputBalance.sub(ethers.utils.parseEther('.1')) : inputBalance
            if (valueToSet.gt(ethers.constants.Zero)) {
              dispatchSwapState({
                type: 'UPDATE_INDEPENDENT',
                payload: {
                  value: amountFormatter(valueToSet, inputDecimals, inputDecimals, false),
                  field: INPUT
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
          dispatchSwapState({
            type: 'UPDATE_INDEPENDENT',
            payload: { value: inputValue, field: INPUT }
          })
        }}
        showUnlock={showUnlock}
        selectedTokens={[inputCurrency, outputCurrency]}
        selectedTokenAddress={inputCurrency}
        value={inputValueFormatted}
        errorMessage={inputError ? inputError : independentField === INPUT ? independentError : ''}
      />
      <OversizedPanel>
        {/* <DownArrowBackground>
          <DownArrow
            onClick={() => {
              dispatchSwapState({ type: 'FLIP_INDEPENDENT' })
            }}
            clickable
            alt="swap"
            active={isValid}
          >
          <img src={ResertSvg} />
          </DownArrow>
        </DownArrowBackground> */}
        <DownArrowBackground  onClick={() => {
          dispatchSwapState({ type: 'FLIP_INDEPENDENT' })
        }}>
          <img src={ResertSvg} alt={''} />
        </DownArrowBackground>
      </OversizedPanel>
      <CurrencyInputPanel
        title={t('output')}
        description={outputValueFormatted && independentField === INPUT ? estimatedText : ''}
        extraText={outputBalanceFormatted && formatBalance(outputBalanceFormatted)}
        urlAddedTokens={urlAddedTokens}
        onCurrencySelected={outputCurrency => {
          dispatchSwapState({
            type: 'SELECT_CURRENCY',
            payload: { currency: outputCurrency, field: OUTPUT }
          })
        }}
        onValueChange={outputValue => {
          dispatchSwapState({
            type: 'UPDATE_INDEPENDENT',
            payload: { value: outputValue, field: OUTPUT }
          })
        }}
        selectedTokens={[inputCurrency, outputCurrency]}
        selectedTokenAddress={outputCurrency}
        value={outputValueFormatted}
        errorMessage={independentField === OUTPUT ? independentError : ''}
        disableUnlock
      />
      {sending ? (
        <>
          {/* <OversizedPanel>
            <DownArrowBackground>
              <DownArrow active={isValid} alt="arrow" />
            </DownArrowBackground>
          </OversizedPanel> */}
          <AddressInputPanel isShowTip={false} onChange={setRecipient} onError={setRecipientError} initialInput={recipient} />
        </>
      ) : (
        ''
      )}
      <ExchangeRateWrapperBox>
        {txnsInfoTaggle()}
        <ExchangeRateWrapper
          onClick={() => {
            setInverted(inverted => !inverted)
          }}
        >
          <ExchangeRate>{t('exchangeRate')}：</ExchangeRate>
          {inverted ? (
            <span>
              {exchangeRate
                ? `1 ${inputSymbol} = ${amountFormatter(exchangeRate, 18, 6, false)} ${outputSymbol}`
                : ' - '}
            </span>
          ) : (
            <span>
              {exchangeRate
                ? `1 ${outputSymbol} = ${amountFormatter(exchangeRateInverted, 18, 6, false)} ${inputSymbol}`
                : ' - '}
            </span>
          )}
        </ExchangeRateWrapper>
      </ExchangeRateWrapperBox>
      {isViewTxnsDtil ? (
        <TransactionDetails
          account={account}
          setRawSlippage={setRawSlippage}
          setRawTokenSlippage={setRawTokenSlippage}
          rawSlippage={rawSlippage}
          slippageWarning={slippageWarning}
          highSlippageWarning={highSlippageWarning}
          brokenTokenWarning={brokenTokenWarning}
          setDeadline={setDeadlineFromNow}
          deadline={deadlineFromNow}
          inputError={inputError}
          independentError={independentError}
          inputCurrency={inputCurrency}
          outputCurrency={outputCurrency}
          independentValue={independentValue}
          independentValueParsed={independentValueParsed}
          independentField={independentField}
          INPUT={INPUT}
          inputValueParsed={inputValueParsed}
          outputValueParsed={outputValueParsed}
          inputSymbol={inputSymbol}
          outputSymbol={outputSymbol}
          dependentValueMinumum={dependentValueMinumum}
          dependentValueMaximum={dependentValueMaximum}
          dependentDecimals={dependentDecimals}
          independentDecimals={independentDecimals}
          percentSlippageFormatted={percentSlippageFormatted}
          setcustomSlippageError={setcustomSlippageError}
          recipientAddress={recipient.address}
          sending={sending}
        />
      ) : (
        ''
      )}
      <WarningTip></WarningTip>
      {config.dirSwitchFn(inputIsSwitch) && config.dirSwitchFn(outputIsSwitch) ? (
        <Flex>
          <Button
            disabled={
              brokenTokenWarning || !isDisabled || showBetaMessage ? true : !account && !error ? false : !isValid || customSlippageError === 'invalid'
            }
            onClick={account && !error ? onSwapValid : toggleWalletModal}
            warning={highSlippageWarning || customSlippageError === 'warning'}
            loggedOut={!account}
          >
            {
              sending ? (
                <img alt={''} src={SendWhiteIcon} style={{marginRight: '15px'}} />
              ) : (
                <img alt={''} src={SwapWhiteIcon} style={{marginRight: '15px'}} />
              )
            }
            {brokenTokenWarning
              ? 'Swap'
              : !account
              ? t('connectToWallet')
              : sending
              ? highSlippageWarning || customSlippageError === 'warning'
                ? t('sendAnyway')
                : t('send')
              : highSlippageWarning || customSlippageError === 'warning'
              ? t('swapAnyway')
              : t('swap')}
          </Button>
        </Flex>
      ) : (
        <Flex>
          <Button disabled={true}>
            {t('ComineSoon')}
          </Button>
        </Flex>
      )}
    </>
  )
}
