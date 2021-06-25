import React, { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Tooltip from '@reach/tooltip'
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
  SmallScreenView,
  TokenModalRow,
  TokenRowLeft,
  TokenLogoBox,
  TokenSymbolGroup,
  TokenFullName,
  TokenList as TokenListBox,
  // SearchContainer,
  // StyledBorderlessInput,
  TokenModal,
  ModalHeader,
  CloseIcon,
  CloseColor
} from '../../../CurrencyInputPanel'

import SymbolLogo from '../../../TokenLogo'
import TokenLogo from '../TokenLogo'

import NoCoinIcon from '../../../../assets/images/icon/no-coin.svg'
// import Paste from '../../../../assets/images/icon/paste.svg'
// import SearchIcon from '../../../../assets/images/icon/search.svg'

import Modal from '../../../Modal'

import {formatLabel} from '../common'

import config from '../../../../config'

export default function SelectCurrency ({
  tokenList,
  selectToken,
  selectChain,
  onSelectedChain = () => {},
  onSelectedChainInfo = () => {},
  onOpenTokenModal = () => {},
  value = '',
  bridgeType
}) {
  const { t } = useTranslation()

  const [errorMessage, setErrorMessage] = useState()
  const [balance, setBalance] = useState()
  const [modelView, setModelView] = useState(false)

  const useToken = useMemo(() => {
    if (selectToken && tokenList) {
      return tokenList[selectToken]
    } else {
      return {}
    }
  }, [selectToken, tokenList])
  // console.log(useToken)
  useEffect(() => {
    if (!selectChain && useToken.list) {
      for (const item of useToken.list) {
        const curChainId = item.destChainID
        // console.log(curChainId)
        onSelectedChain(curChainId)
        onSelectedChainInfo(item)
        break
      }
    }
  }, [useToken, selectChain, onSelectedChain, onSelectedChainInfo])

  const chainList = useMemo(() => {
    if (useToken && useToken.list && useToken.list.length > 0) {
      return useToken.list
    } else {
      return []
    }
  }, [useToken])
  // console.log(useToken)

  function onCloseModal () {
    setModelView(false)
  }

  return (
    <>
      <Modal
        isOpen={modelView}
        minHeight={60}
        maxHeight={50}
        onDismiss={() => {onCloseModal()}}
      >
        <TokenModal>
          <ModalHeader>
            <p>{t('selectChain')}</p>
            <CloseIcon onClick={() => {onCloseModal()}}>
              <CloseColor alt={'close icon'} />
            </CloseIcon>
          </ModalHeader>
          <TokenListBox>
            {
              // Object.keys(tokenList).map(tokenEntryKey => {
              chainList.map((item, index) => {
                const curChainId = item.destChainID
                const curToken = item.DestToken.ContractAddress
                return (
                  <TokenModalRow key={index} onClick={() => {
                    onSelectedChain(curChainId)
                    onSelectedChainInfo(item)
                    onCloseModal()
                  }}>
                    <TokenRowLeft title={curToken}>
                      <TokenLogoBox style={ {'border': '0.0625rem solid rgba(0, 0, 0, 0.1)'}}>
                        <SymbolLogo address={config.bridgeAll[curChainId].symbol} size={'2rem'} />
                      </TokenLogoBox>
                      <TokenSymbolGroup>
                        <TokenFullName> {config.bridgeAll[curChainId].name}</TokenFullName>
                        {/* <TokenFullName> {formatLabel(useToken.symbol, curChainId)}</TokenFullName> */}
                      </TokenSymbolGroup>
                    </TokenRowLeft>
                  </TokenModalRow>
                )
              })
            }
          </TokenListBox>
        </TokenModal>
      </Modal>
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
              onChange={e => {}}
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
              selected={!!selectChain}
              onClick={() => {
                onOpenTokenModal(true)
              }}
            >
              <Aligner>
                {
                  <>
                    {selectChain ? <TokenLogoBox1><TokenLogo url={useToken && useToken.logoUrl ? useToken.logoUrl : ''} symbol={useToken && useToken.symbol ? useToken.symbol : ''} size={'1.625rem'} /></TokenLogoBox1> : (
                      <TokenLogoBox1>
                        <img alt={''} src={NoCoinIcon} />
                      </TokenLogoBox1>
                    )}
                    <StyledTokenName>
                      {
                        useToken && useToken.symbol ? (
                          <>
                            <h3>{formatLabel(useToken.symbol, selectChain)}</h3>
                            <p>{useToken.name}</p>
                          </>
                        ) : (
                          t('selectToken')
                        ) 
                      }
                    </StyledTokenName>
                  </>
                }
                <StyledDropDownBox><StyledDropDown selected={!!selectChain} /></StyledDropDownBox>
              </Aligner>
            </CurrencySelect>
            <CurrencySelect
              selected={!!selectChain}
              onClick={() => {
                setModelView(true)
              }}
              style={{marginLeft: "10px"}}
            >
              <Aligner>
                {
                  <>
                    {selectChain ? <TokenLogoBox1><SymbolLogo address={config.bridgeAll[selectChain].symbol} size={'1.625rem'} /></TokenLogoBox1> : (
                      <TokenLogoBox1>
                        <img alt={''} src={NoCoinIcon} />
                      </TokenLogoBox1>
                    )}
                    <StyledTokenName>
                      {
                        selectChain ? (
                          <>
                            <h3>{config.bridgeAll[selectChain].name}</h3>
                          </>
                        ) : (
                          t('selectChain')
                        ) 
                      }
                    </StyledTokenName>
                  </>
                }
                <StyledDropDownBox><StyledDropDown selected={!!selectChain} /></StyledDropDownBox>
              </Aligner>
            </CurrencySelect>
          </InputRow>
        </Container>
      </InputPanel>
    </>
  )
}