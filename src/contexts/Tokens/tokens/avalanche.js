import config from '../../../config/index.js'
import {AVAX_MAIN_CHAINID} from '../../../config/coinbase/nodeConfig'
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
} from '../methods/mode'
import {dirSwitch} from '../methods/common'

export default {
  [AVAX_MAIN_CHAINID]: {
    '0xb44a9b6905af7c801311e8f4e76932ee959c663c': { // ANY
      [NAME]: 'Anyswap',
      [SYMBOL]: 'ANY',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x34cd63977c2a561d430966fc6720bab984e5caa2',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xa0357C461bF599092652e489961FB82c647a77bf',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {
        BRIDGE: [
          { type: 32659, isSwitch: 1 }
        ],
        VERSION: 'V2'
      },
    },
    '0xfa9343c3897324496a05fc75abed6bac29f8a40f': { // ETH
      [NAME]: 'Ethereum',
      [SYMBOL]: config.prefix + 'ETH',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xcf7060e5d2913401b66393a60c4dc46f7c30eb37',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x820A9eb227BF770A9dd28829380d53B76eAf1209',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      },
    },
    '0xc931f61b1534eb21d8c11b24f3f5ab2471d4ab50': { // BLOCK 5
      [NAME]: 'Blocknet' + config.suffix,
      [SYMBOL]: 'aaBLOCK',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x4dfd9d31b5b18626dd5da2e70d3890e1276ae1ff',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 2,
      [FEE]: 0.001,
      [MAXFEE]: 40,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: 'BahPF9Aw5aAQRVwfJhCsfiSSPXj6AAS3on',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 1000000,
      [DEPOSIT_MIN_NUM]: 1,
      [EXTENDOBJ]: {
        VERSION: 'V2'
      },
    },
    '0x65e66a61d0a8f1e686c2d6083ad611a10d84d97a': { // BAO
      [NAME]: 'BaoToken',
      [SYMBOL]: config.prefix + 'BAO',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xf84b1aa412321f89ef7c2676206f8be613af02d5',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x820A9eb227BF770A9dd28829380d53B76eAf1209',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      },
    },
    '0xdc42728b0ea910349ed3c6e1c9dc06b5fb591f98': { // FRAX
      [NAME]: 'Frax',
      [SYMBOL]: config.prefix + 'FRAX',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x71ac6c614a3cca7cbd34e1b2f43ac3897b6b44c9',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x820A9eb227BF770A9dd28829380d53B76eAf1209',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      },
    },
    '0xd67de0e0a0fd7b15dc8348bb9be742f3c5850454': { // FXS
      [NAME]: 'Frax Share',
      [SYMBOL]: config.prefix + 'FXS',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x7798a450c4b5fe07ffa8f5764cf82e7b3066a7fc',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x820A9eb227BF770A9dd28829380d53B76eAf1209',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      },
    },
    '0xd6070ae98b8069de6b494332d1a1a81b6179d960': { // BIFI
      [NAME]: 'beefy.finance',
      [SYMBOL]: config.prefix + 'BIFI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x0aa4abab785c189be67abbd0ce5b4ab044d96841',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xb1CB88B1a1992deB4189Ea4f566b594c13392Ada',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {
        BRIDGE: [
          { type: 56, isSwitch: 1 }
        ],
        VERSION: 'V2'
      },
    },
    '0xbbc4a8d076f4b1888fec42581b6fc58d242cf2d5': { // BCP
      [NAME]: 'BitcashPay',
      [SYMBOL]: config.prefix + 'BCP(BitcashPay)',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0xa600ba777db67fac3f8c9dbc8b0fa1f55c743b84',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x820A9eb227BF770A9dd28829380d53B76eAf1209',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      },
    },
    '0xd7c295e399ca928a3a14b01d760e794f1adf8990': { // DSLA
      [NAME]: 'DSLA',
      [SYMBOL]: config.prefix + 'DSLA',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x289c4c6308fa1b8b921ebc7eef3f62a5cedaac97',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x820A9eb227BF770A9dd28829380d53B76eAf1209',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      },
    },
    // '0x9610b01aaa57ec026001f7ec5cface51bfea0ba6': { // BUSD
    //   [NAME]: 'Binance USD',
    //   [SYMBOL]: config.prefix + 'BUSD',
    //   [DECIMALS]: 18,
    //   [EXCHANGE_ADDRESS]: '0x4b5d4874a239d4b1ddfe2c006c3c708e198081d4',
    //   [REDEEM_MAX_NUM]: 200000,
    //   [REDEEM_MIN_NUM]: 10,
    //   [FEE]: 0.001,
    //   [MAXFEE]: 50,
    //   [MINFEE]: 1,
    //   [ISSWITCH]: dirSwitch(0),
    //   [ISDEPOSIT]: 1,
    //   [ISREDEEM]: 1,
    //   [DEPOSIT_ADDRESS]: '0x820A9eb227BF770A9dd28829380d53B76eAf1209',
    //   [DEPOSIT_TYPE]: 1,
    //   [DEPOSIT_MAX_NUM]: 200000,
    //   [DEPOSIT_MIN_NUM]: 0.5,
    //   [EXTENDOBJ]: {
    //     BRIDGE: [
    //       { type: 1, isSwitch: 1 }
    //     ],
    //     VERSION: 'V2'
    //   },
    // },
    '0x1ccca1ce62c62f7be95d4a67722a8fdbed6eecb4': { // LAIKA
      [NAME]: 'LaikaProtocol',
      [SYMBOL]: config.prefix + 'LAIKA',
      [DECIMALS]: 9,
      [EXCHANGE_ADDRESS]: '0x32180eabfb7f524c9de25a9d67f38282e20ba149',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xb1CB88B1a1992deB4189Ea4f566b594c13392Ada',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {
        BRIDGE: [
          { type: 56, isSwitch: 1 }
        ],
        VERSION: 'V2'
      },
    },
    '0x264c1383ea520f73dd837f915ef3a732e204a493': { // BNB
      [NAME]: 'Binance',
      [SYMBOL]: config.prefix + 'BNB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xbd7a75830e954103e8c54abab5daa83feae3371c',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xb1CB88B1a1992deB4189Ea4f566b594c13392Ada',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {
        BRIDGE: [
          { type: 56, isSwitch: 1 }
        ],
        VERSION: 'V2'
      },
    },
    '0x9610b01aaa57ec026001f7ec5cface51bfea0ba6': { // BUSD
      [NAME]: 'Binance-Peg BUSD Token',
      [SYMBOL]: config.prefix + 'BUSD',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x07c4dcc5bb314ab270c3ba943fcaeadcb4b2ccbf',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xb1CB88B1a1992deB4189Ea4f566b594c13392Ada',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {
        BRIDGE: [
          { type: 56, isSwitch: 1 }
        ],
        VERSION: 'V2'
      },
    },
    '0x86b3f23b6e90f5bbfac59b5b2661134ef8ffd255': { // LAUNCH
      [NAME]: 'Super Launcher',
      [SYMBOL]: config.prefix + 'LAUNCH',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x47af522414274bd808b1d46c731b4b57bf7c1d97',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xb1CB88B1a1992deB4189Ea4f566b594c13392Ada',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {
        BRIDGE: [
          { type: 56, isSwitch: 1 }
        ],
        VERSION: 'V2'
      },
    },
    '0x64d5baf5ac030e2b7c435add967f787ae94d0205': { // bMXX
      [NAME]: 'Multiplier',
      [SYMBOL]: config.prefix + 'bMXX',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x07718c4aca5ba115d69de92a97082a9859235306',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xb1CB88B1a1992deB4189Ea4f566b594c13392Ada',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {
        BRIDGE: [
          { type: 56, isSwitch: 1 }
        ],
        VERSION: 'V2'
      },
    },
  }
}