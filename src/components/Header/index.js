import React, {useState} from 'react'
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
import {ReactComponent as ANYLogoNight} from '../../assets/images/logo-white.svg'
import ArrowRighrPurpleIcon from '../../assets/images/icon/arrowRighr-purple.svg'
import IconDay from '../../assets/images/icon/day.svg'
import IconNight from '../../assets/images/icon/night.svg'
import { ReactComponent as Close } from '../../assets/images/x.svg'
import ScheduleIcon from '../../assets/images/icon/schedule.svg'
import { createBrowserHistory } from 'history'

import {chainList} from '../../config/coinbase/nodeConfig'
import TokenLogo from '../TokenLogo'
import Modal from '../Modal'

// import web3Fn from '../../utils/web3'

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
const StyleAnyNightLogo = styled(ANYLogoNight)`
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
  cursor:pointer;
  span {
    font-weight: normal;
    margin-right:0.625rem;
  }
  .switchTo {
    ${({ theme }) => theme.FlexC};
    margin-left: 8px;
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

const Wrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  margin: 0;
  padding: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundColor};
`

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1.5rem 1.5rem;
  font-weight: 500;
  color: ${props => (props.color === 'blue' ? ({ theme }) => theme.royalBlue : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`
const HoverText = styled.div`
  :hover {
    cursor: pointer;
  }
`

const ContentWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundColor};
  padding: 0px 0.625rem 0.625rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 1rem`};
`

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 0.875rem;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`
const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.chaliceGray};
  }
`
const UpperSection = styled.div`
  position: relative;
  width: 100%;
  font-family: 'Manrope';

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`

const NetWorkList = styled.div`
  width:100%;
  overflow:auth;
`

const InfoCard = styled.button`
  background-color: ${({ theme, active }) => (active ? theme.activeGray : theme.backgroundColor)};
  padding: 1rem;
  outline: none;
  border: 0.0625rem solid transparent;
  width: 100% !important;
  // &:focus {
  //   box-shadow: 0 0 0 0.0625rem ${({ theme }) => theme.royalBlue};
  // }
  cursor:pointer;
  // border-bottom: 0.0625rem solid ${({ theme, active }) => (active ? 'transparent' : theme.placeholderGray)};
  border-bottom: 0.0625rem solid ${({ theme }) => theme.placeholderGray};
`

const OptionCard = styled(InfoCard)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  padding: 0.625rem 1rem;
`

const OptionCardLeft = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  justify-content: center;
  height: 100%;
`

const OptionCardClickable = styled(OptionCard)`
  margin-top: 0;
  &:hover {
    cursor: ${({ clickable }) => (clickable ? 'pointer' : '')};
    background: rgba(0,0,0,.1);
  }
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
  &:last-child{
    border-bottom:none;
  }
`
const WalletLogoBox = styled.div`
  width:100%;
  ${({theme}) => theme.FlexBC}
`
const WalletLogoBox2 = styled.div`
width:100%;
  ${({theme}) => theme.FlexSC}
`
const IconWrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  margin-right: 1.25rem;
  border: solid 0.0625rem rgba(0, 0, 0, 0.1);
  background:#fff;
  width:46px;
  height:46px;
  border-radius:100%;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '1.625rem')};
    width: ${({ size }) => (size ? size + 'px' : '1.625rem')};
  }
  // ${({ theme }) => theme.mediaWidth.upToMedium`
  //   align-items: flex-end;
  // `};
`
const HeaderText = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  color: ${props => (props.color === 'blue' ? ({ theme }) => theme.royalBlue : ({ theme }) => theme.textColor)};
  font-size: 1rem;
  font-family: 'Manrope';
  font-weight: 500;
`
const CircleWrapper = styled.div`
  color: ${({ theme }) => theme.connectedGreen};
  display: flex;
  justify-content: center;
  align-items: center;
`
const GreenCircle = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  justify-content: center;
  align-items: center;

  &:first-child {
    height: 8px;
    width: 8px;
    margin-right: 8px;
    background-color: ${({ theme }) => theme.connectedGreen};
    border-radius: 50%;
  }
`
const ComineSoon = styled.div`
${({theme}) => theme.FlexC}
width: 118px;
font-family: 'Manrope';
  font-size: 0.75rem;
  color: #96989e;
  height: 30px;
  padding: 0 8px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.CommingSoon};
  white-space: nowrap;
`
export default function Header() {
  const { t } = useTranslation()
  const [isDark, toggleDarkMode] = useDarkModeManager()
  const [networkView, setNetworkView] = useState(false)
  const history = createBrowserHistory()
  // console.log(window.location)


  // function setMetamaskNetwork (item) {
  //   const { ethereum } = window
  //   const ethereumFN = {
  //     request: '',
  //     ...ethereum
  //   }
  //   if (ethereumFN && ethereumFN.request) {
  //     ethereumFN.request({
  //       method: 'wallet_addEthereumChain',
  //       params: [
  //         {
  //           chainId: web3Fn.utils.toHex(item.chainID), // A 0x-prefixed hexadecimal string
  //           chainName: item.networkName,
  //           nativeCurrency: {
  //             name: item.name,
  //             symbol: item.symbol, // 2-6 characters long
  //             decimals: 18,
  //           },
  //           rpcUrls: [item.rpc],
  //           blockExplorerUrls: [item.explorer],
  //           iconUrls: null // Currently ignored.
  //         }
  //       ],
  //     }).then((res) => {
  //       console.log(res)
  //       localStorage.setItem(config.ENV_NODE_CONFIG, item.label)
  //       history.push(window.location.pathname + '')
  //       history.go(0)
  //       setNetworkView(false)
  //     }).catch((err) => {
  //       console.log(err)
  //       alert(t('changeMetamaskNetwork', {label: item.networkName}))
  //       setNetworkView(false)
  //     })
  //   } else {
  //     alert(t('changeMetamaskNetwork', {label: item.networkName}))
  //     setNetworkView(false)
  //   }
  // }

  // function openUrl (item) {
  //   if (!item.isSwitch) {
  //     return
  //   }
  //   console.log(item)
  //   setMetamaskNetwork(item)
  // }
  function openUrl (item) {
    if (item.symbol === config.symbol || !item.isSwitch) {
      return
    }
    // console.log(item.label)
    localStorage.setItem(config.ENV_NODE_CONFIG, item.label)
    history.push(window.location.pathname + '')
    history.go(0)
  }

  

  function Option (item) {
    return (
      <>
        <WalletLogoBox>
          <WalletLogoBox2>
            <IconWrapper active={config.symbol === item.symbol && item.type === config.env}>
              {/* <img src={icon} alt={'Icon'} /> */}
              <TokenLogo address={item.symbol} size={'46px'}></TokenLogo>
            </IconWrapper>
            <OptionCardLeft>
              <HeaderText>
                {' '}
                {config.symbol === item.symbol && item.type === config.env ? (
                  <CircleWrapper>
                    <GreenCircle>
                      <div />
                    </GreenCircle>
                  </CircleWrapper>
                ) : (
                  ''
                )}
                {item.name}
                {t(config.env)}
              </HeaderText>
            </OptionCardLeft>
          </WalletLogoBox2>
          {
            !item.isSwitch ? (
              <ComineSoon>
                <img alt={''} src={ScheduleIcon} style={{marginRight: '10px'}} />
                {t('ComineSoon')}
              </ComineSoon>
            ) : ''
          }
        </WalletLogoBox>
      </>
    )
  }
  function changeNetwork () {
    let curChainList = chainList[config.env]
    return (
      <Modal
        isOpen={networkView}
        onDismiss={() => { setNetworkView(false) }}
        minHeight={null}
        maxHeight={300}
      >
        <Wrapper>
          <UpperSection>
            <CloseIcon onClick={() => {setNetworkView(false)}}>
              <CloseColor alt={'close icon'} />
            </CloseIcon>
            <HeaderRow>
              <HoverText>{t('SwitchTo')}</HoverText>
            </HeaderRow>
            <ContentWrapper>
              <NetWorkList>
                {
                  curChainList.map((item, index) => {
                    return (
                      <OptionCardClickable key={index} active={config.symbol === item.symbol && item.type === config.env} onClick={() => {openUrl(item)}}>
                        {Option(item)}
                        {/* <img alt={''} src={AddIcon} /> */}
                      </OptionCardClickable>
                    )
                  })
                }
              </NetWorkList>
            </ContentWrapper>
          </UpperSection>
        </Wrapper>
      </Modal>
    )
  }

  return (
    <>
      {changeNetwork()}
      <HeaderFrame>
        <HeaderSpan>
          <HeaderElement>
            {
              isDark ? (
                <StyleAnyNightLogo></StyleAnyNightLogo>
              ) : (
                <StyleAnyLogo></StyleAnyLogo>
              )
            }
          </HeaderElement>
          <HeaderElement>
            <NetworkBox onClick={() => {setNetworkView(true)}}>
              {/* <span>{t('onTestnet')}</span> */}
              <TokenLogo address={config.symbol} size={'24px'} style={{marginRight: '10px'}}></TokenLogo>
              {config.networkName} {config.env === 'test' ?  t('testnet') : t('mainnet')}
              <div className='switchTo'>
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
          </HeaderElement>
        </HeaderSpan>
      </HeaderFrame>
    </>
  )
}
