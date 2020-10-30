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
const EXTENDOBJ = 'extendObj'  // 扩展 例如：{FSN: { type: 1, isSwitch: 1 }, ETH: { type: 2, isSwitch: 1}}，FSN表示当前网络 type表示网chainid,isSwitch表示是否开启



const UPDATE = 'UPDATE'

function dirSwitch (type) {
  if (config.reverseSwitch) {
    if (type) return 0
    else return 1
  } else {
    if (type) return 1
    else return 0
  }
}

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
    [ISSWITCH]: dirSwitch(0),
    [ISDEPOSIT]: 0,
    [ISREDEEM]: 0,
    [DEPOSIT_ADDRESS]: '',
    [DEPOSIT_TYPE]: '',
    [DEPOSIT_MAX_NUM]: 0,
    [DEPOSIT_MIN_NUM]: 0,
    [EXTENDOBJ]: {},
  }
}

const ANY_TOKEN = config.any && config.any.token ? config.any.token : 'ANY'

export const INITIAL_TOKENS_CONTEXT = {
  56: {
    '0xf68c9df95a18b2a5a5fa1124d79eeeffbad0b6fa': { // ANY
      [NAME]: 'Anyswap' + config.suffix,
      [SYMBOL]: 'ANY',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x095418A82BC2439703b69fbE1210824F2247D77c',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x94e840798e333cB1974E086B58c10C374E966bc7',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {
        BRIDGE: [
          { type: 32659, isSwitch: 1 }
        ],
        VERSION: 'V1'
      },
    },
    '0x55d398326f99059ff775485246999027b3197955': { // USDT
      [NAME]: 'Tether' + config.suffix,
      [SYMBOL]: 'USDT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x83034714666b0eb2209aafc1b1cbb2ab9c6100db',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 5,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0x3af577f9d8c86ae8dbcbf51fe9836c9df825759d': { // LINK 6
      [NAME]: 'Chainlink' + config.suffix,
      [SYMBOL]: 'anyLINK',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x7868b674fCeB31c8d29f1606eA60D51cc442188B',
      [REDEEM_MAX_NUM]: 20000,
      [REDEEM_MIN_NUM]: 2,
      [FEE]: 0.001,
      [MAXFEE]: 5,
      [MINFEE]: 0.5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x13B432914A996b0A48695dF9B2d701edA45FF264',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 20000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x1dc56f2705ff2983f31fb5964cc3e19749a7cba7': { // DAI 23
      [NAME]: 'Dai' + config.suffix,
      [SYMBOL]: 'anyDAI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x76BB67676B2c9a6f366Aa517b806ed0Fa317Aa46',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x13B432914A996b0A48695dF9B2d701edA45FF264',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xe9e7cea3dedca5984780bafc599bd69add087d56': { // BUSD 28
      [NAME]: 'BUSD' + config.suffix,
      [SYMBOL]: 'BUSD',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x34358Ff75D78652F1797ebd73E8f7aFA92DaB501',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0x99c5a2fcc97b59fe6d0b56e21e72b002f644123f': { // UNI
      [NAME]: 'Uniswap' + config.suffix,
      [SYMBOL]: 'anyUNI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x2f9755c371C7f23AEcdF1C136D233b41cE3E0D55',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xCc6140a667980fbA8bF650b4aEC4f6e7Aff3a37F',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V1'
      }
    },
    '0x2ede13880e11b19b7d6113a86ac7ac84ac651042': { // COMP 36
      [NAME]: 'Compound' + config.suffix,
      [SYMBOL]: 'anyCOMP',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x16cad2ca4FE9b42B9dE19F4DAd60003124472f30',
      [REDEEM_MAX_NUM]: 2000,
      [REDEEM_MIN_NUM]: 0.2,
      [FEE]: 0.001,
      [MAXFEE]: 0.5,
      [MINFEE]: 0.05,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x13B432914A996b0A48695dF9B2d701edA45FF264',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 2000,
      [DEPOSIT_MIN_NUM]: 0.05,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xe6358c1d7a91915abba46d9855bd6418898fc091': { // OMG 37
      [NAME]: 'OMG' + config.suffix,
      [SYMBOL]: 'anyOMG',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xD5556F7F0088915B651F6A9d68Bb0670c7D80554',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 8,
      [FEE]: 0.001,
      [MAXFEE]: 20,
      [MINFEE]: 2,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x13B432914A996b0A48695dF9B2d701edA45FF264',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x9883ae441105f815b472517389b979f031b5c87e': { // YFI 40
      [NAME]: 'yearn.finance' + config.suffix,
      [SYMBOL]: 'anyYFI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xB2A16966fD1aA09D4F50AB371873f17ab4A86F42',
      [REDEEM_MAX_NUM]: 20,
      [REDEEM_MIN_NUM]: 0.002,
      [FEE]: 0.001,
      [MAXFEE]: 0.01,
      [MINFEE]: 0.001,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x13B432914A996b0A48695dF9B2d701edA45FF264',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 20,
      [DEPOSIT_MIN_NUM]: 0.0005,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x4b0f1812e5df2a09796481ff14017e6005508003': { // TWT
      [NAME]: 'Trust Wallet' + config.suffix,
      [SYMBOL]: 'TWT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x7320091690010162E91A098863bD530fEEdC3522',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82': { // Cake
      [NAME]: 'PancakeSwap' + config.suffix,
      [SYMBOL]: 'Cake',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x4D00CC3B309170888AE2bc43859f4c4dc5143711',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0xd4cb328a82bdf5f03eb737f37fa6b370aef3e888': { // CREAM
      [NAME]: 'Cream' + config.suffix,
      [SYMBOL]: 'CREAM',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xe29331A26881FFc6127c8B22dB19Ea6e960943f1',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0xae9269f27437f0fcbc232d39ec814844a51d6b8f': { // BURGER
      [NAME]: 'Burger' + config.suffix,
      [SYMBOL]: config.prefix + 'BURGER',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x2296c4a9186b823db1612e831808536ed451cbbe',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 5,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0xE4Ae305ebE1AbE663f261Bc00534067C80ad677C': { // SPARTAN
      [NAME]: 'SPARTAN' + config.suffix,
      [SYMBOL]: config.prefix + 'SPARTAN',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xd1D0C2f4291F7002E1591d2a87975f0701a3fa2C',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 5,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0x658A109C5900BC6d2357c87549B651670E5b0539': { // FOR
      [NAME]: 'Force' + config.suffix,
      [SYMBOL]: 'FOR',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x1d396c3fC33A44e106665fc45cA39B3042120241',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0xe02df9e3e622debdd69fb838bb799e3f168902c5': { // BAKE
      [NAME]: 'Bakery' + config.suffix,
      [SYMBOL]: 'BAKE',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x90C8EA8ec7710034274868971C4e27edE33d9c10',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0xacd6b5f76db153fb45eae6d5be5bdbd45d1b2a8c': { // PEACH
      [NAME]: 'Peach' + config.suffix,
      [SYMBOL]: config.prefix + 'PEACH',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xdcb18e3230605a4c5ee6fb86031eefa8ecd63430',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 5,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0x8E9f5173e16Ff93F81579d73A7f9723324d6B6aF': { // MILK
      [NAME]: 'Milk' + config.suffix,
      [SYMBOL]: config.prefix + 'MILK',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xbd1f974bc2730e9620d91924993d30c2f96983b8',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 5,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0x40929fb2008c830731a3d972950bc13f70161c75': { // TUNA
      [NAME]: 'Tuna' + config.suffix,
      [SYMBOL]: 'TUNA',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x4F171A4aEcbfcEc6467464DA7401F88dED8C891C',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0xaf53d56ff99f1322515e54fdde93ff8b3b7dafd5': { // PROM
      [NAME]: 'Prometeus' + config.suffix,
      [SYMBOL]: 'PROM',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xfeBc57bBA705C6142Cc4586F1aC6A96ce88047Be',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
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
      [ISSWITCH]: dirSwitch(1),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    },
    'FSN': { // FSN
      [NAME]: 'Fusion',
      [SYMBOL]: 'FSN',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '',
      [REDEEM_MAX_NUM]: 1000,
      [REDEEM_MIN_NUM]: 0.05,
      [FEE]: 0.001,
      [MAXFEE]: 0.1,
      [MINFEE]: 0.005,
      [ISSWITCH]: dirSwitch(1),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 1000,
      [DEPOSIT_MIN_NUM]: 0.01,
      [EXTENDOBJ]: {},
    },
    'ETH': { // ETH
      [NAME]: 'ANY Ethereum',
      [SYMBOL]: config.prefix + 'ETH',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '',
      [REDEEM_MAX_NUM]: 1000,
      [REDEEM_MIN_NUM]: 0.05,
      [FEE]: 0.001,
      [MAXFEE]: 0.1,
      [MINFEE]: 0.005,
      [ISSWITCH]: dirSwitch(1),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 1000,
      [DEPOSIT_MIN_NUM]: 0.01,
      [EXTENDOBJ]: {},
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
      [ISSWITCH]: dirSwitch(1),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
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
      [ISSWITCH]: dirSwitch(1),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    }
  },
  97: {
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
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x94e840798e333cB1974E086B58c10C374E966bc7',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0x4ce47351aeafbd81f9888187288996fe0322ffa2': { // ANY
      [NAME]: 'Anyswap',
      [SYMBOL]: 'ANY',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x92fa2adedc403f49a8c50493e5cb21a72dfa3ca2',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x609F57C29faDDc455a966F6fadD958c681893Aff',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    },
    '0xa5a3c93776ba2e1a78c79e88a2cb5abab2a0097f': { // FOOD
      [NAME]: 'ANY FoodToken',
      [SYMBOL]: config.prefix + 'FOOD',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x11f836dcdc61bf92f38f98565dcb6573337d6a5f',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 5,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x94e840798e333cB1974E086B58c10C374E966bc7',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
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
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xCc6140a667980fbA8bF650b4aEC4f6e7Aff3a37F',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 1000,
      [DEPOSIT_MIN_NUM]: 0.01,
      [EXTENDOBJ]: {},
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
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xCc6140a667980fbA8bF650b4aEC4f6e7Aff3a37F',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 1000,
      [DEPOSIT_MIN_NUM]: 0.01,
      [EXTENDOBJ]: {},
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
      [ISSWITCH]: dirSwitch(1),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
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
      [ISSWITCH]: dirSwitch(1),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
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
      [ISSWITCH]: dirSwitch(1),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
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
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    },
    '0x445166c4854836292a5af7e3f165a3b8b4eedf97': { // BTC
      [NAME]: 'ANY Bitcoin',
      [SYMBOL]: config.prefix + 'BTC',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x361450E73d63031feBE35Ca9fD772F3FD53E1013',
      [REDEEM_MAX_NUM]: 20,
      [REDEEM_MIN_NUM]: 0.002,
      [FEE]: 0.001,
      [MAXFEE]: 0.01,
      [MINFEE]: 0.001,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '1HvrEMgxsYadWGhijpfygKSqPZ5p418g45',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 20,
      [DEPOSIT_MIN_NUM]: 0.0005,
      [EXTENDOBJ]: {
        VERSION: 'V1'
      },
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
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x94e840798e333cB1974E086B58c10C374E966bc7',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V1'
      }
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
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xCc6140a667980fbA8bF650b4aEC4f6e7Aff3a37F',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 1000,
      [DEPOSIT_MIN_NUM]: 0.01,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V1'
      }
    },
    '0x871501a8d698169d1fe4c1af3c7e011959f484a6': { // LINK 6
      [NAME]: 'ANY Chainlink',
      [SYMBOL]: config.prefix + 'LINK',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x05E63B49F0046dbaFeeCe7180Ca1d447706AEff3',
      [REDEEM_MAX_NUM]: 20000,
      [REDEEM_MIN_NUM]: 2,
      [FEE]: 0.001,
      [MAXFEE]: 5,
      [MINFEE]: 0.5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x46290B0c3A234E3d538050d8F34421797532A827',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 20000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x480327ccb4e3fd906212868e2f4b6dfa564aabca': { // DAI 23
      [NAME]: 'ANY Dai',
      [SYMBOL]: config.prefix + 'DAI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xD21097E7566dd64b86cB23eE98aE66d2734e229F',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x46290B0c3A234E3d538050d8F34421797532A827',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x6780bc1357dc0b6aa39224f53dc8aeceb093b6ff': { // UNI 34
      [NAME]: 'ANY Uniswap',
      [SYMBOL]: config.prefix + 'UNI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x2F8cC99f9dea45306ec91612c67c2de36b825f9A',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x94e840798e333cB1974E086B58c10C374E966bc7',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V1'
      }
    },
    '0xc0d7857b10551f784c80942b7e8b5abfa373d802': { // COMP 36
      [NAME]: 'ANY Compound',
      [SYMBOL]: config.prefix + 'COMP',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x077DE35f802FD5f062036Ff47182Cb73f537b215',
      [REDEEM_MAX_NUM]: 2000,
      [REDEEM_MIN_NUM]: 0.2,
      [FEE]: 0.001,
      [MAXFEE]: 0.5,
      [MINFEE]: 0.05,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x46290B0c3A234E3d538050d8F34421797532A827',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 2000,
      [DEPOSIT_MIN_NUM]: 0.05,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x709abf1d66b1758676940a3ee995a39056a66faf': { // OMG 37
      [NAME]: 'ANY OMG',
      [SYMBOL]: config.prefix + 'OMG',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x5c98B4a17dc92340eA6340719137cBc91c727928',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 8,
      [FEE]: 0.001,
      [MAXFEE]: 20,
      [MINFEE]: 2,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x46290B0c3A234E3d538050d8F34421797532A827',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x041f279c67faef37544014d7247824c0945098a8': { // YFI 40
      [NAME]: 'ANY yearn.finance',
      [SYMBOL]: config.prefix + 'YFI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xca3AeA410F70bEd55c992B6c418C23f86723D601',
      [REDEEM_MAX_NUM]: 20,
      [REDEEM_MIN_NUM]: 0.002,
      [FEE]: 0.001,
      [MAXFEE]: 0.01,
      [MINFEE]: 0.001,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x46290B0c3A234E3d538050d8F34421797532A827',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 20,
      [DEPOSIT_MIN_NUM]: 0.0005,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x20dd2f2bfa4ce3eaec5f57629583dad8a325872a': { // FUSE
      [NAME]: 'Fusionite',
      [SYMBOL]: 'FUSE',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xe96aC326eceA1a09aE6E47487c5D8717f73d5A7e',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]:  {}
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
      [ISSWITCH]: dirSwitch(1),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
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
      [ISSWITCH]: dirSwitch(1),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
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
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    },
    '0x67198ea7208d00864a36bcf9c98a6352b2941de9': { // USDT
      [NAME]: 'ANY Tether',
      [SYMBOL]: 'aUSDT',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0xAf5A16AaAD4c52A3005b1aF129DBaE28b232a3b2',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 10,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x801372C03D571eC2114191bd94bbEDd794457924',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 4, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xbe7da13819d99af2c67aeeb77300dd209efc25d3': { // ETH
      [NAME]: 'ANY Ethereum',
      [SYMBOL]: 'aETH',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x27Aa624a4450ecD2e12bf6bBc103BA9bD784cA70',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 0.1,
      [MINFEE]: 0.005,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x801372C03D571eC2114191bd94bbEDd794457924',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 4, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x6159f8524562c7b6954c1134beca6dec62677f51': { // BTC
      [NAME]: 'ANY Bitcoin',
      [SYMBOL]: 'aBTC',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0xc375117c72c3a5698cf5a37087f8fd3154e498a2',
      [REDEEM_MAX_NUM]: 20,
      [REDEEM_MIN_NUM]: 0.002,
      [FEE]: 0.001,
      [MAXFEE]: 0.01,
      [MINFEE]: 0.001,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: 'mmBUP62PJNDndtSvH4ef65gUAucgQY5dqA',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 20,
      [DEPOSIT_MIN_NUM]: 0.0005,
      [EXTENDOBJ]:  {}
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
      [ISSWITCH]: dirSwitch(1),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
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
      [ISSWITCH]: dirSwitch(1),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
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
