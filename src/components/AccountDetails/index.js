import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '../../hooks'
import { isMobile } from 'react-device-detect'
import Copy from './Copy'
import Transaction from './Transaction'
import { SUPPORTED_WALLETS } from '../../constants'
import { ReactComponent as Close } from '../../assets/images/x.svg'
import { getEtherscanLink } from '../../utils'
import { injected, walletconnect, walletlink, fortmatic, portis, torus } from '../../connectors'
import CoinbaseWalletIcon from '../../assets/images/coinbaseWalletIcon.svg'
import WalletConnectIcon from '../../assets/images/walletConnectIcon.svg'
import FortmaticIcon from '../../assets/images/fortmaticIcon.png'
import PortisIcon from '../../assets/images/portisIcon.png'
import TorusIcon from '../../assets/images/torus.png'
import MetamaskIcon from '../../assets/images/metamask.png'
import Identicon from '../Identicon'
import Ledger from '../../assets/images/ledger.png'

import { Link } from '../../theme'
import { useTranslation } from 'react-i18next'

import EditIcon from '../../assets/images/icon/edit.svg'
import config from '../../config'

const OptionButton = styled.div`
${({ theme }) => theme.FlexC}
  width: 89px;
  height: 1.875rem;
  object-fit: contain;
  border-radius: 6px;
  background-color: #f6f4ff;
  font-family: 'Manrope';
  font-size: 0.75rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: right;
  color: #734be2;
  cursor:pointer;
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

const UpperSection = styled.div`
  position: relative;
  font-family: 'Manrope';
  background-color: ${({ theme }) => theme.concreteGray};

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

const InfoCard = styled.div`
`

const AccountGroupingRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};

  div {
    ${({ theme }) => theme.flexRowNoWrap}
    align-items: center;
  }

  &:first-of-type {
    margin-bottom: 1.25rem;
  }
`

const AccountGroupingRowTop =  styled.div`
${({ theme }) => theme.FlexBC};
margin-bottom: 0.625rem;
border-bottom: 0.0625rem solid #ededed;
margin-bottom: 1.25rem;
padding-bottom: 0.625rem;
`

const AccountGroupingWallet = styled.div`
${({ theme }) => theme.FlexSC};
`

const AccountSection = styled.div`
  background-color: ${({ theme }) => theme.concreteGray};
  padding: 0rem 1.5rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 0rem 1rem 1rem 1rem;`};
`

const YourAccount = styled.div`
  h5 {
    margin: 0 0 1rem 0;
    font-weight: 400;
  }

  h4 {
    margin: 0;
    font-weight: 500;
  }
`

const GreenCircle = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  justify-content: center;
  align-items: center;

  &:first-child {
    height: 8px;
    width: 8px;
    margin-left: 0.75rem;
    margin-right: 0.125rem;
    background-color: ${({ theme }) => theme.connectedGreen};
    border-radius: 50%;
  }
`

const CircleWrapper = styled.div`
  color: ${({ theme }) => theme.connectedGreen};
  display: flex;
  justify-content: center;
  align-items: center;
`

const LowerSection = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  padding: 2rem;
  flex-grow: 1;
  overflow: auto;

  h5 {
    margin: 0;
    font-weight: 400;
    color: ${({ theme }) => theme.doveGray};
  }
`

const AccountControl = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  min-width: 0;
  width: 100%;
  font-family: 'Manrope';

  font-weight: ${({ hasENS, isENS }) => (hasENS ? (isENS ? 500 : 400) : 500)};
  font-size: ${({ hasENS, isENS }) => (hasENS ? (isENS ? '1rem' : '0.8rem') : '1rem')};

  a:hover {
    text-decoration: underline;
  }

  a {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const ConnectButtonRow = styled.div`
  ${({ theme }) => theme.FlexC}
`

const StyledLink = styled(Link)`
  ${({ theme }) => theme.FlexSC};
  color: ${({ hasENS, isENS, theme }) => (hasENS ? (isENS ? theme.royalBlue : theme.doveGray) : theme.royalBlue)};
  width: 100%;
  height: 48px;
  object-fit: contain;
  border-radius: 0.5625rem;
  background-color: #ecf6ff;
  padding: 0 1rem;

  font-family: Manrope;
  font-size: 0.875rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #031a6e;
  span{
    font-weight: normal;
  }
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

const WalletName = styled.div`
  padding-left: 0.5rem;
  width: initial;
  font-family: 'Manrope';
  font-size: 1rem;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  color: #031a6e;
`

const IconWrapper = styled.div`
  ${({ theme }) => theme.FlexSC};
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: flex-end;
  `};
  .WalletLogo  {
    ${({ theme }) => theme.FlexC};
    width: 46px;
    height: 46px;
    object-fit: contain;
    box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.04);
    border: solid 0.5px rgba(0, 0, 0, 0.1);
    border-radius: 100%;
    padding: 0.625rem;
    img {
      width:100%;
    }
  }
`

const TransactionListWrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
`

const WalletAction = styled.div`
  color: ${({ theme }) => theme.chaliceGray};
  margin-left: 1rem;
  font-weight: 400;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const MainWalletAction = styled(WalletAction)`
  color: ${({ theme }) => theme.royalBlue};
`

function renderTransactions(transactions, pending) {
  return (
    <TransactionListWrapper>
      {transactions.map((hash, i) => {
        return <Transaction key={i} hash={hash} pending={pending} />
      })}
    </TransactionListWrapper>
  )
}

export default function AccountDetails({
  toggleWalletModal,
  pendingTransactions,
  confirmedTransactions,
  ENSName,
  openOptions
}) {
  let { chainId, account, connector } = useWeb3React()

  let walletType = sessionStorage.getItem('walletType')
  let HDPath = sessionStorage.getItem('HDPath')
  const { t } = useTranslation()
  // account = config.supportWallet.includes(walletType) ? sessionStorage.getItem('account') : account
  function formatConnectorName() {
    const isMetaMask = window.ethereum && window.ethereum.isMetaMask ? true : false
    let name = Object.keys(SUPPORTED_WALLETS)
      .filter(
        k =>
          SUPPORTED_WALLETS[k].connector === connector && (connector !== injected || isMetaMask === (k === 'METAMASK'))
      )
      .map(k => SUPPORTED_WALLETS[k].name)[0]
    name = walletType ? walletType : name
    return <WalletName>{t("Connectedwith")} {name}</WalletName>
  }

  function getStatusIcon() {
    if (connector === injected) {
      return (
        <IconWrapper size={16}>
          <div className={'WalletLogo'}><img src={MetamaskIcon} alt={''} /></div> {formatConnectorName()}
        </IconWrapper>
        // <IconWrapper size={16}>
        //   <Identicon /> {formatConnectorName()}
        // </IconWrapper>
      )
    } else if (connector === walletconnect) {
      return (
        <IconWrapper size={16}>
          <div className={'WalletLogo'}><img src={WalletConnectIcon} alt={''} /></div> {formatConnectorName()}
        </IconWrapper>
      )
    } else if (connector === walletlink) {
      return (
        <IconWrapper size={16}>
          <div className={'WalletLogo'}><img src={CoinbaseWalletIcon} alt={''} /> </div>{formatConnectorName()}
        </IconWrapper>
      )
    } else if (connector === fortmatic) {
      return (
        <IconWrapper size={16}>
          <div className={'WalletLogo'}><img src={FortmaticIcon} alt={''} /></div> {formatConnectorName()}
        </IconWrapper>
      )
    } else if (connector === portis) {
      return (
        <>
          <IconWrapper size={16}>
          <div className={'WalletLogo'}><img src={PortisIcon} alt={''} /></div> {formatConnectorName()}
            <MainWalletAction
              onClick={() => {
                portis.portis.showPortis()
              }}
            >
              Show Portis
            </MainWalletAction>
          </IconWrapper>
        </>
      )
    } else if (connector === torus) {
      return (
        <IconWrapper size={16}>
          <div className={'WalletLogo'}><img src={TorusIcon} alt={''} /></div> {formatConnectorName()}
        </IconWrapper>
      )
    } else if (walletType === 'Ledger') {
      return (
        <IconWrapper size={16}>
          <div className={'WalletLogo'}><img src={Ledger} alt={''} /></div> {formatConnectorName()}
        </IconWrapper>
      )
    }
  }

  return (
    <>
      <UpperSection>
        <CloseIcon onClick={toggleWalletModal}>
          <CloseColor alt={'close icon'} />
        </CloseIcon>
        <HeaderRow>{t('Account')}</HeaderRow>
        <AccountSection>
          <YourAccount>
            <InfoCard>
              <AccountGroupingRowTop>
                <AccountGroupingWallet>
                  {getStatusIcon()}
                  {connector !== injected && connector !== walletlink &&  !['Ledger'].includes(walletType) && (
                    <WalletAction
                      onClick={() => {
                        connector.close()
                      }}
                    >
                      {t('Disconnect')}
                    </WalletAction>
                  )}
                  <CircleWrapper>
                    <GreenCircle>
                      <div />
                    </GreenCircle>
                  </CircleWrapper>
                </AccountGroupingWallet>
                {!(isMobile && (window.web3 || window.ethereum)) && (
                  <ConnectButtonRow>
                    <OptionButton
                      onClick={() => {
                        openOptions()
                        sessionStorage.setItem('walletType', '')
                        sessionStorage.setItem('account', '')
                        sessionStorage.setItem('HDPath', '')
                      }}
                    >
                      <img src={EditIcon} style={{marginRight: '8px'}} alt={''}/>{t("Change")}
                    </OptionButton>
                  </ConnectButtonRow>
                )}
              </AccountGroupingRowTop>
              <AccountGroupingRow>
                {ENSName ? (
                  <AccountControl hasENS={!!ENSName} isENS={true}>
                    <StyledLink hasENS={!!ENSName} isENS={true} href={getEtherscanLink(chainId, ENSName, 'address')}>
                      <Identicon size={26} /><span style={{marginLeft: '1rem'}}>{t('Address')}: </span>{ENSName ? (
                        ENSName
                      ) : ('')} ↗{' '}
                      <Copy toCopy={ENSName} />
                    </StyledLink>
                  </AccountControl>
                ) : (
                  <>
                    <AccountControl hasENS={!!ENSName} isENS={false}>
                      <StyledLink hasENS={!!ENSName} isENS={false} href={getEtherscanLink(chainId, account, 'address')}>
                        <Identicon size={26} />
                        <span style={{marginLeft: '1rem'}}>{t('Address')}: </span>
                        {account ? (
                          account
                        ) : ('')} ↗{' '}
                      </StyledLink>
                    </AccountControl>
                    <Copy toCopy={account} />
                  </>
                )}
              </AccountGroupingRow>
            </InfoCard>
          </YourAccount>

          {/* {!(isMobile && (window.web3 || window.ethereum)) && (
            <ConnectButtonRow>
              <OptionButton
                onClick={() => {
                  openOptions()
                  sessionStorage.setItem('walletType', '')
                  sessionStorage.setItem('account', '')
                  sessionStorage.setItem('HDPath', '')
                }}
              >
                Connect to a different wallet
              </OptionButton>
            </ConnectButtonRow>
          )} */}
        </AccountSection>
      </UpperSection>
      {!!pendingTransactions.length || !!confirmedTransactions.length ? (
        <LowerSection>
          <h5>{t("RecentTxns")}</h5>
          {renderTransactions(pendingTransactions, true)}
          {renderTransactions(confirmedTransactions, false)}
        </LowerSection>
      ) : (
        <LowerSection>
          <h5>{t("txnsHere")}</h5>
        </LowerSection>
      )}
    </>
  )
}
