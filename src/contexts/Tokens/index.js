import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react'
import config from '../../config'
import { useWeb3React } from '../../hooks'
import {
  isAddress,
  getTokenName,
  getTokenSymbol,
  getTokenDecimals,
  getTokenExchangeAddressFromFactory,
  safeAccess
} from '../../utils'

import {
  NAME,
  SYMBOL,
  DECIMALS,
  EXCHANGE_ADDRESS,
  REDEEM_MAX_NUM,
  REDEEM_MIN_NUM,
  FEE,
  MAXFEE,
  MINFEE,
  ISSWITCH,
  ISDEPOSIT,
  ISREDEEM,
  DEPOSIT_ADDRESS,
  DEPOSIT_TYPE,
  DEPOSIT_MAX_NUM,
  DEPOSIT_MIN_NUM,
  EXTENDOBJ,
} from './methods/mode'

import fusion from './tokens/fusion'
import binance from './tokens/binance'
import fantom from './tokens/fantom'
import ethereum from './tokens/ethereum'


const UPDATE = 'UPDATE'

const COIN = {
  [config.symbol]: {
    [NAME]: config.name,
    [SYMBOL]: config.symbol,
    [DECIMALS]: config.decimals,
    [EXCHANGE_ADDRESS]: null,
    [REDEEM_MAX_NUM]: null,
    [REDEEM_MIN_NUM]: null,
    [FEE]: null,
    [MAXFEE]: 50,
    [MINFEE]: 1,
    [ISSWITCH]: 0,
    [ISDEPOSIT]: 0,
    [ISREDEEM]: 0,
    [DEPOSIT_ADDRESS]: '',
    [DEPOSIT_TYPE]: '',
    [DEPOSIT_MAX_NUM]: 0,
    [DEPOSIT_MIN_NUM]: 0,
    [EXTENDOBJ]: {},
  }
}

export const INITIAL_TOKENS_CONTEXT = {
  ...binance,
  ...fantom,
  ...fusion,
  ...ethereum
}

const TokensContext = createContext()

function useTokensContext() {
  return useContext(TokensContext)
}

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE: {
      const { networkId, tokenAddress, name, symbol, decimals, exchangeAddress, redeemMaxNum, redeemMinNum, fee, maxFee, minFee, isSwitch, isDeposit, isRedeem, depositAddress, depositType, depositMaxNum, depositMinNum, extendObj } = payload
      return {
        ...state,
        [networkId]: {
          ...(safeAccess(state, [networkId]) || {}),
          [tokenAddress]: {
            [NAME]: name,
            [SYMBOL]: symbol,
            [DECIMALS]: decimals,
            [EXCHANGE_ADDRESS]: exchangeAddress,
            [REDEEM_MAX_NUM]: redeemMaxNum,
            [REDEEM_MIN_NUM]: redeemMinNum,
            [FEE]: fee,
            [MAXFEE]: maxFee,
            [MINFEE]: minFee,
            [ISSWITCH]: isSwitch,
            [ISDEPOSIT]: isDeposit,
            [ISREDEEM]: isRedeem,
            [DEPOSIT_ADDRESS]: depositAddress,
            [DEPOSIT_TYPE]: depositType,
            [DEPOSIT_MAX_NUM]: depositMaxNum,
            [DEPOSIT_MIN_NUM]: depositMinNum,
            [EXTENDOBJ]: extendObj,
          }
        }
      }
    }
    default: {
      throw Error(`Unexpected action type in TokensContext reducer: '${type}'.`)
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_TOKENS_CONTEXT)

  const update = useCallback((networkId, tokenAddress, name, symbol, decimals, exchangeAddress, redeemMaxNum, redeemMinNum, fee, maxFee, minFee, isSwitch, isDeposit, isRedeem, depositAddress, depositType, depositMaxNum, depositMinNum, extendObj) => {
    dispatch({ type: UPDATE, payload: { networkId, tokenAddress, name, symbol, decimals, exchangeAddress, redeemMaxNum, redeemMinNum, fee, maxFee, minFee, isSwitch, isDeposit, isRedeem, depositAddress, depositType, depositMaxNum, depositMinNum, extendObj } })
  }, [])

  return (
    <TokensContext.Provider value={useMemo(() => [state, { update }], [state, update])}>
      {children}
    </TokensContext.Provider>
  )
}

export function useTokenDetails(tokenAddress) {
  const { library, chainId } = useWeb3React()

  const [state, { update }] = useTokensContext()
  const allTokensInNetwork = { ...COIN, ...(safeAccess(state, [chainId]) || {}) }
  // console.log(allTokensInNetwork)
  const {
    [NAME]: name,
    [SYMBOL]: symbol,
    [DECIMALS]: decimals,
    [EXCHANGE_ADDRESS]: exchangeAddress,
    [REDEEM_MAX_NUM]:redeemMaxNum,
    [REDEEM_MIN_NUM]:redeemMinNum,
    [FEE]:fee,
    [MAXFEE]: maxFee,
    [MINFEE]: minFee,
    [ISSWITCH]:isSwitch,
    [ISDEPOSIT]:isDeposit,
    [ISREDEEM]:isRedeem,
    [DEPOSIT_ADDRESS]: depositAddress,
    [DEPOSIT_TYPE]: depositType,
    [DEPOSIT_MAX_NUM]: depositMaxNum,
    [DEPOSIT_MIN_NUM]: depositMinNum,
    [EXTENDOBJ]: extendObj,
  } =
    safeAccess(allTokensInNetwork, [tokenAddress]) || {}

  useEffect(() => {
    if (
      isAddress(tokenAddress) &&
      (name === undefined || symbol === undefined || decimals === undefined || exchangeAddress === undefined) &&
      (chainId || chainId === 0) &&
      library
    ) {
      let stale = false
      const namePromise = getTokenName(tokenAddress, library).catch(() => null)
      const symbolPromise = getTokenSymbol(tokenAddress, library).catch(() => null)
      const decimalsPromise = getTokenDecimals(tokenAddress, library).catch(() => null)
      const exchangeAddressPromise = getTokenExchangeAddressFromFactory(tokenAddress, chainId, library).catch(
        () => null
      )
      Promise.all([namePromise, symbolPromise, decimalsPromise, exchangeAddressPromise]).then(
        ([resolvedName, resolvedSymbol, resolvedDecimals, resolvedExchangeAddress]) => {
          if (!stale) {
            update(chainId, tokenAddress, resolvedName, resolvedSymbol, resolvedDecimals, resolvedExchangeAddress)
          }
        }
      )
      return () => {
        stale = true
      }
    }
  }, [tokenAddress, name, symbol, decimals, exchangeAddress, chainId, library, update])
  // console.log(chainId)
  // console.log(isSwitch)
  return { name, symbol, decimals, exchangeAddress, redeemMaxNum, redeemMinNum, fee, maxFee, minFee, isSwitch, isDeposit, isRedeem, depositAddress, depositType, depositMaxNum, depositMinNum, extendObj }
}

export function useAllTokenDetails() {
  const { chainId } = useWeb3React()

  const [state] = useTokensContext()
  return useMemo(() => ({ ...COIN, ...(safeAccess(state, [chainId]) || {}) }), [state, chainId])
}
