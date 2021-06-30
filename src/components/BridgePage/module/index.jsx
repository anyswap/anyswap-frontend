import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {isAddress, Status} from 'anyswapsdk'
import { ethers } from 'ethers'
import { useWeb3React } from '../../../hooks'
import { useTransactionAdder } from '../../../contexts/Transactions'
import { useAddressBalance } from '../../../contexts/Balances'

import Title from '../../Title'
import OversizedPanel from '../../OversizedPanel'
import AddressInputPanel from '../../AddressInputPanel'
import {
  DownArrowBackground,
} from '../../Styled'

import ResertSvg from '../../../assets/images/icon/revert.svg'

import {formatDecimal} from '../../../utils/tools'
import { amountFormatter } from '../../../utils'
import {getAllOutBalance1, getLocalOutBalance, getTokenBalance} from '../../../utils/birdge/getOutBalance'

import SelectToken from './SelectToken'
import SelectChain from './SelectChain'
import BridgeButton from './Button'
import Reminder from './Reminder'

export default function BridgeViews ({
  onSelectBridge = () => {},
  tokenList = {},
  initBridgeType
}) {
  const { account, chainId } = useWeb3React()
  // const account = '0x48628Aa941722292eCf2169E6DAd958Bc62a93D0'
  const { t } = useTranslation()
  const addTransaction = useTransactionAdder()

  const [selectToken, setSelectToken] = useState('')
  const [selectChain, setSelectChain] = useState('')
  const [selectChainInfo, setSelectChainInfo] = useState('')
  const [modalView, setModalView] = useState(false)
  const [bridgeType, setBridgeType] = useState(initBridgeType)
  const [value, setValue] = useState('')
  const [isError, setIsError] = useState(0) // 0：初始；1：正确；2：错误
  const [recipient, setRecipient] = useState({
    address: '',
    name: ''
  })
  // console.log(selectChainInfo)
  const dec = selectChainInfo && selectChainInfo.decimals ? selectChainInfo.decimals : ''
  const balance = useAddressBalance(account, selectToken)
  const formatBalance = balance && dec ? amountFormatter(balance, dec) : ''

  const getAllOutBalanceFn = useCallback(() => {
    let tokenClass = {}

    for (const token in tokenList) {
      const obj = tokenList[token]
      for (const c in obj.destChains) {
        const tStr = obj.destChains[c].address
        if (!tokenClass[c]) tokenClass[c] = {}
        tokenClass[c][tStr] = obj.destChains[c]
      }
    }
    // console.log(tokenList)
    // console.log(tokenClass)
    getAllOutBalance1(tokenClass, account)
  }, [tokenList, account])

  // console.log(getLocalOutBalance(node, account, inputCurrency))

  useEffect(() => {
    if (account) {
      getAllOutBalanceFn()
    }
  }, [account, getAllOutBalanceFn])

  const outBalance = useMemo(() => {
    const bl = getLocalOutBalance(selectChain, account, selectChainInfo.address)
    // console.log(bl)
    if (bl.msg === 'Success') {
      return bl.info.balance
    } 
    return ''
  }, [account, selectChain, selectChainInfo])
  // console.log(outBalance)

  const inputVaule = useMemo(() => {
    if (value && dec) {
      return ethers.utils.parseUnits(value.toString(), dec)
    }
    return '0x0'
  }, [value, dec])

  const useToken = useMemo(() => {
    if (selectToken && tokenList) {
      return tokenList[selectToken]
    } else {
      return {}
    }
  }, [selectToken, tokenList])

  const outValue = useMemo(() => {
    if (value && useToken) {
      
      const val = Number(value)
      const fee = Number(useToken.SwapFeeRatePerMillion) * value
      const maxFee = Number(useToken.MaximumSwapFee)
      const minFee = Number(useToken.MinimumSwapFee)

      const maxNum = Number(useToken.MaximumSwap)
      const minNum = Number(useToken.MinimumSwap)
      if (maxNum < val || minNum > val || !formatBalance || (formatBalance && val > Number(formatBalance))) {
        setIsError(2)
        return ''
      } else {
        setIsError(1)
        if (fee > maxFee) {
          return formatDecimal(val - maxFee, dec)
        } else if (fee < minFee) {
          return formatDecimal(val - minFee, dec)
        } else {
          return formatDecimal(val - fee, dec)
        }
      }
    } else {
      setIsError(0)
      return ''
    }
  }, [value, useToken, dec, formatBalance])

  const isDisabled = useMemo(() => {
    if (
      (isError === 1 && recipient.address && isAddress(recipient.address, selectChain) && bridgeType === 'swapout')
      || (isError === 1 && bridgeType === 'swapin')
    ) {
      return false
    } else {
      return true
    }
  }, [isError, recipient, selectChain, bridgeType])

  function changeTab (type) {
    setBridgeType(type)
    onSelectBridge(type)
    setSelectToken('')
    setSelectChain('')
    setSelectChainInfo('')
    setValue('')
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
          setSelectChainInfo('')
        }}
        onToggleModal={val => {
          setModalView(val)
        }}
        onMax={val => {
          setValue(val)
        }}
        value={value}
        selectToken={selectToken}
        modalView={modalView}
        isError={isError}
        balance={balance}
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
        onSelectedChainInfo={data => {
          setSelectChainInfo(data)
        }}
        onOpenTokenModal={val => {
          setModalView(val)
        }}
        value={outValue}
        balance={outBalance}
      ></SelectChain>

      {bridgeType && bridgeType === 'swapout' ? (
          <>
            <AddressInputPanel title={t('recipient') + ' ' + (useToken && useToken.symbol ? useToken.symbol : '')  + ' ' + t('address')} onChange={setRecipient} initialInput={recipient} onError={() => {}} isValid={true} disabled={false}/>
          </>
        ) : ''
      }

      <Reminder
        bridgeType={bridgeType}
        bridgeConfig={useToken}
      ></Reminder>

      <BridgeButton
        bridgeType={bridgeType}
        isDisabled={isDisabled}
        inputVaule={inputVaule}
        symbol={useToken?.symbol}
        receiveAddress={recipient.address}
        destChain={selectChain}
        dec={dec}
        selectToken={selectToken}
        
        onCallback={(status, info) => {
          if (status === Status.Success) {
            addTransaction(info)
          } else {
            alert(info)
          }
        }}
      />
    </>
  )
}