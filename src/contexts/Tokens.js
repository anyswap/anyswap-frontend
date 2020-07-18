import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react'

import { useWeb3React } from '../hooks'
import {
  isAddress,
  getTokenName,
  getTokenSymbol,
  getTokenDecimals,
  getTokenExchangeAddressFromFactory,
  safeAccess
} from '../utils'

const NAME = 'name'
const SYMBOL = 'symbol'
const DECIMALS = 'decimals'
const EXCHANGE_ADDRESS = 'exchangeAddress'
const MAXNUM = 'maxNum'
const MINNUM = 'minNum'
const FEE = 'fee'
const ISSWITCH = 'isSwitch'
const ISDEPOSIT = 'isDeposit'
const ISREDEEM = 'isRedeem'


const UPDATE = 'UPDATE'

// const FSN = {
//   FSN: {
//     [NAME]: 'Fusion',
//     [SYMBOL]: 'FSN',
//     [DECIMALS]: 18,
//     [EXCHANGE_ADDRESS]: null
//   }
// }

const FSN = {
  FSN: {
    [NAME]: 'Fusion',
    [SYMBOL]: 'FSN',
    [DECIMALS]: 18,
    [EXCHANGE_ADDRESS]: null,
    [MAXNUM]: null,
    [MINNUM]: null,
    [FEE]: null,
    [ISSWITCH]: 1,
    [ISDEPOSIT]: 0,
    [ISREDEEM]: 0,
  }
}


export const INITIAL_TOKENS_CONTEXT = {
  32659: {
    'ANY': { // ANY
      [NAME]: 'Anyswap',
      [SYMBOL]: 'ANY',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: 'ANY',
      [MAXNUM]: 1000000,
      [MINNUM]: 0.1,
      [FEE]: 0.001,
      [ISSWITCH]: 1,
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
    },
    'mBTC': { // mBTC
      [NAME]: 'SMPC Bitcoin',
      [SYMBOL]: 'mBTC',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: 'mBTC',
      [MAXNUM]: 100,
      [MINNUM]: 0.00001,
      [FEE]: 0.001,
      [ISSWITCH]: 0,
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
    },
    'mETH': { // mETH
      [NAME]: 'SMPC Ethereum',
      [SYMBOL]: 'mETH',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: 'mETH',
      [MAXNUM]: 1000000,
      [MINNUM]: 0.1,
      [FEE]: 0.001,
      [ISSWITCH]: 0,
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
    },
    'mUSDT': { // mUSDT
      [NAME]: 'SMPC Tether',
      [SYMBOL]: 'mUSDT',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: 'mUSDT',
      [MAXNUM]: 100,
      [MINNUM]: 0.00001,
      [FEE]: 0.001,
      [ISSWITCH]: 0,
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
    },
    'XRP': { // mXRP
      [NAME]: 'SMPC XRP',
      [SYMBOL]: 'mXRP',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: 'XRP',
      [MAXNUM]: 100,
      [MINNUM]: 0.00001,
      [FEE]: 0.001,
      [ISSWITCH]: 0,
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
    },
    'LTC': { // mLTC
      [NAME]: 'SMPC Litecoin',
      [SYMBOL]: 'mLTC',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: 'LTC',
      [MAXNUM]: 100,
      [MINNUM]: 0.00001,
      [FEE]: 0.001,
      [ISSWITCH]: 0,
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
    }
  },
  46688: {
    '0xC20b5E92E1ce63Af6FE537491f75C19016ea5fb4': { // ANY
      [NAME]: 'Anyswap',
      [SYMBOL]: 'ANY',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x4dee5f0705ff478b452419375610155b5873ef5b',
      [MAXNUM]: 1000000,
      [MINNUM]: 0.1,
      [FEE]: 0.001,
      [ISSWITCH]: 1,
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
    },
    '0xeaeaeb2cf9921a084ef528f43e9e121e8291a947': { // mBTC
      [NAME]: 'SMPC Bitcoin',
      [SYMBOL]: 'mBTC',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x0e711afa0da54bc718c777ae404386d3ad4774bc',
      [MAXNUM]: 100,
      [MINNUM]: 0.00001,
      [FEE]: 0.001,
      [ISSWITCH]: 1,
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
    },
    '0xeCd0fad9381b19feB74428Ab6a732BAA293CdC88': { // mETH
      [NAME]: 'SMPC Ethereum',
      [SYMBOL]: 'mETH',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x9ab217c352b4122128d0024219f06e3503a8c7eb',
      [MAXNUM]: 1000000,
      [MINNUM]: 0.1,
      [FEE]: 0.001,
      [ISSWITCH]: 1,
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
    },
    '0x19543338473caaa6f404dbe540bb787f389d5462': { // mUSDT
      [NAME]: 'SMPC Tether',
      [SYMBOL]: 'mUSDT',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0x763858d914ebc7936977ab7c93b7331cea77b37c',
      [MAXNUM]: 100,
      [MINNUM]: 0.00001,
      [FEE]: 0.001,
      [ISSWITCH]: 1,
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
    },
    'XRP': { // mXRP
      [NAME]: 'SMPC XRP',
      [SYMBOL]: 'mXRP',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: 'mXRP',
      [MAXNUM]: 100,
      [MINNUM]: 0.00001,
      [FEE]: 0.001,
      [ISSWITCH]: 0,
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
    },
    'LTC': { // mLTC
      [NAME]: 'SMPC Litecoin',
      [SYMBOL]: 'mLTC',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: 'mLTC',
      [MAXNUM]: 100,
      [MINNUM]: 0.00001,
      [FEE]: 0.001,
      [ISSWITCH]: 0,
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
    }
  }
}

const TokensContext = createContext()

function useTokensContext() {
  return useContext(TokensContext)
}

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE: {
      const { networkId, tokenAddress, name, symbol, decimals, exchangeAddress, maxNum, minNum, fee, isSwitch, isDeposit, isRedeem } = payload
      return {
        ...state,
        [networkId]: {
          ...(safeAccess(state, [networkId]) || {}),
          [tokenAddress]: {
            [NAME]: name,
            [SYMBOL]: symbol,
            [DECIMALS]: decimals,
            [EXCHANGE_ADDRESS]: exchangeAddress,
            [MAXNUM]: maxNum,
            [MINNUM]: minNum,
            [FEE]: fee,
            [ISSWITCH]: isSwitch,
            [ISDEPOSIT]: isDeposit,
            [ISREDEEM]: isRedeem,
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

  const update = useCallback((networkId, tokenAddress, name, symbol, decimals, exchangeAddress, maxNum, minNum, fee, isSwitch, isDeposit, isRedeem) => {
    dispatch({ type: UPDATE, payload: { networkId, tokenAddress, name, symbol, decimals, exchangeAddress, maxNum, minNum, fee, isSwitch, isDeposit, isRedeem } })
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
  // const allTokensInNetwork = { ...FSN, ...(safeAccess(state, [chainId]) || {}) }
  const allTokensInNetwork = { ...FSN, ...(safeAccess(state, [chainId]) || {}) }
  const { [NAME]: name, [SYMBOL]: symbol, [DECIMALS]: decimals, [EXCHANGE_ADDRESS]: exchangeAddress, [MAXNUM]:maxNum, [MINNUM]:minNum, [FEE]:fee, [ISSWITCH]:isSwitch, [ISDEPOSIT]:isDeposit, [ISREDEEM]:isRedeem } =
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

  return { name, symbol, decimals, exchangeAddress, maxNum, minNum, fee, isSwitch, isDeposit, isRedeem }
}

export function useAllTokenDetails() {
  const { chainId } = useWeb3React()

  const [state] = useTokensContext()
  // return useMemo(() => ({ ...FSN, ...(safeAccess(state, [chainId]) || {}) }), [state, chainId])
  return useMemo(() => ({ ...FSN, ...(safeAccess(state, [chainId]) || {}) }), [state, chainId])
}
