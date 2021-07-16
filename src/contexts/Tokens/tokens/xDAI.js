import config from '../../../config/index.js'
import {xDAI_MAIN_CHAINID} from '../../../config/coinbase/nodeConfig'
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
  [xDAI_MAIN_CHAINID]: {
    '0xb44a9b6905af7c801311e8f4e76932ee959c663c': { // ANY
      [NAME]: 'Anyswap',
      [SYMBOL]: 'ANY',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x781f19e8e6132d02ff6b47d6856eba7eda393310',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xa2F8a1d03A3ccce38f59f539F131F296276E9fCb',
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
    '0x59676af932247d48755aab7a7b94f8bb4bea2a6e': { // WBTC
      [NAME]: 'Wrapped BTC',
      [SYMBOL]: 'WBTC',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0xb773044d217949ad4529c84303a0cceabbffe146',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x2F10c5eE93ac666dA72195abA8a49FD6D27fA02F',
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
    '0xd185c16756873b907df064bd7b4815839de4e6b9': { // UNISTAKE
      [NAME]: 'Unistake',
      [SYMBOL]: 'UNISTAKE',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xdb257941c24837d9dc0be6578e68c7240ffc36ee',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x2F10c5eE93ac666dA72195abA8a49FD6D27fA02F',
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
    '0x6ab6d61428fde76768d7b45d8bfeec19c6ef91a8': { // GTON
      [NAME]: 'Graviton',
      [SYMBOL]: 'GTON',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x0df4e9feee6c41e6849a044dd647bd67c3fff351',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x2F10c5eE93ac666dA72195abA8a49FD6D27fA02F',
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
    // '0x47eaf5f54d79d5c2b6537a90a0c58a534ab51c8c': { // BAO
    //   [NAME]: 'BaoToken',
    //   [SYMBOL]: 'BAO',
    //   [DECIMALS]: 18,
    //   [EXCHANGE_ADDRESS]: '0x869c7ca824367e15ffb3b7148486cc68054f1bda',
    //   [REDEEM_MAX_NUM]: 200000,
    //   [REDEEM_MIN_NUM]: 10,
    //   [FEE]: 0.001,
    //   [MAXFEE]: 50,
    //   [MINFEE]: 1,
    //   [ISSWITCH]: dirSwitch(0),
    //   [ISDEPOSIT]: 1,
    //   [ISREDEEM]: 1,
    //   [DEPOSIT_ADDRESS]: '0x2F10c5eE93ac666dA72195abA8a49FD6D27fA02F',
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
  }
}