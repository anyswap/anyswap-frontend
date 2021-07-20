import config from '../../../config/index.js'
import {KCS_MAIN_CHAINID} from '../../../config/coinbase/nodeConfig'
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
  [KCS_MAIN_CHAINID]: {
    '0x639a647fbe20b6c8ac19e48e2de44ea792c62c5c': { // BNB
      [NAME]: 'Binance',
      [SYMBOL]: 'BNB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xfb7a243c50dde28d88f97e12db3495ff8b7660bf',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x88036021b39759Fc46aD79850679282cb2353372',
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
    '0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d': { // BUSD
      [NAME]: 'Binance USD',
      [SYMBOL]: 'BUSD',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x9482fea150de0fe8972e0d46ee3e85b3a5078fe7',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x88036021b39759Fc46aD79850679282cb2353372',
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
    '0x6ab6d61428fde76768d7b45d8bfeec19c6ef91a8': { // LAIKA
      [NAME]: 'LaikaProtocol',
      [SYMBOL]: 'LAIKA',
      [DECIMALS]: 9,
      [EXCHANGE_ADDRESS]: '0x119f540001390c7ca24a7e037bac0bd3d9c32b3d',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x88036021b39759Fc46aD79850679282cb2353372',
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