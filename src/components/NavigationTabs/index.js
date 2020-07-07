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

import {ReactComponent as SwapIcon} from '../../assets/images/icon/swap.svg'
import {ReactComponent as SwapActiveIcon} from '../../assets/images/icon/swap-purpl.svg'
import {ReactComponent as SendIcon} from '../../assets/images/icon/send.svg'
import {ReactComponent as SendActiveIcon} from '../../assets/images/icon/send-purpl.svg'
import {ReactComponent as PoolIcon} from '../../assets/images/icon/pool.svg'
import {ReactComponent as PoolActiveIcon} from '../../assets/images/icon/pool-purpl.svg'
import {ReactComponent as BridgeIcon} from '../../assets/images/icon/bridge.svg'
import {ReactComponent as BridgeActiveIcon} from '../../assets/images/icon/bridge-purpl.svg'

const tabOrder = [
  {
    path: '',
    textKey: 'Dashboard',
    icon: require('../../assets/images/icon/application.svg'),
    iconActive: require('../../assets/images/icon/application.svg'),
    regex: /\/dashboard/,
    className: 'otherInfo mb20'
  },
  {
    path: '',
    textKey: 'Markets',
    icon: require('../../assets/images/icon/markets.svg'),
    iconActive: require('../../assets/images/icon/markets.svg'),
    regex: /\/markets/,
    className: 'markets mb20'
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
  {
    path: '',
    textKey: 'Information',
    icon: require('../../assets/images/icon/inventory.svg'),
    iconActive: require('../../assets/images/icon/inventory.svg'),
    regex: /\/information/,
    className: 'otherInfo mt20'
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
    className: 'otherInfo'
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
  margin-bottom: 1rem;
  width:100%;
  padding: 40px 25px;
  box-sizing: border-box;
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
  color: #96989e;
  font-size: 14px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  padding: 20px 24px;
  line-height: 16px;

  &.${activeClassName} {
    font-weight: 800;
    box-sizing: border-box;
    color: ${({ theme }) => theme.royalBlue};
    :hover {
      background-color: ${({ theme }) => darken(0.01, theme.inputBackground)};
    }
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.royalBlue)};
  }
  .icon {
    height: 18px;
    margin-right: 26px;
    img {
      display:block;
      height: 100%;
    }
  }
  
  &.mt20 {
    margin-top: 20px;
  }
  &.mb20 {
    margin-bottom: 20px;
  }

  &.markets {
    height: 48px;
    padding: 15px 14px;
    border-radius: 9px;
    color: #ffffff;
    font-weight: 800;
    background-image: linear-gradient(to right, #734ce2 , #606bfb);
    border-bottom: none;
    box-shadow: 0 4px 12px 0 rgba(115, 75, 226, 0.51);
    .icon {
      height: 38px;
      width: 38px;
      margin-right: 16px;
      background:#031a6e;
      border-radius:100%;
      display: flex;
      justify-content: center;
      align-items:center;
      box-shadow: 0 4px 12px 0 rgba(115, 75, 226, 0.51);
      img {
        display:block;
        height: 18px;
      }
    }
  }

  &.otherInfo {
    padding: 15px 14px;
    font-size: 14px;
    font-weight: 600;
    color: #062536;
    border-bottom:none;
    .icon {
      height: 38px;
      width: 38px;
      margin-right: 16px;
      background:#f8f8f9;
      border-radius:100%;
      display: flex;
      justify-content: center;
      align-items:center;
      img {
        display:block;
        height: 18px;
      }
    }
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
      {/* {providerMessage && (
        <DaiMessage>
          <CloseIcon onClick={dismissSaiHolderMessage}>✕</CloseIcon>
          <WarningHeader>Missing your DAI?</WarningHeader>
          <div>
            Don’t worry, check the{' '}
            <Link href={'/remove-liquidity?poolTokenAddress=0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359'}>
              SAI liquidity pool.
            </Link>{' '}
            Your old DAI is now SAI. If you want to migrate,{' '}
            <Link href="/remove-liquidity?poolTokenAddress=0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359">
              remove your SAI liquidity,
            </Link>{' '}
            migrate using the <Link href="https://migrate.makerdao.com/">migration tool</Link> then add your migrated
            DAI to the{' '}
            <Link href="add-liquidity?token=0x6B175474E89094C44Da98b954EedeAC495271d0F">new DAI liquidity pool.</Link>
          </div>
          <WarningFooter>
            <Link href="https://blog.makerdao.com/looking-ahead-how-to-upgrade-to-multi-collateral-dai/">
              Read more
            </Link>{' '}
            about this change on the official Maker blog.
          </WarningFooter>
        </DaiMessage>
      )}
      {generalMessage && !providerMessage && (
        <DaiMessage>
          <CloseIcon onClick={dismissGeneralDaiMessage}>✕</CloseIcon>
          <WarningHeader>DAI has upgraded!</WarningHeader>
          <div>
            Your old DAI is now SAI. To upgrade use the{' '}
            <Link href="https://migrate.makerdao.com/">migration tool.</Link>
          </div>
        </DaiMessage>
      )}
      {showBetaMessage && (
        <BetaMessage onClick={dismissBetaMessage}>
          <span role="img" aria-label="warning">
            💀
          </span>{' '}
          {t('betaWarning')}
        </BetaMessage>
      )} */}
    </>
  )
}

export default withRouter(NavigationTabs)
