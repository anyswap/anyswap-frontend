import React, { useState, useEffect, useReducer, useContext } from 'react'
import ReactGA from 'react-ga'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useWeb3React, UnsupportedChainIdError, getWeb3ReactContext } from '@web3-react/core'
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
import { injected, walletconnect, fortmatic, portis, ledger } from '../../connectors'
import { useWalletModalToggle, useWalletModalOpen } from '../../contexts/Application'
import { OVERLAY_READY } from '../../connectors/Fortmatic'

import {getAddressArr} from '../../utils/wallets/ledger'
import web3Fn from '../../utils/web3'
import { darken } from 'polished'
// import { ethers } from 'ethers'
// console.log(ethers)
// console.log(web3Fn)
// console.log(ethers.getDefaultProvider())
// let provider = new ethers.providers.Web3Provider(web3Fn.currentProvider)
// console.log(provider)
// var abstractConnector = require('@web3-react/abstract-connector').AbstractConnector
// const test = new abstractConnector({supportedChainIds: 46688})
// console.log(test)
// test.emitUpdate({
//   account: 123
// })
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
  padding: 2rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 1rem`};
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

const Blurb = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin: 1rem;
    font-size: 12px;
  `};
`

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    grid-gap: 10px;
  `};
`

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
  margin: 20px 0;
  height: 40px;
`

const SelectStyle = styled.select`
  font-size: 1rem;
  outline: none;
  border: 1px solid ${({ theme }) => theme.shadowColor};
  flex: 1 1 auto;
  width: 100%;
  min-width: 200px;
  height: 100%;
  background-color: ${({ theme }) => theme.inputBackground};

  color: ${({ theme }) => theme.textColor};
  overflow: hidden;
  text-overflow: ellipsis;

  ::placeholder {
    color: ${({ theme }) => theme.placeholderGray};
  }
`

const SelfInput = styled.input`
  font-size: 1rem;
  outline: none;
  border: 1px solid ${({ theme }) => theme.shadowColor};
  flex: 1 1 auto;
  min-width: 200px;
  width: 100%;
  height: 38px;
  padding: 0 10px;
  background-color: ${({ theme }) => theme.inputBackground};

  color: ${({ theme }) => theme.textColor};
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left:10px;
  ::placeholder {
    color: ${({ theme }) => theme.placeholderGray};
  }
`

const SelfButton = styled.button.attrs(({ warning, theme }) => ({
  backgroundColor: warning ? theme.salmonRed : theme.royalBlue
}))`
  padding: 0 25px;
  border-radius: 3rem;
  cursor: pointer;
  user-select: none;
  font-size: 1rem;
  border: none;
  outline: none;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ theme }) => theme.white};
  height: 100%;
  width: ${({ size }) => size};
  margin-left:10px;

  :hover,
  :focus {
    background-color: ${({ backgroundColor }) => darken(0.05, backgroundColor)};
  }

  :active {
    background-color: ${({ backgroundColor }) => darken(0.1, backgroundColor)};
  }

  :disabled {
    background-color: ${({ theme }) => theme.concreteGray};
    color: ${({ theme }) => theme.silverGray};
    cursor: auto;
  }
`

const AddrList = styled.li`
padding:8px 10px;
cursor:pointer;
border: 1px solid transparent;
`

const AddrListSelect = styled(AddrList)`
border: 1px solid ${({ theme }) => theme.shadowColor};
`

const ArrowBox = styled.div`
  width: 30px;
  height: 30px;
  line-height: 28px;
  display:flex;
  justify-content: center;
  align-item:center;
  margin-right: 20px;
  border: 1px solid ${({ theme }) => theme.shadowColor};
  cursor:pointer;
`

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending'
}

const trezorPath = "m/44'/60'/0'/0", ledgerPath = "m/44'/60'/0'"
const HDPathArr = [
  {name: "Ledger(ETH)(" + ledgerPath + ")", path: ledgerPath},
  {name: "TREZOR(ETH)(" + trezorPath + ")", path: trezorPath},
  {name: "Custom", path: 0},
]


export default function WalletModal({ pendingTransactions, confirmedTransactions, ENSName }) {

  let { active, account, connector, activate, error, provider } = useWeb3React()
  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT)
  const [pendingWallet, setPendingWallet] = useState()
  // const test = useContext(useWeb3React())
// console.log(useWeb3React())
// console.log(test)
  const [pendingError, setPendingError] = useState()

  const walletModalOpen = useWalletModalOpen()
  const toggleWalletModal = useWalletModalToggle()

  const { t } = useTranslation()

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
      setSelectAddrObjs({
        addr: '',
        path: ''
      })
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
    ReactGA.event({
      category: 'Wallet',
      action: 'Change Wallet',
      label: name
    })
    setPendingWallet(connector) // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING)
    activate(connector, undefined, true).catch(error => {
      if (error instanceof UnsupportedChainIdError) {
        // console.log(error)
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
  const [selectAddrObj, setSelectAddrObjs] = useState({
    addr: '',
    path: ''
  })
  const [addressObj, setAddressObj] = useState({
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
  function selectAddress(e, index) {
    // console.log(addressObj.list[index])
    setSelectAddrObjs({
      addr: addressObj.list[index].addr,
      path: addressObj.list[index].path,
    })
  }

  function setAccountData () {
    // console.log(123)
    account = selectAddrObj.addr
    console.log(account)
    sessionStorage.setItem('walletType', walletType)
    sessionStorage.setItem('account', selectAddrObj.addr)
    sessionStorage.setItem('HDPath', selectAddrObj.path)
    setIsUseSelectAddr(true)
    setWalletView(WALLET_VIEWS.ACCOUNT)
  }

  function showHardwareAddr () {
    // console.log(addressObj)
    return addressObj.list.map((item, index) => {
      return (
        selectAddrObj.addr === item.addr ?
        (
          <AddrListSelect key={index} onClick={e => selectAddress(e, index)}>{item.addr}</AddrListSelect>
        ) : (
          <AddrList key={index} onClick={e => selectAddress(e, index)}>{item.addr}</AddrList>
        )
      )
    })
  }

  function getHardwareAccount (option) {
    if (walletType !== 'Ledger') return
    let path = HDPathArr[selectHDPathIndex].path ? HDPathArr[selectHDPathIndex].path : selfHDPathVal
    // console.log(path)
    getAddressArr(path, pageSize).then(res => {
      console.log(res)
      if (res.msg === 'Success') {
        setAddressObj({
          list: res.info
        })
      } else {
        if (option) {
          tryActivation(option.connector)
        } else  {
          tryActivation()
        }
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
              console.log('option')
              console.log(option)
              // console.log(connector)
              // console.log(activate)
              // console.log(account)
              setWalletType(option ? option.name : walletType)
              if (['Ledger'].includes(option.name)) {
                getHardwareAccount(option)
              } else {
                option.connector === connector
                  ? setWalletView(WALLET_VIEWS.ACCOUNT)
                  : !option.href && tryActivation(option.connector)
              }
              // option.connector === connector
              //     ? setWalletView(WALLET_VIEWS.ACCOUNT)
              //     : !option.href && tryActivation(option.connector)
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
          {walletView !== WALLET_VIEWS.ACCOUNT ? (
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
              <SelectStyle onChange={e => changeSelectPath(e.target.value)} value={selectHDPathIndex}>
                {HDPathArr.map((item, index) => {
                  return (
                    <option value={index}  key={item.name}>{item.name}</option>
                  )
                })}
              </SelectStyle>
              {
                HDPathArr[selectHDPathIndex].path ? (
                  <>
                  </>
                ) : (
                  <>
                    <SelfInput value={selfHDPathVal} onChange={e => {
                      console.log(e.target.value)
                      setSelfHDPathVal(e.target.value)
                    }}></SelfInput>
                    <SelfButton size={'100px'} onClick={e => {getHardwareAccount()}}>Select</SelfButton>
                  </>
                )
              }
            </SelectContainer>
            {showHardwareAddr()}
            <SelectContainer>
              <ArrowBox onClick={changeReducePage}>{'<'}</ArrowBox>
              <ArrowBox onClick={changeAddPage}>{'>'}</ArrowBox>
            </SelectContainer>
            <SelectContainer>
              <SelfButton size={'100%'} onClick={setAccountData}>Use</SelfButton>
            </SelectContainer>
          </ContentWrapper>
        </UpperSection>
      )
    }
    // console.log(account)
    // console.log(walletView)
    // console.log(WALLET_VIEWS.ACCOUNT)
    if ((account || (isUseSelectAddr && selectAddrObj.addr)) && walletView === WALLET_VIEWS.ACCOUNT) {
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
            />
          ) : (
            <OptionGrid>{getOptions()}</OptionGrid>
          )}
          {walletView !== WALLET_VIEWS.PENDING && (
            <Blurb>
              <span>New to Fusion? &nbsp;</span>{' '}
              <Link href="https://myfusionwallet.com">
                Learn more about wallets
              </Link>
            </Blurb>
          )}
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
