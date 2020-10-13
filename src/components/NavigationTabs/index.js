import React, { useCallback, useState } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { transparentize, darken } from 'polished'

import { useWeb3React, useBodyKeyDown } from '../../hooks'
import { Link } from '../../theme/components'

import TelegramIcon from '../../assets/images/icon/telegram.svg'
import TelegramIconWhite from '../../assets/images/icon/telegram-white.svg'
import MediumIcon from '../../assets/images/icon/medium.svg'
import MediumIconWhite from '../../assets/images/icon/medium-white.svg'
import TwitterIcon from '../../assets/images/icon/twitter.svg'
import TwitterIconWhite from '../../assets/images/icon/twitter-white.svg'
import CodeIcon from '../../assets/images/icon/code.svg'
import CodeIconWhite from '../../assets/images/icon/code-white.svg'
import GithubIcon from '../../assets/images/icon/github.png'
import GithubIconWhite from '../../assets/images/icon/github-white.png'

import CoinmarketcapIcon from '../../assets/images/icon/coinmarketcap.png'
import CoinmarketcapIconWhite from '../../assets/images/icon/coinmarketcap-white.png'
import config from '../../config'

const tabOrder = [
  {
    path: '/dashboard',
    textKey: 'dashboard',
    icon: require('../../assets/images/icon/application.svg'),
    iconActive: require('../../assets/images/icon/application-purpl.svg'),
    regex: /\/dashboard/,
    className: '',
  },
  {
    path: '/swap',
    textKey: 'swap',
    icon: require('../../assets/images/icon/swap.svg'),
    iconActive: require('../../assets/images/icon/swap-purpl.svg'),
    regex: /\/swap/,
  },
  {
    path: '/send',
    textKey: 'send',
    icon: require('../../assets/images/icon/send.svg'),
    iconActive: require('../../assets/images/icon/send-purpl.svg'),
    regex: /\/send/,
  },
  {
    path: '/add-liquidity',
    textKey: 'pool',
    icon: require('../../assets/images/icon/pool.svg'),
    iconActive: require('../../assets/images/icon/pool-purpl.svg'),
    regex: /\/add-liquidity|\/remove-liquidity|\/create-exchange.*/,
  },
  {
    path: '/bridge',
    textKey: 'bridge',
    icon: require('../../assets/images/icon/bridge.svg'),
    iconActive: require('../../assets/images/icon/bridge-purpl.svg'),
    regex: /\/bridge/,
  },
]

const tabOrder2 = [
  {
    path: config.marketsUrl,
    textKey: 'Markets',
    icon: require('../../assets/images/icon/markets.svg'),
    iconActive: require('../../assets/images/icon/markets-purpl.svg'),
    regex: /\/markets/,
    className: 'otherInfo'
  },
  {
    path: '',
    textKey: 'ANYToken',
    icon: require('../../assets/images/icon/any.svg'),
    iconActive: require('../../assets/images/icon/any-purpl.svg'),
    regex: /\/anyToken/,
    className: 'otherInfo'
  },
  {
    path: '',
    textKey: 'Network',
    icon: require('../../assets/images/icon/network.svg'),
    iconActive: require('../../assets/images/icon/network-purpl.svg'),
    regex: /\/network/,
    className: 'otherInfo'
  },
  {
    path: config.document,
    textKey: 'Documents',
    icon: require('../../assets/images/icon/documents.svg'),
    iconActive: require('../../assets/images/icon/documents-purpl.svg'),
    regex: /\/documents/,
    className: 'otherInfo noBB'
  },
]


const Tabs = styled.div`
  align-items: center;
  margin-bottom: 0.625rem;
  width:100%;
  padding: 1.5625rem 1.5625rem 0px;
  box-sizing: border-box;
  
  @media screen and (max-width: 960px) {
    ${({ theme }) => theme.FlexBC};
    padding: 8px 5px;
    margin:0;
  }
`

const Tabs2  = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  align-items: center;
  margin-bottom: 19px;
  width:100%;
  padding: 1rem 1.5625rem;
  box-sizing: border-box;
  border-top: 0.0625rem solid  rgba(0, 0, 0, 0.06);
  border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.06);
  @media screen and (max-width: 960px) {
    display:none;
  }
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  width:100%;
  align-items: center;
  justify-content: flex-start;
  flex: 1 0 auto;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({theme}) => theme.navColor};
  font-size: 0.875rem;
  font-family: 'Manrope';
  box-sizing: border-box;
  padding: 1rem 0.875rem;
  line-height: 1rem;
  margin: 6px 0;
  height: 48px;
  border-radius: 0.5625rem;
  position:relative;
  white-space:nowrap;

  
  .icon {
    height: 38px;
    width: 38px;
    margin-right: 1rem;
    background:${({theme}) => theme.navBg2};
    border-radius:100%;
    display: flex;
    justify-content: center;
    align-items:center;
    img {
      display:block;
      height: 18px;
      &.show {
        display:none;
      }
    }
  }

  &:hover {
    color: ${({theme}) => theme.textColor};
    font-weight: 600;
    .icon {
      background: ${({theme}) => theme.navBg2};
    }
  }
  &.${activeClassName} {
    color: #ffffff;
    background: ${({theme}) => theme.bgColorLinear};
    border-bottom: none;
    font-weight: 800;
    box-shadow: 0 0.25rem 0.75rem 0 rgba(115, 75, 226, 0.51);
    .icon {
      background: ${({theme}) => theme.navBg};
      box-shadow: 0 0.25rem 0.75rem 0 rgba(115, 75, 226, 0.51);
    }
  }

  &.mt15 {
    margin-top: 1rem;
  }
  &.mt20 {
    margin-top: 1.25rem;
  }
  &.mb20 {
    margin-bottom: 1.25rem;
  }

  &.noBB {
    border-bottom:none;
  }
  .arrow {
    position: absolute;
    top: 0.875rem;
    right:1rem;
  }
  @media screen and (max-width: 960px) {
    ${({theme}) => theme.FlexC};
    width: 20%;
    margin:0;
    font-size: 0.75rem;
    .icon {
      display:none;
    }
  }
`

const OutLinkHref = styled(Link).attrs({
  activeClassName
})`
${({ theme }) => theme.flexRowNoWrap}
  width:100%;
  align-items: center;
  justify-content: flex-start;
  flex: 1 0 auto;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({theme}) => theme.textColorBold};
  font-size: 0.875rem;
  font-family: 'Manrope';
  box-sizing: border-box;
  padding: 1rem 0.875rem;
  line-height: 1rem;
  margin: 6px 0;
  height: 48px;
  border-radius: 0.5625rem;
  position:relative;
  white-space:nowrap;

  &.otherInfo {
    height: 2.5rem;
    font-size: 0.75rem;
    font-weight: normal;
    color: #96989e;
    border-bottom:none;
    margin: 0;
    padding: 0.0625rem 0.875rem;
    border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.06);
    .icon {
      height: 38px;
      width: 38px;
      margin-right: 1rem;
      display: flex;
      justify-content: center;
      align-items:center;
      background:none;
      img {
        display:block;
        height: 18px;
        &.show {
          display:none;
        }
      }
    }
    &:hover {
      color: ${({theme}) => theme.textColor};
      font-weight: 600;
    }
  }
  
  &.noBB {
    border-bottom:none;
  }
  .arrow {
    position: absolute;
    top: 0.875rem;
    right:1rem;
  }
`

const OutLink = styled.div`
padding-left: 44px;
`
const OutLinkImgBox = styled.div`
  ${({theme}) => theme.FlexSC};
  @media screen and (max-width: 960px) {
    display:none;
  }
`
const OutLinkImg = styled.div`
  ${({theme}) => theme.FlexC};
  width: 38px;
  height: 38px;
  background-color: ${({theme}) => theme.selectedBg};
  border-radius: 100%;
  margin-right: 0.625rem;
  padding: 10px;
  &:hover {
    background-color: #5f6cfc;
  }
  img {
    display:block;
    width:100%;
    &.show {
      display:none;
    }
  }
`
const CopyRightBox = styled.div`
font-family: 'Manrope';
  h5 {
    font-size: 0.75rem;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.17;
    letter-spacing: normal;
    color: ${({ theme }) => theme.textColorBold};
    margin: 1rem 0 0px;
    span { 
      font-weight: bold;
    }
  }
  p {
    font-size: 0.75rem;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.17;
    letter-spacing: normal;
    color: #96989e;
    margin-top:6px;
    margin-bottom:0;
  }
  @media screen and (max-width: 960px) {
    display:none;
  }
`
const NavListTab =  styled(NavLink).attrs({
  activeClassName
})`

`

function NavigationTabs({ location: { pathname }, history }) {
  const { t } = useTranslation()

  const navigate = useCallback(
    direction => {
      const tabIndex = tabOrder.findIndex(({ regex }) => pathname.match(regex))
      history.push(tabOrder[(tabIndex + tabOrder.length + direction) % tabOrder.length].path)
    },
    [pathname, history]
  )
  const navigateRight = useCallback(() => {
    navigate(1)
  }, [navigate])
  const navigateLeft = useCallback(() => {
    navigate(-1)
  }, [navigate])

  useBodyKeyDown('ArrowRight', navigateRight)
  useBodyKeyDown('ArrowLeft', navigateLeft)

  const [navHover, setNavHover] = useState(false)

  function toggleHover (textKey) {
    setNavHover(textKey)
  }
  return (
    <>

      <Tabs>
        {tabOrder.map(({ path, textKey, regex, icon, iconActive, className }, index) => {
          return (
            <StyledNavLink key={index} to={path} isActive={(_, { pathname }) => pathname.match(regex)} className={(className ? className : '')} onMouseEnter={() => {toggleHover(textKey)}} onMouseLeave={() => {toggleHover('')}}>
              <div className={'icon'}>
                {/* <img src={pathname.match(regex) || navHover === textKey ? iconActive : icon}/> */}
                <img alt={''} src={iconActive} className={pathname.match(regex) || navHover === textKey ? '' : 'show'}/>
                <img alt={''} src={icon} className={pathname.match(regex) || navHover === textKey ? 'show' : ''}/>
              </div>
              {t(textKey)}
            </StyledNavLink>
          )
        })}
      </Tabs>
      <Tabs2>
        {tabOrder2.map(({ path, textKey, regex, icon, iconActive, className }, index) => (
          <OutLinkHref key={index} href={path} className={className ? className : ''} onMouseEnter={() => {toggleHover(textKey)}} onMouseLeave={() => {toggleHover('')}}>
            <div className={'icon'}>
              {/* <img src={pathname.match(regex) || navHover === textKey ? iconActive : icon}/> */}
              <img alt={''} src={iconActive} className={pathname.match(regex) || navHover === textKey ? '' : 'show'}/>
              <img alt={''} src={icon} className={pathname.match(regex) || navHover === textKey ? 'show' : ''}/>
            </div>
            {t(textKey)}
          </OutLinkHref>
        ))}
      </Tabs2>
      <OutLink>
        <OutLinkImgBox>
          <Link id="link" href="https://t.me/anyswap">
            <OutLinkImg onMouseEnter={() => {toggleHover('TelegramIcon')}} onMouseLeave={() => {toggleHover('')}}>
              {/* <img src={TelegramIcon} /> */}
              <img alt={''} src={TelegramIconWhite} className={navHover === 'TelegramIcon' ? '' : 'show'}/>
              <img alt={''} src={TelegramIcon} className={navHover === 'TelegramIcon' ? 'show' : ''}/>
            </OutLinkImg>
          </Link>
          <Link id="link" href="https://medium.com/@anyswap">
            <OutLinkImg onMouseEnter={() => {toggleHover('MediumIcon')}} onMouseLeave={() => {toggleHover('')}}>
              {/* <img src={MediumIcon} /> */}
              <img alt={''} src={MediumIconWhite} className={navHover === 'MediumIcon' ? '' : 'show'}/>
              <img alt={''} src={MediumIcon} className={navHover === 'MediumIcon' ? 'show' : ''}/>
            </OutLinkImg>
          </Link>
          <Link id="link" href="https://twitter.com/AnyswapNetwork">
            <OutLinkImg onMouseEnter={() => {toggleHover('TwitterIcon')}} onMouseLeave={() => {toggleHover('')}}>
              {/* <img src={TwitterIcon} /> */}
              <img alt={''} src={TwitterIconWhite} className={navHover === 'TwitterIcon' ? '' : 'show'}/>
              <img alt={''} src={TwitterIcon} className={navHover === 'TwitterIcon' ? 'show' : ''}/>
            </OutLinkImg>
          </Link>
          <Link id="link" href="https://github.com/anyswap">
            <OutLinkImg onMouseEnter={() => {toggleHover('GithubIcon')}} onMouseLeave={() => {toggleHover('')}}>
              {/* <img src={CodeIcon} /> */}
              <img alt={''} src={GithubIconWhite} className={navHover === 'GithubIcon' ? '' : 'show'}/>
              <img alt={''} src={GithubIcon} className={navHover === 'GithubIcon' ? 'show' : ''}/>
            </OutLinkImg>
          </Link>
          <Link id="link" href="https://coinmarketcap.com/exchanges/anyswap">
            <OutLinkImg onMouseEnter={() => {toggleHover('coinmarketcap')}} onMouseLeave={() => {toggleHover('')}}>
              {/* <img src={CodeIcon} /> */}
              <img alt={''} src={CoinmarketcapIconWhite} className={navHover === 'coinmarketcap' ? '' : 'show'}/>
              <img alt={''} src={CoinmarketcapIcon} className={navHover === 'coinmarketcap' ? 'show' : ''}/>
            </OutLinkImg>
          </Link>
        </OutLinkImgBox>
        <CopyRightBox>
          <h5>Powered by <span>Fusion DCRM</span></h5>
          <p>© 2020 Anyswap. All rights reserved.</p>
        </CopyRightBox>
      </OutLink>
    </>
  )
}

export default withRouter(NavigationTabs)
