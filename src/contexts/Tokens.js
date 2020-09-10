import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react'
import config from '../config'
import { useWeb3React } from '../hooks'
import {
  isAddress,
  getTokenName,
  getTokenSymbol,
  getTokenDecimals,
  getTokenExchangeAddressFromFactory,
  safeAccess
} from '../utils'

const NAME = 'name'  // 名称
const SYMBOL = 'symbol'  // 符号
const DECIMALS = 'decimals'  // 小数位
const EXCHANGE_ADDRESS = 'exchangeAddress'  // 交易所地址
const REDEEM_MAX_NUM = 'redeemMaxNum'  // 最大提现额
const REDEEM_MIN_NUM = 'redeemMinNum'  // 最小提现额
const FEE = 'fee'  // 手续费
const MAXFEE = 'maxFee'  // 最大手续费
const MINFEE = 'minFee'  // 最小手续费
const ISSWITCH = 'isSwitch'  // 是否开启此币种 0：关闭；1开启
const ISDEPOSIT = 'isDeposit'  // 是否开启充值 0：关闭；1开启
const ISREDEEM = 'isRedeem'  // 是否开启提现 0：关闭；1开启
const DEPOSIT_ADDRESS = 'depositAddress'  // 充值地址
const DEPOSIT_TYPE = 'depositType'  // 充值类型 0：btc； 1：erc20
const DEPOSIT_MAX_NUM = 'depositMaxNum'  // 最大充值额
const DEPOSIT_MIN_NUM = 'depositMinNum'  // 最小充值额



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
    [ISSWITCH]: 1,
    [ISDEPOSIT]: 0,
    [ISREDEEM]: 0,
    [DEPOSIT_ADDRESS]: '',
    [DEPOSIT_TYPE]: '',
    [DEPOSIT_MAX_NUM]: 0,
    [DEPOSIT_MIN_NUM]: 0,
  }
}

const ANY_TOKEN = config.any.token

export const INITIAL_TOKENS_CONTEXT = {
  97: {
    [ANY_TOKEN]: { // ANY
      [NAME]: 'Anyswap',
      [SYMBOL]: 'ANY',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x72b60cae10b8b921c648c04acd66104f25de7994',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: 1,
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
    },
    '0x29D827A5a08D50bD6f64bA135bCFE2C5d1108711': { // USDT
      [NAME]: 'ANY Tether',
      [SYMBOL]: config.prefix + 'USDT',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0xb116c4df54e5928ca0dca2dba712b875e114c5ba',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 5,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: 1,
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x94e840798e333cB1974E086B58c10C374E966bc7',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100000,
      [DEPOSIT_MIN_NUM]: 0.5,
    },
    '0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867': { // DAI
      [NAME]: 'ANY Dai',
      [SYMBOL]: config.prefix + 'DAI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x4a5bbc9c05ba36409bf2c7b06ac6c6baa1da3969',
      [REDEEM_MAX_NUM]: 1000,
      [REDEEM_MIN_NUM]: 0.05,
      [FEE]: 0.001,
      [MAXFEE]: 0.1,
      [MINFEE]: 0.005,
      [ISSWITCH]: 1,
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xCc6140a667980fbA8bF650b4aEC4f6e7Aff3a37F',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 1000,
      [DEPOSIT_MIN_NUM]: 0.01,
    },
    '0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378': { // ETH
      [NAME]: 'ANY Ethereum',
      [SYMBOL]: config.prefix + 'ETH',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x7a7cffa0927d3c7f1cf779d6bd19e98a892b87e3',
      [REDEEM_MAX_NUM]: 1000,
      [REDEEM_MIN_NUM]: 0.05,
      [FEE]: 0.001,
      [MAXFEE]: 0.1,
      [MINFEE]: 0.005,
      [ISSWITCH]: 1,
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xCc6140a667980fbA8bF650b4aEC4f6e7Aff3a37F',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 1000,
      [DEPOSIT_MIN_NUM]: 0.01,
    },
    'BTC': { // BTC
      [NAME]: 'ANY Bitcoin',
      [SYMBOL]: config.prefix + 'BTC',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: config.prefix + 'BTC',
      [REDEEM_MAX_NUM]: 100,
      [REDEEM_MIN_NUM]: 0.00001,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: 0,
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
    },
    'XRP': { // XRP
      [NAME]: 'ANY XRP',
      [SYMBOL]: config.prefix + 'XRP',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: 'XRP',
      [REDEEM_MAX_NUM]: 100,
      [REDEEM_MIN_NUM]: 0.00001,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: 0,
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
    },
    'LTC': { // LTC
      [NAME]: 'ANY Litecoin',
      [SYMBOL]: config.prefix + 'LTC',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: 'LTC',
      [REDEEM_MAX_NUM]: 100,
      [REDEEM_MIN_NUM]: 0.00001,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: 0,
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
    }
  },
  32659: {
    [ANY_TOKEN]: { // ANY
      [NAME]: 'Anyswap',
      [SYMBOL]: 'ANY',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x049ddc3cd20ac7a2f6c867680f7e21de70aca9c3',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: 1,
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
    },
    '0xc7c64ac6d46be3d6ea318ec6276bb55291f8e496': { // USDT
      [NAME]: 'ANY Tether',
      [SYMBOL]: config.prefix + 'USDT',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0x78917333bec47cee1022b31a136d31feff90d6fb',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 5,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: 1,
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x94e840798e333cB1974E086B58c10C374E966bc7',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100000,
      [DEPOSIT_MIN_NUM]: 0.5,
    },
    '0x5e12290c7e7eda58d092632a53bbbc717996c732': { // ETH
      [NAME]: 'ANY Ethereum',
      [SYMBOL]: config.prefix + 'ETH',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x9ced18b0f8d7602f50d0061e6487021ec8114a1d',
      [REDEEM_MAX_NUM]: 1000,
      [REDEEM_MIN_NUM]: 0.05,
      [FEE]: 0.001,
      [MAXFEE]: 0.1,
      [MINFEE]: 0.005,
      [ISSWITCH]: 1,
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xCc6140a667980fbA8bF650b4aEC4f6e7Aff3a37F',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 1000,
      [DEPOSIT_MIN_NUM]: 0.01,
    },
    'BTC': { // BTC
      [NAME]: 'ANY Bitcoin',
      [SYMBOL]: config.prefix + 'BTC',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: config.prefix + 'BTC',
      [REDEEM_MAX_NUM]: 100,
      [REDEEM_MIN_NUM]: 0.00001,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: 0,
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
    },
    'XRP': { // XRP
      [NAME]: 'ANY XRP',
      [SYMBOL]: config.prefix + 'XRP',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: 'XRP',
      [REDEEM_MAX_NUM]: 100,
      [REDEEM_MIN_NUM]: 0.00001,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: 0,
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
    },
    'LTC': { // LTC
      [NAME]: 'ANY Litecoin',
      [SYMBOL]: config.prefix + 'LTC',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: 'LTC',
      [REDEEM_MAX_NUM]: 100,
      [REDEEM_MIN_NUM]: 0.00001,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: 0,
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
    }
  },
  46688: {
    [ANY_TOKEN]: { // ANY
      [NAME]: 'Anyswap',
      [SYMBOL]: 'ANY',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x4dee5f0705ff478b452419375610155b5873ef5b',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: 1,
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
    },
    '0x3368e6012066bc08ece5f2b2582c883cca1424e5': { // USDT
      [NAME]: 'ANY Tether',
      [SYMBOL]: 'aUSDT',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0xe7fcfac393216739267f46b35b81e2e0fcea3448',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 10,
      [ISSWITCH]: 1,
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x06CAdD991f2EC8e156c0Ae66116C5604fdCdC5b5',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100000,
      [DEPOSIT_MIN_NUM]: 0.5,
    },
    '0xb22ab4fb2fed7564915c2356d15ba9bab51953a2': { // ETH
      [NAME]: 'ANY Ethereum',
      [SYMBOL]: 'aETH',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xd7c2a32e474da50dd117670edb95fa4109670880',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 0.1,
      [MINFEE]: 0.005,
      [ISSWITCH]: 1,
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x06CAdD991f2EC8e156c0Ae66116C5604fdCdC5b5',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
    },
    '0x9e51f12fe751649d0f1323889f836055fbb67f04': { // BTC
      [NAME]: 'ANY Bitcoin',
      [SYMBOL]: 'aBTC',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '',
      [REDEEM_MAX_NUM]: 100,
      [REDEEM_MIN_NUM]: 0.00001,
      [FEE]: 0.001,
      [MAXFEE]: 0.01,
      [MINFEE]: 0.000005,
      [ISSWITCH]: 1,
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: 'mxua7SYU3YoUot61jMC8z26Jsdf5M76sAP',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 1000,
      [DEPOSIT_MIN_NUM]: 0.00001,
    },
    'XRP': { // XRP
      [NAME]: 'ANY XRP',
      [SYMBOL]: 'aXRP',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: config.prefix + 'XRP',
      [REDEEM_MAX_NUM]: 100,
      [REDEEM_MIN_NUM]: 0.00001,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: 0,
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
    },
    'LTC': { // LTC
      [NAME]: 'ANY Litecoin',
      [SYMBOL]: 'aLTC',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: config.prefix + 'LTC',
      [REDEEM_MAX_NUM]: 100,
      [REDEEM_MIN_NUM]: 0.00001,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: 0,
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
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
      const { networkId, tokenAddress, name, symbol, decimals, exchangeAddress, redeemMaxNum, redeemMinNum, fee, maxFee, minFee, isSwitch, isDeposit, isRedeem, depositAddress, depositType, depositMaxNum, depositMinNum } = payload
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

  const update = useCallback((networkId, tokenAddress, name, symbol, decimals, exchangeAddress, redeemMaxNum, redeemMinNum, fee, maxFee, minFee, isSwitch, isDeposit, isRedeem, depositAddress, depositType, depositMaxNum, depositMinNum) => {
    dispatch({ type: UPDATE, payload: { networkId, tokenAddress, name, symbol, decimals, exchangeAddress, redeemMaxNum, redeemMinNum, fee, maxFee, minFee, isSwitch, isDeposit, isRedeem, depositAddress, depositType, depositMaxNum, depositMinNum } })
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
  return { name, symbol, decimals, exchangeAddress, redeemMaxNum, redeemMinNum, fee, maxFee, minFee, isSwitch, isDeposit, isRedeem, depositAddress, depositType, depositMaxNum, depositMinNum }
}

export function useAllTokenDetails() {
  const { chainId } = useWeb3React()

  const [state] = useTokensContext()
  return useMemo(() => ({ ...COIN, ...(safeAccess(state, [chainId]) || {}) }), [state, chainId])
}
