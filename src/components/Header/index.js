import React from 'react'
import styled from 'styled-components'

// import { Link } from '../../theme'
import Web3Status from '../Web3Status'
// import Toggle from 'react-switch'
// import { transparentize } from 'polished'
// import { darken } from 'polished'
import { useTranslation } from 'react-i18next'
import { useDarkModeManager } from '../../contexts/LocalStorage'

import config from '../../config'
import {ReactComponent as ANYLogo} from '../../assets/images/logo.svg'
import ArrowRighrPurpleIcon from '../../assets/images/icon/arrowRighr-purple.svg'
import IconDay from '../../assets/images/icon/day.svg'
import IconNight from '../../assets/images/icon/night.svg'

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
  background: ${({ theme }) => theme.lightPuroleBg};
  font-family: 'Manrope';
  font-size: 0.875rem;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: ${({theme}) => theme.textColor};
  white-space:nowrap;
  padding: 0 1rem;
  margin-right: 1rem;
  font-weight: bold;
  span {
    font-weight: normal;
    margin-right:0.625rem;
  }
  .switchTo {
    ${({ theme }) => theme.FlexC};
    margin-left: 42px;
    font-size: 12px;
    color: ${({ theme }) => theme.switchColor};
    cursor:pointer;
  }
  @media screen and (max-width: 960px) {
    padding:0 0.625rem;
    font-size: 0.75rem;
    height: 1.875rem;
    margin-right: 5px;
    span {
      display:none;
    }
    .switchTo {
      margin-left:5px;
      img {
        display:none;
      }
    }
  }
`

// const StyledToggle = styled(Toggle)`
//   margin-right: 24px;

//   .react-switch-bg[style] {
//     background-color: ${({ theme }) => darken(0.05, theme.inputBackground)} !important;
//     border: 0.0625rem solid ${({ theme }) => theme.concreteGray} !important;
//   }

//   .react-switch-handle[style] {
//     background-color: ${({ theme }) => theme.inputBackground};
//     box-shadow: 0 0.25rem 8px 0 ${({ theme }) => transparentize(0.93, theme.shadowColor)};
//     border: 0.0625rem solid ${({ theme }) => theme.mercuryGray};
//     border-color: ${({ theme }) => theme.mercuryGray} !important;
//     top: 0.125rem !important;
//   }
// `

// const EmojiToggle = styled.span`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100%;
//   font-family: 'Manrope';
// `

const StyleDarkToggle = styled.div`
${({ theme }) => theme.FlexC};
  width: 36px;
  min-width: 36px;
  height: 36px;
  border-radius: 9px;
  margin-left: 15px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.lightPuroleBg};
  @media screen and (max-width: 960px) {
    margin-left: 5px;
  }
`

export default function Header() {
  const { t } = useTranslation()
  const [isDark, toggleDarkMode] = useDarkModeManager()
  function openUrl () {
    if (config.symbol === 'FSN') {
      // window.open(config.BSCmainUrl)
      localStorage.setItem('ENV_CONFIG', 'BNB_MAIN')
    } else {
      // window.open(config.FSNmainUrl)
      localStorage.setItem('ENV_CONFIG', 'FSN_MAIN')
    }
    // console.log(localStorage.getItem('ENV_CONFIG'))
    history.go(0)
  }
  return (
    <HeaderFrame>
      <HeaderSpan>
        <HeaderElement>
          <StyleAnyLogo></StyleAnyLogo>
        </HeaderElement>
        <HeaderElement>
          <NetworkBox>
            {/* <span>{t('onTestnet')}</span>
            {config.networkName} {config.env === 'test' ? t('testnet') : t('mainnet')}
            <div className='switchTo' onClick={openUrl}>
              {t('SwitchTo')} {config.networkName} 
              {config.env === 'test' ?  t('mainnet') : t('testnet')}
              <img alt='' src={ArrowRighrPurpleIcon} style={{marginLeft: '8px'}} />
            </div> */}
            <span>{t('onTestnet')}</span>
            {config.networkName} {config.env === 'test' ?  t('testnet') : t('mainnet')}
            <div className='switchTo' onClick={openUrl}>
              {t('SwitchTo')} {config.symbol === 'FSN' ? 'BSC' : 'FSN'} 
              {t('mainnet')}
              <img alt='' src={ArrowRighrPurpleIcon} style={{marginLeft: '8px'}} />
            </div>
          </NetworkBox>
          <Web3Status />
          <StyleDarkToggle
            onClick={() => {
              toggleDarkMode()
            }}
          >
            {
              isDark ? (

                <img src={IconDay} alt="" />
              ) : (

                <img src={IconNight} alt="" />
              )
            }
          </StyleDarkToggle>
          {/* <StyledToggle
            checked={!isDark}
            uncheckedIcon={
              <EmojiToggle role="img" aria-label="moon">
                🌙️
              </EmojiToggle>
            }
            checkedIcon={
              <EmojiToggle role="img" aria-label="sun">
                {'☀️'}
              </EmojiToggle>
            }
            onChange={() => {
              toggleDarkMode()
            }}
          /> */}
        </HeaderElement>
      </HeaderSpan>
    </HeaderFrame>
  )
}
