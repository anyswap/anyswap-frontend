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
    '0xf5c8054efc6acd25f31a17963462b90e82fdecad': { // DAI
      [NAME]: 'DAI' + config.suffix,
      [SYMBOL]: 'DAI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x53f8388680fae8047a7014ed15b76a690c1f5f74',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 150,
      [MINFEE]: 15,
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
    '0x6f43ff82cca38001b6699a8ac47a2d0e66939407': { // LINK
      [NAME]: 'Chainlink' + config.suffix,
      [SYMBOL]: 'LINK',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x5efafe44a096e117d88d48b20e13c44aee209834',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 2,
      [FEE]: 0.001,
      [MAXFEE]: 5,
      [MINFEE]: 0.5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x65e64963b755043CA4FFC88029FfB8305615EeDD',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100000,
      [DEPOSIT_MIN_NUM]: 1,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },

    // test
    // '0x04068da6c83afcfa0e13ba15a6696662335d5b75': { // USDC
    //   [NAME]: 'USDC' + config.suffix,
    //   [SYMBOL]: 'USDC',
    //   [DECIMALS]: 6,
    //   [EXCHANGE_ADDRESS]: '',
    //   [REDEEM_MAX_NUM]: 100000,
    //   [REDEEM_MIN_NUM]: 2,
    //   [FEE]: 0.001,
    //   [MAXFEE]: 5,
    //   [MINFEE]: 0.5,
    //   [ISSWITCH]: dirSwitch(0),
    //   [ISDEPOSIT]: 1,
    //   [ISREDEEM]: 1,
    //   [DEPOSIT_ADDRESS]: '0xC564EE9f21Ed8A2d8E7e76c085740d5e4c5FaFbE',
    //   [DEPOSIT_TYPE]: 1,
    //   [DEPOSIT_MAX_NUM]: 100000,
    //   [DEPOSIT_MIN_NUM]: 1,
    //   [EXTENDOBJ]:  {
    //     BRIDGE: [
    //       { type: 1, isSwitch: 1 }
    //     ],
    //     VERSION: 'V2'
    //   }
    // },
    // '0x1b27a9de6a775f98aaa5b90b62a4e2a0b84dbdd9': { // USDT
    //   [NAME]: 'USDT' + config.suffix,
    //   [SYMBOL]: 'USDT',
    //   [DECIMALS]: 6,
    //   [EXCHANGE_ADDRESS]: '',
    //   [REDEEM_MAX_NUM]: 100000,
    //   [REDEEM_MIN_NUM]: 2,
    //   [FEE]: 0.001,
    //   [MAXFEE]: 5,
    //   [MINFEE]: 0.5,
    //   [ISSWITCH]: dirSwitch(0),
    //   [ISDEPOSIT]: 1,
    //   [ISREDEEM]: 1,
    //   [DEPOSIT_ADDRESS]: '0xC564EE9f21Ed8A2d8E7e76c085740d5e4c5FaFbE',
    //   [DEPOSIT_TYPE]: 1,
    //   [DEPOSIT_MAX_NUM]: 100000,
    //   [DEPOSIT_MIN_NUM]: 1,
    //   [EXTENDOBJ]:  {
    //     BRIDGE: [
    //       { type: 1, isSwitch: 1 }
    //     ],
    //     VERSION: 'V2'
    //   }
    // },
    


    '0xe64b9fd040d1f9d4715c645e0d567ef69958d3d9': { // MOD
      [NAME]: 'Modefi' + config.suffix,
      [SYMBOL]: 'MOD',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xaa723a4381a8cd38edbc7c6199488be29da6b9a8',
      [REDEEM_MAX_NUM]: 381680,
      [REDEEM_MIN_NUM]: 12,
      [FEE]: 0.001,
      [MAXFEE]: 60,
      [MINFEE]: 6,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xC564EE9f21Ed8A2d8E7e76c085740d5e4c5FaFbE',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 381680,
      [DEPOSIT_MIN_NUM]: 12,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xcf726a06f3dcec8ef2b033336d138caa0eae5af2': { // RGT
      [NAME]: 'Rari Governance' + config.suffix,
      [SYMBOL]: 'RGT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x6f5f5ccd4c126667d5d0e89802a8db2eba9c5403',
      [REDEEM_MAX_NUM]: 64000,
      [REDEEM_MIN_NUM]: 2,
      [FEE]: 0.001,
      [MAXFEE]: 10,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xC564EE9f21Ed8A2d8E7e76c085740d5e4c5FaFbE',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 64000,
      [DEPOSIT_MIN_NUM]: 2,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x602a3ad311e66b6f5e567a13016b712aba0625c6': { // DUCK
      [NAME]: 'Unit Protocol Duck' + config.suffix,
      [SYMBOL]: 'DUCK',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xa4a6a21f5badfade3a425fc65020ede192db0d6a',
      [REDEEM_MAX_NUM]: 3400000,
      [REDEEM_MIN_NUM]: 100,
      [FEE]: 0.001,
      [MAXFEE]: 500,
      [MINFEE]: 50,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xC564EE9f21Ed8A2d8E7e76c085740d5e4c5FaFbE',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 3400000,
      [DEPOSIT_MIN_NUM]: 100,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x4272dd51961a5181ace0dc7eb6f9807311345559': { // PPDEX
      [NAME]: 'Pepedex' + config.suffix,
      [SYMBOL]: 'PPDEX',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x870af0fe7c7fa89b47628017a6f35e5857103079',
      [REDEEM_MAX_NUM]: 143000,
      [REDEEM_MIN_NUM]: 4.4,
      [FEE]: 0.001,
      [MAXFEE]: 22,
      [MINFEE]: 2.2,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xC564EE9f21Ed8A2d8E7e76c085740d5e4c5FaFbE',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 143000,
      [DEPOSIT_MIN_NUM]: 4.4,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x8063115941e612021692f28748ab1ff56c23e4c6': { // PPBLZ
      [NAME]: 'Pepemon Pepeballs' + config.suffix,
      [SYMBOL]: 'PPBLZ',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x20516049e485fe0dcec5b4a11f59736caad35432',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xC564EE9f21Ed8A2d8E7e76c085740d5e4c5FaFbE',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 143000,
      [DEPOSIT_MIN_NUM]: 0.16,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xceebde49ec95e21f7ee63c5c6f98cab3519570de': { // WSTA
      [NAME]: 'Wrapped STA' + config.suffix,
      [SYMBOL]: 'WSTA',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xe4f65f2dd1ecd3f4994ce8066c001be67256502a',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xC564EE9f21Ed8A2d8E7e76c085740d5e4c5FaFbE',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 143000,
      [DEPOSIT_MIN_NUM]: 0.16,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x6a545f9c64d8f7b957d8d2e6410b52095a9e6c29': { // CFi
      [NAME]: 'CyberFi' + config.suffix,
      [SYMBOL]: 'CFi',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x71925573f43e2e716bb6a114d008f1ee231c3e93',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xC564EE9f21Ed8A2d8E7e76c085740d5e4c5FaFbE',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 143000,
      [DEPOSIT_MIN_NUM]: 0.16,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x9611579c926294b0e29e5371a81a3e463650be17': { // BCP
      [NAME]: 'PieDAO Balanced Crypto Pie' + config.suffix,
      [SYMBOL]: 'BCP',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xba703e570c370777288c3a6d6157eaab894c3230',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xC564EE9f21Ed8A2d8E7e76c085740d5e4c5FaFbE',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 143000,
      [DEPOSIT_MIN_NUM]: 0.16,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xc055c698f3793577707b3e6979b089f50c314d3a': { // HH
      [NAME]: 'Holyheld' + config.suffix,
      [SYMBOL]: 'HH',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x4634e0b617f73504c950c7fbf887110de8faa196',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xC564EE9f21Ed8A2d8E7e76c085740d5e4c5FaFbE',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 143000,
      [DEPOSIT_MIN_NUM]: 0.16,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x2f60c28fb2fdc90a2a5644442d0f6d8998101e76': { // zLOT
      [NAME]: 'zLOT' + config.suffix,
      [SYMBOL]: 'ZLOT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x37e1a8cb18d9b60bbd7fb754f7aa2493fb6e5c4b',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xC564EE9f21Ed8A2d8E7e76c085740d5e4c5FaFbE',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 143000,
      [DEPOSIT_MIN_NUM]: 0.16,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xeaf26191ac1d35ae30baa19a5ad5558dd8156aef': { // NORD
      [NAME]: 'Nord Token' + config.suffix,
      [SYMBOL]: 'NORD',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xec58473ef26dc46469f74b1c64218e11a7880b43',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xC564EE9f21Ed8A2d8E7e76c085740d5e4c5FaFbE',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 143000,
      [DEPOSIT_MIN_NUM]: 0.16,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xbfaf328fe059c53d936876141f38089df0d1503d': { // MM
      [NAME]: 'MMToken' + config.suffix,
      [SYMBOL]: 'MM',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xf5f090f379851f4142b064848e2e92c3c6b7fe34',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xC564EE9f21Ed8A2d8E7e76c085740d5e4c5FaFbE',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 143000,
      [DEPOSIT_MIN_NUM]: 0.16,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x753fbc5800a8c8e3fb6dc6415810d627a387dfc9': { // BADGER
      [NAME]: 'Badger' + config.suffix,
      [SYMBOL]: 'BADGER',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x3cce43ea32d5d65b18fec579c6e71e8d42783b0a',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xC564EE9f21Ed8A2d8E7e76c085740d5e4c5FaFbE',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 143000,
      [DEPOSIT_MIN_NUM]: 0.16,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x08f6fe8f4dc577cf81e40e03e561d29b8b33e19b': { // DIGG
      [NAME]: 'Digg' + config.suffix,
      [SYMBOL]: 'DIGG',
      [DECIMALS]: 9,
      [EXCHANGE_ADDRESS]: '0x9d7ebcedba5e7648725b3b6c7598f98d5588d291',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xC564EE9f21Ed8A2d8E7e76c085740d5e4c5FaFbE',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 143000,
      [DEPOSIT_MIN_NUM]: 0.16,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x82f8cb20c14f134fe6ebf7ac3b903b2117aafa62': { // FXS
      [NAME]: 'Frax Share' + config.suffix,
      [SYMBOL]: 'FXS',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x4285e83b21a955657e0aab5993e3e33e3fafd626',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xC564EE9f21Ed8A2d8E7e76c085740d5e4c5FaFbE',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 143000,
      [DEPOSIT_MIN_NUM]: 0.16,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
  }
}