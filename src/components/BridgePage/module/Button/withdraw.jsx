import React, {useCallback, useMemo, useState} from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import {buildSwapoutData, signSwapoutData, Status, isAddress} from 'anyswapsdk'

import { Button } from '../../../../theme'


import config from '../../../../config'
// import {formatCoin, formatDecimal, thousandBit} from '../../utils/tools'
import {getWeb3ConTract, getWeb3BaseInfo} from '../../../../utils/web3/txns'
import {isBTCAddress} from '../../../../utils/birdge/BTC'
import {sendTRXTxns, isTRXAddress, toHexAddress} from '../../../../utils/birdge/TRX'

// import swapBTCABI from '../../../../constants/abis/swapBTCABI'
// import swapETHABI from '../../../../constants/abis/swapETHABI'

import {isSpecialCoin} from '../common'

import BirdgeIcon from '../../../../assets/images/icon/bridge-white.svg'

import { useWeb3React, useSwapTokenContract } from '../../../../hooks'



const StyledBirdgeIcon = styled.div`
  ${({ theme }) => theme.FlexC};
  img {
    margin-right: 1rem
  }
`

export default function BridgeWithdraw ({
  selectToken,
  dec,
  inputVaule,
  cointype,
  isDisabled,
  receiveAddress,
  srcChain,
  onCallback = () => {}
}) {
  const { account } = useWeb3React()
  const { t } = useTranslation()

  
  const [isIntervalDisabled, setIsIntervalDisableed] = useState(false)

  const btnDisabled = useMemo(() => {
    if (isIntervalDisabled && isDisabled) {
      return false
    } else {
      return true
    }
  }, [isIntervalDisabled, isDisabled])

  const bridgeWithdraw = useCallback(() => {
    if (
      !isAddress(receiveAddress, srcChain)
    ) {
      alert('Illegal address!')
      return
    }
    if (btnDisabled) return
    setIsIntervalDisableed(false)
    setTimeout(() => {
      setIsIntervalDisableed(true)
    }, 3000)
    
    let amountVal = ethers.utils.parseUnits(inputVaule.toString(), dec)
    if (amountVal.gt(inputBalance)) {
      amountVal = inputBalance
    }
    amountVal = amountVal.toString()
    const formatAddress = srcChain === 'TRX' ? toHexAddress(receiveAddress) : receiveAddress
    const token = selectToken
    // console.log(formatAddress)
    const params = {value: amountVal, address: formatAddress, token: token, srcChain: srcChain}
    if (config.supportWallet.includes(walletType)) {
      setIsHardwareError(false)
      setIsHardwareTip(true)
      setHardwareTxnsInfo(amountFormatter(amountVal, dec, dec) + " "  + cointype)
      
      // let web3Contract = getWeb3ConTract(swapETHABI, token)
      const data = buildSwapoutData(params)
      getWeb3BaseInfo(token, data, account).then(res => {
        if (res.msg === 'Success') {
          onCallback('Success', res.info, amountVal, formatAddress, srcChain)
        } else {
          onCallback('Error', res.error)
        }
      })
      return
    }

    signSwapoutData(params).then(res => {
      if (res.msg === Status.Success) {
        onCallback('Success', res.info, amountVal, formatAddress, srcChain)
      } else {
        onCallback('Error', err)
      }
    })
  }, [cointype, account, dec, inputVaule, btnDisabled, receiveAddress, srcChain, onCallback, selectToken])

  return (
    <Button disabled={btnDisabled} onClick={() => {bridgeWithdraw()}}>
      <StyledBirdgeIcon>
        <img src={BirdgeIcon} alt={''} />
        {t('redeem')}
      </StyledBirdgeIcon>
    </Button>
  )
}