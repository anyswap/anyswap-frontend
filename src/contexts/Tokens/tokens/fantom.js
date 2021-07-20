import config from '../../../config/index.js'
import {FTM_MAIN_CHAINID} from '../../../config/coinbase/nodeConfig'
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
  [FTM_MAIN_CHAINID]: {
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
      [NAME]: 'Ethereum' + config.namePrefix,
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
    '0x049d68029688eabf473097a2fc38ef61633a3c7a': { // fUSDT
      [NAME]: 'Frapped USDT',
      [SYMBOL]: 'fUSDT',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0x367383da74d67196ec78d8536b6562de30e6dc7a',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xC564EE9f21Ed8A2d8E7e76c085740d5e4c5FaFbE',
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
    '0x1b27a9de6a775f98aaa5b90b62a4e2a0b84dbdd9': { // USDT
      [NAME]: 'Tether',
      [SYMBOL]: 'USDT',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0x939e12fda3ae6714e550aedf90e22be1df2f2221',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xBe008e52c5682A49dd0260735a26Aa221f303456',
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
      [NAME]: 'Fusion' + config.namePrefix,
      [SYMBOL]: 'anyFSN',
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
    '0x04068da6c83afcfa0e13ba15a6696662335d5b75': { // USDC
      [NAME]: 'USD Coin' + config.suffix,
      [SYMBOL]: 'USDC',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0x4ae30b4d12c356aa53694e439a71c6cbafa0a493',
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
    '0x84c882a4d8eb448ce086ea19418ca0f32f106117': { // BFC
      [NAME]: 'Bifrost' + config.suffix,
      [SYMBOL]: 'BFC',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xc7bd3b70619340fa456aed4635dc281656a0f860',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0xad260f380c9a30b1d60e4548a75010ede630b665': { // BIFI
      [NAME]: 'BIFI' + config.suffix,
      [SYMBOL]: 'BIFI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xf061133f29daa83958b8f51f1b799df8fa6d18b4',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0x627524d78b4fc840c887ffec90563c7a42b671fd': { // KEK 
      [NAME]: 'Cryptokek.com' + config.suffix,
      [SYMBOL]: 'KEK',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xab796e0ddfaa3ca4a974f134947cd76d760d2896',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0x354bcec10cfd5c8ce285c73093b3edb7bb3c4888': { // JPYC 
      [NAME]: 'JPY Coin' + config.suffix,
      [SYMBOL]: 'JPYC',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xe69c7b682beee34128e204d0c2e60ef2c6bfe20f',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0x1f7216fdb338247512ec99715587bb97bbf96eae': { // bBADGER 
      [NAME]: 'Badger Sett Badger' + config.suffix,
      [SYMBOL]: 'bBADGER',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x8ad193f348330a82016b32ef22825c310cc95b4b',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0xf16e81dce15b08f326220742020379b855b87df9': { // ICE 
      [NAME]: 'IceToken' + config.suffix,
      [SYMBOL]: 'ICE',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x65fd4b4d54cac9ee6f2d912e2015ec79d9ed74dc',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0x639a647fbe20b6c8ac19e48e2de44ea792c62c5c': { // OCTO 
      [NAME]: 'Octo.fi' + config.suffix,
      [SYMBOL]: 'OCTO',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x1b3d0a484c06e6e787dc3d10437f383c44bd1b6b',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0x765277eebeca2e31912c9946eae1021199b39c61': { // KNC 
      [NAME]: 'KyberNetwork' + config.suffix,
      [SYMBOL]: 'KNC',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x26f0343418e6eb5b980f8835c8bb8b412f314f1f',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0xfa9343c3897324496a05fc75abed6bac29f8a40f': { // STN 
      [NAME]: 'Stone Token' + config.suffix,
      [SYMBOL]: 'STN',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xd09452a0e6061a55ee6d4ce60e05478e0da25151',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b': { // ATRI 
      [NAME]: 'AtariToken' + config.suffix,
      [SYMBOL]: 'ATRI',
      [DECIMALS]: 0,
      [EXCHANGE_ADDRESS]: '0xd4a1662b603164f083cf7025e13dba97bc34b3c8',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73': { // SHEESHA 
      [NAME]: 'Sheesha Finance' + config.suffix,
      [SYMBOL]: 'SHEESHA',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xcd7faf3a33d5af8d7d878c12afb086feb9d70973',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0x922d641a426dcffaef11680e5358f34d97d112e1': { // VID 
      [NAME]: 'VideoCoin' + config.suffix,
      [SYMBOL]: 'VID',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x1d0bf48596feed7a0cf6fa1d5c06aab01f1883a3',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0x461d52769884ca6235b685ef2040f47d30c94eb5': { // VSP 
      [NAME]: 'VesperToken' + config.suffix,
      [SYMBOL]: 'VSP',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x1bc9bb0dd8c3979e8cb781c068bc1a20dfe41648',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0x7c598c96d02398d89fbcb9d41eab3df0c16f227d': { // NEXO 
      [NAME]: 'Nexo' + config.suffix,
      [SYMBOL]: 'NEXO',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x259dadf508b195a099d4fc6f2155ec1e7d102678',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0x2c78f1b70ccf63cdee49f9233e9faa99d43aa07e': { // CEL 
      [NAME]: 'Celsius' + config.suffix,
      [SYMBOL]: 'CEL',
      [DECIMALS]: 4,
      [EXCHANGE_ADDRESS]: '0x3a9630bb5f446d2881378f02adaaac0986b38077',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0xc1be9a4d5d45beeacae296a7bd5fadbfc14602c4': { // GTON 
      [NAME]: 'Graviton' + config.suffix,
      [SYMBOL]: 'GTON',
      [DECIMALS]: 4,
      [EXCHANGE_ADDRESS]: '0x382a3346221dc4dc3b9abc676026fd0ed13ec1a9',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0x332730a4f6e03d9c55829435f10360e13cfa41ff': { // FRY 
      [NAME]: 'Foundry Logistics Token' + config.suffix,
      [SYMBOL]: 'FRY',
      [DECIMALS]: 4,
      [EXCHANGE_ADDRESS]: '0x27f5709f7ae47d131921d1fd17a0106b651a4b30',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0x65e66a61d0a8f1e686c2d6083ad611a10d84d97a': { // SHIB 
      [NAME]: 'SHIBA INU' + config.suffix,
      [SYMBOL]: 'SHIB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x5b1f3e89e783316250d97db2398f6630817c27aa',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0x01c3d9cbcf40482ba0d5206f63e3f04ef9e134d9': { // SFI 
      [NAME]: 'Spice' + config.suffix,
      [SYMBOL]: 'SFI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xd009b23194e3ce931e7c9f45e364bd6f14fc03ea',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0xd67de0e0a0fd7b15dc8348bb9be742f3c5850454': { // BNB 
      [NAME]: 'Binance' + config.suffix,
      [SYMBOL]: 'BNB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x591a9374c50c0f59423e3756234f711b808d96bc',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x4b3B4120d4D7975455d8C2894228789c91a247F8',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 143000,
      [DEPOSIT_MIN_NUM]: 0.16,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 56, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xd0660cd418a64a1d44e9214ad8e459324d8157f1': { // WOOFY 
      [NAME]: 'Woofy' + config.suffix,
      [SYMBOL]: 'WOOFY',
      [DECIMALS]: 12,
      [EXCHANGE_ADDRESS]: '0x8f4591a122ef229cbd485a11dcfdebb51c3b867b',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0x735abe48e8782948a37c7765ecb76b98cde97b0f': { // ESWAP 
      [NAME]: 'eSwapping' + config.suffix,
      [SYMBOL]: 'ESWAP',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x36f40b69c3af083446e54d805044ca8f13c1c3ed',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x4b3B4120d4D7975455d8C2894228789c91a247F8',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 143000,
      [DEPOSIT_MIN_NUM]: 0.16,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 56, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xc931f61b1534eb21d8c11b24f3f5ab2471d4ab50': { // BNB 
      [NAME]: 'Binance USD' + config.suffix,
      [SYMBOL]: 'BUSD',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x34ccdc12957ca185d2ea77e5daeab09491972490',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x4b3B4120d4D7975455d8C2894228789c91a247F8',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 143000,
      [DEPOSIT_MIN_NUM]: 0.16,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 56, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xd6070ae98b8069de6b494332d1a1a81b6179d960': { // BIFI 
      [NAME]: 'Beefy.Finance' + config.suffix,
      [SYMBOL]: 'BIFI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xa570f5cdc745b4c67cc409a85b56fd358dca176f',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x4b3B4120d4D7975455d8C2894228789c91a247F8',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 143000,
      [DEPOSIT_MIN_NUM]: 0.16,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 56, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x97513e975a7fa9072c72c92d8000b0db90b163c5': { // KISHU 
      [NAME]: 'Kishu Inu' + config.suffix,
      [SYMBOL]: 'KISHU',
      [DECIMALS]: 9,
      [EXCHANGE_ADDRESS]: '0x9270131263f743945c6ca851d70097353c4b8f75',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0x3028b4395f98777123c7da327010c40f3c7cc4ef': { // PREMIA 
      [NAME]: 'Premia' + config.suffix,
      [SYMBOL]: 'PREMIA',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x4f1c093bc1af4f6dd350e50be9f4adc01e685197',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0x4792c1ecb969b036eb51330c63bd27899a13d84e': { // BTD 
      [NAME]: 'Bat True Dollar' + config.suffix,
      [SYMBOL]: 'BTD',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x7817956a7c92690120004ba3de1a77426f2e86aa',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x4b3B4120d4D7975455d8C2894228789c91a247F8',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 143000,
      [DEPOSIT_MIN_NUM]: 0.16,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 56, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xacd7b3d9c10e97d0efa418903c0c7669e702e4c0': { // ELE 
      [NAME]: 'Eleven.finance' + config.suffix,
      [SYMBOL]: 'ELE',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xcdda704fb9125097792d9675612f88a59fcb0e2a',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x4b3B4120d4D7975455d8C2894228789c91a247F8',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 143000,
      [DEPOSIT_MIN_NUM]: 0.16,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 56, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xbbc4a8d076f4b1888fec42581b6fc58d242cf2d5': { // FONT 
      [NAME]: 'Font' + config.suffix,
      [SYMBOL]: 'FONT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xc194f68bfcc8dcb507ff54461e8ce24a15c87719',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0xd3b71117e6c1558c1553305b44988cd944e97300': { // YEL 
      [NAME]: 'YEL Token' + config.suffix,
      [SYMBOL]: 'YEL',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xfa48134380a7e409c3d505509afd16fdf7de6e69',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0xf31778d591c558140398f46feca42a6a2dbffe90': { // HOGE 
      [NAME]: 'hoge.finance' + config.suffix,
      [SYMBOL]: 'HOGE',
      [DECIMALS]: 9,
      [EXCHANGE_ADDRESS]: '0x1a0a7ac608bd7d89c04c5e7ac66bac07e1ab70ae',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0x0b322577569418b166cd98ea8ae7c681e4a820eb': { // LEO 
      [NAME]: 'Bitfinex LEO Token' + config.suffix,
      [SYMBOL]: 'LEO',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xe075674f46d9d3fc2bbf9d6c83592a02f4f62de9',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0xab41861399eb56896b24fbaabaa8bce45e4a626b': { // 0xMR 
      [NAME]: '0xMonero' + config.suffix,
      [SYMBOL]: '0xMR',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x2dffaf51c07b92b53e9b87f9ecad924b0916d292',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0xe6f658118bcc6d344c812826b1af13bd7d59956c': { // GUSD 
      [NAME]: 'Gemini dollar' + config.suffix,
      [SYMBOL]: 'GUSD',
      [DECIMALS]: 2,
      [EXCHANGE_ADDRESS]: '0x09a9b79616fc42ad50b111b5065330aef68f0014',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe',
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
    '0xaeddc4a469ace97e90c605e3f52eb89620e305c0': { // LAIKA 
      [NAME]: 'LaikaProtocol' + config.suffix,
      [SYMBOL]: 'LAIKA',
      [DECIMALS]: 9,
      [EXCHANGE_ADDRESS]: '0x906bc65b2aeadb59eb2fe5ee5bebc77d2e669db6',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x4b3B4120d4D7975455d8C2894228789c91a247F8',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 143000,
      [DEPOSIT_MIN_NUM]: 0.16,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 56, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
  }
}