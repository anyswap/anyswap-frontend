import React from 'react'
import { useTranslation } from 'react-i18next'

import Deposit from './deposit'
import Withdraw from './withdraw'
import Send from './send'

import { useWeb3React } from '../../../../hooks'

import { Button } from '../../../../theme'

import { useWalletModalToggle } from '../../../../contexts/Application'

import {
  Flex,
} from '../../../Styled'

export default function BridgeButton ({
  type,
  selectToken,
  fee,
  maxFee,
  minFee,
  maxNum,
  minNum,
  dec,
  inputVaule,
  cointype,
  isDisabled,
  receiveAddress,
  srcChain
}) {
  const { account } = useWeb3React()

  const toggleWalletModal = useWalletModalToggle()
  const { t } = useTranslation()
  let ButtonView = ''
  if (!account) {
    ButtonView = <Button onClick={toggleWalletModal} >
      {t('connectToWallet')}
    </Button>
  } else if (type === 'withdraw') {
    ButtonView = (
      <>
        <Withdraw
          selectToken={selectToken}
          dec={dec}
          inputVaule={inputVaule}
          cointype={cointype}
          isDisabled={isDisabled}
          receiveAddress={receiveAddress}
          srcChain={srcChain}
        />
      </>
    )
  } else if (type === 'send') {
    ButtonView = (
      <Send />
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