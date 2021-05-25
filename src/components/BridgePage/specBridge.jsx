import React, { useState, useRef, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Tooltip from '@reach/tooltip'
import { ethers } from 'ethers'
import styled from 'styled-components'
import {CurrentBridgeInfo} from 'anyswapsdk'

import { useWeb3React } from '../../hooks'

import BridgeView from './module'

export default function BridgeViews () {
  const { chainId } = useWeb3React()

  const initBridgeType = 'swapin'
  const [tokenList, setTokenList] = useState({})
  const [bridgeType, setBridgeType] = useState(initBridgeType)

  useEffect(() => {
    if (chainId) {
      CurrentBridgeInfo(chainId).then(res => {
        // console.log(res)
        if (res) {
          setTokenList(res)
        } else {
          setTokenList({})
        }
      })
    } else {
      setTokenList({})
    }
  }, [chainId])

  const useTokenList = useMemo(() => {
    if (tokenList && tokenList[bridgeType]) {
      return tokenList[bridgeType]
    } else {
      return {}
    }
  }, [tokenList, bridgeType])

  return (
    <>
      <BridgeView
        tokenList={useTokenList}
        initBridgeType={initBridgeType}
        onSelectBridge={(type) => {
          setBridgeType(type)
        }}
      ></BridgeView>
    </>
  )
}