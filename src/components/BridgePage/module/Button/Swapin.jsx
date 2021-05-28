import React, {useCallback, useMemo, useState} from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import {buildSwapinData, signSwapinData, Status, isAddress, toHexAddress} from 'anyswapsdk'

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

export default function BridgeSend ({
  selectToken,
  dec,
  inputVaule,
  symbol,
  isDisabled,
  onCallback = () => {}
}) {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const walletType = sessionStorage.getItem('walletType')
  // console.log(selectToken)
  const [isIntervalDisabled, setIsIntervalDisableed] = useState(true)

  const btnDisabled = useMemo(() => {
    if (isIntervalDisabled && !isDisabled) {
      return false
    } else {
      return true
    }
  }, [isIntervalDisabled, isDisabled])

  const bridgeWithdraw = useCallback(() => {
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
    const formatAddress = account
    const token = selectToken
    const params = {value: amountVal, address: formatAddress, token: token}
    console.log(params)
    if (config.supportWallet.includes(walletType)) {
      setIsHardwareError(false)
      setIsHardwareTip(true)
      setHardwareTxnsInfo(amountFormatter(amountVal, dec, dec) + " "  + symbol)
      
      // let web3Contract = getWeb3ConTract(swapETHABI, token)
      const data = buildSwapinData(params)
      getWeb3BaseInfo(token, data, account).then(res => {
        if (res.msg === 'Success') {
          onCallback('Success', res.info, amountVal, formatAddress)
        } else {
          onCallback('Error', res.error)
        }
      })
      return
    }

    signSwapinData(params).then(res => {
      console.log(res)
      if (res.msg === Status.Success) {
        onCallback('Success', res.info, amountVal, formatAddress)
      } else {
        onCallback('Error', res.error)
      }
    })
  }, [symbol, account, dec, inputVaule, btnDisabled, onCallback, selectToken, walletType])

  return (
    <Button disabled={btnDisabled} onClick={() => {bridgeWithdraw()}}>
      <StyledBirdgeIcon>
        <img src={BirdgeIcon} alt={''} />
        {t('CrossChain')}
      </StyledBirdgeIcon>
    </Button>
  )
}