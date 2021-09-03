import config from '../../../config/index.js'
import {MOON_MAIN_CHAINID} from '../../../config/coinbase/nodeConfig'
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
  [MOON_MAIN_CHAINID]: {
    '0x639a647fbe20b6c8ac19e48e2de44ea792c62c5c': { // ETH
      [NAME]: 'Ethereum',
      [SYMBOL]: 'ETH',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xbf82ddefa7fa0bc91af7cba772a232ffd0fd586f',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x10c6b61DbF44a083Aec3780aCF769C77BE747E23',
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
    '0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d': { // USDC
      [NAME]: 'USD Coin',
      [SYMBOL]: 'USDC',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0x8d74599d3bbbf2f31449ecbf8cf604a6a514a4c5',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x10c6b61DbF44a083Aec3780aCF769C77BE747E23',
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
    '0xb44a9b6905af7c801311e8f4e76932ee959c663c': { // USDT
      [NAME]: 'Tether USD',
      [SYMBOL]: 'USDT',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0x03783443ff38c6c1160d1fd3fd3b2d12ea984464',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x10c6b61DbF44a083Aec3780aCF769C77BE747E23',
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
    '0x80a16016cc4a2e6a2caca8a4a498b1699ff0f844': { // DAI
      [NAME]: 'Dai Stablecoin',
      [SYMBOL]: 'DAI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xb92210d7b8fc942e9f056e392c41448e5dd43f59',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x10c6b61DbF44a083Aec3780aCF769C77BE747E23',
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
    '0x6ab6d61428fde76768d7b45d8bfeec19c6ef91a8': { // WBTC
      [NAME]: 'Wrapped BTC',
      [SYMBOL]: 'WBTC',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x4bd60faa1e00e7b2e376ae63bffd00fc9029c4df',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x10c6b61DbF44a083Aec3780aCF769C77BE747E23',
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
    '0x2bf9b864cdc97b08b6d79ad4663e71b8ab65c45c': { // BNB
      [NAME]: 'Binance',
      [SYMBOL]: 'BNB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x4a93dceafea764623a6c2f2201e6a79fc0540b2d',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xd6faf697504075a358524996b132b532cc5D0F14',
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
    '0x5d9ab5522c64e1f6ef5e3627eccc093f56167818': { // BUSD
      [NAME]: 'Binance-Peg BUSD Token',
      [SYMBOL]: 'BUSD',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xb37edf3158cbb6eff89fed4d4f51749ca2b6790d',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xd6faf697504075a358524996b132b532cc5D0F14',
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