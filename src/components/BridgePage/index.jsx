import React, { useState, useReducer, useEffect } from 'react'
import ReactGA from 'react-ga'
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

import { Button } from '../../theme'
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
import swapABI from '../../constants/abis/swapABI'
import swapETHABI from '../../constants/abis/swapETHABI'


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
`

const WrappedArrowDown = ({ clickable, active, ...rest }) => <ArrowDown {...rest} />
const DownArrow = styled(WrappedArrowDown)`
  color: ${({ theme, active }) => (active ? theme.royalBlue : theme.chaliceGray)};
  width: 0.625rem;
  height: 0.625rem;
  position: relative;
  padding: 0.875rem;
  cursor: ${({ clickable }) => clickable && 'pointer'};
`

const ExchangeRateWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  color: ${({ theme }) => theme.doveGray};
  font-size: 0.75rem;
  padding: 0.5rem 1rem;
`

const ExchangeRate = styled.span`
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
  box-shadow: 0 4px 8px 0 ${({ theme }) => transparentize(0.95, theme.shadowColor)};
  position: relative;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.inputBackground};
  z-index: 1;
`

const ContainerRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  border: 1px solid ${({ error, theme }) => (error ? theme.salmonRed : theme.mercuryGray)};

  background-color: ${({ theme }) => theme.inputBackground};
`

const InputContainer = styled.div`
  flex: 1;
`

const LabelRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  color: ${({ theme }) => theme.doveGray};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem;
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
  padding: 0.25rem 0.85rem 0.75rem;
`

const Input = styled.input`
  font-size: 1rem;
  outline: none;
  border: none;
  flex: 1 1 auto;
  width: 0;
  background-color: ${({ theme }) => theme.inputBackground};

  color: ${({ theme }) => theme.textColor};
  overflow: hidden;
  text-overflow: ellipsis;

  ::placeholder {
    color: ${({ theme }) => theme.placeholderGray};
  }
`

const MintDiv = styled.div`
  width: 100%;
  padding: 20px 15px;
`

const MintList = styled.div`
  border-bottom: 1px  solid ${({ error, theme }) => (error ? theme.salmonRed : theme.mercuryGray)};
  padding: 15px 8px;
  font-size: 14px;
`
const MintListCenter = styled(MintList)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`

const MintListLabel = styled.div`
  width: 100%;
`

const MintListVal = styled.div`
  width: 100%;
  cursor:pointer
`

const TokenLogoBox = styled(TokenLogo)`
  padding: 10px;
  background: none;
`

const MintTip = styled.div`
  position: fixed;
  top: 100px;
  right: 80px;
  border-radius: 4px;
  box-shadow:0 0 5px 0px #E1902E;
  z-index: 99;
  cursor:pointer;
  .txt {
    width: 0;height: 100%;white-space: nowrap;overflow: hidden;transition: width 0.5s;
  }
  &:hover {
    .txt {
      width: 150px;padding: 0 20px;
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
`

// const StyledCopyICON = styled(copyICON)`
//   width: ${({ size }) => size};
//   height: ${({ size }) => size};
//   margin: 0 10px;
//   cursor:pointer;
// `


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
    inputCurrency: state.inputCurrencyURL ? state.inputCurrencyURL : '0xeaeaeb2cf9921a084ef528f43e9e121e8291a947',
    outputCurrency: state.outputCurrencyURL
      ? state.outputCurrencyURL === 'FSN'
        ? !state.inputCurrencyURL || (state.inputCurrencyURL && state.inputCurrencyURL !== 'FSN')
          ? 'FSN'
          : ''
        : state.outputCurrencyURL
      : state.initialCurrency
      ? state.initialCurrency
      : '0xeaeaeb2cf9921a084ef528f43e9e121e8291a947'
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
  '0xeaeaeb2cf9921a084ef528f43e9e121e8291a947',
  '0xbe4c389770e07bd10b21561d3fd0513d5ad8fe00',
  '0x708751fa3be6ad90a09521202c85aa74d9ac2081'
]
let historyInterval 
let swapInfo = ''
export default function ExchangePage({ initialCurrency, sending = false, params }) {
  const { t } = useTranslation()
  let { account, chainId, error } = useWeb3React()
  let walletType = sessionStorage.getItem('walletType')
  let HDPath = sessionStorage.getItem('HDPath')
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

  const [brokenTokenWarning, setBrokenTokenWarning] = useState()

  // const [deadlineFromNow, setDeadlineFromNow] = useState(DEFAULT_DEADLINE_FROM_NOW)

  const [rawSlippage, setRawSlippage] = useState(() => initialSlippage())
  const [rawTokenSlippage, setRawTokenSlippage] = useState(() => initialSlippage(true))

  const allowedSlippageBig = ethers.utils.bigNumberify(rawSlippage)
  const tokenAllowedSlippageBig = ethers.utils.bigNumberify(rawTokenSlippage)

  // analytics
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

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
  const { symbol: inputSymbol, decimals: inputDecimals, exchangeAddress: inputExchangeAddress } = useTokenDetails(
    inputCurrency
  )
  // console.log(inputSymbol)
  const { symbol: outputSymbol, decimals: outputDecimals, exchangeAddress: outputExchangeAddress } = useTokenDetails(
    outputCurrency
  )

  useEffect(() => {
    // console.log(CoinInfo[inputSymbol])
    GetServerInfo(config.CoinInfo[inputSymbol].url).then(res => {
      console.log(res)
      // console.log(getWeb3ConTract(res.swapInfo.DestToken.ContractAddress))
      if (bridgeType && bridgeType === 'redeem') {
        swapInfo = res.swapInfo.DestToken
      } else {
        swapInfo = res.swapInfo.SrcToken
        if (inputSymbol !== 'mBTC') {
          dispatchSwapState({
            type: 'UPDATE_SWAPREGISTER',
            payload: swapInfo.DcrmAddress
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
  }, [inputSymbol, bridgeType, account])
  // const inputExchangeContract = useExchangeContract(inputExchangeAddress)
  // const outputExchangeContract = useExchangeContract(outputExchangeAddress)
  // const contract = swapType === ETH_TO_TOKEN ? outputExchangeContract : inputExchangeContract
  // const contract = outputExchangeContract

  // get input allowance
  const inputAllowance = useAddressAllowance(account, inputCurrency, inputExchangeAddress)

  // fetch reserves for each of the currency types
  const { reserveETH: inputReserveETH, reserveToken: inputReserveToken } = useExchangeReserves(inputCurrency)
  const { reserveETH: outputReserveETH, reserveToken: outputReserveToken } = useExchangeReserves(outputCurrency)

  // get balances for each of the currency types
  const inputBalance = useAddressBalance(account, inputCurrency)
  // const outputBalance = useAddressBalance(account, outputCurrency)
  const inputBalanceFormatted = !!(inputBalance && Number.isInteger(inputDecimals))
    ? amountFormatter(inputBalance, inputDecimals, inputDecimals)
    : ''
  // const outputBalanceFormatted = !!(outputBalance && Number.isInteger(outputDecimals))
  //   ? amountFormatter(outputBalance, outputDecimals, Math.min(4, outputDecimals))
  //   : ''

  // compute useful transforms of the data above
  const independentDecimals = independentField === INPUT ? inputDecimals : outputDecimals
  const dependentDecimals = independentField === OUTPUT ? inputDecimals : outputDecimals

  // declare/get parsed and formatted versions of input/output values
  const [independentValueParsed, setIndependentValueParsed] = useState()
  const dependentValueFormatted = !!(dependentValue && (dependentDecimals || dependentDecimals === 0))
    ? amountFormatter(dependentValue, dependentDecimals, Math.min(4, dependentDecimals), false)
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

  // calculate slippage from target rate
  const { minimum: dependentValueMinumum, maximum: dependentValueMaximum } = calculateSlippageBounds(
    dependentValue,
    swapType === TOKEN_TO_TOKEN,
    tokenAllowedSlippageBig,
    allowedSlippageBig
  )


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

  useEffect(() => {
    const history = createBrowserHistory()
    history.push(window.location.pathname + '')
  }, [])

  function formatBalance(value) {
    return `Balance: ${value}`
  }
  const [customSlippageError, setcustomSlippageError] = useState('')

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

  const tokenContract = useSwapTokenContract(inputCurrency, swapABI)
  const tokenETHContract = useSwapTokenContract(inputCurrency, swapETHABI)
  function sendTxns () {
    let amountVal = Number(independentValue) * Math.pow(10, inputDecimals)
    amountVal = amountVal.toFixed(0)
    let address = inputSymbol === 'mBTC' ? recipient.address : ''
    if (config.supportWallet.includes(walletType)) {
      console.log(swapInfo)
      console.log(amountVal)
      let web3Contract = getWeb3ConTract(swapABI, swapInfo.ContractAddress)
      let data = web3Contract.Swapout.getData(amountVal, address)
      if (inputSymbol !== 'mBTC') {
        web3Contract = getWeb3ConTract(swapETHABI, swapInfo.ContractAddress)
        data = web3Contract.Swapout.getData(amountVal)
      }
      getWeb3BaseInfo(swapInfo.ContractAddress, swapInfo.ContractAddress, data, account).then(res => {
        if (res.msg === 'Success') {
          addTransaction(res.info)
        } else {
          alert(res.error)
        }
      })
      return
    }

    if (inputSymbol !== 'mBTC') {
      tokenETHContract.Swapout(amountVal).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    } else {
      tokenContract.Swapout(amountVal, address).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
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
  }
  function copyAddr () {
    copyTxt(registerAddress)
  }
  return (
    <>
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
                <MintListLabel>{t('deposit1')} {inputSymbol && inputSymbol.replace('m', '')} {t('amount')}:</MintListLabel>
                <MintListVal>{independentValue}</MintListVal>
              </MintList>
            </>
          ) : ''}
          <MintList>
            <MintListLabel>{t('deposit1')} {inputSymbol && inputSymbol.replace('m', '')} {t('address')}:</MintListLabel>
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
            <MintListVal>{mintHistory && mintHistory.mintValue && swapInfo && swapInfo.SwapFeeRate ? Number(mintHistory.mintValue) * Number(swapInfo.SwapFeeRate) : 0}</MintListVal>
          </MintList>
          <MintList>
            <MintListLabel>{t('receive')}:</MintListLabel>
            <MintListVal>{mintHistory && mintHistory.mintValue && swapInfo && swapInfo.SwapFeeRate ? Number(mintHistory.mintValue) * (1 - Number(swapInfo.SwapFeeRate)) : ''}</MintListVal>
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
                  <FlexCneter><TokenLogoBox size={'34px'} address={inputSymbol ? 'BTC' : inputSymbol.replace('m', '')} /></FlexCneter>
                  <span className="txt"><FlexCneter>Waiting for deposit</FlexCneter></span>
                </FlexCneter>
              </MintTip>
            </>
          )
          :
          ''
      }
      <CurrencyInputPanel
        // title={t('input')}
        title={t(bridgeType && bridgeType === 'redeem' ? 'redeem' : 'deposit1')}
        urlAddedTokens={urlAddedTokens}
        extraText={bridgeType && bridgeType === 'redeem' && inputBalanceFormatted ? formatBalance(inputBalanceFormatted) : ''}
        onCurrencySelected={inputCurrency => {
          dispatchSwapState({
            type: 'SELECT_CURRENCY',
            payload: { currency: inputCurrency, field: INPUT }
          })
        }}
        onValueChange={inputValue => {
          console.log(inputBalanceFormatted)
          let inputVal = inputValue && swapInfo && (swapInfo.SwapFeeRate || swapInfo.SwapFeeRate === 0)
            ? Number(( Number(inputValue) * (1 - Number(swapInfo.SwapFeeRate)) ).toFixed(inputDecimals))
            : 0
          dispatchSwapState({
            type: 'UPDATE_INDEPENDENT',
            payload: { value: inputValue, field: INPUT, realyValue: inputVal }
          })
        }}
        isSelfSymbol={bridgeType && bridgeType === 'redeem' && inputSymbol ? inputSymbol : (inputSymbol && inputSymbol.replace('m', ''))}
        isSelfLogo={bridgeType && bridgeType === 'redeem' && inputSymbol ? '' : (inputSymbol && inputSymbol.replace('m', ''))}
        showUnlock={false}
        selectedTokens={[inputCurrency, outputCurrency]}
        selectedTokenAddress={inputCurrency}
        value={inputValueFormatted}
        hideETH={true}
        selfUseAllToken={selfUseAllToken}
        errorMessage={bridgeType && bridgeType === 'redeem' && Number(inputValueFormatted) > Number(inputBalanceFormatted) ? 'Error' : '' }
        // errorMessage={bridgeType === 'mint' ? '' : (inputError ? inputError : ( independentField === INPUT ? independentError : '') )}
      />
      <OversizedPanel>
        <DownArrowBackground>
          <DownArrow onClick={changeMorR} clickable alt="swap" />
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
        isSelfSymbol={bridgeType && bridgeType === 'redeem' && inputSymbol ? inputSymbol.replace('m', '') : inputSymbol}
        isSelfLogo={bridgeType && bridgeType === 'redeem' && inputSymbol ? inputSymbol.replace('m', '') : ''}
        showUnlock={false}
        disableUnlock={true}
        selectedTokens={[inputCurrency, outputCurrency]}
        selectedTokenAddress={inputCurrency}
        value={realyValue ? realyValue : ''}
        hideETH={true}
        selfUseAllToken={selfUseAllToken}
      />
      <OversizedPanel>
        <DownArrowBackground>
          <DownArrow clickable alt="swap" />
        </DownArrowBackground>
      </OversizedPanel>
      {bridgeType && bridgeType === 'redeem' ? (
        <>
          <AddressInputPanel title={t('recipient') + ' ' + (inputSymbol ? inputSymbol.replace('m', '') : inputSymbol)  + ' ' + t('address')} onChange={setRecipient} onError={setRecipientError} initialInput={recipient} isValid={true} disabled={false}/>
        </>
      ) : (
        <>
          <InputPanel>
            <ContainerRow>
              <InputContainer>
                <LabelRow>
                  <LabelContainer>
                    <span>{t('deposit1') + ' ' + (inputSymbol ? inputSymbol.replace('m', '') : inputSymbol)  + ' ' + t('address')}</span>
                  </LabelContainer>
                </LabelRow>
                <InputRow>
                  <Input type="text" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" placeholder="" value={account && registerAddress ? registerAddress : ''} readOnly/>
                  {
                    account && registerAddress ? (
                      <>
                        {/* <StyledCopyICON size={'20px'} onClick={copyAddr}></StyledCopyICON> */}
                        <StyledQRcode size={'20px'} onClick={MintModelView}></StyledQRcode>
                      </>
                    ) : ('')
                  }
                </InputRow>
              </InputContainer>
            </ContainerRow>
          </InputPanel>
        </>
      )}
      <OversizedPanel hideBottom>
        <ExchangeRateWrapper>
          <ExchangeRate>{t('fee')}</ExchangeRate>
          <span>
            {independentValue && swapInfo && (swapInfo.SwapFeeRate || swapInfo.SwapFeeRate === 0) && bridgeType && bridgeType === 'redeem'
              ? `${Number(independentValue) * Number(swapInfo.SwapFeeRate)} ${inputSymbol}`
              : ' - '}
          </span>
        </ExchangeRateWrapper>
      </OversizedPanel>
      <Flex>
        {bridgeType && bridgeType === 'redeem' ? (
          <>
            <Button
              disabled={
                !account && !error ? false : !independentValue || !recipient.address
              }
              onClick={account && !error ? sendTxns : toggleWalletModal}
              warning={Number(inputBalanceFormatted) < Number(independentValue) || customSlippageError === 'warning'}
              loggedOut={!account}
            >
              {!account
                ? t('connectToWallet')
                : t('redeem')}
            </Button>
          </>
        ) : (
          <>
            <Button
              disabled={
                !account && !error ? false : !independentValue || !registerAddress || !swapInfo || Number(independentValue) > swapInfo.MaximumSwap || Number(independentValue) < swapInfo.MinimumSwap
              }
              onClick={account && !error ? MintModelView : toggleWalletModal}
              warning={account && (!independentValue || !swapInfo || Number(independentValue) > swapInfo.MaximumSwap || Number(independentValue) < swapInfo.MinimumSwap)}
              loggedOut={!account}
            >
              {!account
                ? t('connectToWallet')
                : t('confirm')}
            </Button>
          </>
        )}
      </Flex>
    </>
  )
}
