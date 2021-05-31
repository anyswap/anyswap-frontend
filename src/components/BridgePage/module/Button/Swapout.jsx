import React, {useCallback, useMemo, useState} from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import {buildSwapoutData, signSwapoutData, Status, isAddress, toHexAddress} from 'anyswapsdk'

import { Button } from '../../../../theme'

import config from '../../../../config'

import {getWeb3BaseInfo} from '../../../../utils/web3/txns'

import BirdgeIcon from '../../../../assets/images/icon/bridge-white.svg'

import { useWeb3React } from '../../../../hooks'



const StyledBirdgeIcon = styled.div`
  ${({ theme }) => theme.FlexC};
  img {
    margin-right: 1rem
  }
`

export default function SwapoutView ({
  selectToken,
  dec,
  inputVaule,
  symbol,
  isDisabled,
  receiveAddress,
  destChain,
  onCallback = () => {}
}) {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const walletType = sessionStorage.getItem('walletType')
  
  const [isIntervalDisabled, setIsIntervalDisableed] = useState(true)

  const btnDisabled = useMemo(() => {
    // console.log(isDisabled)
    if (isIntervalDisabled && !isDisabled) {
      return false
    } else {
      return true
    }
  }, [isIntervalDisabled, isDisabled])

  const bridgeWithdraw = useCallback(() => {
    if (
      !isAddress(receiveAddress, destChain)
    ) {
      alert('Illegal address!')
      return
    }
    if (btnDisabled) return
    setIsIntervalDisableed(false)
    setTimeout(() => {
      setIsIntervalDisableed(true)
    }, 3000)
    
    let amountVal = inputVaule
    // if (amountVal.gt(inputBalance)) {
    //   amountVal = inputBalance
    // }
    amountVal = amountVal.toString()
    const formatAddress = destChain === 'TRX' ? toHexAddress(receiveAddress) : receiveAddress
    const token = selectToken
    // console.log(formatAddress)
    const params = {value: amountVal, address: formatAddress, token: token, destChain: destChain}
    if (config.supportWallet.includes(walletType)) {
      setIsHardwareError(false)
      setIsHardwareTip(true)
      setHardwareTxnsInfo(amountFormatter(amountVal, dec, dec) + " "  + symbol)
      
      // let web3Contract = getWeb3ConTract(swapETHABI, token)
      const data = buildSwapoutData(params)
      getWeb3BaseInfo(token, data, account).then(res => {
        if (res.msg === Status.Success) {
          onCallback(Status.Success, res.info, amountVal, formatAddress, destChain)
        } else {
          onCallback(Status.Error, res.error)
        }
      })
      return
    }

    signSwapoutData(params).then(res => {
      if (res.msg === Status.Success) {
        onCallback(Status.Success, res.info, amountVal, formatAddress, destChain)
      } else {
        onCallback(Status.Error, res.error)
      }
    })
  }, [symbol, account, dec, inputVaule, btnDisabled, receiveAddress, destChain, onCallback, selectToken, walletType])

  return (
    <Button disabled={btnDisabled} onClick={() => {bridgeWithdraw()}}>
      <StyledBirdgeIcon>
        <img src={BirdgeIcon} alt={''} />
        {t('redeem')}
      </StyledBirdgeIcon>
    </Button>
  )
}