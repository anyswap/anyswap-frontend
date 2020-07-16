import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { createBrowserHistory } from 'history'
import { ethers } from 'ethers'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
// import ReactGA from 'react-ga'

import { useWeb3React, useFactoryContract } from '../../hooks'
import { Button } from '../../theme'
import AddressInputPanel from '../../components/AddressInputPanel'
import OversizedPanel from '../../components/OversizedPanel'
import { useTokenDetails } from '../../contexts/Tokens'
import { useTransactionAdder } from '../../contexts/Transactions'
import { useWalletModalToggle } from '../../contexts/Application'


import config from '../../config'
import {getWeb3ConTract, getWeb3BaseInfo} from '../../utils/web3/txns'
// import factory from '../../constants/abis/factory'
import factory_abi from '../../constants/abis/factory.json'
import { FACTORY_ADDRESSES } from '../../constants'

import HardwareTip from '../../components/HardwareTip'
import CreateIcon from '../../assets/images/icon/create-exchange-white.svg'
import { useBetaMessageManager } from '../../contexts/LocalStorage'
import WarningTip from '../../components/WarningTip'
const SummaryPanel = styled.div`
${({ theme }) => theme.flexColumnNoWrap}
padding: 1rem 0;
min-width: 30%;
@media screen and (max-width: 960px) {
  background-color: #ededed;
  width:100%;
  padding: 1rem 1rem;
}
`

const ExchangeRateWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  color: ${({ theme }) => theme.doveGray};
  font-size: 0.75rem;
  font-family: 'Manrope';
  padding: 8px 1rem ;
  height: 28px;
  border-bottom:0.0625rem solid #dadada;
  span {
    height: 0.75rem;
    font-size: 0.75rem;
    font-weight: 800;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: right;
    color: #062536;
  }
`

const ExchangeRate = styled.div`
  height: 0.75rem;
  font-family: 'Manrope';
  font-size: 0.75rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: right;
  color: #062536;
  margin-right: 5px;
`

const Flex = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;

  button {
    max-width: 20rem;
  }
`
const SummaryPanelBox = styled.div`
  ${({ theme }) => theme.FlexBC}
  height: 115px;
  object-fit: contain;
  border-radius: 0.5625rem;
  background-color: #ededed;
  margin-top:0.625rem;
  padding: 18px 29px;
  @media screen and (max-width: 960px) {
    padding:0;
    height: auto;
    justify-content:center;;
    background: none;
    flex-wrap:wrap;
    flex-direction: column;
  }
`
const TxnsDtilBtn = styled.div`
  ${({ theme }) => theme.FlexC};
  height: 34px;
  object-fit: contain;
  border-radius: 6px;
  background-color: #f9fafb;
  font-family: 'Manrope';
  font-size: 0.75rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #734be2;
  cursor:pointer;
  padding: 0 0.625rem;
`

function CreateExchange({ location, params }) {
  const { t } = useTranslation()
  let { account, chainId } = useWeb3React()
  let walletType = sessionStorage.getItem('walletType')
  let HDPath = sessionStorage.getItem('HDPath')
  const [showBetaMessage] = useBetaMessageManager()
  // account = config.supportWallet.includes(walletType) ? sessionStorage.getItem('account') : account
  const factory = useFactoryContract()

  const [tokenAddress, setTokenAddress] = useState({
    address: params.tokenAddress ? params.tokenAddress : '',
    name: ''
  })
  const [tokenAddressError, setTokenAddressError] = useState()

  const { name, symbol, decimals, exchangeAddress } = useTokenDetails(tokenAddress.address)
  const addTransaction = useTransactionAdder()

  // clear url of query
  useEffect(() => {
    const history = createBrowserHistory()
    history.push(window.location.pathname + '')
  }, [])

  // validate everything
  const [errorMessage, setErrorMessage] = useState(!account && t('noWallet'))
  useEffect(() => {
    if (tokenAddressError) {
      setErrorMessage(t('invalidTokenAddress'))
    } else if (symbol === undefined || decimals === undefined || exchangeAddress === undefined) {
      setErrorMessage()
    } else if (symbol === null) {
      setErrorMessage(t('invalidSymbol'))
    } else if (decimals === null) {
      setErrorMessage(t('invalidDecimals'))
    } else if (exchangeAddress !== ethers.constants.AddressZero) {
      setErrorMessage(t('exchangeExists'))
    } else if (!account) {
      setErrorMessage(t('noWallet'))
    } else {
      setErrorMessage(null)
    }

    return () => {
      setErrorMessage()
    }
  }, [tokenAddress.address, symbol, decimals, exchangeAddress, account, t, tokenAddressError])

  async function createExchange() {
    if (config.supportWallet.includes(walletType)) {
      setIsHardwareError(false)
      setIsHardwareTip(true)
      setHardwareTxnsInfo('')
      let web3Contract = getWeb3ConTract(factory_abi, FACTORY_ADDRESSES[chainId])
      let data = web3Contract.createExchange.getData(tokenAddress.address)
      getWeb3BaseInfo(exchangeAddress, exchangeAddress, data, account).then(res => {
        console.log(res)
        if (res.msg === 'Success') {
          addTransaction(res.info)
          // ReactGA.event({
          //   category: 'Transaction',
          //   action: 'Create Exchange'
          // })
          setIsHardwareTip(false)
        } else {
          setIsHardwareError(true)
        }
        // addTransaction(response)
      })
      return
    }
    const estimatedGasLimit = await factory.estimate.createExchange(tokenAddress.address)

    factory.createExchange(tokenAddress.address, { gasLimit: estimatedGasLimit }).then(response => {
      // ReactGA.event({
      //   category: 'Transaction',
      //   action: 'Create Exchange'
      // })

      addTransaction(response)
    })
  }

  const toggleWalletModal = useWalletModalToggle()

  const isValid = errorMessage === null

  const [isHardwareTip, setIsHardwareTip] = useState(false)
  const [isHardwareError, setIsHardwareError] = useState(false)
  const [hardwareTxnsInfo, setHardwareTxnsInfo] = useState('')

  return (
    <>
    <HardwareTip
        HardwareTipOpen={isHardwareTip}
        closeHardwareTip={() => {
          setIsHardwareTip(false)
        }}
        error={isHardwareError}
        txnsInfo={hardwareTxnsInfo}
      ></HardwareTip>
      <AddressInputPanel
        title={t('tokenAddress')}
        initialInput={
          params.tokenAddress
            ? { address: params.tokenAddress }
            : { address: (location.state && location.state.tokenAddress) || '' }
        }
        onChange={setTokenAddress}
        onError={setTokenAddressError}
      />
      <SummaryPanelBox>
        <TxnsDtilBtn>
        {errorMessage ? errorMessage : t('enterTokenCont')}
        </TxnsDtilBtn>
        <SummaryPanel>
          <ExchangeRateWrapper>
            <ExchangeRate>{t('name')}：</ExchangeRate>
            <span>{name ? name : ' - '}</span>
          </ExchangeRateWrapper>
          <ExchangeRateWrapper>
            <ExchangeRate>{t('symbol')}：</ExchangeRate>
            <span>{symbol ? symbol : ' - '}</span>
          </ExchangeRateWrapper>
          <ExchangeRateWrapper>
            <ExchangeRate>{t('decimals')}：</ExchangeRate>
            <span>{decimals || decimals === 0 ? decimals : ' - '}</span>
          </ExchangeRateWrapper>
        </SummaryPanel>

      </SummaryPanelBox>
      {/* <OversizedPanel hideBottom>
        <SummaryPanel>
          <ExchangeRateWrapper>
            <ExchangeRate>{t('name')}</ExchangeRate>
            <span>{name ? name : ' - '}</span>
          </ExchangeRateWrapper>
          <ExchangeRateWrapper>
            <ExchangeRate>{t('symbol')}</ExchangeRate>
            <span>{symbol ? symbol : ' - '}</span>
          </ExchangeRateWrapper>
          <ExchangeRateWrapper>
            <ExchangeRate>{t('decimals')}</ExchangeRate>
            <span>{decimals || decimals === 0 ? decimals : ' - '}</span>
          </ExchangeRateWrapper>
        </SummaryPanel>
      </OversizedPanel> */}
      {/* <CreateExchangeWrapper>
        <SummaryText>{errorMessage ? errorMessage : t('enterTokenCont')}</SummaryText>
      </CreateExchangeWrapper> */}
      <WarningTip></WarningTip>
      
      <Flex>
        {/* <Button disabled={!isValid} onClick={createExchange}>
          {t('createExchange')}
        </Button> */}
        {
          account ? (
            <>
              <Button disabled={!isValid || showBetaMessage} onClick={createExchange}>
              <img alt={''} src={CreateIcon} style={{marginRight: '15px'}} />
                {t('createExchange')}
              </Button>
            </>
          ) : (
            <>
              <Button onClick={toggleWalletModal}>
                {t('connectToWallet')}
              </Button>
            </>
          )
        }
      </Flex>
    </>
  )
}

export default withRouter(CreateExchange)
