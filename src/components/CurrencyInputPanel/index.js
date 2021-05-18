
import React, { useState, useRef, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ethers } from 'ethers'
import styled from 'styled-components'
import escapeStringRegex from 'escape-string-regexp'
import { darken } from 'polished'
import Tooltip from '@reach/tooltip'
import '@reach/tooltip/styles.css'
import { isMobile } from 'react-device-detect'

import { BorderlessInput } from '../../theme'
import { useWeb3React, useTokenContract } from '../../hooks'
import { isAddress, calculateGasMargin, formatTokenBalance, formatEthBalance } from '../../utils'
import { ReactComponent as DropDown } from '../../assets/images/dropdown.svg'
import Modal from '../Modal'
import TokenLogo from '../TokenLogo'
import SearchIcon from '../../assets/images/icon/search.svg'
import { useTransactionAdder, usePendingApproval } from '../../contexts/Transactions'
import { useTokenDetails, useAllTokenDetails, INITIAL_TOKENS_CONTEXT } from '../../contexts/Tokens/index.js'
import { useAddressBalance } from '../../contexts/Balances'
import { ReactComponent as Close } from '../../assets/images/x.svg'
import { Spinner } from '../../theme'
import Circle from '../../assets/images/circle-grey.svg'
import { useAllBalances } from '../../contexts/Balances'

import config from '../../config'
import {getWeb3ConTract, getWeb3BaseInfo} from '../../utils/web3/txns'
import erc20 from '../../constants/abis/erc20'

import HardwareTip from '../HardwareTip'

import Paste from '../../assets/images/icon/paste.svg'
import Unlock from '../../assets/images/icon/unlock.svg'
import UnlockBlack from '../../assets/images/icon/unlockBlack.svg'
import Warning from '../../assets/images/icon/warning.svg'
import NoCoinIcon from '../../assets/images/icon/no-coin.svg'
import ScheduleIcon from '../../assets/images/icon/schedule.svg'

import {
  InputPanel,
  LabelRow,
  LabelContainer,
  InputRow,
  Input
} from '../Styled'

const GAS_MARGIN = ethers.utils.bigNumberify(1000)

export const SubCurrencySelect = styled.button`
  ${({ theme }) => theme.FlexC}
  width: 110px;
  height: 1.875rem;
  border-radius: 6px;
  outline: none;
  cursor: pointer;
  user-select: none;
  background: #734be2;
  border: #734be2;
  color: ${({ theme }) => theme.inputBackground};

  &.otherView {
    background:${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColorBold}
  }
`

export const SubCurrencySelectBox = styled.div`
  ${({ theme }) => theme.FlexBC}
  width: 100%;
  height: 48px;
  object-fit: contain;
  border-radius: 0.5625rem;
  border: solid 0.5px ${({ theme }) => theme.tipBorder};
  background-color: ${({ theme }) => theme.tipBg};
  padding: 0 2.5rem;
  margin-top: 0.625rem;
  div {
    ${({ theme }) => theme.FlexSC}
    p {
      font-family: 'Manrope';
      font-size: 0.75rem;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      color: #734be2;
      margin-left:8px;
    }
  }
`

export const CurrencySelect = styled.button`
  align-items: center;
  color: ${({ selected, theme }) => (selected ? theme.textColor : '#031a6e')};
  font-size: ${({ selected, theme }) => (selected ? '1rem' : '12px')};
  height: 70px;
  font-family: 'Manrope';
  width: 220px;
  border: 0.0625rem solid ${({ theme }) => theme.selectedBorder};
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.selectedBg};
  outline: none;
  cursor: pointer;
  user-select: none;
  padding: 0 1.25rem;
  position: relative;

  :hover {
    border: 0.0625rem solid ${({ theme }) => theme.selectedHoverBorder};
    background: ${({ theme }) => theme.selectedHoverBg};
  }

  :focus {
    border: 0.0625rem solid ${({ theme }) => darken(0.1, theme.selectedBorder)};
  }

  :active {
    background-color: ${({ theme }) => darken(0.1, theme.selectedBorder)};
  }
  @media screen and (max-width: 960px) {
    width: 50%;
    padding: 0 0.625rem;
  }
`

export const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0px 1.625rem 0 51px;
  width:100%;
  height:100%;
  &.pl-0{
    padding-left:0;
  }
`

export const StyledDropDownBox = styled.div`
  ${({ theme }) => theme.FlexC}
  width: 1.625rem;
  height: 1.625rem;
  background: ${({ theme }) => theme.backgroundColor};
  border-radius: 100%;
  position: absolute;
  top: 1.25rem;
  right: 0px;
`

export const StyledDropDown = styled(DropDown)`
  height: 35%;

  path {
    stroke: ${({ selected, theme }) => (selected ? theme.textColor : theme.royalBlue)};
  }
`

export const Container = styled.div`
  border-radius: 1.25rem;
`

export const ErrorSpanBox = styled.div`
  height: 70px;
  width: 220px;
  margin-left: 0.625rem;
  @media screen and (max-width: 960px) {
    display:none;
  }
`
export const ErrorSpan = styled.span`
  display:flex;
  align-items: center;
  padding: 1rem 1.25rem;
  font-size: 1rem;
  height: 100%;
  color: ${({ selected, theme }) => (selected ? theme.textColor : theme.royalBlue)};
  border: 0.0625rem solid ${({theme}) => theme.selectedBorderNo};
  background-color: ${({theme}) => theme.selectedBgNo};
  border-radius: 0.75rem;
  outline: none;
  cursor: pointer;
  user-select: none;

  :hover {
    cursor: pointer;
    color: ${({ error, theme }) => error && darken(0.1, theme.salmonRed)};
    border: 0.0625rem solid ${({theme}) => theme.selectedHoverBorderNo};
    background-color: ${({theme}) => theme.selectedHoverBgNo};
  }
`

export const ExtraText = styled.div`
  width: 100%;
  font-family: 'Manrope';
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  position:relative;
  color: ${({theme}) => theme.textColorBold};
  h5 {
    font-weight: normal;
    line-height: 1;
    font-size: 0.75rem;
    margin: 0.25rem 0;
  }
  p  {
    font-size: 0.875rem;
    line-height: 1.43;
    margin:0;
    font-weight: 800;
  }
`

export const PasteStyle = styled.div`
  width: 1rem;
  height: 1rem;
  position: absolute;
  top: 0.75rem;
  right: 0;
`

export const TokenModal = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  width: 100%;
  padding: 1rem;
`

export const ModalHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 0px 0px 1rem;
  height: 60px;
  font-family: 'Manrope';
  p {
    color: ${({theme}) => theme.textColorBold};
    font-size: 0.875rem;
    font-weight: bold;
  }
`

export const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.textColor};
  }
`

export const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 0.875rem;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

export const SearchContainer = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  justify-content: flex-start;
  min-height: 2.5rem;
  padding: 0 1rem;
  border-radius: 0.5625rem;
  box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.04);
  border: solid 0.5px rgba(0, 0, 0, 0.1);
  overflow:hidden;
  box-sizing: border-box;
  margin-bottom: 1.25rem;
`

export const StyledBorderlessInput = styled(BorderlessInput)`
  height: 100%;
  flex-shrink: 0;
  text-align: left;
  padding-left: 0.8rem;
  background-color: none;
  font-family: 'Manrope';
  color: ${({theme}) => theme.textColorBold};
  ::placeholder {
    font-size: 0.75rem;
    color: ${({theme}) => theme.textColorBold};
  }
`

export const TokenModalInfo = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: 1rem 1.5rem;
  margin: 0.25rem 0.5rem;
  justify-content: center;
  user-select: none;
`

export const TokenList = styled.div`
  flex-grow: 1;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`

export const TokenModalRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  cursor: pointer;
  user-select: none;
  border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.08);
  position:relative;

  #symbol {
    color: ${({ theme }) => theme.doveGrey};
  }

  :hover {
    background-color: ${({ theme }) => theme.tokenRowHover};
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 0.8rem 1rem;
    padding-right: 2rem;
  `}
`

export const TokenRowLeft = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items : center;
`

export const TokenSymbolGroup = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  margin-left: 1rem;
  font-family: 'Manrope';
  span {
    font-size: 1rem;
    font-weight: 800;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: normal;
    color: ${({theme}) => theme.selectTextColor};
  }
`

export const TokenFullName = styled.div`
  color: ${({ theme }) => theme.chaliceGray};
  font-family: 'Manrope';
  font-size: 0.75rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: ${({theme}) => theme.selectTextColor};
  margin-top: 0.125rem;
`

export const FadedSpan = styled.span`
  color: ${({ theme }) => theme.royalBlue};
`
export const TokenRowBalanceText = styled.span`
  width: 100%;
  display:block;
  font-family: 'Manrope';
  font-size: 0.75rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: right;
  margin-bottom: 5px;
  color: ${({theme}) => theme.textColorBold};
`
export const TokenRowBalance = styled.div`
font-family: 'Manrope';
  font-size: 0.875rem;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: right;
  color: ${({theme}) => theme.textColorBold};
`

export const TokenRowUsd = styled.div`
font-family: 'Manrope';
  font-size: 1rem;
  line-height: 1.5rem;
  color: ${({ theme }) => theme.chaliceGray};
`

export const TokenRowRight = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: flex-end;
`

export const StyledTokenName = styled.span`
  text-align:left;
  width: 100%;
  h3 {
    font-family: 'Manrope';
    font-size: 1rem;
    font-weight: 800;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    color: ${({theme}) => theme.selectTextColor};
    margin:0 0 2px;
  }
  p {
    font-family: 'Manrope';
    font-size: 0.75rem;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    color: ${({theme}) => theme.selectTextColor};
    margin:0;
  }
`

export const SpinnerWrapper = styled(Spinner)`
  margin: 0 0.25rem 0 0.25rem;
  color: ${({ theme }) => theme.chaliceGray};
  opacity: 0.6;
`

export const TokenLogoBox = styled.div`
  ${({ theme }) => theme.FlexC};
  width: 46px;
  height: 46px;
  background: ${ ({theme}) => theme.white};
  box-sizing:border-box;
  border-radius: 100%;
  margin-right: 1.25rem;
`
export const TokenLogoBox1 = styled(TokenLogoBox)`
  position:absolute;
  top:0.625rem;
  left:0;
`

export const InputRangeRow = styled.div`
  ${({ theme }) => theme.FlexBC};
  width: 50%;
  padding-right: 86px;
  margin-right: 1.875rem;
  position:relative;
  .percent { 
    position:absolute;
    top:0;
    right:-5px;
    text-align:right;
    font-family: 'Manrope';
    font-size: 0.75rem;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 36px;
    letter-spacing: normal;
    text-align: center;
    color: ${({ theme }) => theme.textColorBold};
  }
`
export const InputRangeBox = styled.div`
  position:relative;
  width:100%;
  height: 36px;
  .line {
    width: 100%;
    height: 0.625rem;
    border-radius: 8.5px;
    position: absolute;
    top:13px;
    left: 0;
  }
  .line1 {
    background-color: #ededed;
  }
  .line2 {
    width: 0%;
    background: ${({theme}) => theme.bgColorLinear};
  }
  .radius {
    width: 1.5625rem;
    height: 1.5625rem;
    object-fit: contain;
    box-shadow: 0.25rem 0.25rem 0.625rem 0 rgba(118, 68, 203, 0.27);
    background: ${({theme}) => theme.bgColorLinear};
    border-radius: 100%;
    position:absolute;
    top: 6px;
    left: 0;
    margin-left:-0.75rem;
  }
`
export const InputRange = styled(BorderlessInput)`
  width: 100%;
  height: 36px;
  position:absolute;
  top:0;
  left:0;
  opacity: 0;
`

export const InputRangeNum = styled(BorderlessInput)`
  width: 56px;
  height: 36px;
  position:absolute;
  top:0;
  right:0.625rem;
  object-fit: contain;
  border-radius: 0.5625rem;
  box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.04);
  border: solid 0.5px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding: 0 8px;
  text-align:center;
  font-family: 'Manrope';
  font-size: 0.75rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: normal;
  text-align: center;
  color: #062536;
`

export const ComineSoon = styled.div`
${({theme}) => theme.FlexC}
font-family: 'Manrope';
  font-size: 0.75rem;
  color: #96989e;
  height: 30px;
  padding: 0 10px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.CommingSoon};
  position:absolute;
  margin-left: -60px;
  left: 50%;
  top: 25px;
  @media screen and (max-width: 960px) {
    margin-left: -20px;
  }
`

export const BigScreenView = styled.div`
  display: block;
  @media screen and (max-width: 960px) {
    display: none;
  }
`

export const SmallScreenView = styled.div`
  display: none;
  @media screen and (max-width: 960px) {
    display: block;
  }
`

export default function CurrencyInputPanel({
  onValueChange = () => {},
  allBalances,
  renderInput,
  onCurrencySelected = () => {},
  title,
  description,
  extraText,
  extraTextClickHander = () => {},
  errorMessage,
  disableUnlock,
  disableTokenSelect,
  selectedTokenAddress = '',
  showUnlock,
  value = '',
  urlAddedTokens,
  hideETH = false,
  isSelfSymbol,
  isSelfLogo,
  isSelfName,
  selfUseAllToken = [],
  isRange = false,
  tokenBalance = 0
}) {
  const { t } = useTranslation()
  
  let walletType = sessionStorage.getItem('walletType')
  let HDPath = sessionStorage.getItem('HDPath')

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalIsOpenTime, setModalIsOpenTime] = useState(1)

  const tokenContract = useTokenContract(selectedTokenAddress)
  const { exchangeAddress: selectedTokenExchangeAddress, isSwitch } = useTokenDetails(selectedTokenAddress)

  const pendingApproval = usePendingApproval(selectedTokenAddress)

  const addTransaction = useTransactionAdder()

  let allTokens = useAllTokenDetails()
  const { account, chainId } = useWeb3React()
  // console.log(chainId)
  // console.log(allTokens)
  // console.log(selectedTokenAddress)
  // console.log(allTokens[selectedTokenAddress])

  const userTokenBalance = useAddressBalance(account, selectedTokenAddress)

  const [isHardwareTip, setIsHardwareTip] = useState(false)
  const [isHardwareError, setIsHardwareError] = useState(false)
  const [hardwareTxnsInfo, setHardwareTxnsInfo] = useState('')

  function renderUnlockButton(classType) {
    if (disableUnlock || !showUnlock || selectedTokenAddress === config.getCurChainInfo(chainId).symbol || !selectedTokenAddress) {
      return null
    } else {
      if (!pendingApproval) {
        return (
          <SubCurrencySelect
            onClick={async () => {
              let estimatedGas
              let useUserBalance = false
              if (config.supportWallet.includes(walletType)) {
                
                setIsHardwareError(false)
                setIsHardwareTip(true)
                setHardwareTxnsInfo('')
                let web3Contract = getWeb3ConTract(erc20, selectedTokenAddress)
                // let _userTokenBalance = Number(userTokenBalance.toString()) > 100000 ? userTokenBalance.toString() : ethers.constants.MaxUint256.toString()
                let _userTokenBalance = ethers.constants.MaxUint256.toString()

                // let data = web3Contract.approve.getData(selectedTokenExchangeAddress, _userTokenBalance, {
                //   gasLimit: GAS_MARGIN.toString()
                // })
                let data = web3Contract.methods.approve(selectedTokenExchangeAddress, _userTokenBalance).encodeABI()
                getWeb3BaseInfo(selectedTokenAddress, data, account).then(res => {
                  // console.log(res)
                  if (res.msg === 'Success') {
                    addTransaction(res.info, { approval: selectedTokenAddress })
                    setIsHardwareTip(false)
                  } else {
                    setIsHardwareError(true)
                  }
                })
                return
              }
              estimatedGas = await tokenContract.estimate
                .approve(selectedTokenExchangeAddress, ethers.constants.MaxUint256)
                .catch(e => {
                  console.log('Error setting max token approval.')
                })
              if (!estimatedGas) {
                // general fallback for tokens who restrict approval amounts
                estimatedGas = await tokenContract.estimate.approve(selectedTokenExchangeAddress, userTokenBalance)
                useUserBalance = true
              }
              tokenContract
                .approve(
                  selectedTokenExchangeAddress,
                  useUserBalance ? userTokenBalance : ethers.constants.MaxUint256,
                  {
                    gasLimit: calculateGasMargin(estimatedGas, GAS_MARGIN)
                  }
                )
                .then(response => {
                  addTransaction(response, { approval: selectedTokenAddress })
                }).catch(err => {
                  console.log(err)
                })
            }}
            className={classType}
          >
            <img src={classType ? UnlockBlack : Unlock} style={{marginRight: '0.625rem'}} alt={''}/>
            {t('unlock')}
          </SubCurrencySelect>
        )
      } else {
        return <SubCurrencySelect className={classType}>{t('pending')}</SubCurrencySelect>
      }
    }
  }

  const [valueRange, setValueRange] = useState('')
  useEffect(() => {
    if (isRange) {
      let _val = tokenBalance && valueRange ? (Number(tokenBalance.toString()) * valueRange) / 100 : 0
      _val = _val !== '' ? _val : ''
      onValueChange(_val + '')
    }
  }, [valueRange, isRange, tokenBalance, onValueChange])

  useEffect(() => {
    if (!value) {
      setValueRange(0)
    }
  }, [value])
  
  function _renderInput() {
    if (typeof renderInput === 'function') {
      return renderInput()
    }
    return (
      <>
        <InputRow>
          {
            isRange ? (
              <InputRangeRow>
                <InputRangeBox>
                  <div className='line line1'></div>
                  <div className='line line2' style={{width: valueRange + '%'}}></div>
                  <div className='radius' style={{left: valueRange + '%'}}></div>
                  <InputRange
                    type="range"
                    min="0"
                    step="0.000000000000000001"
                    error={!!errorMessage}
                    placeholder="0.0"
                    onChange={e => {
                      setValueRange(Number(e.target.value).toFixed(2))
                    }}
                    onKeyPress={e => {
                      const charCode = e.which ? e.which : e.keyCode
        
                      // Prevent 'minus' character
                      if (charCode === 45) {
                        e.preventDefault()
                        e.stopPropagation()
                      }
                    }}
                    value={valueRange}
                  />
                </InputRangeBox>
                <InputRangeNum
                  type="number"
                  min="0"
                  max="100"
                  error={!!errorMessage}
                  placeholder="0.0"
                  value={valueRange}
                  onChange={e => {
                    // let _val = (Number(tokenBalance.toString()) * e.target.value) / 100
                    let _val2 = tokenBalance && e.target.value ? Number(e.target.value) : ''
                    // onValueChange(_val + '')
                    _val2 = _val2 > 100 ? 100 : Number(_val2)
                    setValueRange(_val2)
                  }}
                  onKeyPress={e => {
                    const charCode = e.which ? e.which : e.keyCode
      
                    // Prevent 'minus' character
                    if (charCode === 45) {
                      e.preventDefault()
                      e.stopPropagation()
                    }
                    let _val = valueRange ? Number(valueRange) : ''
                    setValueRange(_val)
                  }}
                ></InputRangeNum>
                <span className='percent'>%</span>
              </InputRangeRow>
            ) : (
              <Input
                type="number"
                min="0"
                step="0.000000000000000001"
                error={!!errorMessage}
                placeholder="0.0"
                onChange={e => {
                  onValueChange(e.target.value)
                }}
                onKeyPress={e => {
                  const charCode = e.which ? e.which : e.keyCode
    
                  // Prevent 'minus' character
                  if (charCode === 45) {
                    e.preventDefault()
                    e.stopPropagation()
                  }
                }}
                value={isNaN(value) ? '' : value}
              />
            )
          }
          <CurrencySelect
            selected={!!selectedTokenAddress}
            onClick={() => {
              if (!disableTokenSelect) {
                if (modalIsOpenTime) {
                  setModalIsOpenTime(0)
                  setTimeout(() => {
                    setModalIsOpenTime(1)
                  }, 2000)
                  setModalIsOpen(true)
                }
              }
            }}
          >
            {/* <Aligner className={allTokens[selectedTokenAddress] && allTokens[selectedTokenAddress].symbol ? '' : 'pl-0'}> */}
            <Aligner>
              {
                isSelfSymbol ? (
                  <>
                    {selectedTokenAddress ? (
                      isSelfLogo ? 
                        <TokenLogoBox1>
                          <TokenLogo address={isSelfLogo} size={'1.625rem'} />
                        </TokenLogoBox1>
                        :
                        <TokenLogoBox1>
                          <TokenLogo address={allTokens[selectedTokenAddress].symbol} size={'1.625rem'} />
                        </TokenLogoBox1>
                      ) : (
                        <TokenLogoBox1>
                          <img alt={''} src={NoCoinIcon} />
                        </TokenLogoBox1>
                      )}
                    <StyledTokenName>
                      {
                        isSelfSymbol ? (
                          <>
                            <h3>{isSelfSymbol}</h3>
                            <p>{isSelfName ? isSelfName : allTokens[selectedTokenAddress].name}</p>
                          </>
                        ) : (
                          t('selectToken')
                        )
                      }
                    </StyledTokenName>
                  </>
                ) :  (
                  <>
                    {selectedTokenAddress ? <TokenLogoBox1><TokenLogo address={allTokens[selectedTokenAddress] && allTokens[selectedTokenAddress].symbol ? allTokens[selectedTokenAddress].symbol : ''} size={'1.625rem'} /></TokenLogoBox1> : (
                        <TokenLogoBox1>
                          <img alt={''} src={NoCoinIcon} />
                        </TokenLogoBox1>
                      )}
                    <StyledTokenName>
                      {
                        allTokens[selectedTokenAddress] && allTokens[selectedTokenAddress].symbol ? (
                          <>
                            <h3>{allTokens[selectedTokenAddress].symbol}</h3>
                            <p>{allTokens[selectedTokenAddress].name}</p>
                          </>
                        ) : (
                          t('selectToken')
                        ) 
                      }
                    </StyledTokenName>
                  </>
                )
              }
              {!disableTokenSelect && <StyledDropDownBox><StyledDropDown selected={!!selectedTokenAddress} /></StyledDropDownBox>}
            </Aligner>
          </CurrencySelect>
          <ErrorSpanBox>
            {extraText ? (
              <>
                <ErrorSpan
                  data-tip={'Enter max'}
                  error={!!errorMessage}
                  onClick={() => {
                    extraTextClickHander()
                    if (isRange) {
                      setValueRange(100)
                    }
                  }}
                >
                  <Tooltip
                    label={t('enterMax')}
                    style={{
                      background: 'hsla(0, 0%, 0%, 0.75)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '24px',
                      padding: '0.5em 1em',
                      marginTop: '-64px'
                    }}
                  >
                    <ExtraText>
                      {extraText.indexOf('Balance:') === 0 ? (
                        <>
                          <h5>{t('balances')}:</h5>
                          <p>{extraText.replace('Balance:', '')}</p>
                        </>
                      ) : (
                        <p>{extraText}</p>
                      )}
                      <PasteStyle>
                        <img src={Paste} alt={''} />
                      </PasteStyle>
                    </ExtraText>
                  </Tooltip>
                </ErrorSpan>
              </>
            ) : (
              ''
            )}
          </ErrorSpanBox>
        </InputRow>
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
      ></HardwareTip>
      <InputPanel error={!!errorMessage}>
        <Container>
          <LabelRow>
            <LabelContainer>
              <span>{title}</span> <span>{description}</span>
            </LabelContainer>
            <BigScreenView>
              {renderUnlockButton()}
            </BigScreenView>
            <SmallScreenView>{extraText}</SmallScreenView>
          </LabelRow>
          {_renderInput()}
        </Container>
        
        {!disableTokenSelect && (
          <CurrencySelectModal
            isOpen={modalIsOpen}
            onDismiss={() => {
              setModalIsOpen(false)
            }}
            urlAddedTokens={urlAddedTokens}
            onTokenSelect={onCurrencySelected}
            allBalances={allBalances}
            hideETH={hideETH}
            selfUseAllToken={selfUseAllToken}
            isSelfSymbol={isSelfSymbol}
          />
        )}
      </InputPanel>
      {
        disableUnlock || !showUnlock || selectedTokenAddress === config.getCurChainInfo(chainId).symbol || !selectedTokenAddress ? '' : (
          <>
            <SubCurrencySelectBox>
              <div>
                <img src={Warning} alt={''}/>
                {/* <p>You need to unlock {allTokens[selectedTokenAddress].symbol} to continue</p> */}
                <p>{t('unlockTip1')} {allTokens[selectedTokenAddress].symbol} {t('unlockTip2')}</p>
              </div>
                {renderUnlockButton('otherView')}
            </SubCurrencySelectBox>
          </>
        )
      }
    </>
  )
}

function CurrencySelectModal({ isOpen, onDismiss, onTokenSelect, urlAddedTokens, hideETH, selfUseAllToken, isSelfSymbol }) {
  const { t } = useTranslation()

  const [searchQuery, setSearchQuery] = useState('')
  const { exchangeAddress } = useTokenDetails(searchQuery)

  // const allTokens = useAllTokenDetails()
  let allTokens = useAllTokenDetails(), useTokens = {}
  if (selfUseAllToken.length > 0) {
    for (let obj in allTokens) {
      if (selfUseAllToken.includes(obj)) continue
      useTokens[obj] = allTokens[obj]
    }
    allTokens = useTokens
  }
  const { account, chainId } = useWeb3React()

  // BigNumber.js instance
  // const ethPrice = useETHPriceInUSD()

  // all balances for both account and exchanges
  const allBalances = useAllBalances()
  // console.log(allBalances)

  // const _usdAmounts = Object.keys(allTokens).map(k => {
  //   if (ethPrice && allBalances[account] && allBalances[account][k] && allBalances[account][k].value) {
  //     let ethRate = 1 // default for FSN
  //     let exchangeDetails = allBalances[allTokens[k].exchangeAddress]

  //     if (
  //       exchangeDetails &&
  //       exchangeDetails[k] &&
  //       exchangeDetails[k].value &&
  //       exchangeDetails['FSN'] &&
  //       exchangeDetails['FSN'].value
  //     ) {
  //       const tokenBalance = new BigNumber(exchangeDetails[k].value)
  //       const ethBalance = new BigNumber(exchangeDetails['FSN'].value)
  //       ethRate = ethBalance
  //         .times(new BigNumber(10).pow(allTokens[k].decimals))
  //         .div(tokenBalance)
  //         .div(new BigNumber(10).pow(18))
  //     }
  //     const USDRate = ethPrice.times(ethRate)

  //     const balanceBigNumber = new BigNumber(allBalances[account][k].value)

  //     const usdBalance = balanceBigNumber.times(USDRate).div(new BigNumber(10).pow(allTokens[k].decimals))
  //     return usdBalance
  //   } else {
  //     return null
  //   }
  // })
  // console.log(tokenList)
  const tokenList = useMemo(() => {
    return Object.keys(allTokens)
      // .sort((a, b) => {
      //   if (allTokens[a].symbol && allTokens[b].symbol) {
      //     const aSymbol = allTokens[a].symbol.toLowerCase()
      //     const bSymbol = allTokens[b].symbol.toLowerCase()

      //     // pin FSN to top
      //     if (aSymbol === 'FSN'.toLowerCase() || bSymbol === 'FSN'.toLowerCase()) {
      //       return aSymbol === bSymbol ? 0 : aSymbol === 'FSN'.toLowerCase() ? -1 : 1
      //     }

      //     // then tokens with balance
      //     if (usdAmounts[a] && !usdAmounts[b]) {
      //       return -1
      //     } else if (usdAmounts[b] && !usdAmounts[a]) {
      //       return 1
      //     }

      //     // sort by balance
      //     if (usdAmounts[a] && usdAmounts[b]) {
      //       const aUSD = usdAmounts[a]
      //       const bUSD = usdAmounts[b]

      //       return aUSD.gt(bUSD) ? -1 : aUSD.lt(bUSD) ? 1 : 0
      //     }

      //     // sort alphabetically
      //     return aSymbol < bSymbol ? -1 : aSymbol > bSymbol ? 1 : 0
      //   } else {
      //     return 0
      //   }
      // })
      .map(k => {
        let balance
        // only update if we have data
        if (k === config.getCurChainInfo(chainId).symbol && allBalances[account] && allBalances[account][k] && allBalances[account][k].value) {
          balance = formatEthBalance(ethers.utils.bigNumberify(allBalances[account][k].value))
        } else if (allBalances[account] && allBalances[account][k] && allBalances[account][k].value) {
          balance = formatTokenBalance(ethers.utils.bigNumberify(allBalances[account][k].value), allTokens[k].decimals)
        }
        // console.log(allTokens[k].decimals)
        // console.log(balance)
        return {
          name: allTokens[k].name,
          symbol: allTokens[k].symbol,
          address: k,
          balance: balance,
          isSwitch: allTokens[k].isSwitch
        }
      })
  }, [allBalances, allTokens, account, chainId])

  const filteredTokenList = useMemo(() => {
    const list = tokenList.filter(tokenEntry => {
      const inputIsAddress = searchQuery.slice(0, 2) === '0x'

      // check the regex for each field
      const regexMatches = Object.keys(tokenEntry).map(tokenEntryKey => {
        // if address field only search if input starts with 0x.
        if (tokenEntryKey === 'address') {
          return (
            inputIsAddress &&
            typeof tokenEntry[tokenEntryKey] === 'string' &&
            !!tokenEntry[tokenEntryKey].match(new RegExp(escapeStringRegex(searchQuery), 'i'))
          )
        }
        return (
          typeof tokenEntry[tokenEntryKey] === 'string' &&
          !!tokenEntry[tokenEntryKey].match(new RegExp(escapeStringRegex(searchQuery), 'i'))
        )
      })
      return regexMatches.some(m => m)
    })
    // If the user has not inputted anything, preserve previous sort
    if (searchQuery === '') return list
    return list.sort((a, b) => {
      return a.symbol.toLowerCase() === searchQuery.toLowerCase() ? -1 : 1
    })
  }, [tokenList, searchQuery])

  function _onTokenSelect(address) {
    setSearchQuery('')
    onTokenSelect(address)
    onDismiss()
  }

  function renderTokenList() {
    if (isAddress(searchQuery) && exchangeAddress === undefined) {
      return <TokenModalInfo>Searching for Exchange...</TokenModalInfo>
    }
    if (isAddress(searchQuery) && exchangeAddress === ethers.constants.AddressZero) {
      return (
        <>
          <TokenModalInfo>{t('noExchange')}</TokenModalInfo>
          <TokenModalInfo>
            <Link to={`/create-exchange/${searchQuery}`}>{t('createExchange')}</Link>
          </TokenModalInfo>
        </>
      )
    }
    if (!filteredTokenList.length) {
      return <TokenModalInfo>{t('noExchange')}</TokenModalInfo>
    }
    
    return filteredTokenList.map(({ address, symbol, name, balance, isSwitch }) => {
      const urlAdded = urlAddedTokens && urlAddedTokens.hasOwnProperty(address)
      const customAdded =
        address !== config.getCurChainInfo(chainId).symbol &&
        INITIAL_TOKENS_CONTEXT[chainId] &&
        !INITIAL_TOKENS_CONTEXT[chainId].hasOwnProperty(address) &&
        !urlAdded

      if (hideETH && address === config.getCurChainInfo(chainId).symbol) {
        return null
      }

      return (
        <TokenModalRow key={address} onClick={() => _onTokenSelect(address)}>
          <TokenRowLeft>
            <TokenLogoBox style={ {'border': '0.0625rem solid rgba(0, 0, 0, 0.1)'}}>
              <TokenLogo address={symbol} size={'2rem'} />
            </TokenLogoBox>
            <TokenSymbolGroup>
              <div>
                <span id="symbol">{symbol}</span>
                <FadedSpan>
                  {urlAdded && '(Added by URL)'} {customAdded && '(Added by user)'}
                </FadedSpan>
              </div>
              <TokenFullName> {name}</TokenFullName>
            </TokenSymbolGroup>
          </TokenRowLeft>
          {
            config.dirSwitchFn(isSwitch) ? '' : (
              <>
                <ComineSoon>
                <img alt={''} src={ScheduleIcon} style={{marginRight: '10px'}} />
                {t('ComineSoon')}
                </ComineSoon>
              </>
            )
          }
          <TokenRowRight>
            {balance ? (
              <>
                <TokenRowBalanceText>{t('balances')}</TokenRowBalanceText>
                <TokenRowBalance>{balance && (balance > 0 || balance === '<0.000001') ? (balance + ' ' + symbol) : '-'}</TokenRowBalance>
              </>
            ) : (account && config.dirSwitchFn(isSwitch) ? (
              <SpinnerWrapper src={Circle} alt="loader" />
            ) : '-'
            )}
            {/* <TokenRowUsd>
              {usdBalance && !usdBalance.isNaN()
                ? usdBalance.isZero()
                  ? ''
                  : usdBalance.lt(0.01)
                  ? '<$0.01'
                  : '$' + formatToUsd(usdBalance)
                : ''}
            </TokenRowUsd> */}
          </TokenRowRight>
        </TokenModalRow>
      )
    })
  }

  // manage focus on modal show
  const inputRef = useRef()

  function onInput(event) {
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setSearchQuery(checksummedInput || input)
  }

  function clearInputAndDismiss() {
    setSearchQuery('')
    onDismiss()
  }

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={clearInputAndDismiss}
      minHeight={60}
      maxHeight={50}
      initialFocusRef={isMobile ? undefined : inputRef}
    >
      <TokenModal>
        <ModalHeader>
          <p>{t('selectToken')}</p>
          <CloseIcon onClick={clearInputAndDismiss}>
            <CloseColor alt={'close icon'} />
          </CloseIcon>
        </ModalHeader>
        <SearchContainer>
          <img src={SearchIcon} alt="search" />
          <StyledBorderlessInput
            ref={inputRef}
            type="text"
            placeholder={isMobile ? t('searchOrPasteMobile') : t('searchOrPaste')}
            onChange={onInput}
          />
        </SearchContainer>
        <TokenList>{renderTokenList()}</TokenList>
      </TokenModal>
    </Modal>
  )
}
