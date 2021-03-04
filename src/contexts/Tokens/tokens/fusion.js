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
  32659: {
    '0x0c74199d22f732039e843366a236ff4f61986b32': { // ANY
      [NAME]: 'Anyswap',
      [SYMBOL]: 'ANY',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x049ddc3cd20ac7a2f6c867680f7e21de70aca9c3',
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
    '0x445166c4854836292a5af7e3f165a3b8b4eedf97': { // BTC
      [NAME]: 'ANY Bitcoin',
      [SYMBOL]: config.prefix + 'BTC',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x361450e73d63031febe35ca9fd772f3fd53e1013',
      [REDEEM_MAX_NUM]: 20,
      [REDEEM_MIN_NUM]: 0.002,
      [FEE]: 0.001,
      [MAXFEE]: 0.01,
      [MINFEE]: 0.001,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '1HvrEMgxsYadWGhijpfygKSqPZ5p418g45',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 20,
      [DEPOSIT_MIN_NUM]: 0.0005,
      [EXTENDOBJ]: {
        VERSION: 'V1'
      },
    },
    '0x5e12290c7e7eda58d092632a53bbbc717996c732': { // ETH
      [NAME]: 'ANY Ethereum',
      [SYMBOL]: config.prefix + 'ETH',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x9ced18b0f8d7602f50d0061e6487021ec8114a1d',
      [REDEEM_MAX_NUM]: 1000,
      [REDEEM_MIN_NUM]: 0.05,
      [FEE]: 0.001,
      [MAXFEE]: 0.1,
      [MINFEE]: 0.005,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xCc6140a667980fbA8bF650b4aEC4f6e7Aff3a37F',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 1000,
      [DEPOSIT_MIN_NUM]: 0.01,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V1'
      }
    },
    '0xc7c64ac6d46be3d6ea318ec6276bb55291f8e496': { // USDT
      [NAME]: 'ANY Tether',
      [SYMBOL]: config.prefix + 'USDT',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0x78917333bec47cee1022b31a136d31feff90d6fb',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 5,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x94e840798e333cB1974E086B58c10C374E966bc7',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V1'
      }
    },
    '0x10c43b6d6eb224d71f1831b5cdd6dd57bd475461': { // LTC 5
      [NAME]: 'Litecoin' + config.suffix,
      [SYMBOL]: 'aLTC',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x412A3fe4DB6b5A73f7F460d10a009BEc0C44B24c',
      [REDEEM_MAX_NUM]: 20000,
      [REDEEM_MIN_NUM]: 0.2,
      [FEE]: 0.001,
      [MAXFEE]: 0.5,
      [MINFEE]: 0.07,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: 'LU8AFfxreA4srSH6rYWAoivzH3U35iBiPK',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 20000,
      [DEPOSIT_MIN_NUM]: 0.1,
      [EXTENDOBJ]: {
        VERSION: 'V2'
      },
    },
    '0x871501a8d698169d1fe4c1af3c7e011959f484a6': { // LINK 6
      [NAME]: 'ANY Chainlink',
      [SYMBOL]: config.prefix + 'LINK',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x05E63B49F0046dbaFeeCe7180Ca1d447706AEff3',
      [REDEEM_MAX_NUM]: 20000,
      [REDEEM_MIN_NUM]: 2,
      [FEE]: 0.001,
      [MAXFEE]: 5,
      [MINFEE]: 0.5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x46290B0c3A234E3d538050d8F34421797532A827',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 20000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x480327ccb4e3fd906212868e2f4b6dfa564aabca': { // DAI 23
      [NAME]: 'ANY Dai',
      [SYMBOL]: config.prefix + 'DAI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xD21097E7566dd64b86cB23eE98aE66d2734e229F',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x46290B0c3A234E3d538050d8F34421797532A827',
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
    '0x6780bc1357dc0b6aa39224f53dc8aeceb093b6ff': { // UNI 34
      [NAME]: 'ANY Uniswap',
      [SYMBOL]: config.prefix + 'UNI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x2F8cC99f9dea45306ec91612c67c2de36b825f9A',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x94e840798e333cB1974E086B58c10C374E966bc7',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V1'
      }
    },
    '0xc0d7857b10551f784c80942b7e8b5abfa373d802': { // COMP 36
      [NAME]: 'ANY Compound',
      [SYMBOL]: config.prefix + 'COMP',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x077DE35f802FD5f062036Ff47182Cb73f537b215',
      [REDEEM_MAX_NUM]: 2000,
      [REDEEM_MIN_NUM]: 0.2,
      [FEE]: 0.001,
      [MAXFEE]: 0.5,
      [MINFEE]: 0.05,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x46290B0c3A234E3d538050d8F34421797532A827',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 2000,
      [DEPOSIT_MIN_NUM]: 0.05,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x709abf1d66b1758676940a3ee995a39056a66faf': { // OMG 37
      [NAME]: 'ANY OMG',
      [SYMBOL]: config.prefix + 'OMG',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x5c98B4a17dc92340eA6340719137cBc91c727928',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 8,
      [FEE]: 0.001,
      [MAXFEE]: 20,
      [MINFEE]: 2,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x46290B0c3A234E3d538050d8F34421797532A827',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x041f279c67faef37544014d7247824c0945098a8': { // YFI 40
      [NAME]: 'ANY yearn.finance',
      [SYMBOL]: config.prefix + 'YFI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xca3AeA410F70bEd55c992B6c418C23f86723D601',
      [REDEEM_MAX_NUM]: 20,
      [REDEEM_MIN_NUM]: 0.002,
      [FEE]: 0.001,
      [MAXFEE]: 0.01,
      [MINFEE]: 0.001,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x46290B0c3A234E3d538050d8F34421797532A827',
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
    '0x688b72f103a7e8e4206c495f2e620c001a06b7b4': { // Hegic 257
      [NAME]: 'ANY Hegic',
      [SYMBOL]: config.prefix + 'HEGIC',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xE77db24949717C80ed7bE1598C4f34Ce085936A8',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 100,
      [FEE]: 0.001,
      [MAXFEE]: 250,
      [MINFEE]: 25,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x46290B0c3A234E3d538050d8F34421797532A827',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 1000000,
      [DEPOSIT_MIN_NUM]: 3,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xf705b20357f00c535f599a73a10da6bfaccf676e': { // RIO 696
      [NAME]: 'ANY Realio Network',
      [SYMBOL]: config.prefix + 'RIO',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x206F5138Bb23CB9fDC79D44065c0605E6f623167',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x46290B0c3A234E3d538050d8F34421797532A827',
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
    '0x928b76c83e903f2e5e8119dd1037e2da1646dcee': { // ENQ 1172
      [NAME]: 'ANY Enecuum',
      [SYMBOL]: config.prefix + 'ENQ',
      [DECIMALS]: 10,
      [EXCHANGE_ADDRESS]: '0xe036648C2dd5C48bBc6Dc00a4137f44f776F76EF',
      [REDEEM_MAX_NUM]: 25000000,
      [REDEEM_MIN_NUM]: 2500,
      [FEE]: 0.001,
      [MAXFEE]: 6000,
      [MINFEE]: 600,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x46290B0c3A234E3d538050d8F34421797532A827',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000000,
      [DEPOSIT_MIN_NUM]: 60,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },

    '0xe8c537e655cab73e6a7d902c0bbe7edf9e755274': { // ZLOT 2645
      [NAME]: 'ANY zLOT Finance',
      [SYMBOL]: config.prefix + 'ZLOT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x49B314A0D13E6B63d2eBB561792762e04BC887eC',
      [REDEEM_MAX_NUM]: 200,
      [REDEEM_MIN_NUM]: 0.02,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 0.005,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x46290B0c3A234E3d538050d8F34421797532A827',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200,
      [DEPOSIT_MIN_NUM]: 0.0005,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x35e0f7499bcb1e41b4027e26ab074108e90631a0': { // LC
      [NAME]: 'Lichang Token',
      [SYMBOL]: 'LC',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x8F0B2B672a41c8Ecd5d5b0226620005EDd223757',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]:  {}
    },
    '0x20dd2f2bfa4ce3eaec5f57629583dad8a325872a': { // FUSE
      [NAME]: 'Fusionite',
      [SYMBOL]: 'FUSE',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xe96aC326eceA1a09aE6E47487c5D8717f73d5A7e',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]:  {}
    },
    '0x4a184ae0cd7d0ce04fe69e68aed15b16bc8da408': { // anyKOBE
      [NAME]: 'KOBE',
      [SYMBOL]: config.prefix + 'KOBE',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x89643629738fab0e15e54d577f88b2df0b3010a2',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x46290B0c3A234E3d538050d8F34421797532A827',
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
    'XRP': { // XRP
      [NAME]: 'ANY XRP',
      [SYMBOL]: config.prefix + 'XRP',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: 'XRP',
      [REDEEM_MAX_NUM]: 100,
      [REDEEM_MIN_NUM]: 0.00001,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(1),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    }
  },
  46688: {
    '0xc20b5e92e1ce63af6fe537491f75c19016ea5fb4': { // ANY
      [NAME]: 'Anyswap',
      [SYMBOL]: 'ANY',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x4dee5f0705ff478b452419375610155b5873ef5b',
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
    '0xeb4f1aa32511fda1fcb1d2cf2fc5475f3b340822': { // HCC
      [NAME]: 'HCCToken',
      [SYMBOL]: 'HCC',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x62db612bf3ad954d62def707193be1c47c197100',
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
    '0x67198ea7208d00864a36bcf9c98a6352b2941de9': { // USDT
      [NAME]: 'ANY Tether',
      [SYMBOL]: 'aUSDT',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0xaf5a16aaad4c52a3005b1af129dbae28b232a3b2',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 10,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x801372C03D571eC2114191bd94bbEDd794457924',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 4, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xbe7da13819d99af2c67aeeb77300dd209efc25d3': { // ETH
      [NAME]: 'ANY Ethereum',
      [SYMBOL]: 'aETH',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x27aa624a4450ecd2e12bf6bbc103ba9bd784ca70',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 0.1,
      [MINFEE]: 0.005,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x801372C03D571eC2114191bd94bbEDd794457924',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 4, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x602aa2dd3581e2896bb82b83eb25345d6617b317': { // LINK
      [NAME]: 'ANY LINK',
      [SYMBOL]: 'LINK',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 0.1,
      [MINFEE]: 0.005,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 4, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x6159f8524562c7b6954c1134beca6dec62677f51': { // BTC
      [NAME]: 'ANY Bitcoin',
      [SYMBOL]: 'aBTC',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0xc375117c72c3a5698cf5a37087f8fd3154e498a2',
      [REDEEM_MAX_NUM]: 20,
      [REDEEM_MIN_NUM]: 0.002,
      [FEE]: 0.001,
      [MAXFEE]: 0.01,
      [MINFEE]: 0.001,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: 'mmBUP62PJNDndtSvH4ef65gUAucgQY5dqA',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 20,
      [DEPOSIT_MIN_NUM]: 0.0005,
      [EXTENDOBJ]:  {}
    },
    '0x127f3025bb866f69ecffda266c0d84ed0ee3d05a': { // CYC
      [NAME]: 'CYCoin',
      [SYMBOL]: 'CYC',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xf0f4de212b1c49e2f98fcf574e5746507a9cac44',
      [REDEEM_MAX_NUM]: 20,
      [REDEEM_MIN_NUM]: 0.002,
      [FEE]: 0.001,
      [MAXFEE]: 0.01,
      [MINFEE]: 0.001,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 20,
      [DEPOSIT_MIN_NUM]: 0.0005,
      [EXTENDOBJ]:  {}
    },
    '0x1c7d31a34fb0bac76352c9640ea44a2ab9d85239': { // USC
      [NAME]: 'USC Token',
      [SYMBOL]: 'USC',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xe6c864a57503d99238998b9aca1543dec208b24e',
      [REDEEM_MAX_NUM]: 100,
      [REDEEM_MIN_NUM]: 0.00001,
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
    }
  }
}