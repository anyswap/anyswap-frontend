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
  
  box-shadow: 7px 2px 26px 0 rgba(0, 0, 0, 0.06);
`

const HeaderSpan = styled.span`
  display: flex;
  width: 100%;
  max-width: 1440px;
  height: 70px;
  object-fit: contain;
  justify-content: space-between;
  padding:0 40px;
  @media screen and (max-width: 960px) {
    padding:0 15px;
  }
`

const StyleAnyLogo = styled(ANYLogo)`
  height: 100%;
`

const HeaderElement = styled.div`
  ${({ theme }) => theme.FlexC};
  min-width: 0;
  padding:14px 0;
`
const NetworkBox  = styled.div`
${({ theme }) => theme.FlexC};
  height: 36px;
  object-fit: contain;
  border-radius: 9px;
  background-color: #f6f4ff;
  font-family: Manrope;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #031a6e;
  white-space:nowrap;
  padding: 0 15px;
  margin-right: 15px;
  span {
    font-weight: bold;
    margin-left:10px;
  }
  @media screen and (max-width: 960px) {
    padding:0 10px;
    font-size: 12px;
    height: 30px;
    margin-right: 5px;
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
            {/* You are on <span>Testnet</span> */}
            {t('onTestnet')} <span>{t('onTestnet1')}</span>
          </NetworkBox>
          <Web3Status />
        </HeaderElement>
      </HeaderSpan>
    </HeaderFrame>
  )
}
