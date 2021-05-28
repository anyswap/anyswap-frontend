import React from 'react'
import { useTranslation } from 'react-i18next'

import Deposit from './deposit'
import Swapout from './Swapout'
import Swapin from './Swapin'

import { useWeb3React } from '../../../../hooks'

import { Button } from '../../../../theme'

import { useWalletModalToggle } from '../../../../contexts/Application'

import {
  Flex,
} from '../../../Styled'

export default function BridgeButton ({
  bridgeType,
  selectToken,
  dec,
  inputVaule,
  symbol,
  isDisabled,
  receiveAddress,
  destChain
}) {
  const { account } = useWeb3React()
  // console.log(isDisabled)
  const toggleWalletModal = useWalletModalToggle()
  const { t } = useTranslation()
  let ButtonView = ''
  if (!account) {
    ButtonView = <Button onClick={toggleWalletModal} >
      {t('connectToWallet')}
    </Button>
  } else if (bridgeType === 'swapout') {
    ButtonView = (
      <>
        <Swapout
          selectToken={selectToken}
          dec={dec}
          inputVaule={inputVaule}
          symbol={symbol}
          isDisabled={isDisabled}
          receiveAddress={receiveAddress}
          destChain={destChain}
        />
      </>
    )
  } else if (bridgeType === 'swapin') {
    ButtonView = (
      <Swapin
        selectToken={selectToken}
        dec={dec}
        inputVaule={inputVaule}
        symbol={symbol}
        isDisabled={isDisabled}
        receiveAddress={receiveAddress}
        destChain={destChain}
      />
    )
  } else {
    ButtonView = (
      <Deposit />
    )
  }
  return (
    <>
      <Flex>
        {ButtonView}
      </Flex>
    </>
  )
}