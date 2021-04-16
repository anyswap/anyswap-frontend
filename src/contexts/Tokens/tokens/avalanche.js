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
    
    '0x735abe48e8782948a37c7765ecb76b98cde97b0f': { // BLOCK 5
      [NAME]: 'Blocknet' + config.suffix,
      [SYMBOL]: config.prefix + 'BLOCK',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x13baeef697dda732886c23508c0b80d771cbf645',
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
  }
}