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
  128: {
    '0x538cee985e930557d16c383783ca957fa90b63b3': { // ANY
      [NAME]: 'Anyswap' + config.suffix,
      [SYMBOL]: 'ANY',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x58ded31f93669eac7b18d4d19b0d122fa5e9263d',
      [REDEEM_MAX_NUM]: 3000000,
      [REDEEM_MIN_NUM]: 40,
      [FEE]: 0.001,
      [MAXFEE]: 100,
      [MINFEE]: 20,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x08c266b93286e706222714dea42be2a7627039b1',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 5000000,
      [DEPOSIT_MIN_NUM]: 30,
      [EXTENDOBJ]: {
        BRIDGE: [
          { type: 32659, isSwitch: 1 }
        ],
        VERSION: 'V2'
      },
    },
    '0x62c10412d69823a98db5c09cf6e82810e0df5ad7': { // ETH
      [NAME]: 'Ethereum',
      [SYMBOL]: 'anyETH',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x8a6f33665144eb69f67e9460686b68f85a2decf9',
      [REDEEM_MAX_NUM]: 1000,
      [REDEEM_MIN_NUM]: 0.05,
      [FEE]: 0.001,
      [MAXFEE]: 0.1,
      [MINFEE]: 0.008,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xd779967f8b511c5edf39115341b310022900efed',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 1000,
      [DEPOSIT_MIN_NUM]: 0.01,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x721bc1af56fa923ab4c4a43bde49d7d1f8dd3076': { // USDT-ERC20
      [NAME]: 'Tether',
      [SYMBOL]: 'anyUSDT',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0x70611b9cf3f89a7e6e39a5242afefc19a50d8091',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xd779967f8b511c5edf39115341b310022900efed',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 1,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x42aaa9151c2f7a6a5ae70869aa9236b6f3fbae49': { // FSN
      [NAME]: 'Fusion' + config.suffix,
      [SYMBOL]: 'anyFSN',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x89e81634124353bc5242324697882a89059736de',
      [REDEEM_MAX_NUM]: 5000000,
      [REDEEM_MIN_NUM]: 40,
      [FEE]: 0.001,
      [MAXFEE]: 200,
      [MINFEE]: 20,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x08c266b93286e706222714dea42be2a7627039b1',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 5000000,
      [DEPOSIT_MIN_NUM]: 1,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 32659, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
  },
  256: {
    '0x4373ca233c17b8bf1bf8159d56019d3394a0670d': { // ANY
      [NAME]: 'Anyswap',
      [SYMBOL]: 'ANY',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x6fee8abb295f6103e7c355d924be28f843d89881',
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
  }
}