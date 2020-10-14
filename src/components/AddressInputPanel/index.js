import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { transparentize } from 'polished'

import { isAddress } from '../../utils'
import { useWeb3React, useDebounce } from '../../hooks'

import Warning from '../../assets/images/icon/warning.svg'
import { ReactComponent as Close } from '../../assets/images/x.svg'

const InputPanel = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  box-shadow: 0 0.25rem 8px 0 ${({ theme }) => transparentize(0.95, theme.shadowColor)};
  position: relative;
  border-radius: 1.25rem;
  background: ${({theme}) => theme.contentBg};
  z-index: 1;
  padding: 1.5625rem 2.5rem;
  margin-top: 0.625rem;
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

const SubCurrencySelectBox = styled.div`
  ${({ theme }) => theme.FlexBC}
  width: 100%;
  height: 48px;
  object-fit: contain;
  border-radius: 0.5625rem;
  border: solid 0.5px ${({ theme }) => theme.tipBorder};
  background-color: ${({ theme }) => theme.tipBg};
  padding: 0 20px;
  margin-top: 0.625rem;
  div {
    ${({ theme }) => theme.FlexSC}
    p {
      font-family: 'Manrope';
      font-size: 12px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      color: ${({ theme }) => theme.tipColor};
      margin-left:8px;
    }
  }
`
const CloseColor = styled(Close)`
  width: 12px;
  height: 12px;
  cursor:pointer;
  path {
    stroke: #734be2;
  }
`

export default function AddressInputPanel({ title, initialInput = '', onChange = () => {}, onError = () => {}, isValid = false, disabled = false, isShowTip = true }) {
  const { t } = useTranslation()

  const { library } = useWeb3React()

  const [input, setInput] = useState(initialInput.address ? initialInput.address : '')

  const debouncedInput = useDebounce(input, 150)
  // console.log(debouncedInput)
  const [data, setData] = useState({ address: undefined, name: undefined })
  const [error, setError] = useState(false)


  // keep data and errors in sync
  useEffect(() => {
    onChange({ address: data.address, name: data.name })
  }, [onChange, data.address, data.name])
  useEffect(() => {
    onError(error)
  }, [onError, error])

  // run parser on debounced input
  useEffect(() => {
    let stale = false
    if (isAddress(debouncedInput) || isValid) {
      try {
        library
          .lookupAddress(debouncedInput)
          .then(name => {
            if (!stale) {
              // if an ENS name exists, set it as the destination
              if (name) {
                setInput(name)
              } else {
                setData({ address: debouncedInput, name: '' })
                setError(null)
              }
            }
          })
          .catch(() => {
            if (!stale) {
              setData({ address: debouncedInput, name: '' })
              setError(null)
            }
          })
      } catch {
        setData({ address: debouncedInput, name: '' })
        setError(null)
      }
    } else {
      if (debouncedInput !== '') {
        try {
          library
            .resolveName(debouncedInput)
            .then(address => {
              if (!stale) {
                // if the debounced input name resolves to an address
                if (address) {
                  setData({ address: address, name: debouncedInput })
                  setError(null)
                } else {
                  setError(true)
                }
              }
            })
            .catch(() => {
              if (!stale) {
                setError(true)
              }
            })
        } catch {
          setError(true)
        }
      }
    }

    return () => {
      stale = true
    }
  }, [debouncedInput, library, onChange, onError, isValid])

  function onInput(event) {
    if (data.address !== undefined || data.name !== undefined) {
      setData({ address: undefined, name: undefined })
    }
    if (error !== undefined) {
      setError()
    }
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setInput(checksummedInput || input)
  }

  const ADDRESS_TIP_VIEW = localStorage.getItem('ADDRESS_TIP_VIEW')
  const [addressTip, setAddressTip] = useState(ADDRESS_TIP_VIEW)

  function setLoclaAddrTip () {
    localStorage.setItem('ADDRESS_TIP_VIEW', true)
  }

  return (
    <InputPanel>
      <ContainerRow error={input !== '' && error}>
        <InputContainer>
          <LabelRow>
            <LabelContainer>
              <span>{title || t('recipientAddress')}</span>
            </LabelContainer>
          </LabelRow>
          <InputRow>
            <Input
              type="text"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              placeholder={t('enterAddress')}
              error={input !== '' && error}
              onChange={onInput}
              value={input}
              disabled={disabled}
            />
          </InputRow>
        </InputContainer>
      </ContainerRow>
      {
        !ADDRESS_TIP_VIEW && !addressTip && !isShowTip ? (
          <SubCurrencySelectBox>
            <div>
              <img src={Warning} alt={''}/>
              {/* <p>You need to unlock {allTokens[selectedTokenAddress].symbol} to continue</p> */}
              <p dangerouslySetInnerHTML = { 
                  {__html: t('sendTip')}
                }></p>
            </div>
            <CloseColor onClick={() => {
              setLoclaAddrTip()
              setAddressTip()
            }}></CloseColor>
          </SubCurrencySelectBox>
        ) : ''
      }
    </InputPanel>
  )
}
