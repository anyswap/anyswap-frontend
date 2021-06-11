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
    '0x7c598c96d02398d89fbcb9d41eab3df0c16f227d': { // AMP
      [NAME]: 'Amp',
      [SYMBOL]: 'AMP',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x9560ed0bc8d209653f31a94aa566d72252ff2117',
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
    '0xfbdd194376de19a88118e84e279b977f165d01b8': { // BIFI
      [NAME]: 'beefy.finance',
      [SYMBOL]: 'BIFI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x130ad9a69aafd9e0cbe0da0c14cc993cd87df472',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x171a9377C5013bb06Bca8CfE22B9C007f2C319F1',
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
    '0xc9baa8cfdde8e328787e29b4b078abf2dadc2055': { // FRY
      [NAME]: 'Foundry Logistics Token',
      [SYMBOL]: 'FRY',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xd471028ac862261ff88ddc98c4949b541a0c8101',
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
    '0xa649325aa7c5093d12d6f98eb4378deae68ce23f': { // BNB
      [NAME]: 'Binance',
      [SYMBOL]: 'BNB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x49625bba77b61734d5fbb24d0d50c8ffe1aadcd2',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x171a9377C5013bb06Bca8CfE22B9C007f2C319F1',
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
    '0xf390830df829cf22c53c8840554b98eafc5dcbc2': { // BCP
      [NAME]: 'BitcashPay',
      [SYMBOL]: 'BCP',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x4e20a5c7d90615149c6a27a2c4ed26c7b59850c4',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x171a9377C5013bb06Bca8CfE22B9C007f2C319F1',
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
    '0x735abe48e8782948a37c7765ecb76b98cde97b0f': { // TRYb
      [NAME]: 'BiLira',
      [SYMBOL]: 'TRYb',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0xbdac55951ff103eddd0f9107f1d9dbfa0c5b3c72',
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
    '0x97513e975a7fa9072c72c92d8000b0db90b163c5': { // EURS
      [NAME]: 'STASIS EURS Token',
      [SYMBOL]: 'EURS',
      [DECIMALS]: 2,
      [EXCHANGE_ADDRESS]: '0x8bd4d2c419a0f22d2fdaf082c7eb3a5857c433db',
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
    '0xacd7b3d9c10e97d0efa418903c0c7669e702e4c0': { // ELE
      [NAME]: 'Eleven.finance',
      [SYMBOL]: 'ELE',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x91e17a6aa559da5d48825e05ede9bcea65f330c2',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x171a9377C5013bb06Bca8CfE22B9C007f2C319F1',
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
    '0xf480f38c366daac4305dc484b2ad7a496ff00cea': { // GTON
      [NAME]: 'Graviton',
      [SYMBOL]: 'GTON',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x9da1214c5152994a870033d1881ea90c21235aa6',
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
    '0x3405a1bd46b85c5c029483fbecf2f3e611026e45': { // BTD
      [NAME]: 'Bat True Dollar',
      [SYMBOL]: 'BTD',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xb108c1cf59b30801c805e1b76fc2497cc5998082',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x171a9377C5013bb06Bca8CfE22B9C007f2C319F1',
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
    '0x6b7a87899490ece95443e979ca9485cbe7e71522': { // ONE
      [NAME]: 'Harmony',
      [SYMBOL]: 'ONE',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x1b8d25143706a94471a9b08f753dc4215811a40a',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x49d1ACc5695e7bBCFFd6063974Cd8ceca5Aa8b69',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {
        BRIDGE: [
          { type: 1666600000, isSwitch: 1 }
        ],
        VERSION: 'V2'
      },
    },
    '0x38389eb214c4ac1cdda7a7582ab01e8a9bb548ba': { // MFI
      [NAME]: 'MarginSwap',
      [SYMBOL]: 'MFI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x73159aff2beec97b8cdae2acf2b154881fc0d33e',
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
    '0x53098a3656de0c1ee8dcf004e6a0e886b2968a2f': { // DPET
      [NAME]: 'My DeFi Pet Token',
      [SYMBOL]: 'DPET',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x9527955fcfe33bf4c9d444c79591849999c7d41d',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x171a9377C5013bb06Bca8CfE22B9C007f2C319F1',
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
    '0x130966628846bfd36ff31a822705796e8cb8c18d': { // ESWAP
      [NAME]: 'eSwapping',
      [SYMBOL]: 'ESWAP',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x0bb92524ad3e1882be584e4cf93c952be7a52e58',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x171a9377C5013bb06Bca8CfE22B9C007f2C319F1',
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
    '0x9fb83c0635de2e815fd1c21b3a292277540c2e8d': { // BUSD
      [NAME]: 'Binance-Peg BUSD Token',
      [SYMBOL]: 'BUSD',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xfa6040bc6a6ceb3aaa5224871801758197c74413',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x171a9377C5013bb06Bca8CfE22B9C007f2C319F1',
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
    '0xe3ab61371ecc88534c522922a026f2296116c109': { // MOMA
      [NAME]: 'MOchi MArket',
      [SYMBOL]: 'MOMA',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x30c88bbe158aca390dea50ccf3f7ff7e1eae5ee4',
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
    '0x6ccf12b480a99c54b23647c995f4525d544a7e72': { // START
      [NAME]: 'BSCstarter',
      [SYMBOL]: 'START',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xd14c0fc1b207541b13163a24762a3f2fdc071161',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x171a9377C5013bb06Bca8CfE22B9C007f2C319F1',
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
    '0x3053ad3b31600074e9a90440770f78d5e8fc5a54': { // WAULTx
      [NAME]: 'Wault',
      [SYMBOL]: 'WAULTx',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x77b12423de41868c3f8e5b0c9908dc5bce0a91ea',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x171a9377C5013bb06Bca8CfE22B9C007f2C319F1',
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
    '0x5d47baba0d66083c52009271faf3f50dcc01023c': { // BANANA
      [NAME]: 'ApeSwapFinance Banana',
      [SYMBOL]: 'BANANA',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x7f19d5d73c3e4c19d8569157e4814031f730ff5f',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x171a9377C5013bb06Bca8CfE22B9C007f2C319F1',
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
    '0x1351ab0323b1127e1cfb8406adf87ca88a5a4ff6': { // CAS
      [NAME]: 'Cashaa',
      [SYMBOL]: 'CAS',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x788dc3d855ccb5b4f20eeb9a42a4ad6544c122fc',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x171a9377C5013bb06Bca8CfE22B9C007f2C319F1',
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