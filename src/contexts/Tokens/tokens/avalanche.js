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
    // '0xb44a9b6905af7c801311e8f4e76932ee959c663c': { // ANY
    //   [NAME]: 'Anyswap',
    //   [SYMBOL]: 'ANY',
    //   [DECIMALS]: 18,
    //   [EXCHANGE_ADDRESS]: '',
    //   [REDEEM_MAX_NUM]: 200000,
    //   [REDEEM_MIN_NUM]: 10,
    //   [FEE]: 0.001,
    //   [MAXFEE]: 50,
    //   [MINFEE]: 1,
    //   [ISSWITCH]: dirSwitch(0),
    //   [ISDEPOSIT]: 1,
    //   [ISREDEEM]: 1,
    //   [DEPOSIT_ADDRESS]: '0xa0357C461bF599092652e489961FB82c647a77bf',
    //   [DEPOSIT_TYPE]: 1,
    //   [DEPOSIT_MAX_NUM]: 200000,
    //   [DEPOSIT_MIN_NUM]: 0.5,
    //   [EXTENDOBJ]: {
    //     BRIDGE: [
    //       { type: 32659, isSwitch: 1 }
    //     ],
    //     VERSION: 'V2'
    //   },
    // },
    // '0xfa9343c3897324496a05fc75abed6bac29f8a40f': { // ETH
    //   [NAME]: 'Ethereum',
    //   [SYMBOL]: 'ETH',
    //   [DECIMALS]: 18,
    //   [EXCHANGE_ADDRESS]: '',
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
  }
}