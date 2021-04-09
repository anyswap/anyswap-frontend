import config from '../../../config/index.js'
import {MATIC_MAIN_CHAINID} from '../../../config/coinbase/nodeConfig'
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
  [MATIC_MAIN_CHAINID]: {
    '0x6ab6d61428fde76768d7b45d8bfeec19c6ef91a8': { // ANY
      [NAME]: 'Anyswap',
      [SYMBOL]: 'ANY',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xb773044d217949ad4529c84303a0cceabbffe146',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xE9c3967E1442287e6Ed45bEfC26A1bAd8c811b67',
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
    '0x2bf9b864cdc97b08b6d79ad4663e71b8ab65c45c': { // FSN
      [NAME]: 'Fusion',
      [SYMBOL]: 'FSN',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x19a959a5079a65ede5fa657dd38769cdab6cba0e',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xE9c3967E1442287e6Ed45bEfC26A1bAd8c811b67',
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
    '0xc4bfaa8e2310bee9f80b27b253fc5f05221ab202': { // ARIA20
      [NAME]: 'ARIANEE',
      [SYMBOL]: 'ARIA20',
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
      [DEPOSIT_ADDRESS]: '0x668b9734FfE9eE8a01d4Ade3362De71E8989EA87',
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
    '0x5e21d04c7db93c195b158b6e85238e471a3baf28': { // CTSI
      [NAME]: 'Cartesi Token',
      [SYMBOL]: 'CTSI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x09866dba0886f6d6d8597229224c8619364a597b',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x668b9734FfE9eE8a01d4Ade3362De71E8989EA87',
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