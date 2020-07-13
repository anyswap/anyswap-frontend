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

const tabOrder = [
  {
    path: '/dashboard',
    textKey: 'dashboard',
    icon: require('../../assets/images/icon/application.svg'),
    iconActive: require('../../assets/images/icon/application-purpl.svg'),
    regex: /\/dashboard/,
    className: ''
  },
  {
    path: '/swap',
    textKey: 'swap',
    icon: require('../../assets/images/icon/swap.svg'),
    iconActive: require('../../assets/images/icon/swap-purpl.svg'),
    regex: /\/swap/
  },
  {
    path: '/send',
    textKey: 'send',
    icon: require('../../assets/images/icon/send.svg'),
    iconActive: require('../../assets/images/icon/send-purpl.svg'),
    regex: /\/send/
  },
  {
    path: '/add-liquidity',
    textKey: 'pool',
    icon: require('../../assets/images/icon/pool.svg'),
    iconActive: require('../../assets/images/icon/pool-purpl.svg'),
    regex: /\/add-liquidity|\/remove-liquidity|\/create-exchange.*/
  },
  {
    path: '/bridge',
    textKey: 'bridge',
    icon: require('../../assets/images/icon/bridge.svg'),
    iconActive: require('../../assets/images/icon/bridge-purpl.svg'),
    regex: /\/bridge/
  },
]

const tabOrder2 = [
  {
    path: '',
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
    path: '',
    textKey: 'Documents',
    icon: require('../../assets/images/icon/documents.svg'),
    iconActive: require('../../assets/images/icon/documents-purpl.svg'),
    regex: /\/documents/,
    className: 'otherInfo noBB'
  },
]

const BetaMessage = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  cursor: pointer;
  flex: 1 0 auto;
  align-items: center;
  position: relative;
  padding: 0.5rem 1rem;
  padding-right: 2rem;
  margin-bottom: 1rem;
  border: 0.0625rem solid ${({ theme }) => transparentize(0.6, theme.wisteriaPurple)};
  background-color: ${({ theme }) => transparentize(0.9, theme.wisteriaPurple)};
  border-radius: 1rem;
  font-size: 0.75rem;
  line-height: 1rem;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.wisteriaPurple};

  &:after {
    content: '✕';
    top: 0.5rem;
    right: 1rem;
    position: absolute;
    color: ${({ theme }) => theme.wisteriaPurple};
  }
`

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
  color: ${({theme}) => theme.textColorBold};
  font-size: 0.875rem;
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
    background:rgba(0,0,0,0.05);
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
    color: #031a6e;
    font-weight: 600;
    .icon {
      background: #031a6e;
    }
  }
  &.${activeClassName} {
    color: #ffffff;
    background: ${({theme}) => theme.bgColorLinear};
    border-bottom: none;
    font-weight: 800;
    box-shadow: 0 0.25rem 0.75rem 0 rgba(115, 75, 226, 0.51);
    .icon {
      background:#031a6e;
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
      color: #031a6e;
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
  @media screen and (max-width: 960px) {
    ${({theme}) => theme.FlexC};
    width: 20%;
    margin::0;
    .icon {
      display:none;
    }
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
  background-color: #ecf6ff;
  border-radius: 100%;
  margin-right: 0.625rem;
  &:hover {
    background-color: #5f6cfc;
  }
  img {
    display:block;
    &.show {
      display:none;
    }
  }
`
const CopyRightBox = styled.div`
  h5 {
    font-family: Manrope;
    font-size: 0.75rem;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.17;
    letter-spacing: normal;
    color: #062536;
    margin: 1rem 0 0px;
    span { 
      font-weight: bold;
    }
  }
  p {
    font-family: Manrope;
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
        {tabOrder.map(({ path, textKey, regex, icon, iconActive, className }, index) => (
          <StyledNavLink key={index} to={path} isActive={(_, { pathname }) => pathname.match(regex)} className={(className ? className : '')} onMouseEnter={() => {toggleHover(textKey)}} onMouseLeave={() => {toggleHover('')}}>
            <div className={'icon'}>
              {/* <img src={pathname.match(regex) || navHover === textKey ? iconActive : icon}/> */}
              <img src={iconActive} className={pathname.match(regex) || navHover === textKey ? '' : 'show'}/>
              <img src={icon} className={pathname.match(regex) || navHover === textKey ? 'show' : ''}/>
            </div>
            {t(textKey)}
          </StyledNavLink>
        ))}
      </Tabs>
      <Tabs2>
        {tabOrder2.map(({ path, textKey, regex, icon, iconActive, className }, index) => (
          <StyledNavLink key={index} to={path} isActive={(_, { pathname }) => pathname.match(regex)} className={className ? className : ''} onMouseEnter={() => {toggleHover(textKey)}} onMouseLeave={() => {toggleHover('')}}>
            <div className={'icon'}>
              {/* <img src={pathname.match(regex) || navHover === textKey ? iconActive : icon}/> */}
              <img src={iconActive} className={pathname.match(regex) || navHover === textKey ? '' : 'show'}/>
              <img src={icon} className={pathname.match(regex) || navHover === textKey ? 'show' : ''}/>
            </div>
            {t(textKey)}
          </StyledNavLink>
        ))}
      </Tabs2>
      <OutLink>
        <OutLinkImgBox>
          <Link id="link" href="https://t.me/anyswap">
            <OutLinkImg onMouseEnter={() => {toggleHover('TelegramIcon')}} onMouseLeave={() => {toggleHover('')}}>
              {/* <img src={TelegramIcon} /> */}
              <img src={TelegramIconWhite} className={navHover === 'TelegramIcon' ? '' : 'show'}/>
              <img src={TelegramIcon} className={navHover === 'TelegramIcon' ? 'show' : ''}/>
            </OutLinkImg>
          </Link>
          <Link id="link" href="https://medium.com/@anyswap">
            <OutLinkImg onMouseEnter={() => {toggleHover('MediumIcon')}} onMouseLeave={() => {toggleHover('')}}>
              {/* <img src={MediumIcon} /> */}
              <img src={MediumIconWhite} className={navHover === 'MediumIcon' ? '' : 'show'}/>
              <img src={MediumIcon} className={navHover === 'MediumIcon' ? 'show' : ''}/>
            </OutLinkImg>
          </Link>
          <Link id="link" href="https://twitter.com/AnyswapNetwork">
            <OutLinkImg onMouseEnter={() => {toggleHover('TwitterIcon')}} onMouseLeave={() => {toggleHover('')}}>
              {/* <img src={TwitterIcon} /> */}
              <img src={TwitterIconWhite} className={navHover === 'TwitterIcon' ? '' : 'show'}/>
              <img src={TwitterIcon} className={navHover === 'TwitterIcon' ? 'show' : ''}/>
            </OutLinkImg>
          </Link>
          <Link id="link" href="https://github.com/anyswap">
            <OutLinkImg onMouseEnter={() => {toggleHover('CodeIcon')}} onMouseLeave={() => {toggleHover('')}}>
              {/* <img src={CodeIcon} /> */}
              <img src={CodeIconWhite} className={navHover === 'CodeIcon' ? '' : 'show'}/>
              <img src={CodeIcon} className={navHover === 'CodeIcon' ? 'show' : ''}/>
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
