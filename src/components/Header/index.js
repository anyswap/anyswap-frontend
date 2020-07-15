import React from 'react'
import styled from 'styled-components'

// import { Link } from '../../theme'
import Web3Status from '../Web3Status'
import { transparentize } from 'polished'
import { darken } from 'polished'
import { useTranslation } from 'react-i18next'

import {ReactComponent as ANYLogo} from '../../assets/images/logo.svg'

const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  marginn:auto;
  z-index: 2;
  width:100%;
  
  box-shadow: 0.4375rem 0.125rem 1.625rem 0 rgba(0, 0, 0, 0.06);
`

const HeaderSpan = styled.span`
  display: flex;
  width: 100%;
  max-width: 1440px;
  height: 70px;
  object-fit: contain;
  justify-content: space-between;
  padding:0 1.5625rem;
  @media screen and (max-width: 960px) {
    padding:0 1rem;
  }
`

const StyleAnyLogo = styled(ANYLogo)`
  height: 100%;
`

const HeaderElement = styled.div`
  ${({ theme }) => theme.FlexC};
  min-width: 0;
  padding:0.875rem 0;
`
const NetworkBox  = styled.div`
${({ theme }) => theme.FlexC};
  height: 36px;
  object-fit: contain;
  border-radius: 0.5625rem;
  background-color: #f6f4ff;
  font-family: Manrope;
  font-size: 0.875rem;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #031a6e;
  white-space:nowrap;
  padding: 0 1rem;
  margin-right: 1rem;
  font-weight: bold;
  span {
    font-weight: normal;
    margin-right:0.625rem;
  }
  @media screen and (max-width: 960px) {
    padding:0 0.625rem;
    font-size: 0.75rem;
    height: 1.875rem;
    margin-right: 5px;
    span {
      display:none;
    }
  }
`

export default function Header() {
  const { t } = useTranslation()
  return (
    <HeaderFrame>
      <HeaderSpan>
        <HeaderElement>
          <StyleAnyLogo></StyleAnyLogo>
        </HeaderElement>
        <HeaderElement>
          <NetworkBox>
            <span>{t('onTestnet')}</span> {t('testnet')}
          </NetworkBox>
          <Web3Status />
        </HeaderElement>
      </HeaderSpan>
    </HeaderFrame>
  )
}
