import React, {useCallback, useMemo, useState} from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'


import { Button } from '../../../../theme'


import config from '../../../../config'
// import {formatCoin, formatDecimal, thousandBit} from '../../utils/tools'
import {getWeb3ConTract, getWeb3BaseInfo} from '../../../../utils/web3/txns'
import {isBTCAddress} from '../../../../utils/birdge/BTC'
import {sendTRXTxns, isTRXAddress, toHexAddress} from '../../../../utils/birdge/TRX'

import swapBTCABI from '../../../../constants/abis/swapBTCABI'
import swapETHABI from '../../../../constants/abis/swapETHABI'

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

  const tokenETHContract = useSwapTokenContract(selectToken, swapETHABI)

  const btnDisabled = useMemo(() => {
    if (isIntervalDisabled && isDisabled) {
      return false
    } else {
      return true
    }
  }, [isIntervalDisabled, isDisabled])

  const bridgeWithdraw = useCallback(() => {
    if (
      (isSpecialCoin(cointype) && !isBTCAddress(receiveAddress, cointype))
      || (srcChain === 'TRX' && !isTRXAddress(receiveAddress))
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
    let address = receiveAddress
    const formatAddress = srcChain === 'TRX' ? toHexAddress(address) : address
    let token = selectToken
    // console.log(formatAddress)
    if (config.supportWallet.includes(walletType)) {
      setIsHardwareError(false)
      setIsHardwareTip(true)
      setHardwareTxnsInfo(amountFormatter(amountVal, dec, dec) + " "  + cointype)
      
      let web3Contract = getWeb3ConTract(swapETHABI, token)
      if (isSpecialCoin(cointype)) {
        web3Contract = getWeb3ConTract(swapBTCABI, token)
      }
      let data = web3Contract.methods.Swapout(amountVal, formatAddress).encodeABI()
      getWeb3BaseInfo(token, data, account).then(res => {
        if (res.msg === 'Success') {
          onCallback('Success', res.info, amountVal, address, srcChain)
        } else {
          onCallback('Error', res.error)
        }
      })
      return
    }

    if (isSpecialCoin(cointype) === 0) {
      tokenETHContract.Swapout(amountVal, formatAddress).then(res => {
        onCallback('Success', res, amountVal, address, srcChain)
      }).catch(err => {
        onCallback('Error', err)
      })
    } else {
      tokenContract.Swapout(amountVal, formatAddress).then(res => {
        onCallback('Success', res, amountVal, address, srcChain)
      }).catch(err => {
        console.log(err)
        onCallback('Error', err)
      })
    }
  }, [cointype, account, dec, inputVaule, btnDisabled, receiveAddress, srcChain, tokenETHContract, onCallback, selectToken])

  return (
    <Button disabled={btnDisabled} onClick={() => {bridgeWithdraw()}}>
      <StyledBirdgeIcon>
        <img src={BirdgeIcon} alt={''} />
        {t('redeem')}
      </StyledBirdgeIcon>
    </Button>
  )
}