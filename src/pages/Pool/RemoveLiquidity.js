import React, { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
// import ReactGA from 'react-ga'
import { createBrowserHistory } from 'history'
import { ethers } from 'ethers'
import styled from 'styled-components'

import { useWeb3React, useExchangeContract } from '../../hooks'
import { useTransactionAdder } from '../../contexts/Transactions'
import { useTokenDetails, useAllTokenDetails, INITIAL_TOKENS_CONTEXT } from '../../contexts/Tokens'
import { useAddressBalance } from '../../contexts/Balances'

import { calculateGasMargin, amountFormatter } from '../../utils'
import { brokenTokens } from '../../constants'

import { Button } from '../../theme'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import ContextualInfo from '../../components/ContextualInfo'
import OversizedPanel from '../../components/OversizedPanel'
import ArrowDown from '../../assets/svg/SVGArrowDown'
import WarningCard from '../../components/WarningCard'
import { useWalletModalToggle } from '../../contexts/Application'

import config from '../../config'
import EXCHANGE_ABI from '../../constants/abis/exchange'
import {getWeb3ConTract, getWeb3BaseInfo} from '../../utils/web3/txns'

import HardwareTip from '../../components/HardwareTip'
import ArrowDownIcon from '../../assets/images/icon/arrowDown.svg'

// import { ReactComponent as DropDown } from '../../assets/images/dropdown.svg'
import { ReactComponent as Dropup } from '../../assets/images/dropup-blue.svg'
import { ReactComponent as Dropdown } from '../../assets/images/dropdown-blue.svg'
import RemoveBlackIcon from '../../assets/images/icon/remove-black.svg'
import WeekIcon from '../../assets/images/icon/week.svg'
import FSNLogo from '../../assets/images/FSN.svg'

import TokenLogo from '../../components/TokenLogo'

// denominated in bips
const ALLOWED_SLIPPAGE = ethers.utils.bigNumberify(200)

// denominated in seconds
const DEADLINE_FROM_NOW = 60 * 15

// denominated in bips
const GAS_MARGIN = ethers.utils.bigNumberify(1000)

const BlueSpan = styled.span`
  font-family: Manrope;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: normal;
  color: #062536;
  margin: 0 5px;
`

const DownArrowBackground = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  object-fit: contain;
  border-radius: 6px;
  margin: 3px auto;
`

const DownArrow = styled(ArrowDown)`
  ${({ theme }) => theme.flexRowNoWrap}
  color: ${({ theme, active }) => (active ? theme.royalBlue : theme.doveGray)};
  width: 0.625rem;
  height: 0.625rem;
  position: relative;
  padding: 0.875rem;
`

const RemoveLiquidityOutput = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  min-height: 3.5rem;
`

const RemoveLiquidityOutputText = styled.div`
  font-size: 1.25rem;
  line-height: 1.5rem;
  padding: 1rem 0.75rem;
`

const RemoveLiquidityOutputPlus = styled.div`
  font-size: 1.25rem;
  line-height: 1.5rem;
  padding: 1rem 0;
`
const SummaryPanelBox = styled.div`
  ${({ theme }) => theme.FlexBC}
  height: 115px;
  object-fit: contain;
  border-radius: 9px;
  background-color: #ededed;
  margin-top:10px;
  padding: 18px 29px;
`
const SummaryPanel = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  padding: 1rem 0;
  min-width: 30%;
`
const LastSummaryTextBox = styled.div`
  width: 100%;
  height: 240px;
  object-fit: contain;
  border-radius: 9px;
  box-shadow: 7px 2px 26px 0 rgba(0, 0, 0, 0.06);
  background-color: #ffffff;
  padding: 25px 40px;
  margin-top: 10px;
`
const LastSummaryText = styled.div`
${({ theme }) => theme.FlexSC}
  font-family: Manrope;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: normal;
  color: #062536;
  height: 32px;
  margin-bottom: 10px;
  .icon {
    width: 32px;
    height: 32px;
    padding: 8px;
    object-fit: contain;
    border: solid 0.5px #c0d6ea;
    background-color: #ecf6ff;
    border-radius: 100%;
    margin-right: 10px;
  }
`

const LogoBox = styled.div`
  ${({ theme }) => theme.FlexSC}
  width: 30px;
  height: 30px;
  object-fit: contain;
  background-color: #ffffff;
  border-radius:100%;
  padding: 7px;
  margin: 0 0px 0 8px;
  img {
    height: 100%;
    display:block;
  }
`
const CoinInfoBox  = styled.div`
${({ theme }) => theme.FlexC}
font-family: Manrope;
  font-size: 14px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #062536;
  margin: 0 8px;
`

const LastSummaryText1 = styled.div`
${({ theme }) => theme.FlexSC}
  width: 100%;
  height: 54px;
  object-fit: contain;
  border-radius: 9px;
  border: solid 0.5px #c0d6ea;
  background-color: #ecf6ff;
  padding: 0 20px;
  font-family: Manrope;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: normal;
  color: #062536;
  margin-top:20px;
`

const ExchangeRateWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  color: ${({ theme }) => theme.doveGray};
  font-size: 0.75rem;
  padding: 8px 1rem ;
  height: 28px;
  border-bottom:1px solid #dadada;
  span {
    height: 12px;
    font-family: Manrope;
    font-size: 12px;
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
  height: 12px;
  font-family: Manrope;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: right;
  color: #062536;
  margin-right: 5px;
`

const Flex = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;

  button {
    max-width: 20rem;
  }
`
const TxnsDtilBtn = styled.div`
  ${({ theme }) => theme.FlexC};
  height: 34px;
  object-fit: contain;
  border-radius: 6px;
  background-color: #f9fafb;
  font-family: Manrope;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #062536;
  cursor:pointer;
  padding: 0 10px;
`

// const StyledDropDown = styled(DropDown)`
//   height: 35%;
//   margin-right: 10px;
//   path {
//     stroke: ${({ selected, theme }) => (selected ? theme.textColor : theme.royalBlue)};
//   }
// `

const WrappedDropup = ({ isError, highSlippageWarning, ...rest }) => <Dropup {...rest} />
const ColoredDropup = styled(WrappedDropup)`
margin-right: 10px;
  path {
    stroke: ${({ theme }) => theme.royalBlue};
  }
`

const WrappedDropdown = ({ isError, highSlippageWarning, ...rest }) => <Dropdown {...rest} />
const ColoredDropdown = styled(WrappedDropdown)`
margin-right: 10px;
  path {
    stroke: ${({ theme }) => theme.royalBlue};
  }
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

function calculateSlippageBounds(value) {
  if (value) {
    const offset = value.mul(ALLOWED_SLIPPAGE).div(ethers.utils.bigNumberify(10000))
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

export default function RemoveLiquidity({ params }) {
  const { t } = useTranslation()
  let { library, account, active, chainId } = useWeb3React()
  let walletType = sessionStorage.getItem('walletType')
  let HDPath = sessionStorage.getItem('HDPath')
  // account = config.supportWallet.includes(walletType) ? sessionStorage.getItem('account') : account
  const addTransaction = useTransactionAdder()

  const [brokenTokenWarning, setBrokenTokenWarning] = useState()

  let allTokens = useAllTokenDetails()

  // clear url of query
  useEffect(() => {
    const history = createBrowserHistory()
    history.push(window.location.pathname + '')
  }, [])

  const [outputCurrency, setOutputCurrency] = useState(params.poolTokenAddress ? params.poolTokenAddress : '0xC20b5E92E1ce63Af6FE537491f75C19016ea5fb4')
  const [value, setValue] = useState(params.poolTokenAmount ? params.poolTokenAmount : '')
  const [inputError, setInputError] = useState()
  const [valueParsed, setValueParsed] = useState()

  useEffect(() => {
    setBrokenTokenWarning(false)
    for (let i = 0; i < brokenTokens.length; i++) {
      if (brokenTokens[i].toLowerCase() === outputCurrency.toLowerCase()) {
        setBrokenTokenWarning(true)
      }
    }
  }, [outputCurrency])

  // parse value
  useEffect(() => {
    try {
      const parsedValue = ethers.utils.parseUnits(value, 18)
      setValueParsed(parsedValue)
    } catch {
      if (value !== '') {
        setInputError(t('inputNotValid'))
      }
    }

    return () => {
      setInputError()
      setValueParsed()
    }
  }, [t, value])

  const { symbol, decimals, exchangeAddress } = useTokenDetails(outputCurrency)

  const [totalPoolTokens, setTotalPoolTokens] = useState()
  const poolTokenBalance = useAddressBalance(account, exchangeAddress)
  const exchangeETHBalance = useAddressBalance(exchangeAddress, 'FSN')
  const exchangeTokenBalance = useAddressBalance(exchangeAddress, outputCurrency)

  const urlAddedTokens = {}
  if (params.poolTokenAddress) {
    urlAddedTokens[params.poolTokenAddress] = true
  }

  // input validation
  useEffect(() => {
    if (valueParsed && poolTokenBalance) {
      if (valueParsed.gt(poolTokenBalance)) {
        setInputError(t('insufficientBalance'))
      } else {
        setInputError(null)
      }
    }
  }, [poolTokenBalance, t, valueParsed])

  const exchange = useExchangeContract(exchangeAddress)

  const ownershipPercentage =
    poolTokenBalance && totalPoolTokens && !totalPoolTokens.isZero()
      ? poolTokenBalance.mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18))).div(totalPoolTokens)
      : undefined
  const ownershipPercentageFormatted = ownershipPercentage && amountFormatter(ownershipPercentage, 16, 4)

  const ETHOwnShare =
    exchangeETHBalance &&
    ownershipPercentage &&
    exchangeETHBalance.mul(ownershipPercentage).div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
  const TokenOwnShare =
    exchangeTokenBalance &&
    ownershipPercentage &&
    exchangeTokenBalance.mul(ownershipPercentage).div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))

  const ETHPer = exchangeETHBalance
    ? exchangeETHBalance.mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
    : undefined
  const tokenPer = exchangeTokenBalance
    ? exchangeTokenBalance.mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
    : undefined

  const ethWithdrawn =
    ETHPer && valueParsed && totalPoolTokens && !totalPoolTokens.isZero()
      ? ETHPer.mul(valueParsed)
          .div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
          .div(totalPoolTokens)
      : undefined
  const tokenWithdrawn =
    tokenPer && valueParsed && totalPoolTokens && !totalPoolTokens.isZero()
      ? tokenPer
          .mul(valueParsed)
          .div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
          .div(totalPoolTokens)
      : undefined

  const ethWithdrawnMin = ethWithdrawn ? calculateSlippageBounds(ethWithdrawn).minimum : undefined
  const tokenWithdrawnMin = tokenWithdrawn ? calculateSlippageBounds(tokenWithdrawn).minimum : undefined

  const fetchPoolTokens = useCallback(() => {
    if (exchange) {
      exchange.totalSupply().then(totalSupply => {
        setTotalPoolTokens(totalSupply)
      })
    }
  }, [exchange])
  useEffect(() => {
    fetchPoolTokens()
    library.on('block', fetchPoolTokens)

    return () => {
      library.removeListener('block', fetchPoolTokens)
    }
  }, [fetchPoolTokens, library])

  async function onRemoveLiquidity() {
    // take FSN amount, multiplied by FSN rate and 2 for total tx size
    let ethTransactionSize = (ethWithdrawn / 1e18) * 2

    const deadline = Math.ceil(Date.now() / 1000) + DEADLINE_FROM_NOW

    if (config.supportWallet.includes(walletType)) {
      setIsHardwareError(false)
      setIsHardwareTip(true)
      setHardwareTxnsInfo(`${amountFormatter(ethWithdrawn, 18, 4, false)} FSN` + ' + ' + `${amountFormatter(tokenWithdrawn, decimals, Math.min(4, decimals))} ${symbol}`)
      let web3Contract = getWeb3ConTract(EXCHANGE_ABI, exchangeAddress)

      let data = web3Contract.removeLiquidity.getData(valueParsed.toString(), ethWithdrawnMin.toString(), tokenWithdrawnMin.toString(), deadline)
      getWeb3BaseInfo(exchangeAddress, exchangeAddress, data, account).then(res => {
        console.log(res)
        if (res.msg === 'Success') {
          addTransaction(res.info)
          setIsHardwareTip(false)
        } else {
          setIsHardwareError(true)
        }
        // addTransaction(response)
      })
      return
    }

    const estimatedGasLimit = await exchange.estimate.removeLiquidity(
      valueParsed,
      ethWithdrawnMin,
      tokenWithdrawnMin,
      deadline
    )

    exchange
      .removeLiquidity(valueParsed, ethWithdrawnMin, tokenWithdrawnMin, deadline, {
        gasLimit: calculateGasMargin(estimatedGasLimit, GAS_MARGIN)
      })
      .then(response => {
        addTransaction(response)
      })
  }

  const b = text => <BlueSpan>{text}</BlueSpan>

  function renderTransactionDetails() {
    return (
      <LastSummaryTextBox>
        <LastSummaryText>
          <div className='icon'>
            <img src={RemoveBlackIcon} />
          </div>
          {t('youAreRemoving')} {b(`${amountFormatter(ethWithdrawn, 18, 4)} FSN`)} {t('and')}{' '}
          {b(`${amountFormatter(tokenWithdrawn, decimals, Math.min(decimals, 4))} ${symbol}`)} {t('outPool')}
        </LastSummaryText>
        <LastSummaryText>
        <div className='icon'>
            <img src={RemoveBlackIcon} />
          </div>
          {t('youWillRemove')} {b(amountFormatter(valueParsed, 18, 4))} {t('liquidityTokens')}
        </LastSummaryText>
        <LastSummaryText>
        <div className='icon'>
            <img src={WeekIcon} />
          </div>
          {t('totalSupplyIs')} {b(amountFormatter(totalPoolTokens, 18, 4))}
        </LastSummaryText>
        <LastSummaryText1>
          {t('tokenWorth')} 
          <LogoBox><img src={FSNLogo}/></LogoBox>
          <CoinInfoBox>{amountFormatter(ETHPer.div(totalPoolTokens), 18, 4) + ' '} FSN</CoinInfoBox>
          {t('and')}{' '}
          {/* {b(amountFormatter(ETHPer.div(totalPoolTokens), 18, 4))}  */}
          <LogoBox><TokenLogo  address={outputCurrency} size={'18px'} ></TokenLogo></LogoBox>
          <CoinInfoBox>{amountFormatter(tokenPer.div(totalPoolTokens), decimals, Math.min(4, decimals)) + ' '}   
          {symbol}</CoinInfoBox>
          {/* {b(amountFormatter(tokenPer.div(totalPoolTokens), decimals, Math.min(4, decimals)))} {symbol} */}
        </LastSummaryText1>
      </LastSummaryTextBox>
    )
  }
  
  // function renderSummary() {
  //   let contextualInfo = ''
  //   let isError = false
  //   if (brokenTokenWarning) {
  //     contextualInfo = t('brokenToken')
  //     isError = true
  //   } else if (inputError) {
  //     contextualInfo = inputError
  //     isError = true
  //   } else if (!outputCurrency || outputCurrency === 'FSN') {
  //     contextualInfo = t('selectTokenCont')
  //   } else if (!valueParsed) {
  //     contextualInfo = t('enterValueCont')
  //   } else if (!account) {
  //     contextualInfo = t('noWallet')
  //     isError = true
  //   }

  //   return (
  //     // <TxnsDtilBtn>
  //     //   <StyledDropDown></StyledDropDown>
  //     //   {t('transactionDetails')}
  //     // </TxnsDtilBtn>
  //     <ContextualInfo
  //       key="context-info"
  //       openDetailsText={t('transactionDetails')}
  //       closeDetailsText={t('hideDetails')}
  //       contextualInfo={contextualInfo}
  //       isError={isError}
  //       renderTransactionDetails={renderTransactionDetails}
  //     />
  //   )
  // }
  const [isViewTxnsDtil, setIsViewTxnsDtil] = useState(false)
  function txnsInfoTaggle () {
    let contextualInfo = ''
    let isError = false
    if (brokenTokenWarning) {
      contextualInfo = t('brokenToken')
      isError = true
    } else if (inputError) {
      contextualInfo = inputError
      isError = true
    } else if (!outputCurrency || outputCurrency === 'FSN') {
      contextualInfo = t('selectTokenCont')
    } else if (!valueParsed) {
      contextualInfo = t('enterValueCont')
    } else if (!account) {
      contextualInfo = t('noWallet')
      isError = true
    }

    return (
      <TxnsDtilBtn>
        {contextualInfo ? contextualInfo : (
          <>
            {
              isViewTxnsDtil ? (
                <div onClick={() => {
                  setIsViewTxnsDtil(!isViewTxnsDtil)
                }}>
                  <ColoredDropup></ColoredDropup>
                  {t('hideDetails')}
                </div>
              ) : (
                <div onClick={() => {
                  setIsViewTxnsDtil(!isViewTxnsDtil)
                }}>
                  <ColoredDropdown></ColoredDropdown>
                  {t('transactionDetails')}
                </div>
              )
            }
            {/* <StyledDropDown></StyledDropDown>
            {t('transactionDetails')} */}
          </>
        )}
      </TxnsDtilBtn>
    )
  }

  function formatBalance(value) {
    return `Balance: ${value}`
  }

  const isActive = active && account
  const isValid = inputError === null

  const marketRate = getMarketRate(exchangeETHBalance, exchangeTokenBalance, decimals)

  const newOutputDetected =
    outputCurrency !== 'FSN' && outputCurrency && !INITIAL_TOKENS_CONTEXT[chainId].hasOwnProperty(outputCurrency)

  const [showCustomTokenWarning, setShowCustomTokenWarning] = useState(false)
  
  const toggleWalletModal = useWalletModalToggle()

  useEffect(() => {
    if (newOutputDetected) {
      setShowCustomTokenWarning(true)
    } else {
      setShowCustomTokenWarning(false)
    }
  }, [newOutputDetected])

  const [isHardwareTip, setIsHardwareTip] = useState(false)
  const [isHardwareError, setIsHardwareError] = useState(false)
  const [hardwareTxnsInfo, setHardwareTxnsInfo] = useState('')

  return (
    <>
    <HardwareTip
        HardwareTipOpen={isHardwareTip}
        closeHardwareTip={() => {
          setIsHardwareTip(false)
        }}
        error={isHardwareError}
        txnsInfo={hardwareTxnsInfo}
      ></HardwareTip>
      {showCustomTokenWarning && (
        <WarningCard
          onDismiss={() => {
            setShowCustomTokenWarning(false)
          }}
          urlAddedTokens={urlAddedTokens}
          currency={outputCurrency}
        />
      )}
      <CurrencyInputPanel
        title={t('poolTokens')}
        extraText={poolTokenBalance && formatBalance(amountFormatter(poolTokenBalance, 18, 4))}
        extraTextClickHander={() => {
          if (poolTokenBalance) {
            const valueToSet = poolTokenBalance
            if (valueToSet.gt(ethers.constants.Zero)) {
              setValue(amountFormatter(valueToSet, 18, 18, false))
            }
          }
        }}
        urlAddedTokens={urlAddedTokens}
        onCurrencySelected={setOutputCurrency}
        onValueChange={setValue}
        value={value}
        errorMessage={inputError}
        selectedTokenAddress={outputCurrency}
        hideETH={true}
        isRange={true}
        tokenBalance={poolTokenBalance && amountFormatter(poolTokenBalance, 18, 4)}
      />
      <OversizedPanel>
        <DownArrowBackground>
          {/* <DownArrow active={isActive} alt="arrow" /> */}
          <img src={ArrowDownIcon} />
        </DownArrowBackground>
      </OversizedPanel>
      <CurrencyInputPanel
        title={t('output')}
        description={!!(ethWithdrawn && tokenWithdrawn) ? `(${t('estimated')})` : ''}
        key="remove-liquidity-input"
        renderInput={() =>
          !!(ethWithdrawn && tokenWithdrawn) ? (
            <RemoveLiquidityOutput>
              <RemoveLiquidityOutputText>
                {`${amountFormatter(ethWithdrawn, 18, 4, false)} FSN`}
              </RemoveLiquidityOutputText>
              <RemoveLiquidityOutputPlus> + </RemoveLiquidityOutputPlus>
              <RemoveLiquidityOutputText>
                {`${amountFormatter(tokenWithdrawn, decimals, Math.min(4, decimals))} ${symbol}`}
              </RemoveLiquidityOutputText>
            </RemoveLiquidityOutput>
          ) : (
            <RemoveLiquidityOutput />
          )
        }
        disableTokenSelect
        disableUnlock
      />
      <SummaryPanelBox>
        <>
          {txnsInfoTaggle()}
        </>
        <SummaryPanel>
          <ExchangeRateWrapper>
            <ExchangeRate>{t('exchangeRate')}：</ExchangeRate>
            {marketRate ? <span>{`1 FSN = ${amountFormatter(marketRate, 18, 4)} ${symbol}`}</span> : ' - '}
          </ExchangeRateWrapper>
          <ExchangeRateWrapper>
            <ExchangeRate>{t('currentPoolSize')}：</ExchangeRate>
            {exchangeETHBalance && exchangeTokenBalance && (decimals || decimals === 0) ? (
              <span>{`${amountFormatter(exchangeETHBalance, 18, 4)} FSN + ${amountFormatter(
                exchangeTokenBalance,
                decimals,
                Math.min(decimals, 4)
              )} ${symbol}`}</span>
            ) : (
              ' - '
            )}
          </ExchangeRateWrapper>
          <ExchangeRateWrapper>
            <ExchangeRate>
              {t('yourPoolShare')} ({ownershipPercentageFormatted && ownershipPercentageFormatted}%)：
            </ExchangeRate>
            {ETHOwnShare && TokenOwnShare ? (
              <span>
                {`${amountFormatter(ETHOwnShare, 18, 4)} FSN + ${amountFormatter(
                  TokenOwnShare,
                  decimals,
                  Math.min(decimals, 4)
                )} ${symbol}`}
              </span>
            ) : (
              ' - '
            )}
          </ExchangeRateWrapper>
        </SummaryPanel>

      </SummaryPanelBox>
      {/* <OversizedPanel key="remove-liquidity-input-under" hideBottom>
      </OversizedPanel> */}
      {/* {renderSummary()} */}
      {isViewTxnsDtil ? renderTransactionDetails() : ''}
      <Flex>
        {/* <Button disabled={!isValid} onClick={onRemoveLiquidity}>
          {t('removeLiquidity')}
        </Button> */}
        {
          account ? (
            <>
              <Button disabled={!isValid} onClick={onRemoveLiquidity}>
                {t('removeLiquidity')}
              </Button>
            </>
          ) : (
            <>
              <Button onClick={toggleWalletModal}>
                {t('connectToWallet')}
              </Button>
            </>
          )
        }
      </Flex>
    </>
  )
}
