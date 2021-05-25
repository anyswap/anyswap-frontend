import React, { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useWeb3React } from '../../../hooks'

import Title from '../../Title'
import OversizedPanel from '../../OversizedPanel'
import AddressInputPanel from '../../AddressInputPanel'
import {
  DownArrowBackground,
} from '../../Styled'

import ResertSvg from '../../../assets/images/icon/revert.svg'

import SelectToken from './SelectToken'
import SelectChain from './SelectChain'
import BridgeButton from './Button'

export default function BridgeViews ({
  onSelectBridge = () => {},
  tokenList = {},
  initBridgeType
}) {
  const { account, chainId } = useWeb3React()
  const { t } = useTranslation()

  const [selectToken, setSelectToken] = useState('')
  const [selectChain, setSelectChain] = useState('')
  const [modalView, setModalView] = useState(false)
  const [bridgeType, setBridgeType] = useState(initBridgeType)
  const [value, setValue] = useState('')
  const [recipient, setRecipient] = useState({
    address: '',
    name: ''
  })

  const useToken = useMemo(() => {
    if (selectToken && tokenList) {
      return tokenList[selectToken]
    } else {
      return {}
    }
  }, [selectToken, tokenList])

  const outValue = useMemo(() => {
    if (value) {

    } else {
      return ''
    }
  }, [value])

  function changeTab (type) {
    setBridgeType(type)
    onSelectBridge(type)
    setSelectToken('')
    setSelectChain('')
  }

  return (
    <>
      <Title
        title={t('deposit1')}
        tabList={[
          {
            name: t('deposit1'),
            onTabClick: () => {
              changeTab('swapin')
            },
            iconUrl: require('../../../assets/images/icon/deposit.svg'),
            iconActiveUrl: require('../../../assets/images/icon/deposit-purple.svg')
          },
          {
            name: t('redeem'),
            onTabClick: () => {
              changeTab('swapout')
            },
            iconUrl: require('../../../assets/images/icon/withdraw.svg'),
            iconActiveUrl: require('../../../assets/images/icon/withdraw-purple.svg')
          },
        ]}
        currentTab={bridgeType === 'swapin' ? 0 : 1 }
      ></Title>
      <SelectToken
        tokenList={tokenList}
        onValueChange={val => {
          setValue(val)
        }}
        onSelectedToken={token => {
          setSelectToken(token)
          setSelectChain('')
        }}
        onToggleModal={val => {
          setModalView(val)
        }}
        value={value}
        selectToken={selectToken}
        modalView={modalView}
      ></SelectToken>

      <OversizedPanel>
        <DownArrowBackground onClick={() => {}}>
          <img src={ResertSvg} alt={''} />
        </DownArrowBackground>
      </OversizedPanel>

      <SelectChain
        tokenList={tokenList}
        selectToken={selectToken}
        bridgeType={bridgeType}
        selectChain={selectChain}
        onSelectedChain={chainID => {
          setSelectChain(chainID)
        }}
        onOpenTokenModal={val => {
          setModalView(val)
        }}
      ></SelectChain>

      {bridgeType && bridgeType === 'swapout' ? (
          <>
            <AddressInputPanel title={t('recipient') + ' ' + (useToken && useToken.symbol ? useToken.symbol : '')  + ' ' + t('address')} onChange={setRecipient} initialInput={recipient} isValid={true} disabled={false}/>
          </>
        ) : ''
      }

      <BridgeButton
        type="withdraw"
        isDisabled={true}
      />
    </>
  )
}