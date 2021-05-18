import React, { useState, useRef, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Tooltip from '@reach/tooltip'
import { ethers } from 'ethers'
import styled from 'styled-components'

import {
  InputRow,
  Input,
  Flex,
  InputPanel,
  LabelContainer,
  LabelRow,
} from '../Styled'
import {
  Aligner,
  TokenLogoBox1,
  StyledTokenName,
  StyledDropDownBox,
  StyledDropDown,
  ErrorSpanBox,
  ErrorSpan,
  ExtraText,
  PasteStyle,
  CurrencySelect,
  Container,
  // BigScreenView,
  SmallScreenView,
  TokenModalRow,
  TokenRowLeft,
  TokenLogoBox,
  TokenSymbolGroup,
  TokenFullName,
  TokenList as TokenListBox
} from '../CurrencyInputPanel'
// import OversizedPanel from '../OversizedPanel'

import TokenLogo from '../TokenLogo'
import { Button } from '../../theme'
import Title from '../Title'
import AddressInputPanel from '../AddressInputPanel'
import ModalContent from '../Modal/ModalContent'
import Modal from '../Modal'

import { useWalletModalToggle } from '../../contexts/Application'

import NoCoinIcon from '../../assets/images/icon/no-coin.svg'
import Paste from '../../assets/images/icon/paste.svg'
import BirdgeIcon from '../../assets/images/icon/bridge-white.svg'

import tokenlist from './data/tokenlist'

import { amountFormatter, isAddress } from '../../utils'
import { getTokenBalance} from '../../utils/birdge/getOutBalance'
import {formatDecimal} from '../../utils/tools'

import { useWeb3React, useSwapTokenContract } from '../../hooks'

import swapETHABI from '../../constants/abis/swapETHABI'

import {isSpecialCoin } from './module/common'
import config from '../../config'

const StyledBirdgeIcon = styled.div`
  ${({ theme }) => theme.FlexC};
  img {
    margin-right: 1rem
  }
`

export default function SpecialWithdraw() {
  const { t } = useTranslation()
  const { account, chainId } = useWeb3React()
  const toggleWalletModal = useWalletModalToggle()

  const walletType = sessionStorage.getItem('walletType')

  const [selectToken, setSelectToken] = useState('0x1b27a9de6a775f98aaa5b90b62a4e2a0b84dbdd9')
  const [errorMessage, setErrorMessage] = useState()
  const [value, setValue] = useState()
  const [outValue, setOutValue] = useState()
  const [balance, setBalance] = useState()
  const [recipient, setRecipient] = useState({
    address: '',
    name: ''
  })
  const [recipientError, setRecipientError] = useState()
  const [modelView, setModelView] = useState(false)

  const TokenList = useMemo(() => {
    if (tokenlist[chainId]) return tokenlist[chainId]
    return {}
  }, [chainId])

  const TokenInfo = useMemo(() => {
    if (TokenList[selectToken]) return TokenList[selectToken]
    return ''
  }, [TokenList, selectToken])

  const recipientCount = useMemo(() => {
    return Date.now() + selectToken
  }, [selectToken])

  const tokenETHContract = useSwapTokenContract(selectToken, swapETHABI)

  const isDisabled = useMemo(() => {
    if (
      TokenInfo
      && Number(value) < Number(TokenInfo.redeemMaxNum)
      && Number(value) > Number(TokenInfo.redeemMinNum)
      && Number(value) < Number(balance)
      && recipient.address
    ) {
      return false
    } else {
      return true
    }
  }, [TokenInfo, value, recipient, balance])

  useEffect(() => {
    if (account && chainId && selectToken) {
      getTokenBalance(chainId, selectToken, account, 1).then(res => {
        console.log(res)
        const val = ethers.utils.parseUnits(res.toString(), TokenInfo.decimals)
        setBalance(amountFormatter(val, TokenInfo.decimals, Math.min(10, TokenInfo.decimals)))
      })
    } else {
      setBalance('')
    }
  }, [account, chainId, selectToken, TokenInfo])

  function sendTxns () {
    const node = TokenInfo.destChain
    if (
      !recipient.address
      || (isSpecialCoin(TokenInfo.symbol) && !isBTCAddress(recipient.address, TokenInfo.symbol))
      || (node === 'TRX' && !isTRXAddress(recipient.address))
    ) {
      alert('Illegal address!')
      return
    }
    if (Number(value) > Number(balance)) {
      alert('Insufficient Balance!')
      return
    }
    let amountVal = ethers.utils.parseUnits(value.toString(), TokenInfo.decimals)
    if (amountVal.gt(balance)) {
      amountVal = balance
    }
    let address = recipient.address
    const formatAddress = node === 'TRX' ? toHexAddress(address) : address
    let token = selectToken
    console.log(formatAddress)
    if (config.supportWallet.includes(walletType)) {
      let web3Contract = getWeb3ConTract(swapETHABI, token)
      if (isSpecialCoin(TokenInfo.symbol)) {
        web3Contract = getWeb3ConTract(swapBTCABI, token)
      }
      let data = web3Contract.methods.Swapout(amountVal, formatAddress).encodeABI()
      getWeb3BaseInfo(token, data, account).then(res => {
        if (res.msg === 'Success') {
          alert('Success')
        } else {
          alert(res.error.toString())
        }
      })
      return
    }

    if (isSpecialCoin(TokenInfo.symbol) === 0) {
      tokenETHContract.Swapout(amountVal, formatAddress).then(res => {
        alert('Success')
      }).catch(err => {
        alert(err.toString())
      })
    } else {
      tokenContract.Swapout(amountVal, formatAddress).then(res => {
        alert('Success')
      }).catch(err => {
        alert(err.toString())
      })
    }
  }
  return (
    <>
      <Modal  isOpen={modelView} maxHeight={800}>
        <ModalContent onClose={() => {setModelView(false)}}>
          <TokenListBox style={{marginTop: '40px'}}>
            {
              Object.keys(TokenList).map(tokenEntryKey => {
                return (
                  <TokenModalRow key={tokenEntryKey} onClick={() => {
                    setSelectToken(tokenEntryKey)
                    setModelView(false)
                  }}>
                    <TokenRowLeft>
                      <TokenLogoBox style={ {'border': '0.0625rem solid rgba(0, 0, 0, 0.1)'}}>
                        <TokenLogo address={TokenList[tokenEntryKey].symbol} size={'2rem'} />
                      </TokenLogoBox>
                      <TokenSymbolGroup>
                        <TokenFullName> {TokenList[tokenEntryKey].name}</TokenFullName>
                      </TokenSymbolGroup>
                    </TokenRowLeft>
                  </TokenModalRow>
                )
              })
            }
          </TokenListBox>
        </ModalContent>
      </Modal>
      <Title
        title={t('redeem')}
      ></Title>
      <InputPanel error={!!errorMessage}>
        <Container>
          <LabelRow>
            <LabelContainer>
              <span>{t('redeem')}</span>
            </LabelContainer>
            <SmallScreenView>{balance}</SmallScreenView>
          </LabelRow>
          
          <InputRow>
            <Input
              type="number"
              min="0"
              step="0.000000000000000001"
              error={!!errorMessage}
              placeholder="0.0"
              onChange={e => {
                if (TokenInfo) {
                  const dec = TokenInfo.decimals
                  let val = e.target.value
                  let iValue = formatDecimal(val, dec)
                  // console.log(iValue)
                  let inputVal = iValue && Number(iValue) ? ethers.utils.parseUnits(iValue.toString(), dec) : ethers.utils.bigNumberify(0)
                  let _fee = inputVal.mul(ethers.utils.parseUnits(TokenInfo.fee.toString(), 18)).div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
                  let _minFee = ethers.utils.parseUnits(TokenInfo.minFee.toString(), dec)
                  let _maxFee = ethers.utils.parseUnits(TokenInfo.maxFee.toString(), dec)
                  if (_fee.isZero()) {
                    // inputVal = inputVal
                  } else {
                    if (_fee.lt(_minFee)) {
                      _fee = _minFee
                    } else if (_fee.gt(_maxFee)) {
                      _fee = _maxFee
                    }
                    inputVal = inputVal.sub(_fee)
                  }
                  // console.log(inputVal)
                  if ((inputVal || inputVal === 0) && val !== '') {
                    inputVal = amountFormatter(inputVal, dec, Math.min(10, dec))
                  } else {
                    inputVal = ''
                  }
                  setValue(iValue)
                  setOutValue(inputVal)
                } else {
                  setValue('')
                  setOutValue('')
                }
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
            <CurrencySelect
              selected={!!selectToken}
              onClick={() => {
                setModelView(true)
              }}
            >
              <Aligner>
                {
                  <>
                    {selectToken ? <TokenLogoBox1><TokenLogo address={TokenInfo.logo ? TokenInfo.logo : ''} size={'1.625rem'} /></TokenLogoBox1> : (
                      <TokenLogoBox1>
                        <img alt={''} src={NoCoinIcon} />
                      </TokenLogoBox1>
                    )}
                    <StyledTokenName>
                      {
                        TokenInfo.symbol ? (
                          <>
                            <h3>{TokenInfo.symbol}</h3>
                            <p>{TokenInfo.name}</p>
                          </>
                        ) : (
                          t('selectToken')
                        ) 
                      }
                    </StyledTokenName>
                  </>
                }
                <StyledDropDownBox><StyledDropDown selected={!!selectToken} /></StyledDropDownBox>
              </Aligner>
            </CurrencySelect>
            <ErrorSpanBox>
              <ErrorSpan
                data-tip={'Enter max'}
                error={!!errorMessage}
                onClick={() => {
                  extraTextClickHander()
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
                    {balance ? (
                      <>
                        <h5>{t('balances')}:</h5>
                        <p>{balance}</p>
                      </>
                    ) : (
                      <p>{balance}</p>
                    )}
                    <PasteStyle>
                      <img src={Paste} alt={''} />
                    </PasteStyle>
                  </ExtraText>
                </Tooltip>
              </ErrorSpan>
            </ErrorSpanBox>
          </InputRow>
        </Container>
      </InputPanel>
      {/* <OversizedPanel>
        <DownArrowBackground>
        </DownArrowBackground>
      </OversizedPanel> */}
      <InputPanel error={!!errorMessage} style={{marginTop:'20px'}}>
        <Container>
          <LabelRow>
            <LabelContainer>
              <span>{t('redeem')}</span>
            </LabelContainer>
            <SmallScreenView>{balance}</SmallScreenView>
          </LabelRow>
          
          <InputRow>
            <Input
              type="number"
              min="0"
              step="0.000000000000000001"
              error={!!errorMessage}
              placeholder="0.0"
              value={isNaN(outValue) ? '' : outValue}
              onChange={() =>{}}
            />
            <CurrencySelect
              selected={!!selectToken}
              onClick={() => {
                setModelView(true)
              }}
            >
              <Aligner>
                {
                  <>
                    {selectToken ? <TokenLogoBox1><TokenLogo address={TokenInfo.logo ? TokenInfo.logo : ''} size={'1.625rem'} /></TokenLogoBox1> : (
                      <TokenLogoBox1>
                        <img alt={''} src={NoCoinIcon} />
                      </TokenLogoBox1>
                    )}
                    <StyledTokenName>
                      {
                        TokenInfo.symbol ? (
                          <>
                            <h3>{TokenInfo.symbol}</h3>
                            <p>{TokenInfo.name}</p>
                          </>
                        ) : (
                          t('selectToken')
                        ) 
                      }
                    </StyledTokenName>
                  </>
                }
                <StyledDropDownBox><StyledDropDown selected={!!selectToken} /></StyledDropDownBox>
              </Aligner>
            </CurrencySelect>
            <ErrorSpanBox>
              <ErrorSpan>
                <ExtraText>
                  {balance ? (
                    <>
                      <h5>{t('balances')}:</h5>
                      <p>{balance}</p>
                    </>
                  ) : (
                    <p>{balance}</p>
                  )}
                  <PasteStyle>
                    <img src={Paste} alt={''} />
                  </PasteStyle>
                </ExtraText>
              </ErrorSpan>
            </ErrorSpanBox>
          </InputRow>
        </Container>
      </InputPanel>

      <AddressInputPanel title={t('recipient') + ' ' + TokenInfo.symbol  + ' ' + t('address')} onChange={setRecipient} onError={setRecipientError} initialInput={recipient} isValid={true} disabled={false} changeCount={recipientCount}/>

      <Flex>
        {
          account ? (
            <Button
              disabled={isDisabled}
              onClick={() => {
                sendTxns()
              }}
              warning={account}
              loggedOut={!account}
            >
              <StyledBirdgeIcon>
                <img src={BirdgeIcon} alt={''} />
                {t('redeem')}
              </StyledBirdgeIcon>
            </Button>
          ) : (
            <Button onClick={toggleWalletModal} >
              {t('connectToWallet')}
            </Button>
          )
        }
      </Flex>
    </>
  )
}