import React, { useCallback } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { transparentize, darken } from 'polished'

import { useWeb3React, useBodyKeyDown } from '../../hooks'
import { useAddressBalance } from '../../contexts/Balances'
import { isAddress } from '../../utils'
import {
  useBetaMessageManager,
  useSaiHolderMessageManager,
  useGeneralDaiMessageManager
} from '../../contexts/LocalStorage'
import { Link } from '../../theme/components'

import TelegramIcon from '../../assets/images/icon/telegram.svg'
import MediumIcon from '../../assets/images/icon/medium.svg'
import TwitterIcon from '../../assets/images/icon/twitter.svg'
import CodeIcon from '../../assets/images/icon/code.svg'
import ArrowRight from '../../assets/images/icon/arrowRight.svg'

const tabOrder = [
  {
    path: '',
    textKey: 'Dashboard',
    icon: require('../../assets/images/icon/application.svg'),
    iconActive: require('../../assets/images/icon/application.svg'),
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
    iconActive: require('../../assets/images/icon/markets.svg'),
    regex: /\/markets/,
    className: 'otherInfo'
  },
  {
    path: '',
    textKey: 'ANY Token',
    icon: require('../../assets/images/icon/any.svg'),
    iconActive: require('../../assets/images/icon/any.svg'),
    regex: /\/anyToken/,
    className: 'otherInfo'
  },
  {
    path: '',
    textKey: 'Network',
    icon: require('../../assets/images/icon/network.svg'),
    iconActive: require('../../assets/images/icon/network.svg'),
    regex: /\/network/,
    className: 'otherInfo'
  },
  {
    path: '',
    textKey: 'Documents',
    icon: require('../../assets/images/icon/documents.svg'),
    iconActive: require('../../assets/images/icon/documents.svg'),
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
  border: 1px solid ${({ theme }) => transparentize(0.6, theme.wisteriaPurple)};
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

const DaiMessage = styled(BetaMessage)`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  word-wrap: wrap;
  overflow: visible;
  white-space: normal;
  padding: 1rem 1rem;
  padding-right: 2rem;
  line-height: 1.2rem;
  cursor: default;
  color: ${({ theme }) => theme.textColor};
  div {
    width: 100%;
  }
  &:after {
    content: '';
  }
`

const CloseIcon = styled.div`
  width: 10px !important;
  top: 0.5rem;
  right: 1rem;
  position: absolute;
  color: ${({ theme }) => theme.wisteriaPurple};
  :hover {
    cursor: pointer;
  }
`

const WarningHeader = styled.div`
  margin-bottom: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.uniswapPink};
`

const WarningFooter = styled.div`
  margin-top: 10px;
  font-size: 10px;
  text-decoration: italic;
  color: ${({ theme }) => theme.greyText};
`

const Tabs = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  align-items: center;
  margin-bottom: 10px;
  width:100%;
  padding: 40px 25px 15px;
  box-sizing: border-box;
`

const Tabs2  = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  align-items: center;
  margin-bottom: 25px;
  width:100%;
  padding: 15px 25px;
  box-sizing: border-box;
  border-top: 1px solid  rgba(0, 0, 0, 0.06);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
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
  font-size: 14px;
  box-sizing: border-box;
  padding: 15px 14px;
  line-height: 16px;
  margin: 10px 0;
  height: 48px;
  border-radius: 9px;
  position:relative;

  
  .icon {
    height: 38px;
    width: 38px;
    margin-right: 16px;
    background:rgba(0,0,0,0.05);
    border-radius:100%;
    display: flex;
    justify-content: center;
    align-items:center;
    img {
      display:block;
      height: 18px;
    }
  }

  &.${activeClassName} {
    color: #ffffff;
    background: ${({theme}) => theme.bgColorLinear};
    border-bottom: none;
    font-weight: 800;
    box-shadow: 0 4px 12px 0 rgba(115, 75, 226, 0.51);
    .icon {
      background:#031a6e;
      box-shadow: 0 4px 12px 0 rgba(115, 75, 226, 0.51);
    }
  }

  &.mt15 {
    margin-top: 15px;
  }
  &.mt20 {
    margin-top: 20px;
  }
  &.mb20 {
    margin-bottom: 20px;
  }

  &.otherInfo {
    font-size: 14px;
    font-weight: normal;
    color: #96989e;
    border-bottom:none;
    margin: 0;
    padding: 11px 14px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    .icon {
      height: 38px;
      width: 38px;
      margin-right: 16px;
      display: flex;
      justify-content: center;
      align-items:center;
      background:none;
      img {
        display:block;
        height: 18px;
      }
    }
  }
  &.noBB {
    border-bottom:none;
  }
  .arrow {
    position: absolute;
    top: 18px;
    right:15px;
  }
`

const OutLink = styled.div`
padding-left: 44px;
`
const OutLinkImgBox = styled.div`
  ${({theme}) => theme.FlexSC};
`
const OutLinkImg = styled.div`
  ${({theme}) => theme.FlexC};
  width: 38px;
  height: 38px;
  background-color: #ecf6ff;
  border-radius: 100%;
  margin-right: 10px;
`
const CopyRightBox = styled.div`
  h5 {
    font-family: Manrope;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.17;
    letter-spacing: normal;
    color: #062536;
    margin: 15px 0 0px;
    span { 
      font-weight: bold;
    }
  }
  p {
    font-family: Manrope;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.17;
    letter-spacing: normal;
    color: #96989e;
  }
`
const NavListTab =  styled(NavLink).attrs({
  activeClassName
})`

`

function NavigationTabs({ location: { pathname }, history }) {
  const { t } = useTranslation()

  const [showBetaMessage, dismissBetaMessage] = useBetaMessageManager()

  const [showGeneralDaiMessage, dismissGeneralDaiMessage] = useGeneralDaiMessageManager()

  const [showSaiHolderMessage, dismissSaiHolderMessage] = useSaiHolderMessageManager()

  const { account } = useWeb3React()

  const daiBalance = useAddressBalance(account, isAddress('0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359'))

  const daiPoolTokenBalance = useAddressBalance(account, isAddress('0x09cabEC1eAd1c0Ba254B09efb3EE13841712bE14'))

  const onLiquidityPage = pathname === '/pool' || pathname === '/add-liquidity' || pathname === '/remove-liquidity'

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

  const providerMessage =
    showSaiHolderMessage && daiPoolTokenBalance && !daiPoolTokenBalance.isZero() && onLiquidityPage
  const generalMessage = showGeneralDaiMessage && daiBalance && !daiBalance.isZero()

  return (
    <>

      <Tabs>
        {tabOrder.map(({ path, textKey, regex, icon, iconActive, className }, index) => (
          <StyledNavLink key={index} to={path} isActive={(_, { pathname }) => pathname.match(regex)} className={className ? className : ''}>
            <div className={'icon'}><img src={pathname.match(regex) ? iconActive : icon}/></div>
            {t(textKey)}
          </StyledNavLink>
        ))}
      </Tabs>
      <Tabs2>
        {tabOrder2.map(({ path, textKey, regex, icon, iconActive, className }, index) => (
          <StyledNavLink key={index} to={path} isActive={(_, { pathname }) => pathname.match(regex)} className={className ? className : ''}>
            <div className={'icon'}><img src={pathname.match(regex) ? iconActive : icon}/></div>
            {t(textKey)}
            <div className='arrow'><img src={ArrowRight}/></div>
          </StyledNavLink>
        ))}
      </Tabs2>
      <OutLink>
        <OutLinkImgBox>
          <Link id="link" href="https://anyswap.network">
            <OutLinkImg>
              <img src={TelegramIcon} />
            </OutLinkImg>
          </Link>
          <Link id="link" href="https://anyswap.network/docs">
            <OutLinkImg>
              <img src={MediumIcon} />
            </OutLinkImg>
          </Link>
          <Link id="link" href="https://t.me/anyswap">
            <OutLinkImg>
              <img src={TwitterIcon} />
            </OutLinkImg>
          </Link>
          <Link id="link" href="https://github.com/anyswap">
            <OutLinkImg>
              <img src={CodeIcon} />
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
