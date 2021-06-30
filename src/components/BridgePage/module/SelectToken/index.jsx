import React, { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { isMobile } from 'react-device-detect'

import {
  InputRow,
  Input,
  InputPanel,
  LabelContainer,
  LabelRow,
} from '../../../Styled'
import {
  Aligner,
  TokenLogoBox1,
  StyledTokenName,
  StyledDropDownBox,
  StyledDropDown,
  // ErrorSpanBox,
  // ErrorSpan,
  // ExtraText,
  // PasteStyle,
  CurrencySelect,
  Container,
  TokenModalRow,
  TokenRowLeft,
  TokenLogoBox,
  TokenSymbolGroup,
  TokenFullName,
  TokenList as TokenListBox,
  SearchContainer,
  StyledBorderlessInput,
  TokenModal,
  ModalHeader,
  CloseIcon,
  CloseColor
} from '../../../CurrencyInputPanel'

import SymbolLogo from '../../../TokenLogo'
import TokenLogo from '../TokenLogo'

import NoCoinIcon from '../../../../assets/images/icon/no-coin.svg'
// import Paste from '../../../../assets/images/icon/paste.svg'
import SearchIcon from '../../../../assets/images/icon/search.svg'

import { useNetworkModalToggle } from '../../../../contexts/Application'

import { amountFormatter } from '../../../../utils'

import Modal from '../../../Modal'

import { useWeb3React } from '../../../../hooks'

import {formatLabel} from '../common'
import config from '../../../../config'

import {
  BalanceTxt
} from '../style'

export default function SelectToken ({
  tokenList,
  onValueChange = () => {},
  onSelectedToken = () => {},
  onToggleModal = () => {},
  onMax = () => {},
  value = '',
  selectToken,
  modalView,
  isError,
  balance,
}) {
  const { account, chainId } = useWeb3React()
  const { t } = useTranslation()
  const toggleNetworkModal = useNetworkModalToggle()

  const [searchQuery, setSearchQuery] = useState('')

  const useToken = useMemo(() => {
    if (selectToken && tokenList) {
      return tokenList[selectToken]
    } else {
      return {}
    }
  }, [selectToken, tokenList])
  // console.log(amountFormatter(balance, useToken.decimals))
  useEffect(() => {
    if (!selectToken) {
      for (const token in tokenList) {
        onSelectedToken(token)
        break
      }
    }
  }, [tokenList, selectToken, onSelectedToken])

  function onInput(event) {
    const input = event.target.value
    setSearchQuery(input)
  }

  function onCloseModal () {
    onToggleModal(false)
    setSearchQuery('')
  }

  return (
    <>
      <Modal
        isOpen={modalView}
        minHeight={60}
        maxHeight={50}
        onDismiss={() => {onCloseModal()}}
      >
        <TokenModal>
          <ModalHeader>
            <p>{t('selectToken')}</p>
            <CloseIcon onClick={() => {onCloseModal()}}>
              <CloseColor alt={'close icon'} />
            </CloseIcon>
          </ModalHeader>
          <SearchContainer style={{marginTop: '20px'}}>
            <img src={SearchIcon} alt="search" />
            <StyledBorderlessInput
              type="text"
              placeholder={isMobile ? t('searchOrPasteMobile') : t('searchOrPaste')}
              onChange={onInput}
            />
          </SearchContainer>
          <TokenListBox>
            {
              Object.keys(tokenList).map(tokenEntryKey => {
                if (
                  !searchQuery
                  || tokenEntryKey.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
                  || tokenList[tokenEntryKey].symbol.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
                  || tokenList[tokenEntryKey].name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
                ) {
                  return (
                    <TokenModalRow key={tokenEntryKey} onClick={() => {
                      onSelectedToken(tokenEntryKey)
                      onCloseModal()
                    }}>
                      <TokenRowLeft>
                        <TokenLogoBox style={ {'border': '0.0625rem solid rgba(0, 0, 0, 0.1)'}}>
                          <TokenLogo url={tokenList[tokenEntryKey].logoUrl} symbol={tokenList[tokenEntryKey].symbol} size={'2rem'} />
                        </TokenLogoBox>
                        <TokenSymbolGroup>
                          <TokenFullName> {tokenList[tokenEntryKey].symbol}</TokenFullName>
                        </TokenSymbolGroup>
                      </TokenRowLeft>
                    </TokenModalRow>
                  )
                }
                return ''
              })
            }
          </TokenListBox>
        </TokenModal>
      </Modal>
      <InputPanel error={!!(isError === 2)}>
        <Container>
          <LabelRow>
            <LabelContainer>
              <span>{t('from')}</span>
            </LabelContainer>
            {/* <SmallScreenView>{balance ? amountFormatter(balance, useToken.decimals) : ''}</SmallScreenView> */}
            <BalanceTxt onClick={() => {
              if (balance) {
                onMax(amountFormatter(balance, useToken.decimals, 2))
              }
            }}>{t('balances')}: {balance ? amountFormatter(balance, useToken.decimals, 2) : '-'}</BalanceTxt>
          </LabelRow>
          
          <InputRow>
            <Input
              type="number"
              min="0"
              step="0.000000000000000001"
              error={!!(isError === 2)}
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
            <CurrencySelect
              selected={!!selectToken}
              onClick={() => {
                onToggleModal(true)
              }}
            >
              <Aligner>
                {
                  <>
                    {selectToken ? <TokenLogoBox1><TokenLogo url={useToken && useToken.logoUrl ? useToken.logoUrl : ''} symbol={useToken && useToken.symbol ? useToken.symbol : ''} size={'1.625rem'} /></TokenLogoBox1> : (
                      <TokenLogoBox1>
                        <img alt={''} src={NoCoinIcon} />
                      </TokenLogoBox1>
                    )}
                    <StyledTokenName>
                      {
                        useToken && useToken.symbol ? (
                          <>
                            <h3>{formatLabel(useToken.symbol, chainId)}</h3>
                            <p>{useToken.name}</p>
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
            <CurrencySelect
              selected={!!chainId}
              onClick={() => {
                // setModelView(true)
                toggleNetworkModal()
              }}
              style={{marginLeft: "10px"}}
            >
              <Aligner>
                {
                  <>
                    {chainId ? <TokenLogoBox1><SymbolLogo address={config.bridgeAll[chainId].symbol} size={'1.625rem'} /></TokenLogoBox1> : (
                      <TokenLogoBox1>
                        <img alt={''} src={NoCoinIcon} />
                      </TokenLogoBox1>
                    )}
                    <StyledTokenName>
                      {
                        chainId ? (
                          <>
                            <h3>{config.bridgeAll[chainId].name}</h3>
                          </>
                        ) : (
                          t('selectChain')
                        ) 
                      }
                    </StyledTokenName>
                  </>
                }
                <StyledDropDownBox><StyledDropDown selected={!!chainId} /></StyledDropDownBox>
              </Aligner>
            </CurrencySelect>
          </InputRow>
        </Container>
      </InputPanel>
    </>
  )
}