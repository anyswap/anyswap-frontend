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


import EditIcon from '../../assets/images/icon/edit.svg'
import config from '../../config'

const OptionButton = styled.div`
${({ theme }) => theme.FlexC}
  width: 89px;
  height: 30px;
  object-fit: contain;
  border-radius: 6px;
  background-color: #f6f4ff;
  font-family: Manrope;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: right;
  color: #734be2;
  cursor:pointer;
`
// ${({ theme }) => theme.flexColumnNoWrap}
// justify-content: center;
// align-items: center;
// border-radius: 20px;
// border: 1px solid ${({ theme }) => theme.royalBlue};
// color: ${({ theme }) => theme.royalBlue};
// padding: 8px 24px;

// &:hover {
//   border: 1px solid ${({ theme }) => theme.malibuBlue};
//   cursor: pointer;
// }

// ${({ theme }) => theme.mediaWidth.upToMedium`
//   font-size: 12px;
// `};

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
    margin-bottom: 20px;
  }
`

const AccountGroupingRowTop =  styled.div`
${({ theme }) => theme.FlexBC};
margin-bottom: 10px;
border-bottom: 1px solid #ededed;
margin-bottom: 20px;
padding-bottom: 10px;
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
    margin-left: 12px;
    margin-right: 2px;
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
  border-radius: 9px;
  background-color: #ecf6ff;
  padding: 0 15px;

  font-family: Manrope;
  font-size: 14px;
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
  top: 14px;
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
  font-family: Manrope;
  font-size: 16px;
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
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
    border: solid 0.5px rgba(0, 0, 0, 0.1);
    border-radius: 100%;
    padding: 10px;
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
  margin-left: 16px;
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
    return <WalletName>Connected with {name}</WalletName>
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
        <HeaderRow>Account</HeaderRow>
        <AccountSection>
          <YourAccount>
            <InfoCard>
              <AccountGroupingRowTop>
                {getStatusIcon()}
                <div>
                  {connector !== injected && connector !== walletlink &&  !['Ledger'].includes(walletType) && (
                    <WalletAction
                      onClick={() => {
                        connector.close()
                      }}
                    >
                      Disconnect
                    </WalletAction>
                  )}
                  <CircleWrapper>
                    <GreenCircle>
                      <div />
                    </GreenCircle>
                  </CircleWrapper>
                </div>
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
                      <img src={EditIcon} style={{marginRight: '8px'}}/>Change
                    </OptionButton>
                  </ConnectButtonRow>
                )}
              </AccountGroupingRowTop>
              <AccountGroupingRow>
                {ENSName ? (
                  <AccountControl hasENS={!!ENSName} isENS={true}>
                    <StyledLink hasENS={!!ENSName} isENS={true} href={getEtherscanLink(chainId, ENSName, 'address')}>
                      <Identicon size={26} /><span style={{marginLeft: '15px'}}>My public address: </span>{ENSName ? (
                        ENSName.substr(0, 6) + '...' + ENSName.substr(ENSName.length - 6)
                      ) : ('')} ↗{' '}
                      <Copy toCopy={ENSName} />
                    </StyledLink>
                  </AccountControl>
                ) : (
                  <>
                    <AccountControl hasENS={!!ENSName} isENS={false}>
                      <StyledLink hasENS={!!ENSName} isENS={false} href={getEtherscanLink(chainId, account, 'address')}>
                        <Identicon size={26} />
                        <span style={{marginLeft: '15px'}}>My public address: </span>
                        {account ? (
                          account.substr(0, 6) + '...' + account.substr(account.length - 6)
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
          <h5>Recent Transactions</h5>
          {renderTransactions(pendingTransactions, true)}
          {renderTransactions(confirmedTransactions, false)}
        </LowerSection>
      ) : (
        <LowerSection>
          <h5>Your transactions will appear here...</h5>
        </LowerSection>
      )}
    </>
  )
}
