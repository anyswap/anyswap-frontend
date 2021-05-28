import config from '../../../config/index.js'
import {ONE_MAIN_CHAINID} from '../../../config/coinbase/nodeConfig'
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
  [ONE_MAIN_CHAINID]: {
    '0x03732a1b4297ec285999402a9129cfad62a65463': { // BTC
      [NAME]: 'Bitcoin',
      [SYMBOL]: config.prefix + 'BTC',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x91ec267c6f126abfbc2c4e49fc43c06f6db677f3',
      [REDEEM_MAX_NUM]: 20,
      [REDEEM_MIN_NUM]: 0.002,
      [FEE]: 0.001,
      [MAXFEE]: 0.01,
      [MINFEE]: 0.001,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '1J3XMw4HnR4dm65QtwG2oJRBjRXFqGS1ap',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 20,
      [DEPOSIT_MIN_NUM]: 0.0005,
      [EXTENDOBJ]: {
        VERSION: 'V2'
      },
    },
  }
}