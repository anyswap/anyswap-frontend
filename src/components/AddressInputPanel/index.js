import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
// import { transparentize } from 'polished'

import { isAddress } from '../../utils'
import { useWeb3React, useDebounce } from '../../hooks'

import Warning from '../../assets/images/icon/warning.svg'
import { ReactComponent as Close } from '../../assets/images/x.svg'

import {
  InputPanel,
  ContainerRow,
  InputContainer,
  LabelRow,
  LabelContainer,
  InputRow,
  Input
} from '../Styled'


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

export default function AddressInputPanel({ title, initialInput = '', onChange = () => {}, onError = () => {}, isValid = false, disabled = false, isShowTip = true, changeCount }) {
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
    onChange({ address: '', name: ''})
    setInput('')
  }, [onChange, changeCount])

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
    <>
      <InputPanel style={{marginTop: '20px'}}>
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
                className='small'
              />
            </InputRow>
          </InputContainer>
        </ContainerRow>
      </InputPanel>
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
    </>
  )
}
