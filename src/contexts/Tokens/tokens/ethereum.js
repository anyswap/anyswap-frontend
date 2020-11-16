import config from '../../../config/index.js'
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
  1: {
    '0xf99d58e463a2e07e5692127302c20a191861b4d6': { // ANY
      [NAME]: 'Anyswap' + config.suffix,
      [SYMBOL]: 'ANY',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xd1D0C2f4291F7002E1591d2a87975f0701a3fa2C',
      [REDEEM_MAX_NUM]: 2000000,
      [REDEEM_MIN_NUM]: 40,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 20,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x4464FC279180045b1F57beACFa0D82e9Cd4235Cd',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 2000000,
      [DEPOSIT_MIN_NUM]: 10,
      [EXTENDOBJ]: {
        BRIDGE: [
          { type: 32659, isSwitch: 1 }
        ],
        VERSION: 'V2'
      },
    },
    '0x51600b0cff6bbf79e7767158c41fd15e968ec404': { // BTC
      [NAME]: 'Bitcoin',
      [SYMBOL]: 'anyBTC',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x34358Ff75D78652F1797ebd73E8f7aFA92DaB501',
      [REDEEM_MAX_NUM]: 100,
      [REDEEM_MIN_NUM]: 0.001,
      [FEE]: 0.001,
      [MAXFEE]: 0.01,
      [MINFEE]: 0.0005,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '1918DgsaJCsRF5E5rTp2AsE5XyFTF95tTQ',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100,
      [DEPOSIT_MIN_NUM]: 0.001,
      [EXTENDOBJ]: {
        VERSION: 'V2'
      },
    },
    '0x979aca85ba37c675e78322ed5d97fa980b9bdf00': { // FSN
      [NAME]: 'Fusion',
      [SYMBOL]: 'FSN',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xbD1F974bc2730E9620D91924993d30C2F96983b8',
      [REDEEM_MAX_NUM]: 5000000,
      [REDEEM_MIN_NUM]: 40,
      [FEE]: 0.001,
      [MAXFEE]: 200,
      [MINFEE]: 20,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x4464FC279180045b1F57beACFa0D82e9Cd4235Cd',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 5000000,
      [DEPOSIT_MIN_NUM]: 1,
      [EXTENDOBJ]: {
        BRIDGE: [
          { type: 32659, isSwitch: 1 }
        ],
        VERSION: 'V2'
      },
    },
  }
}