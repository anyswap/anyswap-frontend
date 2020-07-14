import React, { useState, useEffect } from 'react'
// import ReactGA from 'react-ga'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { URI_AVAILABLE } from '@web3-react/walletconnect-connector'

import Modal from '../Modal'
import AccountDetails from '../AccountDetails'
import PendingView from './PendingView'
import Option from './Option'
import { SUPPORTED_WALLETS } from '../../constants'
import { usePrevious } from '../../hooks'
import { Link } from '../../theme'
import MetamaskIcon from '../../assets/images/metamask.png'
import { ReactComponent as Close } from '../../assets/images/x.svg'
import { injected, walletconnect, fortmatic, portis } from '../../connectors'
import { useWalletModalToggle, useWalletModalOpen } from '../../contexts/Application'
import { OVERLAY_READY } from '../../connectors/Fortmatic'

import {getLedgerAddressArr} from '../../utils/wallets/ledger'

import { darken } from 'polished'
import { transparentize } from 'polished'

import {LedgerConnector} from '../../utils/wallets/ledger/ledgerConnect'
import MintIcon from '../../assets/images/icon/mint.svg'
import NextkIcon from '../../assets/images/icon/Next.svg'
import PreviouskIcon from '../../assets/images/icon/Previous.svg'
import DoneIcon from '../../assets/images/icon/done.svg'

import config  from '../../config/index'

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

const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  padding: 0 0.625rem 0.625rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 1rem`};
`

const UpperSection = styled.div`
  position: relative;

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

const Blurb = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin: 1rem;
    font-size: 0.75rem;
  `};
`

const OptionGrid = styled.div`

`
// display: grid;
// grid-template-columns: 1fr 1fr;
// grid-gap: 0.625rem;
// ${({ theme }) => theme.mediaWidth.upToMedium`
//   grid-template-columns: 1fr;
//   grid-gap: 0.625rem;
// `};

const HoverText = styled.div`
  :hover {
    cursor: pointer;
  }
`

const SelectContainer = styled.div`
  width:100%;
  display:flex;
  justify-content: space-between;
  align-item:center;
  margin: 1.25rem 0;
  height: 2.5rem;
`

const SelectHDPathPage = styled.div`
  ${({ theme }) => theme.FlexBC};
  height: 34px;
  object-fit: contain;
  border-radius: 6px;
  background-color: #f9fafb;
  padding: 0 1.25rem;
`
const SelfText = styled.div`
  font-family: Manrope;
  font-size: 0.875rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: normal;
  color: #062536;
  margin-bottom: 0.75rem
`
const SelfInputBox = styled.div`
${({ theme }) => theme.FlexSC};
  width: 236px;
  height: 36px;
  object-fit: contain;
  border-radius: 0.5625rem;
  box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.04);
  border: solid 0.5px rgba(0, 0, 0, 0.1);
  padding: 0.125rem;
`
const SelfInput = styled.input`
  outline: none;
  border: none;
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  padding: 0 0.75rem;
  background-color: none;

  font-family: Manrope;
  font-size: 0.75rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: #062536;

  overflow: hidden;
  text-overflow: ellipsis;
  ::placeholder {
    color: ${({ theme }) => theme.placeholderGray};
  }
`

const SelfButton = styled.button.attrs(({ warning, theme }) => ({
  backgroundColor: warning ? theme.salmonRed : theme.royalBlue
}))`
${({ theme }) => theme.FlexC};
  cursor: pointer;
  user-select: none;
  border: none;
  outline: none;

  
  width: 74px;
  height: 1.875rem;
  object-fit: contain;
  border-radius: 6px;
  background-color: #f6f4ff;

  font-family: Manrope;
  font-size: 0.75rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #734be2;

  :hover,
  :focus {
    background-color: ${() => darken(0.05, '#f6f4ff')};
  }

  :active {
    background-color: ${() => darken(0.1, '#f6f4ff')};
  }

  :disabled {
    background-color: ${({ theme }) => theme.concreteGray};
    color: ${({ theme }) => theme.silverGray};
    cursor: auto;
  }
`
const AddrListBox = styled.ul`
  height: 320px;
  margin-bottom: 0px;
  padding: 0 0px;
`

const AddrList = styled.li`
  padding:8px 0.625rem;
  cursor:pointer;
  border: 0.0625rem solid transparent;
  box-shadow: 0px 0px 8px 0 ${({ theme }) => transparentize(0.5, theme.backgroundColor)};
  margin:0.625rem 0;
  list-style-type:none;
  color:#666;
  background:#eee;
  border-radius: 5px;

  :hover,
  :focus {
    box-shadow: 0px 0px 8px 0 ${({ theme }) => darken(0.2, theme.backgroundColor)};
  }
  
`

const AddrListSelect = styled(AddrList)`
border: 0.0625rem solid ${({ theme }) => theme.shadowColor};
`

const ArrowBox = styled.div`
${({theme}) => theme.FlexC}
  font-family: Manrope;
  font-size: 0.75rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #062536;
  cursor:pointer;
`

const HDpathListBox = styled.ul`
  ${({theme}) => theme.FlexSC}
  list-style: none;
  margin: 0;
  padding:0;
  box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.04);
  li {
    padding: 0.875rem 1rem;
    font-family: Manrope;
    font-size: 0.75rem;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    color: #96989e;
    border-top: 0.0625rem solid rgba(0, 0, 0, 0.04);
    border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.04);
    border-left: 0.0625rem solid rgba(0, 0, 0, 0.04);
    cursor:pointer;
    
    &.active {
      border: 0.0625rem solid #734be2;
      color: #734be2;
      font-weight: bold;
    }
    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      &.active {
        border: 0.0625rem solid #734be2;
      }
    }
    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      border-right: 0.0625rem solid rgba(0, 0, 0, 0.04);
      &.active {
        border: 0.0625rem solid #734be2;
      }
    }
  }
`

const HardwareAddrBox = styled.ul`
  list-style: none;
  margin: 0;
  padding:0;
  li {
    ${({theme}) => theme.FlexBC};
    font-family: Manrope;
    font-size: 0.75rem;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: normal;
    color: #96989e;
    padding: 0.625rem 1rem;
    border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.08);
    cursor:pointer;
    :hover {
      background: rgba(0, 0, 0, 0.04);
    }
    .left {
      ${({theme}) => theme.FlexSC};
      .icon {
        ${({theme}) => theme.FlexC};
        width: 2.5rem;
        height: 2.5rem;
        object-fit: contain;
        box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.04);
        border: solid 0.5px rgba(0, 0, 0, 0.1);
        border-radius:100%;
        margin-right: 18px;
      }
    }
  }
`

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending'
}



export default function WalletModal({ pendingTransactions, confirmedTransactions, ENSName }) {
  
  let { active, account, connector, activate, error, deactivate } = useWeb3React()
  // console.log(useWeb3React())
  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT)
  const [pendingWallet, setPendingWallet] = useState()
  
  const [pendingError, setPendingError] = useState()
  
  const walletModalOpen = useWalletModalOpen()
  const toggleWalletModal = useWalletModalToggle()
  
  const { t } = useTranslation()
  
  const trezorPath = "m/44'/60'/0'/0", ledgerPath = "m/44'/60'/0'"
  const HDPathArr = [
    {name: "Legacy", path: ledgerPath},
    {name: "Ledger live", path: trezorPath},
    {name: t('custom'), path: 0},
  ]
  // always reset to account view
  useEffect(() => {
    if (walletModalOpen) {
      setPendingError(false)
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [walletModalOpen])

  // set up uri listener for walletconnect
  const [uri, setUri] = useState()
  useEffect(() => {
    const activateWC = uri => {
      setUri(uri)
      // setWalletView(WALLET_VIEWS.PENDING)
    }
    walletconnect.on(URI_AVAILABLE, activateWC)
    return () => {
      walletconnect.off(URI_AVAILABLE, activateWC)
    }
  }, [])

  // close modal when a connection is successful
  const activePrevious = usePrevious(active)
  const connectorPrevious = usePrevious(connector)
  useEffect(() => {
    if (walletModalOpen && ((active && !activePrevious) || (connector && connector !== connectorPrevious && !error))) {
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [setWalletView, active, error, connector, walletModalOpen, activePrevious, connectorPrevious])
  
  useEffect(() => {
    if (walletView === WALLET_VIEWS.OPTIONS) {
      sessionStorage.setItem('walletType', '')
      sessionStorage.setItem('account', '')
      sessionStorage.setItem('HDPath', '')
      setWalletType('')
      setPageSize(0)
      setSelectHDPathIndex(0)
      setSelfHDPathVal(ledgerPath)
      setIsUseSelectAddr(false)
    }
  }, [walletView])

  const tryActivation = async connector => {
    setIsUseSelectAddr(1)
    let name = ''
    Object.keys(SUPPORTED_WALLETS).map(key => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name)
      }
      return true
    })
    // ReactGA.event({
    //   category: 'Wallet',
    //   action: 'Change Wallet',
    //   label: name
    // })
    setPendingWallet(connector) // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING)
    activate(connector, undefined, true).catch(error => {
      console.log(error)
      if (error instanceof UnsupportedChainIdError) {
        activate(connector) // a little janky...can't use setError because the connector isn't set
      } else {
        setPendingError(true)
      }
    })
  }

  // close wallet modal if fortmatic modal is active
  useEffect(() => {
    fortmatic.on(OVERLAY_READY, () => {
      toggleWalletModal()
    })
  }, [toggleWalletModal])


  // console.log(process.env.NODE_ENV)
  const [walletType, setWalletType] = useState('')
  const [pageSize, setPageSize] = useState(0)
  const [selectHDPathIndex, setSelectHDPathIndex] = useState(0)
  const [selfHDPathVal, setSelfHDPathVal] = useState(ledgerPath)
  const [addressObj, setAddressObj] = useState({
    size: 0,
    list: []
  })
  const [isUseSelectAddr, setIsUseSelectAddr] = useState(false)
  
  useEffect(() => {
    getHardwareAccount()
  }, [pageSize, selectHDPathIndex])

  function changeSelectPath (index) {
    setSelectHDPathIndex(index)
    setPageSize(0)
    if (HDPathArr[selectHDPathIndex].path) {
      setSelfHDPathVal(HDPathArr[selectHDPathIndex].path)
    }
  }
  function changeReducePage () {
    if (!pageSize) return
    let page = pageSize
    page -=1
    setPageSize(page)
  }
  function changeAddPage () {
    let page = pageSize
    page += 1
    setPageSize(page)
  }

  function setAccountData (index) {
    // console.log(123)
    if (!addressObj.list[index].addr) {
      alert('Account is null!')
    }
    let path = HDPathArr[selectHDPathIndex].path ? HDPathArr[selectHDPathIndex].path : selfHDPathVal
    let params = {
      baseDerivationPath: path,
      address: addressObj.list[index].addr,
      pageSize: pageSize * 5 + index + 1
    }
    console.log(params)
    let ledgerConnector = new LedgerConnector(params)
    tryActivation(ledgerConnector)
    sessionStorage.setItem('walletType', walletType)
    sessionStorage.setItem('HDPath', addressObj.list[index].path)
  }

  function getHardwareAccount (option, wt) {
    // console.log(walletType)
    setAddressObj({
      size: 0,
      list: []
    })
    wt = wt ? wt : walletType
    if (wt !== 'Ledger') return
    // console.log(wt)
    let path = HDPathArr[selectHDPathIndex].path ? HDPathArr[selectHDPathIndex].path : selfHDPathVal
    // console.log(path)
    // setWalletView(WALLET_VIEWS.PENDING)
    // tryActivation(option.connector)
    // return
    getLedgerAddressArr(path, pageSize).then(res => {
      console.log(res)
      if (res.msg === 'Success') {
        setAddressObj({
          size: res.info.length,
          list: res.info
        })
      } else {
        setIsUseSelectAddr(0)
        tryActivation(option.connector)
      }
    })
  }
  // get wallets user can switch too, depending on device/browser
  function getOptions() {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask
    // console.log(window.ethereum)
    return Object.keys(SUPPORTED_WALLETS).map(key => {
      const option = SUPPORTED_WALLETS[key]
      if (isMobile) {
        // disable portis on mobile for now
        if (option.connector === portis) {
          return null
        }

        if (!window.web3 && !window.ethereum && option.mobile) {
          return (
            <Option
              onClick={() => {
                option.connector !== connector && !option.href && tryActivation(option.connector)
              }}
              key={key}
              active={option.connector && option.connector === connector}
              color={option.color}
              link={option.href}
              header={option.name}
              subheader={null}
              icon={require('../../assets/images/' + option.iconName)}
            />
          )
        }
        return null
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return (
              <Option
                key={key}
                color={'#E8831D'}
                header={'Install Metamask'}
                subheader={null}
                link={'https://metamask.io/'}
                icon={MetamaskIcon}
              />
            )
          } else {
            return null // dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetamask) {
          return null
        }
        // likewise for generic
        else if (option.name === 'Injected' && isMetamask) {
          return null
        }
      }

      // return rest of options
      // console.log(12)
      return (
        !isMobile &&
        !option.mobileOnly && (
          <Option
            onClick={() => {
              setWalletType(option ? option.name : walletType)
              setIsUseSelectAddr(false)
              // console.log(walletType)
              if (['Ledger'].includes(option.name)) {
                getHardwareAccount(option, option.name)
                // activate(option.connector)
              } else {
                option.connector === connector
                  ? setWalletView(WALLET_VIEWS.ACCOUNT)
                  : !option.href && tryActivation(option.connector)
              }
            }}
            key={key}
            active={option.connector === connector}
            color={option.color}
            link={option.href}
            header={option.name}
            subheader={null} // use option.descriptio to bring back multi-line
            icon={require('../../assets/images/' + option.iconName)}
          />
        )
      )
    })
  }

  function HDpathList () {
    return (
      <HDpathListBox>
        {
          HDPathArr.map((item, index) => {
            return (
              <li key={index} className={index === selectHDPathIndex ? 'active' : ''} onClick={() => {
                changeSelectPath(index)
              }}>{item.name}</li>
            )
          })
        }
      </HDpathListBox>
    )
  }

  function showHardwareAddr () {
    return (
      <HardwareAddrBox>
        {
          addressObj.list.map((item, index) => {
            return (
              <li key={index} onClick={() => {
                setAccountData(index)
              }}>
                <div className={'left'}>
                  <div className={'icon'}><img src={MintIcon} alt={''}/></div>
                  {item.addr}
                </div>
              </li>
            )
          })
        }
      </HardwareAddrBox>
    )
  }

  function getModalContent() {
    if (error) {
      return (
        <UpperSection>
          <CloseIcon onClick={toggleWalletModal}>
            <CloseColor alt={'close icon'} />
          </CloseIcon>
          <HeaderRow>{error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error connecting'}</HeaderRow>
          <ContentWrapper>
            {error instanceof UnsupportedChainIdError ? (
              <h5>Please connect to the main Fusion network.</h5>
            ) : (
              'Error connecting. Try refreshing the page.'
            )}
          </ContentWrapper>
        </UpperSection>
      )
    }

    if (['Ledger'].includes(walletType) && !isUseSelectAddr) {
      return (
        <UpperSection>
          <CloseIcon onClick={toggleWalletModal}>
            <CloseColor alt={'close icon'} />
          </CloseIcon>
          {walletView !== WALLET_VIEWS.ACCOUNT || ['Ledger'].includes(walletType) ? (
            <HeaderRow color="blue">
              <HoverText
                onClick={() => {
                  setPendingError(false)
                  setWalletView(WALLET_VIEWS.ACCOUNT)
                  setWalletType('')
                }}
              >
                Back
              </HoverText>
            </HeaderRow>
          ) : (
            <HeaderRow>
              <HoverText>{t('connectToWallet')}</HoverText>
            </HeaderRow>
          )}
          <ContentWrapper>
            <SelectContainer>
              {/* <SelectStyle onChange={e => changeSelectPath(e.target.value)} value={selectHDPathIndex}>
                {HDPathArr.map((item, index) => {
                  return (
                    <option value={index}  key={item.name}>{item.name}</option>
                  )
                })}
              </SelectStyle> */}
              {HDpathList()}
            </SelectContainer>
            {
              HDPathArr[selectHDPathIndex].path ? (
                <>
                </>
              ) : (
                <>
                  <SelfText>Please add the custom path</SelfText>
                  <SelfInputBox>
                    <SelfInput value={selfHDPathVal} onChange={e => {
                      console.log(e.target.value)
                      setSelfHDPathVal(e.target.value)
                    }}></SelfInput>
                    <SelfButton size={'100px'} onClick={e => {getHardwareAccount()}}><img src={DoneIcon} style={{marginRight: '0.625rem'}} alt={''} />Done</SelfButton>
                  </SelfInputBox>
                </>
              )
            }
            <AddrListBox>
              {addressObj.size > 0 ? showHardwareAddr() : (
                <AddrList>Loading...</AddrList>
              )}
            </AddrListBox>
            <SelectHDPathPage>
              <ArrowBox onClick={changeReducePage}><img alt={''} src={PreviouskIcon} style={{marginRight: '0.625rem'}}/>Previous</ArrowBox>
              <ArrowBox onClick={changeAddPage}>Next<img alt={''} src={NextkIcon} style={{marginLeft: '0.625rem'}} /></ArrowBox>
            </SelectHDPathPage>
          </ContentWrapper>
        </UpperSection>
      )
    }
    // console.log(account)
    // console.log(walletView)
    // console.log(WALLET_VIEWS.ACCOUNT)
    if (account && (isUseSelectAddr || !['Ledger'].includes(walletType)) && walletView === WALLET_VIEWS.ACCOUNT) {
      return (
        <AccountDetails
          toggleWalletModal={toggleWalletModal}
          pendingTransactions={pendingTransactions}
          confirmedTransactions={confirmedTransactions}
          ENSName={ENSName}
          openOptions={() => setWalletView(WALLET_VIEWS.OPTIONS)}
        />
      )
    }
    return (
      <UpperSection>
        <CloseIcon onClick={toggleWalletModal}>
          <CloseColor alt={'close icon'} />
        </CloseIcon>
        {walletView !== WALLET_VIEWS.ACCOUNT ? (
          <HeaderRow color="blue">
            <HoverText
              onClick={() => {
                setPendingError(false)
                setWalletView(WALLET_VIEWS.ACCOUNT)
              }}
            >
              Back
            </HoverText>
          </HeaderRow>
        ) : (
          <HeaderRow>
            <HoverText>{t('connectToWallet')}</HoverText>
          </HeaderRow>
        )}
        <ContentWrapper>
          {walletView === WALLET_VIEWS.PENDING ? (
            <PendingView
              uri={uri}
              size={220}
              connector={pendingWallet}
              error={pendingError}
              setPendingError={setPendingError}
              tryActivation={tryActivation}
              walletType={walletType}
              onHardware={() => {
                // getHardwareAccount(SUPPORTED_WALLETS['LEDGER'], walletType)
                setSelectHDPathIndex(0)
                setPageSize(0)
                setIsUseSelectAddr(0)
                setPendingError(false)
                setWalletView(WALLET_VIEWS.ACCOUNT)
              }}
            />
          ) : (
            <OptionGrid>{getOptions()}</OptionGrid>
          )}
          {/* {walletView !== WALLET_VIEWS.PENDING && (
            <Blurb>
              <span>New to Fusion? &nbsp;</span>{' '}
              <Link href="https://myfusionwallet.com">
                Learn more about wallets
              </Link>
            </Blurb>
          )} */}
        </ContentWrapper>
      </UpperSection>
    )
  }

  return (
    <Modal
      style={{ userSelect: 'none' }}
      isOpen={walletModalOpen}
      onDismiss={toggleWalletModal}
      minHeight={null}
      maxHeight={90}
    >
      <Wrapper>{getModalContent()}</Wrapper>
    </Modal>
  )
}
