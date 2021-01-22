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
  250: {
    '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83': { // wFTM
      [NAME]: 'Wrapped Fantom',
      [SYMBOL]: 'wFTM',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xa52d4554d2fd90c32dd4669549acf658dc9741dc',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]:  {}
    },
    '0xddcb3ffd12750b45d32e084887fdf1aabab34239': { // ANY
      [NAME]: 'Anyswap' + config.suffix,
      [SYMBOL]: 'ANY',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x918f6de5b683b688961deab48546ca422280c64f',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x2A1651C38927BdEdE04F4e07cFcC55Bd1c81fe72',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 32659, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xb688e18f34e6e424c44b247318f22367ed7df3e2': { // ETH
      [NAME]: 'Ethereum',
      [SYMBOL]: 'anyETH',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xe9ab6fb12c1aa4be556b215865411be8a55d192a',
      [REDEEM_MAX_NUM]: 1000,
      [REDEEM_MIN_NUM]: 0.05,
      [FEE]: 0.001,
      [MAXFEE]: 0.1,
      [MINFEE]: 0.008,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x65e64963b755043CA4FFC88029FfB8305615EeDD',
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
    '0xad84341756bf337f5a0164515b1f6f993d194e1f': { // FUSD
      [NAME]: 'Fantom USD',
      [SYMBOL]: 'FUSD',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x76190cb925012fc5b15021e51365969a7f3ae655',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    },
    '0x1ffbd1e3584f139ca42d77ef99ef99550ecf46a8': { // USDT-ERC20
      [NAME]: 'Tether',
      [SYMBOL]: 'anyUSDT',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0xa0d5b09fdeabfff541703779decdb798d55faea2',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x65e64963b755043CA4FFC88029FfB8305615EeDD',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x50eb82cc284e3d35936827023b048106aaecfc5f': { // FSN
      [NAME]: 'Fusion',
      [SYMBOL]: 'FSN',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x5b46734ec6def348653bb193638b474731a833b0',
      [REDEEM_MAX_NUM]: 500000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x2A1651C38927BdEdE04F4e07cFcC55Bd1c81fe72',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 500000,
      [DEPOSIT_MIN_NUM]: 1,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 32659, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xbcacf1c62202a07e6107f250b788b10677045833': { // LTC 5
      [NAME]: 'Litecoin' + config.suffix,
      [SYMBOL]: 'anyLTC',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0xe06f7f05a3c07444f62a28089ab5533e59820624',
      [REDEEM_MAX_NUM]: 20000,
      [REDEEM_MIN_NUM]: 0.2,
      [FEE]: 0.001,
      [MAXFEE]: 0.5,
      [MINFEE]: 0.07,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: 'LPpmqgdvbBh6jMn2TS4nCKv54SS2GCEevH',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 20000,
      [DEPOSIT_MIN_NUM]: 0.1,
      [EXTENDOBJ]: {
        VERSION: 'V2'
      },
    },
    '0xc396b190f251d7f79c583fd06347a09781f085c9': { // anyYFI-ERC20
      [NAME]: 'yearn.finance',
      [SYMBOL]: 'anyYFI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xd8894449fa884391547fd19d2eb03b9c79b6c411',
      [REDEEM_MAX_NUM]: 20,
      [REDEEM_MIN_NUM]: 0.002,
      [FEE]: 0.001,
      [MAXFEE]: 0.01,
      [MINFEE]: 0.0008,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x65e64963b755043CA4FFC88029FfB8305615EeDD',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 20,
      [DEPOSIT_MIN_NUM]: 0.0005,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
  }
}