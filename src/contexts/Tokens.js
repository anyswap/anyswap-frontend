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
    [EXCHANGE_ADDRESS]: null
  }
}

export const INITIAL_TOKENS_CONTEXT = {
  1: {
    
  },
  4: {
    
  },
  36688: {
    'mBTC': { // mBTC
      [NAME]: 'SMPC Bitcoin',
      [SYMBOL]: 'mBTC',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: 'mBTC'
    },
    'ANY': { // ANY
      [NAME]: 'Anyswap',
      [SYMBOL]: 'ANY',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: 'ANY'
    },
    'mETH': { // mETH
      [NAME]: 'SMPC Ethereum',
      [SYMBOL]: 'mETH',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: 'mETH'
    },
    'mUSDT': { // mUSDT
      [NAME]: 'SMPC Tether',
      [SYMBOL]: 'mUSDT',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: 'mUSDT'
    }
  },
  46688: {
    '0xeaeaeb2cf9921a084ef528f43e9e121e8291a947': { // mBTC
      [NAME]: 'SMPC Bitcoin',
      [SYMBOL]: 'mBTC',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x0e711afa0da54bc718c777ae404386d3ad4774bc'
    },
    '0xC20b5E92E1ce63Af6FE537491f75C19016ea5fb4': { // ANY
      [NAME]: 'Anyswap',
      [SYMBOL]: 'ANY',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x4dee5f0705ff478b452419375610155b5873ef5b'
    },
    '0xeCd0fad9381b19feB74428Ab6a732BAA293CdC88': { // mETH
      [NAME]: 'SMPC Ethereum',
      [SYMBOL]: 'mETH',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x9ab217c352b4122128d0024219f06e3503a8c7eb'
    },
    '0x19543338473caaa6f404dbe540bb787f389d5462': { // mUSDT
      [NAME]: 'SMPC Tether',
      [SYMBOL]: 'mUSDT',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0x763858d914ebc7936977ab7c93b7331cea77b37c'
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
      const { networkId, tokenAddress, name, symbol, decimals, exchangeAddress } = payload
      return {
        ...state,
        [networkId]: {
          ...(safeAccess(state, [networkId]) || {}),
          [tokenAddress]: {
            [NAME]: name,
            [SYMBOL]: symbol,
            [DECIMALS]: decimals,
            [EXCHANGE_ADDRESS]: exchangeAddress
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

  const update = useCallback((networkId, tokenAddress, name, symbol, decimals, exchangeAddress) => {
    dispatch({ type: UPDATE, payload: { networkId, tokenAddress, name, symbol, decimals, exchangeAddress } })
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
  const { [NAME]: name, [SYMBOL]: symbol, [DECIMALS]: decimals, [EXCHANGE_ADDRESS]: exchangeAddress } =
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

  return { name, symbol, decimals, exchangeAddress }
}

export function useAllTokenDetails() {
  const { chainId } = useWeb3React()

  const [state] = useTokensContext()

  // return useMemo(() => ({ ...FSN, ...(safeAccess(state, [chainId]) || {}) }), [state, chainId])
  return useMemo(() => ({ ...FSN, ...(safeAccess(state, [chainId]) || {}) }), [state, chainId])
}
