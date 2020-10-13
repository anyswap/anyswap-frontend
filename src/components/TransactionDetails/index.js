import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css, keyframes } from 'styled-components'
import { darken, lighten } from 'polished'
import { isAddress, amountFormatter } from '../../utils'
import { useDebounce } from '../../hooks'

import question from '../../assets/images/question.svg'

import NewContextualInfo from '../../components/ContextualInfoNew'

import AddressIcon from '../../assets/images/icon/address.svg'
import ArrowTopRightIcon from '../../assets/images/icon/arrowTopRight.png'
import AlippageIcon from '../../assets/images/icon/slippage.svg'
import { BorderlessInput } from '../../theme'
const WARNING_TYPE = Object.freeze({
  none: 'none',
  emptyInput: 'emptyInput',
  invalidEntryBound: 'invalidEntryBound',
  riskyEntryHigh: 'riskyEntryHigh',
  riskyEntryLow: 'riskyEntryLow'
})

const Flex = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Manrope';
`

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  font-family: 'Manrope';
`

const WrappedSlippageRow = ({ wrap, ...rest }) => <Flex {...rest} />
const SlippageRow = styled(WrappedSlippageRow)`
  position: relative;
  flex-wrap: ${({ wrap }) => wrap && 'wrap'};
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 0;
  padding-top: ${({ wrap }) => wrap && '0.25rem'};
`

const QuestionWrapper = styled.button`
  display: flex;
  align-items: center;
  font-family: 'Manrope';
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

const fadeIn = keyframes`
  from {
    opacity : 0;
  }

  to {
    opacity : 1;
  }
`

const Popup = styled(Flex)`
font-family: 'Manrope';
  position: absolute;
  width: 228px;
  bottom: 30px;
  right: 35%;
  flex-direction: column;
  align-items: center;
  padding: 0.6rem 1rem;
  line-height: 150%;
  background: ${({ theme }) => theme.inputBackground};
  border: 0.0625rem solid ${({ theme }) => theme.mercuryGray};

  border-radius: 8px;

  animation: ${fadeIn} 0.15s linear;

  color: ${({ theme }) => theme.textColor};
  font-style: italic;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    left: -1.25rem;
  `}
`

const FancyButton = styled.button`
font-family: 'Manrope';
  color: ${({ theme }) => theme.textColor};
  align-items: center;
  min-width: 55px;
  height: 2rem;
  border-radius: 36px;
  font-size: 0.75rem;
  border: 0.0625rem solid ${({ theme }) => theme.mercuryGray};
  outline: none;
  background: ${({ theme }) => theme.inputBackground};

  :hover {
    cursor: inherit;
    border: 0.0625rem solid ${({ theme }) => theme.chaliceGray};
  }
  :focus {
    border: 0.0625rem solid ${({ theme }) => theme.royalBlue};
  }
`

const Option = styled(FancyButton)`
font-family: 'Manrope';
  margin-right: 8px;
  margin-top: 6px;

  :hover {
    cursor: pointer;
  }

  ${({ active, theme }) =>
    active &&
    css`
      color: ${({ theme }) => theme.royalBlue};
      border: 0.0625rem  solid ${({ theme }) => theme.royalBlue};

      :hover {
        border: none;
        box-shadow: none;
      }

      :focus {
        border: none;
        box-shadow: none;
        border: 0.0625rem  solid ${({ theme }) => theme.royalBlue};
      }

      :active {
        border: 0.0625rem  solid ${({ theme }) => theme.royalBlue};
      }

      :hover:focus {
        border: 0.0625rem  solid ${({ theme }) => theme.royalBlue};
      }
      :hover:focus:active {
        border: 0.0625rem  solid ${({ theme }) => theme.royalBlue};
      }
    `}
`

const OptionLarge = styled(Option)`
font-family: 'Manrope';
  width: 120px;
`

const Input = styled.input`
font-family: 'Manrope';
  background: ${({ theme }) => theme.inputBackground};
  flex-grow: 1;
  font-size: 0.75rem;
  min-width: 1.25rem;

  outline: none;
  box-sizing: border-box;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  cursor: inherit;

  color: ${({ theme }) => theme.doveGray};
  text-align: left;
  ${({ active }) =>
    active &&
    css`
      color: initial;
      cursor: initial;
      text-align: right;
    `}

  ${({ placeholder }) =>
    placeholder !== 'Custom' &&
    css`
      text-align: right;
      color: ${({ theme }) => theme.textColor};
    `}

  ${({ color }) =>
    color === 'red' &&
    css`
      color: ${({ theme }) => theme.salmonRed};
    `}
`



const BottomError = styled.div`
font-family: 'Manrope';
  ${({ show }) =>
    show &&
    css`
      padding-top: 0.75rem;
    `}
  color: ${({ theme }) => theme.doveGray};
  ${({ color }) =>
    color === 'red' &&
    css`
      color: ${({ theme }) => theme.salmonRed};
    `}
`

const OptionCustom = styled(FancyButton)`
font-family: 'Manrope';
  height: 2rem;
  position: relative;
  width: 120px;
  margin-top: 6px;
  padding: 0 0.75rem;

  ${({ active }) =>
    active &&
    css`
      border: 0.0625rem solid ${({ theme }) => theme.royalBlue};
      :hover {
        border: 0.0625rem solid ${({ theme }) => darken(0.1, theme.royalBlue)};
      }
    `}

  ${({ color }) =>
    color === 'red' &&
    css`
      border: 0.0625rem solid ${({ theme }) => theme.salmonRed};
    `}

  input {
    width: 100%;
    height: 100%;
    border: 0px;
    border-radius: 2rem;
  }
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

const SlippageSelector = styled.div`
font-family: 'Manrope';
  padding: 1rem 1.25rem 1rem 1.25rem;
  border-radius: 0.75rem 0.75rem 0 0;
  @media screen and (max-width: 960px) {
    padding: 8px 0.625rem;
  }
`

const Percent = styled.div`
font-family: 'Manrope';
  color: inherit;
  font-size: 0, 8rem;
  flex-grow: 0;

  ${({ color, theme }) =>
    (color === 'faded' &&
      css`
        color: ${theme.doveGray};
      `) ||
    (color === 'red' &&
      css`
        color: ${theme.salmonRed};
      `)};
`

const Faded = styled.span`
font-family: 'Manrope';
  opacity: 0.7;
`

const TransactionInfo = styled.div`
font-family: 'Manrope';
  padding: 0 1.25rem 1.5625rem;
  border-bottom: 0.0625rem solid #dadada;
  @media screen and (max-width: 960px) {
    padding: 0 0.625rem 0.625rem;
    height: auto;
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

const DeadlineSelector = styled.div`
font-family: 'Manrope';
  padding: 1rem 1.25rem 1rem 1.25rem;
  border-radius: 0 0 0.75rem 0.75rem;
`

const SetLimitBox = styled.div`
font-family: 'Manrope';
  width: 100%;
  border-radius: 9px;
  background: ${({ theme }) => theme.dtilContentBg};
  padding: 1.5625rem 1.25rem 0.5625rem;
  margin-top:0.625rem;
  @media screen and (max-width: 960px) {
    padding: 0.625rem 0.625rem 0.5625rem;
  }
`

const BigTitle = styled.div`
font-family: 'Manrope';
  font-size: 0.875rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: normal;
  color: ${({ theme }) => theme.textColorBold};
`

const DeadlineRow = SlippageRow
const DeadlineInput = styled(OptionCustom)`
${({theme}) => theme.FlexBC};
font-family: 'Manrope';
  width: 110px;
  height: 36px;
  object-fit: contain;
  border-radius: 0.5625rem;
  box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.04);
  border: solid 0.5px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`
const InputMin = styled(BorderlessInput)`
font-family: 'Manrope';
  height: 100%;
  border:none;
  padding: 0 8px;
  font-size:0.75rem;
  &:focus, &:hover {
    border:none;
  }
`

export default function TransactionDetails(props) {
  const { t } = useTranslation()

  const [activeIndex, setActiveIndex] = useState(3)

  const [warningType, setWarningType] = useState(WARNING_TYPE.none)

  const inputRef = useRef()

  const [showPopup, setPopup] = useState(false)

  const [userInput, setUserInput] = useState('')
  const debouncedInput = useDebounce(userInput, 150)

  useEffect(() => {
    if (activeIndex === 4) {
      checkBounds(debouncedInput)
    }
  })

  const [deadlineInput, setDeadlineInput] = useState('')

  // function renderSummary() {
  //   let contextualInfo = ''
  //   let isError = false
  //   if (props.brokenTokenWarning) {
  //     contextualInfo = t('brokenToken')
  //     isError = true
  //   } else if (props.inputError || props.independentError) {
  //     contextualInfo = props.inputError || props.independentError
  //     isError = true
  //   } else if (!props.inputCurrency || !props.outputCurrency) {
  //     contextualInfo = t('selectTokenCont')
  //   } else if (!props.independentValue) {
  //     contextualInfo = t('enterValueCont')
  //   } else if (props.sending && !props.recipientAddress) {
  //     contextualInfo = t('noRecipient')
  //   } else if (props.sending && !isAddress(props.recipientAddress)) {
  //     contextualInfo = t('invalidRecipient')
  //   } else if (!props.account) {
  //     contextualInfo = t('noWallet')
  //     isError = true
  //   }

  //   const slippageWarningText = props.highSlippageWarning
  //     ? t('highSlippageWarning')
  //     : props.slippageWarning
  //     ? t('slippageWarning')
  //     : ''

  //   return (
  //     <NewContextualInfo
  //       openDetailsText={t('transactionDetails')}
  //       closeDetailsText={t('hideDetails')}
  //       contextualInfo={contextualInfo ? contextualInfo : slippageWarningText}
  //       allowExpand={
  //         !!(
  //           !props.brokenTokenWarning &&
  //           props.inputCurrency &&
  //           props.outputCurrency &&
  //           props.inputValueParsed &&
  //           props.outputValueParsed &&
  //           (props.sending ? props.recipientAddress : true)
  //         )
  //       }
  //       isError={isError}
  //       slippageWarning={props.slippageWarning && !contextualInfo}
  //       highSlippageWarning={props.highSlippageWarning && !contextualInfo}
  //       brokenTokenWarning={props.brokenTokenWarning}
  //       renderTransactionDetails={renderTransactionDetails}
  //       dropDownContent={dropDownContent}
  //     />
  //   )
  // }

  const dropDownContent = () => {
    return (
      <SetLimitBox>
        {renderTransactionDetails()}
        <SlippageSelector>
          <SlippageRow>
            <BigTitle>{t("LimitPrice")}</BigTitle>
            <QuestionWrapper
              onClick={() => {
                setPopup(!showPopup)
              }}
              // onMouseEnter={() => {
              //   setPopup(true)
              // }}
              // onMouseLeave={() => {
              //   setPopup(false)
              // }}
            >
              <HelpCircleStyled src={question} alt="popup" />
            </QuestionWrapper>
            {showPopup ? (
              <Popup>
                {t("LoweringTip1")}
              </Popup>
            ) : (
              ''
            )}
          </SlippageRow>
          <SlippageRow wrap>
            <Option
              onClick={() => {
                setFromFixed(1, 0.1)
              }}
              active={activeIndex === 1}
            >
              0.1%
            </Option>
            <OptionLarge
              onClick={() => {
                setFromFixed(2, 0.5)
              }}
              active={activeIndex === 2}
            >
              0.5% <Faded>({t("suggested")})</Faded>
            </OptionLarge>
            <Option
              onClick={() => {
                setFromFixed(3, 1)
              }}
              active={activeIndex === 3}
            >
              1%
            </Option>
            <OptionCustom
              active={activeIndex === 4}
              color={
                warningType === WARNING_TYPE.emptyInput
                  ? ''
                  : warningType !== WARNING_TYPE.none && warningType !== WARNING_TYPE.riskyEntryLow
                  ? 'red'
                  : ''
              }
              onClick={() => {
                setFromCustom()
              }}
            >
              <FlexBetween>
                {!(warningType === WARNING_TYPE.none || warningType === WARNING_TYPE.emptyInput) && (
                  <span role="img" aria-label="warning">
                    ⚠️
                  </span>
                )}
                <Input
                  tabIndex={-1}
                  ref={inputRef}
                  active={activeIndex === 4}
                  placeholder={
                    activeIndex === 4
                      ? !!userInput
                        ? ''
                        : '0'
                      : activeIndex !== 4 && userInput !== ''
                      ? userInput
                      : t('custom')
                  }
                  value={activeIndex === 4 ? userInput : ''}
                  onChange={parseInput}
                  color={
                    warningType === WARNING_TYPE.emptyInput
                      ? ''
                      : warningType !== WARNING_TYPE.none && warningType !== WARNING_TYPE.riskyEntryLow
                      ? 'red'
                      : ''
                  }
                />
                <Percent
                  color={
                    activeIndex !== 4
                      ? 'faded'
                      : warningType === WARNING_TYPE.riskyEntryHigh || warningType === WARNING_TYPE.invalidEntryBound
                      ? 'red'
                      : ''
                  }
                >
                  %
                </Percent>
              </FlexBetween>
            </OptionCustom>
          </SlippageRow>
          <SlippageRow>
            <BottomError
              show={activeIndex === 4}
              color={
                warningType === WARNING_TYPE.emptyInput
                  ? ''
                  : warningType !== WARNING_TYPE.none && warningType !== WARNING_TYPE.riskyEntryLow
                  ? 'red'
                  : ''
              }
            >
              {activeIndex === 4 && warningType.toString() === 'none' && t('CustomSlippageValue')}
              {warningType === WARNING_TYPE.emptyInput && t('EnterSlippagePercentage')}
              {warningType === WARNING_TYPE.invalidEntryBound && t('SelectValueThan')}
              {warningType === WARNING_TYPE.riskyEntryHigh && t('TransactionFrontrun')}
              {warningType === WARNING_TYPE.riskyEntryLow && t('TransactionMayFail')}
            </BottomError>
          </SlippageRow>
        </SlippageSelector>
        <DeadlineSelector>
          <BigTitle>{t("setSwap")}</BigTitle>
          <DeadlineRow wrap>
            <DeadlineInput>
              <InputMin placeholder={'Deadline'} value={deadlineInput} onChange={parseDeadlineInput} /> min
            </DeadlineInput>
          </DeadlineRow>
        </DeadlineSelector>
      </SetLimitBox>
    )
  }

  const setFromCustom = () => {
    setActiveIndex(4)
    inputRef.current.focus()
    // if there's a value, evaluate the bounds
    checkBounds(debouncedInput)
  }

  // destructure props for to limit effect callbacks
  const setRawSlippage = props.setRawSlippage
  const setRawTokenSlippage = props.setRawTokenSlippage
  const setcustomSlippageError = props.setcustomSlippageError
  const setDeadline = props.setDeadline

  const updateSlippage = useCallback(
    newSlippage => {
      // round to 2 decimals to prevent ethers error
      let numParsed = parseInt(newSlippage * 100)

      // set both slippage values in parents
      setRawSlippage(numParsed)
      setRawTokenSlippage(numParsed)
    },
    [setRawSlippage, setRawTokenSlippage]
  )

  // used for slippage presets
  const setFromFixed = useCallback(
    (index, slippage) => {
      // update slippage in parent, reset errors and input state
      updateSlippage(slippage)
      setWarningType(WARNING_TYPE.none)
      setActiveIndex(index)
      setcustomSlippageError('valid`')
    },
    [setcustomSlippageError, updateSlippage]
  )

  /**
   * @todo
   * Breaks without useState here, able to
   * break input parsing if typing is faster than
   * debounce time
   */

  const [initialSlippage] = useState(props.rawSlippage)

  useEffect(() => {
    switch (Number.parseInt(initialSlippage)) {
      case 10:
        setFromFixed(1, 0.1)
        break
      case 50:
        setFromFixed(2, 0.5)
        break
      case 100:
        setFromFixed(3, 1)
        break
      default:
        // restrict to 2 decimal places
        let acceptableValues = [/^$/, /^\d{1,2}$/, /^\d{0,2}\.\d{0,2}$/]
        // if its within accepted decimal limit, update the input state
        if (acceptableValues.some(val => val.test(initialSlippage / 100))) {
          setUserInput(initialSlippage / 100)
          setActiveIndex(4)
        }
    }
  }, [initialSlippage, setFromFixed])

  const checkBounds = useCallback(
    slippageValue => {
      setWarningType(WARNING_TYPE.none)
      setcustomSlippageError('valid')

      if (slippageValue === '' || slippageValue === '.') {
        setcustomSlippageError('invalid')
        return setWarningType(WARNING_TYPE.emptyInput)
      }

      // check bounds and set errors
      if (Number(slippageValue) < 0 || Number(slippageValue) > 50) {
        setcustomSlippageError('invalid')
        return setWarningType(WARNING_TYPE.invalidEntryBound)
      }
      if (Number(slippageValue) >= 0 && Number(slippageValue) < 0.1) {
        setcustomSlippageError('valid')
        setWarningType(WARNING_TYPE.riskyEntryLow)
      }
      if (Number(slippageValue) > 5) {
        setcustomSlippageError('warning')
        setWarningType(WARNING_TYPE.riskyEntryHigh)
      }
      //update the actual slippage value in parent
      updateSlippage(Number(slippageValue))
    },
    [setcustomSlippageError, updateSlippage]
  )

  // check that the theyve entered number and correct decimal
  const parseInput = e => {
    let input = e.target.value

    // restrict to 2 decimal places
    let acceptableValues = [/^$/, /^\d{1,2}$/, /^\d{0,2}\.\d{0,2}$/]
    // if its within accepted decimal limit, update the input state
    if (acceptableValues.some(a => a.test(input))) {
      setUserInput(input)
    }
  }

  const [initialDeadline] = useState(props.deadline)

  useEffect(() => {
    setDeadlineInput(initialDeadline / 60)
  }, [initialDeadline])

  const parseDeadlineInput = e => {
    const input = e.target.value

    const acceptableValues = [/^$/, /^\d+$/]
    if (acceptableValues.some(re => re.test(input))) {
      setDeadlineInput(input)
      setDeadline(parseInt(input) * 60)
    }
  }

  const b = text => <Bold>{text}</Bold>

  const renderTransactionDetails = () => {
    if (props.independentField === props.INPUT) {
      return props.sending ? (
        <TransactionInfo>
          <LastSummaryText>
            <div className='icon'>
              <img src={ArrowTopRightIcon} alt={''} />
            </div>
            {t('youAreSelling')}{' '}
            <ValueWrapper>
              {b(
                `${amountFormatter(
                  props.independentValueParsed,
                  props.independentDecimals,
                  Math.min(6, props.independentDecimals)
                )} ${props.inputSymbol}`
              )}
            </ValueWrapper>
          </LastSummaryText>
          <LastSummaryText>
            <div className='icon'>
              <img src={AddressIcon} alt={''} />
            </div>
            {b(props.recipientAddress)} {t('willReceive')}{' '}
            <ValueWrapper>
              {b(
                `${amountFormatter(
                  props.dependentValueMinumum,
                  props.dependentDecimals,
                  Math.min(6, props.dependentDecimals)
                )} ${props.outputSymbol}`
              )}
            </ValueWrapper>{' '}
          </LastSummaryText>
          <LastSummaryText>
            <div className='icon'>
              <img src={AlippageIcon} alt={''} />
            </div>
            {t('priceChange')} <ValueWrapper>{b(`${props.percentSlippageFormatted}%`)}</ValueWrapper>
          </LastSummaryText>
        </TransactionInfo>
      ) : (
        <TransactionInfo>
          <LastSummaryText>
            <div className='icon'>
              <img src={ArrowTopRightIcon} alt={''} />
            </div>
            {t('youAreSelling')}{' '}
            <ValueWrapper>
              {b(
                `${amountFormatter(
                  props.independentValueParsed,
                  props.independentDecimals,
                  Math.min(6, props.independentDecimals)
                )} ${props.inputSymbol}`
              )}
            </ValueWrapper>{' '}
            {t('forAtLeast')}
            <ValueWrapper>
              {b(
                `${amountFormatter(
                  props.dependentValueMinumum,
                  props.dependentDecimals,
                  Math.min(6, props.dependentDecimals)
                )} ${props.outputSymbol}`
              )}
            </ValueWrapper>
          </LastSummaryText>
          <LastSummaryText>
          <div className='icon'>
              <img src={AlippageIcon} alt={''} />
            </div>
            {t('priceChange')} <ValueWrapper>{b(`${props.percentSlippageFormatted}%`)}</ValueWrapper>
          </LastSummaryText>
        </TransactionInfo>
      )
    } else {
      return props.sending ? (
        <TransactionInfo>
          <LastSummaryText>
            <div className='icon'>
              <img src={ArrowTopRightIcon} alt={''} />
            </div>
            {t('youAreSending')}{' '}
            <ValueWrapper>
              {b(
                `${amountFormatter(
                  props.independentValueParsed,
                  props.independentDecimals,
                  Math.min(6, props.independentDecimals)
                )} ${props.outputSymbol}`
              )}
            </ValueWrapper>{' '}
            {t('to')} {b(props.recipientAddress)} {t('forAtMost')}{' '}
            <ValueWrapper>
            <div className='icon'>
              <img src={AddressIcon} alt={''} />
            </div>
              {b(
                `${amountFormatter(
                  props.dependentValueMaximum,
                  props.dependentDecimals,
                  Math.min(6, props.dependentDecimals)
                )} ${props.inputSymbol}`
              )}
            </ValueWrapper>{' '}
          </LastSummaryText>
          <LastSummaryText>
            <div className='icon'>
              <img src={AlippageIcon} alt={''} />
            </div>
            {t('priceChange')} <ValueWrapper>{b(`${props.percentSlippageFormatted}%`)}</ValueWrapper>
          </LastSummaryText>
        </TransactionInfo>
      ) : (
        <TransactionInfo>
          <LastSummaryText>
            <div className='icon'>
              <img src={ArrowTopRightIcon} alt={''} />
            </div>
            {t('youAreBuying')}{' '}
            <ValueWrapper>
              {b(
                `${amountFormatter(
                  props.independentValueParsed,
                  props.independentDecimals,
                  Math.min(6, props.independentDecimals)
                )} ${props.outputSymbol}`
              )}
            </ValueWrapper>{' '}
            {t('forAtMost')}{' '}
            <ValueWrapper>
              {b(
                `${amountFormatter(
                  props.dependentValueMaximum,
                  props.dependentDecimals,
                  Math.min(6, props.dependentDecimals)
                )} ${props.inputSymbol}`
              )}
            </ValueWrapper>{' '}
          </LastSummaryText>
          <LastSummaryText>
            <div className='icon'>
              <img src={AlippageIcon} alt={''} />
            </div>
            {t('priceChange')} <ValueWrapper>{b(`${props.percentSlippageFormatted}%`)}</ValueWrapper>
          </LastSummaryText>
        </TransactionInfo>
      )
    }
  }
  // return <>{renderSummary()}</>
  return <>{dropDownContent()}</>
}
