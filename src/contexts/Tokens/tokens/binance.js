import config from '../../../config/index.js'
import {BNB_MAIN_CHAINID, BNB_TEST_CHAINID} from '../../../config/coinbase/nodeConfig'
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
  [BNB_MAIN_CHAINID]: {
    '0xf68c9df95a18b2a5a5fa1124d79eeeffbad0b6fa': { // ANY
      [NAME]: 'Anyswap' + config.suffix,
      [SYMBOL]: 'ANY',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x095418a82bc2439703b69fbe1210824f2247d77c',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xf38C36bc1B2Fe5E9029C91AB520457bE7DFC68D8',
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
    // '0x0e6ddf2a953842fb8efaada167bd3e7a2496aa08': { // TRX
    //   [NAME]: 'Tron coin' + config.suffix,
    //   [SYMBOL]: 'TRX',
    //   [DECIMALS]: 6,
    //   [EXCHANGE_ADDRESS]: '',
    //   [REDEEM_MAX_NUM]: 200000,
    //   [REDEEM_MIN_NUM]: 10,
    //   [FEE]: 0.001,
    //   [MAXFEE]: 50,
    //   [MINFEE]: 1,
    //   [ISSWITCH]: dirSwitch(0),
    //   [ISDEPOSIT]: 1,
    //   [ISREDEEM]: 1,
    //   [DEPOSIT_ADDRESS]: 'TXSxUhgSoHkHNLgip2kQRHXVT6BqoaqtvX',
    //   [DEPOSIT_TYPE]: 1,
    //   [DEPOSIT_MAX_NUM]: 200000,
    //   [DEPOSIT_MIN_NUM]: 0.5,
    //   [EXTENDOBJ]: {
    //     BRIDGE: [
    //       { type: 'TRX', isSwitch: 1 }
    //     ],
    //     VERSION: 'V2'
    //   },
    // },
    // '0x611134123e01699a5f0eda6379c6a52df87db472': { // anyUSDTTRC20
    //   [NAME]: 'Tether USD' + config.suffix,
    //   [SYMBOL]: 'anyUSDTTRC20',
    //   [DECIMALS]: 6,
    //   [EXCHANGE_ADDRESS]: '',
    //   [REDEEM_MAX_NUM]: 200000,
    //   [REDEEM_MIN_NUM]: 10,
    //   [FEE]: 0.001,
    //   [MAXFEE]: 50,
    //   [MINFEE]: 1,
    //   [ISSWITCH]: dirSwitch(0),
    //   [ISDEPOSIT]: 1,
    //   [ISREDEEM]: 1,
    //   [DEPOSIT_ADDRESS]: 'TXSxUhgSoHkHNLgip2kQRHXVT6BqoaqtvX',
    //   [DEPOSIT_TYPE]: 1,
    //   [DEPOSIT_MAX_NUM]: 200000,
    //   [DEPOSIT_MIN_NUM]: 0.5,
    //   [EXTENDOBJ]: {
    //     BRIDGE: [
    //       { type: 'TRX', isSwitch: 1 }
    //     ],
    //     VERSION: 'V2'
    //   },
    // },
    '0x4028433877f9c14764eb93d0bb6570573da2726f': { // CYC
      [NAME]: 'CYCoin',
      [SYMBOL]: 'CYC',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x0df8810714dde679107c01503e200ce300d0dcf6',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 5,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c': { // BTCB
      [NAME]: 'Binance-Peg Bitcoin',
      [SYMBOL]: 'BTCB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xb63d5b98fa56c1a2e3b4ec7c41e38b2cf7d6dc12',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 5,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0x54261774905f3e6e9718f2abb10ed6555cae308a': { // BTC
      [NAME]: 'Bitcoin' + config.suffix,
      [SYMBOL]: 'anyBTC',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x0945b2ae9fefa0c3183d810378d94af065d5f28b',
      [REDEEM_MAX_NUM]: 20,
      [REDEEM_MIN_NUM]: 0.002,
      [FEE]: 0.001,
      [MAXFEE]: 0.01,
      [MINFEE]: 0.001,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '1MECwqonAq9UDKN838vnBuqsUCWpWyB1pN',
      [DEPOSIT_TYPE]: 0,
      [DEPOSIT_MAX_NUM]: 20,
      [DEPOSIT_MIN_NUM]: 0.0005,
      [EXTENDOBJ]:  {
        VERSION: 'V2'
      }
    },
    '0x2170ed0880ac9a755fd29b2688956bd959f933f8': { // ETH-BEP20
      [NAME]: 'Binance-Peg Ethereum',
      [SYMBOL]: 'ETHB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xad2c1d2a9a599eef950f5baf6830d68e2be34d38',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 5,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0x6f817a0ce8f7640add3bc0c1c2298635043c2423': { // ETH
      [NAME]: 'Ethereum' + config.suffix,
      [SYMBOL]: 'anyETH',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xbc2910dee5e78dbefa6579fc6b56bab2b7c8ffbf',
      [REDEEM_MAX_NUM]: 1000,
      [REDEEM_MIN_NUM]: 0.05,
      [FEE]: 0.001,
      [MAXFEE]: 0.1,
      [MINFEE]: 0.008,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x13B432914A996b0A48695dF9B2d701edA45FF264',
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
    '0x55d398326f99059ff775485246999027b3197955': { // USDT-BEP20
      [NAME]: 'Binance-Peg Tether',
      [SYMBOL]: 'USDTB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x83034714666b0eb2209aafc1b1cbb2ab9c6100db',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 5,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0xb46d67fb63770052a07d5b7c14ed858a8c90f825': { // USDT-ERC20
      [NAME]: 'Tether' + config.suffix,
      [SYMBOL]: 'anyUSDT',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0xfd942fcfacb5fbdcb19d1263e1c329379da9a98f',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x13B432914A996b0A48695dF9B2d701edA45FF264',
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
    '0x4f6318e97011fe21fdfce3ffcf868d44e5f6994a': { // FSN
      [NAME]: 'Fusion' + config.suffix,
      [SYMBOL]: 'anyFSN',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xa4c40c9743039d3836e5dafe62e84d274349d802',
      [REDEEM_MAX_NUM]: 500000,
      [REDEEM_MIN_NUM]: 40,
      [FEE]: 0.001,
      [MAXFEE]: 200,
      [MINFEE]: 20,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0xf38C36bc1B2Fe5E9029C91AB520457bE7DFC68D8',
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
    '0x2cd598b0513abdb52bdd92a1ab4670fc4578570f': { // LTC 5
      [NAME]: 'Litecoin' + config.suffix,
      [SYMBOL]: 'anyLTC',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x752c3B1F58BD17761295061BB135b7E588483b58',
      [REDEEM_MAX_NUM]: 20000,
      [REDEEM_MIN_NUM]: 0.2,
      [FEE]: 0.001,
      [MAXFEE]: 0.5,
      [MINFEE]: 0.07,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: 'Lf2GpJmz2FZM1xW5V8xo1ZvA3Rh7ZX51iQ',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 20000,
      [DEPOSIT_MIN_NUM]: 0.1,
      [EXTENDOBJ]: {
        VERSION: 'V2'
      },
    },
    '0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd': { // LINKB 6
      [NAME]: 'Binance-Peg Chainlink',
      [SYMBOL]: 'LINKB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x51B04C7D7144b6e72EbaBD23ea368Af4f8fa7aaE',
      [REDEEM_MAX_NUM]: 20000,
      [REDEEM_MIN_NUM]: 2,
      [FEE]: 0.001,
      [MAXFEE]: 5,
      [MINFEE]: 0.5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 20000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]:  {}
    },
    '0x3af577f9d8c86ae8dbcbf51fe9836c9df825759d': { // LINK 6
      [NAME]: 'Chainlink' + config.suffix,
      [SYMBOL]: 'anyLINK',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x7868b674fCeB31c8d29f1606eA60D51cc442188B',
      [REDEEM_MAX_NUM]: 20000,
      [REDEEM_MIN_NUM]: 2,
      [FEE]: 0.001,
      [MAXFEE]: 5,
      [MINFEE]: 0.5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x13B432914A996b0A48695dF9B2d701edA45FF264',
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
    '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d': { // USDCB 23
      [NAME]: 'Binance-Peg USD Coin',
      [SYMBOL]: 'USDCB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x04e952411aD37F50ea2f4F1cFC38619A9D7EE845',
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
    '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3': { // DAIB 23
      [NAME]: 'Binance-Peg Dai',
      [SYMBOL]: 'DAIB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xB2078cB7cB7019F383b475ae1D7519C5132CfF3C',
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
    '0x1dc56f2705ff2983f31fb5964cc3e19749a7cba7': { // DAI 23
      [NAME]: 'Dai' + config.suffix,
      [SYMBOL]: 'anyDAI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x76BB67676B2c9a6f366Aa517b806ed0Fa317Aa46',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x13B432914A996b0A48695dF9B2d701edA45FF264',
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
    '0xe9e7cea3dedca5984780bafc599bd69add087d56': { // BUSD 28
      [NAME]: 'Binance-Peg BUSD',
      [SYMBOL]: 'BUSDB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x34358ff75d78652f1797ebd73e8f7afa92dab501',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0xbf5140a22578168fd562dccf235e5d43a02ce9b1': { // UNIB
      [NAME]: 'Binance-Peg Uniswap',
      [SYMBOL]: 'UNIB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x3D021164741c7d84e11d9B7210C5e0d4E7C1d1d2',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]:  {}
    },
    '0x99c5a2fcc97b59fe6d0b56e21e72b002f644123f': { // UNI
      [NAME]: 'Uniswap' + config.suffix,
      [SYMBOL]: 'anyUNI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x2f9755c371c7f23aecdf1c136d233b41ce3e0d55',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x13B432914A996b0A48695dF9B2d701edA45FF264',
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
    '0x2ede13880e11b19b7d6113a86ac7ac84ac651042': { // COMP 36
      [NAME]: 'Compound' + config.suffix,
      [SYMBOL]: 'anyCOMP',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x16cad2ca4FE9b42B9dE19F4DAd60003124472f30',
      [REDEEM_MAX_NUM]: 2000,
      [REDEEM_MIN_NUM]: 0.2,
      [FEE]: 0.001,
      [MAXFEE]: 0.5,
      [MINFEE]: 0.05,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x13B432914A996b0A48695dF9B2d701edA45FF264',
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
    '0xe6358c1d7a91915abba46d9855bd6418898fc091': { // OMG 37
      [NAME]: 'OMG' + config.suffix,
      [SYMBOL]: 'anyOMG',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xD5556F7F0088915B651F6A9d68Bb0670c7D80554',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 8,
      [FEE]: 0.001,
      [MAXFEE]: 20,
      [MINFEE]: 2,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x13B432914A996b0A48695dF9B2d701edA45FF264',
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
    '0x88f1a5ae2a3bf98aeaf342d26b30a79438c9142e': { // YFIB 40
      [NAME]: 'Binance-Peg yearn.finance',
      [SYMBOL]: 'YFIB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xAd99Dcfe10630925EBD22376573a5Ee8721dCf2D',
      [REDEEM_MAX_NUM]: 20,
      [REDEEM_MIN_NUM]: 0.002,
      [FEE]: 0.001,
      [MAXFEE]: 0.01,
      [MINFEE]: 0.001,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 20,
      [DEPOSIT_MIN_NUM]: 0.0005,
      [EXTENDOBJ]:  {}
    },
    '0x9883ae441105f815b472517389b979f031b5c87e': { // YFI 40
      [NAME]: 'yearn.finance' + config.suffix,
      [SYMBOL]: 'anyYFI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xB2A16966fD1aA09D4F50AB371873f17ab4A86F42',
      [REDEEM_MAX_NUM]: 20,
      [REDEEM_MIN_NUM]: 0.002,
      [FEE]: 0.001,
      [MAXFEE]: 0.01,
      [MINFEE]: 0.001,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x13B432914A996b0A48695dF9B2d701edA45FF264',
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
    '0x4b0f1812e5df2a09796481ff14017e6005508003': { // TWT
      [NAME]: 'Binance-Peg Trust Wallet',
      [SYMBOL]: 'TWTB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x7320091690010162E91A098863bD530fEEdC3522',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82': { // Cake
      [NAME]: 'Binance-Peg PancakeSwap',
      [SYMBOL]: 'CakeB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x4D00CC3B309170888AE2bc43859f4c4dc5143711',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0xd4cb328a82bdf5f03eb737f37fa6b370aef3e888': { // CREAM
      [NAME]: 'Binance-Peg Cream',
      [SYMBOL]: 'CREAMB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xe29331A26881FFc6127c8B22dB19Ea6e960943f1',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0xae9269f27437f0fcbc232d39ec814844a51d6b8f': { // BURGER
      [NAME]: 'Binance-Peg Burger',
      [SYMBOL]: 'BURGERB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x2296c4a9186b823db1612e831808536ed451cbbe',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 5,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0xe4ae305ebe1abe663f261bc00534067c80ad677c': { // SPARTAN
      [NAME]: 'Binance-Peg SPARTAN',
      [SYMBOL]: 'SPARTANB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xd1D0C2f4291F7002E1591d2a87975f0701a3fa2C',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 5,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0x658a109c5900bc6d2357c87549b651670e5b0539': { // FOR
      [NAME]: 'Binance-Peg Force',
      [SYMBOL]: 'FORB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x1d396c3fC33A44e106665fc45cA39B3042120241',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0xe02df9e3e622debdd69fb838bb799e3f168902c5': { // BAKE
      [NAME]: 'Binance-Peg Bakery',
      [SYMBOL]: 'BAKEB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x90C8EA8ec7710034274868971C4e27edE33d9c10',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0xacd6b5f76db153fb45eae6d5be5bdbd45d1b2a8c': { // PEACH
      [NAME]: 'Binance-Peg Peach',
      [SYMBOL]: 'PEACHB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xdcb18e3230605a4c5ee6fb86031eefa8ecd63430',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 5,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0x8e9f5173e16ff93f81579d73a7f9723324d6b6af': { // MILK
      [NAME]: 'Binance-Peg Milk',
      [SYMBOL]: 'MILKB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xbd1f974bc2730e9620d91924993d30c2f96983b8',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 5,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 0,
      [ISREDEEM]: 0,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 100000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0x40929fb2008c830731a3d972950bc13f70161c75': { // TUNA
      [NAME]: 'Binance-Peg Tuna',
      [SYMBOL]: 'TUNAB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x4F171A4aEcbfcEc6467464DA7401F88dED8C891C',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0xaf53d56ff99f1322515e54fdde93ff8b3b7dafd5': { // PROM
      [NAME]: 'Binance-Peg Prometeus',
      [SYMBOL]: 'PROMB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xfeBc57bBA705C6142Cc4586F1aC6A96ce88047Be',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0x5921dee8556c4593eefcfad3ca5e2f618606483b': { // MTLX
      [NAME]: 'Mettalex' + config.suffix,
      [SYMBOL]: 'anyMTLX',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xca8bdc88ba75a62273cbcba42e34e41f97cb7dac',
      [REDEEM_MAX_NUM]: 100000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 3,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x13B432914A996b0A48695dF9B2d701edA45FF264',
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
    '0x51ba0b044d96c3abfca52b64d733603ccc4f0d4d': { // SUPER 6
      [NAME]: 'SuperFarm' + config.suffix,
      [SYMBOL]: 'SUPER',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x0e0ffdb7f4ec8d73d69c216aad4d21304f43a80d',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 100,
      [MINFEE]: 10,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x13B432914A996b0A48695dF9B2d701edA45FF264',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 10,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x232d9a35f3e0bfa1b34901cba525fe916d2af6d5': { // HT 6
      [NAME]: 'Huobi' + config.suffix,
      [SYMBOL]: 'HT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x993ba9ec0ed8b2011e281dac9be0b1b43cda9be2',
      [REDEEM_MAX_NUM]: 75000,
      [REDEEM_MIN_NUM]: 1,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x0FD4E376C6C125C276D4020EFc1842a495cb1cF3',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 75000,
      [DEPOSIT_MIN_NUM]: 1,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 128, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xc0a51ac9d548bdcde53fa59448029e41a39feb20': { // XRT
      [NAME]: 'Robonomics' + config.suffix,
      [SYMBOL]: 'XRT',
      [DECIMALS]: 9,
      [EXCHANGE_ADDRESS]: '0x5dc8196dc5fca66b04d68f2c22ca60651bd411e8',
      [REDEEM_MAX_NUM]: 36000,
      [REDEEM_MIN_NUM]: 1.08,
      [FEE]: 0.001,
      [MAXFEE]: 5.4,
      [MINFEE]: 0.54,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873B947bddC4721b1bDFF9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 36000,
      [DEPOSIT_MIN_NUM]: 1.08,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x976e33b07565b0c05b08b2e13affd3113e3d178d': { // AGA
      [NAME]: 'AGA' + config.suffix,
      [SYMBOL]: 'AGA',
      [DECIMALS]: 4,
      [EXCHANGE_ADDRESS]: '0x3ea75938ed7d68c0e3f4aa6eca391c400df80316',
      [REDEEM_MAX_NUM]: 560000,
      [REDEEM_MIN_NUM]: 16.8,
      [FEE]: 0.001,
      [MAXFEE]: 84,
      [MINFEE]: 8.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873B947bddC4721b1bDFF9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 560000,
      [DEPOSIT_MIN_NUM]: 16.8,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e': { // KEX
      [NAME]: 'KIRA' + config.suffix,
      [SYMBOL]: 'KEX',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0xa5bb87616045854d40c3462925c601acb61ef6ae',
      [REDEEM_MAX_NUM]: 750000,
      [REDEEM_MIN_NUM]: 24,
      [FEE]: 0.001,
      [MAXFEE]: 120,
      [MINFEE]: 12,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873B947bddC4721b1bDFF9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 750000,
      [DEPOSIT_MIN_NUM]: 24,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xf5c8054efc6acd25f31a17963462b90e82fdecad': { // MDA
      [NAME]: 'Moeda Loyalty Points' + config.suffix,
      [SYMBOL]: 'MDA',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x6a35d901def514fdfc69c065799567a5a6a91e61',
      [REDEEM_MAX_NUM]: 1080000,
      [REDEEM_MIN_NUM]: 32,
      [FEE]: 0.001,
      [MAXFEE]: 160,
      [MINFEE]: 16,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873B947bddC4721b1bDFF9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 1080000,
      [DEPOSIT_MIN_NUM]: 32,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x8ad96050318043166114884b59e2fc82210273b3': { // NEX
      [NAME]: 'Nash Exchange' + config.suffix,
      [SYMBOL]: 'NEX',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x165ffa2df471f44bd1b9c9edf60f1e239bcd663a',
      [REDEEM_MAX_NUM]: 786000,
      [REDEEM_MIN_NUM]: 24,
      [FEE]: 0.001,
      [MAXFEE]: 120,
      [MINFEE]: 12,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873B947bddC4721b1bDFF9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 786000,
      [DEPOSIT_MIN_NUM]: 24,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x18ac7323615f1fabf332ff4afca735eaf6dd9668': { // SOAR
      [NAME]: 'SOAR.FI' + config.suffix,
      [SYMBOL]: 'SOAR',
      [DECIMALS]: 9,
      [EXCHANGE_ADDRESS]: '0xd33e666e653aee88648ae41872317f7e1e7d0611',
      [REDEEM_MAX_NUM]: 1520000,
      [REDEEM_MIN_NUM]: 46,
      [FEE]: 0.001,
      [MAXFEE]: 230,
      [MINFEE]: 23,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873B947bddC4721b1bDFF9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 1520000,
      [DEPOSIT_MIN_NUM]: 46,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x04068da6c83afcfa0e13ba15a6696662335d5b75': { // STAKE
      [NAME]: 'STAKE' + config.suffix,
      [SYMBOL]: 'STAKE',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xc998b9f67bdda3ea0aa644242dfa33432f0c0d2e',
      [REDEEM_MAX_NUM]: 46000,
      [REDEEM_MIN_NUM]: 1.4,
      [FEE]: 0.001,
      [MAXFEE]: 7,
      [MINFEE]: 0.7,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873B947bddC4721b1bDFF9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 46000,
      [DEPOSIT_MIN_NUM]: 1.4,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xb614ad939e9477d5103baa32164db901214e2625': { // TFT
      [NAME]: 'The Famous' + config.suffix,
      [SYMBOL]: 'TFT',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0xd6ff112faa54962e574ed4e59854835ffad7f714',
      [REDEEM_MAX_NUM]: 25000,
      [REDEEM_MIN_NUM]: 0.8,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873B947bddC4721b1bDFF9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000,
      [DEPOSIT_MIN_NUM]: 0.8,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xf4a71809fd0d5715a9685caadb6f0d8beafdf8af': { // PFI
      [NAME]: 'Protocol Finance' + config.suffix,
      [SYMBOL]: 'PFI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x43eb60f8060983b18cd2358dcd54393373c2f010',
      [REDEEM_MAX_NUM]: 25000,
      [REDEEM_MIN_NUM]: 0.8,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000,
      [DEPOSIT_MIN_NUM]: 0.8,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xc417b45e6090bd4201d9400b48f84c9f34f4d0a5': { // PREMIA
      [NAME]: 'Premia' + config.suffix,
      [SYMBOL]: 'PREMIA',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xb673955c27f676870797323ca8cdd7750df2d924',
      [REDEEM_MAX_NUM]: 25000,
      [REDEEM_MIN_NUM]: 0.8,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000,
      [DEPOSIT_MIN_NUM]: 0.8,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x37bdfd6ed491ee0e0fe2ce49de2cb573880e3734': { // MFI
      [NAME]: 'MarginSwap' + config.suffix,
      [SYMBOL]: 'MFI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x7fadbcbedfcc6ca8ec97424d01ad5f9070d3bdb2',
      [REDEEM_MAX_NUM]: 25000,
      [REDEEM_MIN_NUM]: 0.8,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000,
      [DEPOSIT_MIN_NUM]: 0.8,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xfa850eca95c34aa7dcd4213868ead3ec8927416f': { // DRGN
      [NAME]: 'Dragon' + config.suffix,
      [SYMBOL]: 'DRGN',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x05d3a959e4c83f6e24279972deed40c556f93463',
      [REDEEM_MAX_NUM]: 25000,
      [REDEEM_MIN_NUM]: 0.8,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000,
      [DEPOSIT_MIN_NUM]: 0.8,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x9899a98b222fcb2f3dbee7df45d943093a4ff9ff': { // DFD
      [NAME]: 'DefiDollar DAO' + config.suffix,
      [SYMBOL]: 'DFD',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x653d11e336205cff78f906d42bca840c2f9c8f01',
      [REDEEM_MAX_NUM]: 25000,
      [REDEEM_MIN_NUM]: 0.8,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000,
      [DEPOSIT_MIN_NUM]: 0.8,
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
      [EXCHANGE_ADDRESS]: '0x84017a5ba6b535a359a69d3de7ec71373bb3a15f',
      [REDEEM_MAX_NUM]: 25000,
      [REDEEM_MIN_NUM]: 0.8,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000,
      [DEPOSIT_MIN_NUM]: 0.8,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x1ac0d76f11875317f8a7d791db94cdd82bd02bd1': { // AST
      [NAME]: 'AirSwap' + config.suffix,
      [SYMBOL]: 'AST',
      [DECIMALS]: 4,
      [EXCHANGE_ADDRESS]: '0xe93b5ec83b88a83c1710dfa99199dd8afe687211',
      [REDEEM_MAX_NUM]: 25000,
      [REDEEM_MIN_NUM]: 0.8,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000,
      [DEPOSIT_MIN_NUM]: 0.8,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x6a545f9c64d8f7b957d8d2e6410b52095a9e6c29': { // Cfi
      [NAME]: 'CyberFi' + config.suffix,
      [SYMBOL]: 'CFi',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x45e9f73460969babc26913e7898e3ae41ce59c7f',
      [REDEEM_MAX_NUM]: 25000,
      [REDEEM_MIN_NUM]: 0.8,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000,
      [DEPOSIT_MIN_NUM]: 0.8,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x148e03bee63200414aa68d52b1fed6c9b4defa2a': { // TRYb
      [NAME]: 'BiLira' + config.suffix,
      [SYMBOL]: 'TRYb',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0xec90e61b65738b39aa7c325e1e7c71f0ef24bbb4',
      [REDEEM_MAX_NUM]: 25000,
      [REDEEM_MIN_NUM]: 0.8,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000,
      [DEPOSIT_MIN_NUM]: 0.8,
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
      [EXCHANGE_ADDRESS]: '0xa04c616d6e5870b439765fa09f6b554a938eb360',
      [REDEEM_MAX_NUM]: 25000,
      [REDEEM_MIN_NUM]: 0.8,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000,
      [DEPOSIT_MIN_NUM]: 0.8,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xab671ea900a8e3c959f5bd29ceb5e370ba75bb9e': { // DPI
      [NAME]: 'DefiPulse Index' + config.suffix,
      [SYMBOL]: 'DPI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x44c206285a64b81c00e65065f4e5048638d7ef98',
      [REDEEM_MAX_NUM]: 25000,
      [REDEEM_MIN_NUM]: 0.8,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000,
      [DEPOSIT_MIN_NUM]: 0.8,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x9e0846677ea91ea5308d3f525c09e782ef17da21': { // KIF
      [NAME]: 'KittenFinance' + config.suffix,
      [SYMBOL]: 'KIF',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x0a657f188065ed9834314989b236aa6798b278d4',
      [REDEEM_MAX_NUM]: 25000,
      [REDEEM_MIN_NUM]: 0.8,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000,
      [DEPOSIT_MIN_NUM]: 0.8,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xa86bfc69c99d04552808b425a68a06430fb9bddf': { // WSCRT
      [NAME]: 'Wrapped SCRT' + config.suffix,
      [SYMBOL]: 'WSCRT',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0x816218fdedf3b4edf8ca6c445df1d15a6095eb5a',
      [REDEEM_MAX_NUM]: 25000,
      [REDEEM_MIN_NUM]: 0.8,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000,
      [DEPOSIT_MIN_NUM]: 0.8,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x43fbbe7a5397117b3da58722635832ba60905285': { // eRSDL
      [NAME]: 'UnFederalReserveToken' + config.suffix,
      [SYMBOL]: 'eRSDL',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x528fd2188aaf6561b892c26aed5e3c70a3da6610',
      [REDEEM_MAX_NUM]: 25000,
      [REDEEM_MIN_NUM]: 0.8,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000,
      [DEPOSIT_MIN_NUM]: 0.8,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x4b5c23cac08a567ecf0c1ffca8372a45a5d33743': { // FARM
      [NAME]: 'FARM Reward' + config.suffix,
      [SYMBOL]: 'FARM',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xdb55bba9f7fa8b5daa363941abf0a8d5f9d334ad',
      [REDEEM_MAX_NUM]: 25000,
      [REDEEM_MIN_NUM]: 0.8,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000,
      [DEPOSIT_MIN_NUM]: 0.8,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xeaf26191ac1d35ae30baa19a5ad5558dd8156aef': { // NORD
      [NAME]: 'Nord' + config.suffix,
      [SYMBOL]: 'NORD',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x154c9f4bffd1f67f22fe98f7677268399440295f',
      [REDEEM_MAX_NUM]: 25000,
      [REDEEM_MIN_NUM]: 0.8,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000,
      [DEPOSIT_MIN_NUM]: 0.8,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x3516141b1ac8751c2042a8a1bc411ab8655464ac': { // OCEAN
      [NAME]: 'Ocean' + config.suffix,
      [SYMBOL]: 'OCEAN',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x5e1d2226668e15638051304af717a07c71195e99',
      [REDEEM_MAX_NUM]: 25000,
      [REDEEM_MIN_NUM]: 0.8,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000,
      [DEPOSIT_MIN_NUM]: 0.8,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x564bef31ec942ffe1bff250786f76a5c5141b9f3': { // eQUAD
      [NAME]: 'QuadrantProtocol' + config.suffix,
      [SYMBOL]: 'eQUAD',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x878dcf847cce610c629bdebc230eeb8e7dd68faa',
      [REDEEM_MAX_NUM]: 25000,
      [REDEEM_MIN_NUM]: 0.8,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000,
      [DEPOSIT_MIN_NUM]: 0.8,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x021750e46a47b2a02f4f860c93dcc774b1aba1d5': { // CHART
      [NAME]: 'ChartEx' + config.suffix,
      [SYMBOL]: 'CHART',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xef4383b97e2f532988d365f994d213e674fdc14c',
      [REDEEM_MAX_NUM]: 25000,
      [REDEEM_MIN_NUM]: 0.8,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000,
      [DEPOSIT_MIN_NUM]: 0.8,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xf0199b61a487e318122a8acc1530370b73fa6c17': { // FRONT
      [NAME]: 'Frontier' + config.suffix,
      [SYMBOL]: 'FRONT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x8bb8cb5a2c0a0d589fc48d4dc239493901dcbb46',
      [REDEEM_MAX_NUM]: 25000,
      [REDEEM_MIN_NUM]: 0.8,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000,
      [DEPOSIT_MIN_NUM]: 0.8,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x4d338614fc25afe6edf3994f331b4bad32fb3c6a': { // FAST
      [NAME]: 'FastSwapToken' + config.suffix,
      [SYMBOL]: 'FAST',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x8b9c0d66d346a371001304a5613dc11d1cb213b0',
      [REDEEM_MAX_NUM]: 25000,
      [REDEEM_MIN_NUM]: 0.8,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000,
      [DEPOSIT_MIN_NUM]: 0.8,
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
      [EXCHANGE_ADDRESS]: '0x1479737f27f388193ca0e1652096429d2559646a',
      [REDEEM_MAX_NUM]: 25000,
      [REDEEM_MIN_NUM]: 0.8,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000,
      [DEPOSIT_MIN_NUM]: 0.8,
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
      [EXCHANGE_ADDRESS]: '0x1984eb54c7dd99983013c6a3e60661bd706711ce',
      [REDEEM_MAX_NUM]: 25000,
      [REDEEM_MIN_NUM]: 0.8,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000,
      [DEPOSIT_MIN_NUM]: 0.8,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x4ec16da4c9007462de151c0da9f5426c69978a7b': { // AGAr
      [NAME]: 'AGA Rewards' + config.suffix,
      [SYMBOL]: 'AGAr',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x270c1930a3267c6868418c4ae7751ee19ec959e6',
      [REDEEM_MAX_NUM]: 25000,
      [REDEEM_MIN_NUM]: 0.8,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000,
      [DEPOSIT_MIN_NUM]: 0.8,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0x2e8fd877cc691eda244fdfe000c91b22a498ab3f': { // CTSI
      [NAME]: 'Cartesi Token' + config.suffix,
      [SYMBOL]: 'CTSI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x6383b683f71ab62cdddda15e9916b4b41ab3e0df',
      [REDEEM_MAX_NUM]: 25000,
      [REDEEM_MIN_NUM]: 0.8,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 25000,
      [DEPOSIT_MIN_NUM]: 0.8,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xeca41281c24451168a37211f0bc2b8645af45092': { // TPT
      [NAME]: 'TokenPocket' + config.namePrefix,
      [SYMBOL]: 'TPT',
      [DECIMALS]: 4,
      [EXCHANGE_ADDRESS]: '0x41c98554c1474cdb644589351d53aa554b8b99e2',
      [REDEEM_MAX_NUM]: 10000000,
      [REDEEM_MIN_NUM]: 200,
      [FEE]: 0.001,
      [MAXFEE]: 800,
      [MINFEE]: 80,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x13B432914A996b0A48695dF9B2d701edA45FF264',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 10000000,
      [DEPOSIT_MIN_NUM]: 200,
      [EXTENDOBJ]: {
        BRIDGE: [
          { type: 1, isSwitch: 1 }
        ],
        VERSION: 'V2',
        APPROVE: '0xc4f7ed85546486f7579fd59e2ea3f6684820c7c0',
        APPROVELIMIT: 0
      },
    },
    '0x93d5a19a993d195cfc75acdd736a994428290a59': { // ORE
      [NAME]: 'OREO',
      [SYMBOL]: 'ORE',
      [DECIMALS]: 10,
      [EXCHANGE_ADDRESS]: '0x6b91ee7eee3f43760e7e3f4bfc4e3bb21cbf5d29',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 10,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 200000,
      [DEPOSIT_MIN_NUM]: 0.5,
      [EXTENDOBJ]: {},
    },
    '0x049d68029688eabf473097a2fc38ef61633a3c7a': { // fUSDT
      [NAME]: 'Frapped USDT' + config.suffix,
      [SYMBOL]: 'fUSDT',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0xc1e8db29e0255a7d11cd9fc4bf56294bf695ed22',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xbfdcce6ab5533a8b285a86116c957808e118c3b6': { // MYM
      [NAME]: 'Moyom' + config.suffix,
      [SYMBOL]: 'MYM',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xf7de1d13190e9f707424de858b3babf9ee807abc',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x1f7216fdb338247512ec99715587bb97bbf96eae': { // bBADGER
      [NAME]: 'Moyom' + config.suffix,
      [SYMBOL]: 'bBADGER',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xf89d7f0a1c698600888fdd4f16d39d84de1d348d',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xc4726d59761a35e3a7e8d4eac631d034aa68ee3c': { // HDI
      [NAME]: 'HEIDI' + config.suffix,
      [SYMBOL]: 'HDI',
      [DECIMALS]: 2,
      [EXCHANGE_ADDRESS]: '0x72e429d680ca6b836b23da4c274a75960131b84e',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x7dd300a2d3f881f44b33c96fb751746e9a0175a8': { // GDAO
      [NAME]: 'Governor' + config.suffix,
      [SYMBOL]: 'GDAO',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xea7f5d359e742b6ca9e4f1befca490f394629360',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xad260f380c9a30b1d60e4548a75010ede630b665': { // BIFI
      [NAME]: 'BIFI' + config.suffix,
      [SYMBOL]: 'BIFI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x159815cd8f629194f326ceb486322cc80d12453d',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x84c882a4d8eb448ce086ea19418ca0f32f106117': { // BFC
      [NAME]: 'Bifrost' + config.suffix,
      [SYMBOL]: 'BFC',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x1010cb2504a2522bd9d96ed7deb5042cea307d29',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x58a746553fff813f4301bc5605aaafc487b5328b': { // RAZOR
      [NAME]: 'RAZOR' + config.suffix,
      [SYMBOL]: 'RAZOR',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x9c9649460c94a61f8f102255e7ed28b3df7a604b',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x72449ed79841981b19d4552861007a63da3963fe': { // ETHIX
      [NAME]: 'Ethix' + config.suffix,
      [SYMBOL]: 'ETHIX',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xc4985ae573fb6861f270f7cc8b8b8cb1890f140f',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xe1e66e037dc20247c2fabda5ec89c911e68724e7': { // DFX
      [NAME]: 'Definitex' + config.suffix,
      [SYMBOL]: 'DFX',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xc15d9e86716e405f8a5588c110603ba112b623e0',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x1f63670f1fac519ec57fca17b986871d6cf7b52f': { // STA
      [NAME]: 'Statera' + config.suffix,
      [SYMBOL]: 'STA',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xfcfba78df95b48bb5fcf4e361c553286fe077183',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x812764fa37a4fd731a5d39f0e519b6b8d61e82a0': { // DAO 
      [NAME]: 'DAO Maker' + config.suffix,
      [SYMBOL]: 'DAO',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xef2bbac3a98c4646e0dbb41321cd4b39b64877b3',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xce57283ce0e7446364e0bc479b5de5d74b5e0ffc': { // PKG 
      [NAME]: 'PKG Token' + config.suffix,
      [SYMBOL]: 'PKG',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x18db2f17f8f8e78aaeffa501ec55673ff0874a63',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x99889048584c710b3a2383e322dd3841e2c77d34': { // XIV  
      [NAME]: 'INVERSE' + config.suffix,
      [SYMBOL]: 'XIV',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x7c8335751f11bd310f97fa3ad8da4cdadce735e1',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x2442afe6cf6958bf6a026bce5d9c6cc07e03a6c9': { // YFL   
      [NAME]: 'YFLink' + config.suffix,
      [SYMBOL]: 'YFL',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xfae998597517c267fc965d94b268b6d5c257e394',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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




    
    '0x5621b5a3f4a8008c4ccdd1b942b121c8b1944f1f': { // XED   
      [NAME]: 'Exeedme' + config.suffix,
      [SYMBOL]: 'XED',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xaD5a1Cd9b9f04a607d1c9CBebbED74a82a56888a',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x62334d3c6f48891deed7324abd0a3dcb23305f77': { // SPDR   
      [NAME]: 'SpiderDAO Token' + config.suffix,
      [SYMBOL]: 'SPDR',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x325db0fe89b6bd2c1af2160b82454c9caa7d2e2c',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xc56406efdea74e00207e4026617e8a888376404e': { // ROOBEE   
      [NAME]: 'ROOBEE' + config.suffix,
      [SYMBOL]: 'ROOBEE',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xbbde0384d02e7e124600a066672b649ca244d24a',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x96058f8c3e16576d9bd68766f3836d9a33158f89': { // BONDLY   
      [NAME]: 'Bondly Token' + config.suffix,
      [SYMBOL]: 'BONDLY',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x34ce782178354928b86588516cebec19734595fd',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x794f976c12b2616fa2af3f38a73d3b61fbf68661': { // HGET   
      [NAME]: 'Hedget' + config.suffix,
      [SYMBOL]: 'HGET',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0x66768e98b03e74e0377351136ecd0fde6c98cc56',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xe9b9c1c38dab5eab3b7e2ad295425e89bd8db066': { // PCNT   
      [NAME]: 'Playcent' + config.suffix,
      [SYMBOL]: 'PCNT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x847cb14f5569c0ae43324e627c2e93d3b1b4c1de',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x9179089a11feddc9411236b63c8aeb25eb45e2ac': { // LIEN   
      [NAME]: 'lien' + config.suffix,
      [SYMBOL]: 'LIEN',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x7ae3ffcb027edd4a7312743d2c7dc299d8be5b33',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x749fec660a245f8b4c3b9bbc8a1ebf1c22863c8e': { // PARETO   
      [NAME]: 'Pareto Network Token' + config.suffix,
      [SYMBOL]: 'PARETO',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x82b294661972c53feda061125975a593ce3cbfe8',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x277be44551a8c4d4004e2091ff7d3f69be21782f': { // RAMP   
      [NAME]: 'RAMP DEFI' + config.suffix,
      [SYMBOL]: 'RAMP',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x336316295c8f3ac94ff9a008869e500da2f9d015',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xc2c23a86def9e9f5972a633b3d25f7ecbfa5e575': { // LAYER   
      [NAME]: 'Unilayer' + config.suffix,
      [SYMBOL]: 'LAYER',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x5d7eefdaa86a1ac0667288a2b98acaef3360f217',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xea8c5b9c537f3ebbcc8f2df0573f2d084e9e2bdb': { // SMDX    
      [NAME]: 'SOMIDAX' + config.suffix,
      [SYMBOL]: 'SMDX',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x6bcd520768762bb9359bdf59c5ecb47450a3617e',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xc325bd4c437a9a78eb8de486b5321253e650cf0d': { // DEGEN    
      [NAME]: 'DEGEN Index' + config.suffix,
      [SYMBOL]: 'DEGEN',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xe8cd9efa19766a3e9b99ffe939c5b4f1ea7f6586',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xebd49b26169e1b52c04cfd19fcf289405df55f80': { // ORBS    
      [NAME]: 'Orbs' + config.suffix,
      [SYMBOL]: 'ORBS',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xad1b7e3215995c80ce32c0ae9ae5fbdfdbaeb96a',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x7b2223aa112c08356b10e4675ce32724a10fac51': { // ARMOR    
      [NAME]: 'Armor' + config.suffix,
      [SYMBOL]: 'ARMOR',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x2ec3d3a2b5f25895f62cd9ea68b2f65414cb1a79',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xcfb24d3c3767364391340a2e6d99c64f1cbd7a3d': { // LPOOL    
      [NAME]: 'Launchpool token' + config.suffix,
      [SYMBOL]: 'LPOOL',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x640974cc2f0622d2a68bc3d0c1ee2f18b67e0313',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xd4fbc57b6233f268e7fba3b66e62719d74deecbc': { // MOD    
      [NAME]: 'Modefi' + config.suffix,
      [SYMBOL]: 'MOD',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x7b604ee9b725667aaf24373cc3d55f70eeb45484',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xb235163f7f567b97d33775bfde6811e43212c098': { // QKC    
      [NAME]: 'QuarkChain Token' + config.suffix,
      [SYMBOL]: 'QKC',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xb4f5a3e703c0b5780da381374cac9865c41eb951',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x19c91764a976ac6c1e2c2e4c5856f2939342a814': { // PAR    
      [NAME]: 'Parachute' + config.suffix,
      [SYMBOL]: 'PAR',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xcc3889597d571fc8c9fefdef25b15ba070184a97',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x5478a575ece4fb4768d1d43edf5826cfe1c6225a': { // BT    
      [NAME]: 'BT.Finance' + config.suffix,
      [SYMBOL]: 'BT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xdf338f9bced2053175c398aa130537c83fc4081f',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xac118686565af7393b0843587d483cbded9c3baf': { // EDDA    
      [NAME]: 'EDDA' + config.suffix,
      [SYMBOL]: 'EDDA',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x7371bec4bce269e97a8862d7b2209177b9d66d32',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xe7b91602ce96a537cb729f484b8ddb3c1fecbb45': { // ALICE    
      [NAME]: 'ALICE' + config.suffix,
      [SYMBOL]: 'ALICE',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0x34454c5b564541964a1d8b3d3a201fad099eace8',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xbbeb90cfb6fafa1f69aa130b7341089abeef5811': { // UBXT     
      [NAME]: 'UpBots' + config.suffix,
      [SYMBOL]: 'UBXT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x721c407ceb7d94af5cbfe9d4e56927b6d78e3ead',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x8683e604cdf911cd72652a04bf9d571697a86a60': { // BCDT
      [NAME]: 'Blockchain Certified Data Token' + config.suffix,
      [SYMBOL]: 'BCDT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xfb1dab032a7c56f6616f2f95d13ff42a928c760f',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xf48fbc59e6b45cff26a7608ff7d5a22ebc40df7f': { // UNN
      [NAME]: 'UNION Protocol Governance Token' + config.suffix,
      [SYMBOL]: 'UNN',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x8e841b8f2a37a1fe962ab94f2064d3d3557e2726',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x0aaef3db5d2847b231468658001c278ee892b7e8': { // BAB
      [NAME]: 'BAB' + config.suffix,
      [SYMBOL]: 'BAB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x964ac003ef13bad1b5ed6c30093a2ad8f6d00bb6',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x5e23bea955bc322f2894d94faceca744bb5c3cf9': { // BASv2
      [NAME]: 'BASv2' + config.suffix,
      [SYMBOL]: 'BASv2',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x2a68a051540749b0312d7cbf46726678d233aa1e',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x83085138ed8a96ec0cbd2013ddfe1ebb975940cc': { // BAC
      [NAME]: 'BAC' + config.suffix,
      [SYMBOL]: 'BAC',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x11e51d4f7830c8b150f3ec7c76d30697768c7118',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x639a647fbe20b6c8ac19e48e2de44ea792c62c5c': { // acBTC
      [NAME]: 'ACoconut BTC' + config.suffix,
      [SYMBOL]: 'acBTC',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xea34341a31a7601c39eca29ed11df3ac8b4ec3d1',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    
    '0x314593fa9a2fa16432913dbccc96104541d32d11': { // KIT
      [NAME]: 'DexKit' + config.suffix,
      [SYMBOL]: 'KIT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x60dd3eab646da735b63c27552a3b14cf01445915',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x84151755679590d3c79347315c5dbeff031f1b98': { // Suter
      [NAME]: 'Suterusu' + config.suffix,
      [SYMBOL]: 'Suter',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xe6bc040690208c7199297978f2232fdb29f245f7',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xacbaf478216fbb2eb3607ec2c1a6b5d434bded2f': { // KOBE
      [NAME]: 'Shabu Shabu' + config.suffix,
      [SYMBOL]: 'KOBE',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x131dab3062c5af85da35e908a31e337546863668',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x56fb3fd352e5875c6f2771ca86f3fd361cc0d93e': { // BITX
      [NAME]: 'BitScreenerToken' + config.suffix,
      [SYMBOL]: 'BITX',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x8c503da127073460891465169b2c5ce0a3f29e19',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xd185c16756873b907df064bd7b4815839de4e6b9': { // UNISTAKE
      [NAME]: 'Unistake' + config.suffix,
      [SYMBOL]: 'UNISTAKE',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x7daee7beb27cac8677d4f7ecad61ca2b9703b77a',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x4ac27c1b7eb76e28d1e24849c2da124790c00abc': { // SURE
      [NAME]: 'inSure' + config.suffix,
      [SYMBOL]: 'SURE',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xc1a95ebc5d56207ed23f6b38fde93be21b78d8a3',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x1fe5b870bca201db77bc0a8573fdebc35ee7a114': { // DEC
      [NAME]: 'Decentr' + config.suffix,
      [SYMBOL]: 'DEC',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x76bc6a2a045ddb69527328062ea72d5721dc7fa8',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x0a3a21356793b49154fd3bbe91cbc2a16c0457f5': { // RFOX
      [NAME]: 'RFOX' + config.suffix,
      [SYMBOL]: 'RFOX',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xd1794d9ef96d1f02c1a0b093a1a8dc5de4d30ee8',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    
    '0xc04e039ae8587e71f8024b36d630f841cc2106cc': { // FRY
      [NAME]: 'Foundry Logistics Token' + config.suffix,
      [SYMBOL]: 'FRY',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x0d3afeebfc84c265da59cb63559a8241b2cb083f',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x6bb751a8cabe31a60b56ba6bc162c33cfc3917af': { // FNX
      [NAME]: 'FinNexus' + config.suffix,
      [SYMBOL]: 'FNX',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x10e006dadc2c4b432ca39e9e4fec75112522c055',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x1a6990fcce4fe96be417d48f60b7ea5cc329de80': { // NIF
      [NAME]: 'Unifty' + config.suffix,
      [SYMBOL]: 'NIF',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x52bd8db9f7b63c77220f54eb10e5244f6588ec94',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x2c961ff9b386b597abc58a56f3ec63e313cada76': { // SUKU
      [NAME]: 'SUKU' + config.suffix,
      [SYMBOL]: 'SUKU',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xd59aed5b7c8aa7d89291872a7d4148fde1ec5c99',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xded6a27debe293d373bc4bfed4ae8d70fbc80001': { // BOOST
      [NAME]: 'Boosted Finance' + config.suffix,
      [SYMBOL]: 'BOOST',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x1456000275ebf14a858dbd673fac6de6ff15ca7b',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x4a080377f83d669d7bb83b3184a8a5e61b500608': { // XEND
      [NAME]: 'XEND' + config.suffix,
      [SYMBOL]: 'XEND',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x52c0269b8bbcfff4da690305166d55f890a2f0ed',
      [REDEEM_MAX_NUM]: 200000,
      [REDEEM_MIN_NUM]: 20,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 5,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xf16e81dce15b08f326220742020379b855b87df9': { // ICE 
      [NAME]: 'IceToken' + config.suffix,
      [SYMBOL]: 'ICE',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x4c3033cdd29ef4b982034387ee9b044c3148e051',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x29ced01c447166958605519f10dcf8b0255fb379': { // FRAX 
      [NAME]: 'Frax' + config.suffix,
      [SYMBOL]: 'FRAX',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x8dc7ac5064cb06dbb0c6bc9c1e8cb6c023c188b9',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xe251f9bc3e1ccb247847d3af28c4fa9b9c180a47': { // BTAP 
      [NAME]: 'BTAP' + config.suffix,
      [SYMBOL]: 'BTAP',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xcf27baeace6834fd13a2f2bf5291e7ef8da67182',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x7e624fa0e1c4abfd309cc15719b7e2580887f570': { // POLS 
      [NAME]: 'PolkastarterToken' + config.suffix,
      [SYMBOL]: 'POLS',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xda654eca395d938b9c9ab979f6c85d5d52d065eb',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    // '0x91a22f94ee917efc8f804e251f385cbeb1c6d6bc': { // WAIF 
    //   [NAME]: 'Waifu' + config.suffix,
    //   [SYMBOL]: 'WAIF',
    //   [DECIMALS]: 18,
    //   [EXCHANGE_ADDRESS]: '0xb0a7253d1063c3d1a9c77a0725b76f44eaf5f8c5',
    //   [REDEEM_MAX_NUM]: 5000,
    //   [REDEEM_MIN_NUM]: 0.16,
    //   [FEE]: 0.001,
    //   [MAXFEE]: 0.8,
    //   [MINFEE]: 0.08,
    //   [ISSWITCH]: dirSwitch(0),
    //   [ISDEPOSIT]: 1,
    //   [ISREDEEM]: 1,
    //   [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
    //   [DEPOSIT_TYPE]: 1,
    //   [DEPOSIT_MAX_NUM]: 143000,
    //   [DEPOSIT_MIN_NUM]: 0.16,
    //   [EXTENDOBJ]:  {
    //     BRIDGE: [
    //       { type: 1, isSwitch: 1 }
    //     ],
    //     VERSION: 'V2'
    //   }
    // },
    '0x518445f0db93863e5e93a7f70617c05afa8048f1': { // BITT 
      [NAME]: 'BITTOKEN' + config.suffix,
      [SYMBOL]: 'BITT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x8aff95144fb20fe2bb66f655383cf10be68720b3',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x245d3238cbbe03f9b8e1bff4709d1ebdf22ced4b': { // FEG 
      [NAME]: 'FEGtoken' + config.suffix,
      [SYMBOL]: 'FEG',
      [DECIMALS]: 9,
      [EXCHANGE_ADDRESS]: '0x77561fc33f2a683A43573607e5f072dce3bDe4e6',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x47eaf5f54d79d5c2b6537a90a0c58a534ab51c8c': { // BAO 
      [NAME]: 'BaoToken' + config.suffix,
      [SYMBOL]: 'BAO',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xca51e56c385e21c1a44767aa5ac63c168f1f0abf',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x3758428802fbeab2858d58aec5ff5176df464edd': { // PPDEX 
      [NAME]: 'Pepedex' + config.suffix,
      [SYMBOL]: 'PPDEX',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x4a7fd497ad6c98314bca04db5aa1747a4d427cc8',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x6ab899f7c0a1bd4e9cab0501683ae90db34be1ce': { // PPBLZ 
      [NAME]: 'Pepemon' + config.suffix,
      [SYMBOL]: 'PPBLZ',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xafefd30673b10afed9a749bb4646bfc9c6098072',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x5f2110985f641a139c6b48bae7adac8f46b93d89': { // DAI 
      [NAME]: 'Multichain DAI' + config.suffix,
      [SYMBOL]: 'DAI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x97b961cadead06b91a49bef737e6ec26dcf5f66b',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xf040e8c248788522421575396b6549e3617d67ef': { // USDC 
      [NAME]: 'Multichain USDC' + config.suffix,
      [SYMBOL]: 'USDC',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0x2f387f2697d616389c10627cb5ffc0a08ed890e1',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xc53611ae47602c7b92a0766fcb65de91ac4d904b': { // BUSD 
      [NAME]: 'Multichain BUSD' + config.suffix,
      [SYMBOL]: 'BUSD',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x235eec073b4707d550753e7f5b29950561973150',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x765277eebeca2e31912c9946eae1021199b39c61': { // AMP 
      [NAME]: 'Amp' + config.suffix,
      [SYMBOL]: 'AMP',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xa57cc23fb4456c411fd9f84e52df1f81e4f65e07',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xfa9343c3897324496a05fc75abed6bac29f8a40f': { // Titan 
      [NAME]: 'TitanSwap' + config.suffix,
      [SYMBOL]: 'Titan',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xc0e53a847fc7b099218a843a97abd7b6573715db',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xb44a9b6905af7c801311e8f4e76932ee959c663c': { // BCP 
      [NAME]: 'BitcashPay' + config.suffix,
      [SYMBOL]: 'BCP(BitcashPay)',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x1adbd34b647682c8f07419ecad469850bcb6875a',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b': { // CBC 
      [NAME]: 'CashBetCoin' + config.suffix,
      [SYMBOL]: 'CBC',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x137f743b0af5c7f90148b1f0da214e5fa1423eea',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x80a16016cc4a2e6a2caca8a4a498b1699ff0f844': { // NEXT 
      [NAME]: 'NEXT' + config.suffix,
      [SYMBOL]: 'NEXT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xbd9f455961fd8bb50d11e5045f4eb2c6e4f3109f',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xaf00aac2431b04ef6afd904d19b08d5146e3a9a0': { // PRT 
      [NAME]: 'Portion' + config.suffix,
      [SYMBOL]: 'PRT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x5eea1c1a4a27c7e7a24df80f1f40cd10c954620c',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x6ab6d61428fde76768d7b45d8bfeec19c6ef91a8': { // DUCK 
      [NAME]: 'Unit Protocol' + config.suffix,
      [SYMBOL]: 'DUCK',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x8ac96b22a9b2807f456dc86e586e0c70da9cface',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x9ba4c78b048eeed69f4ed3cfddeda7b51baf7ca8': { // GS 
      [NAME]: 'Gen Shards' + config.suffix,
      [SYMBOL]: 'GS',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x097c715cc0b9a18ca792745a127bb645465c867e',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x922d641a426dcffaef11680e5358f34d97d112e1': { // KNC 
      [NAME]: 'KyberNetwork' + config.suffix,
      [SYMBOL]: 'KNC',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x55366e3c4d2f3b0f66fd1907325a3b96190fdea6',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x461d52769884ca6235b685ef2040f47d30c94eb5': { // STN 
      [NAME]: 'Stone Token' + config.suffix,
      [SYMBOL]: 'STN',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x7919b22f5543b5af9d718778417c6d31691c7a76',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x7c598c96d02398d89fbcb9d41eab3df0c16f227d': { // ATRI 
      [NAME]: 'AtariToken' + config.suffix,
      [SYMBOL]: 'ATRI',
      [DECIMALS]: 0,
      [EXCHANGE_ADDRESS]: '0xd685c292391f233ed1ebc07b2ce28742bf08cf42',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x2c78f1b70ccf63cdee49f9233e9faa99d43aa07e': { // SHEESHA 
      [NAME]: 'Sheesha Finance' + config.suffix,
      [SYMBOL]: 'SHEESHA',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xa5a876a194057f651c6b5d5d1fa319458d782ead',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xc1be9a4d5d45beeacae296a7bd5fadbfc14602c4': { // VID 
      [NAME]: 'VideoCoin' + config.suffix,
      [SYMBOL]: 'VID',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xcad7523ac3e976ec2d9dfa7df1ea788dc3fcbb61',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x332730a4f6e03d9c55829435f10360e13cfa41ff': { // VSP 
      [NAME]: 'VesperToken' + config.suffix,
      [SYMBOL]: 'VSP',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xd9b7e74b6fa9f941a3824f5890e06893e04c0b91',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x65e66a61d0a8f1e686c2d6083ad611a10d84d97a': { // RAZE 
      [NAME]: 'Raze Network' + config.suffix,
      [SYMBOL]: 'RAZE',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xb7ca6c849f8cfa3e5375eeaa3024e694a7a3d995',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xd67de0e0a0fd7b15dc8348bb9be742f3c5850454': { // KOIN 
      [NAME]: 'Koinos' + config.suffix,
      [SYMBOL]: 'KOIN',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x7610eb52bc1b2063b7f24152d8dc249acc6c2f10',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xdc42728b0ea910349ed3c6e1c9dc06b5fb591f98': { // DTH 
      [NAME]: 'Dether' + config.suffix,
      [SYMBOL]: 'DTH',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0xa8d3e039ec64543213b044e428a505f81c79970b',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x3028b4395f98777123c7da327010c40f3c7cc4ef': { // AUC 
      [NAME]: 'Auctus' + config.suffix,
      [SYMBOL]: 'AUC',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x6dab79a2ad9580f8285dd92f2ed329f4ee134748',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x9617857e191354dbea0b714d78bc59e57c411087': { // LMT 
      [NAME]: 'Lympo Market' + config.suffix,
      [SYMBOL]: 'LMT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x35859b0ac2567e9a4a26604004bf2cc236ab57cc',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xb5badfa6e69728adba44d67c98b05f1d1d40182e': { // vBCH 
      [NAME]: 'Bitcoin Cash by Strudel' + config.suffix,
      [SYMBOL]: 'vBCH',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xa694e2b85eaa34cacf021164f2a24b25fcf67515',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x73f059db0182dc2ed716d028e1b13033cfcbf63b': { // MM 
      [NAME]: 'MMToken' + config.suffix,
      [SYMBOL]: 'MM',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x1e3866cf93c62ef03302c85584674aab83046cc9',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x0e37d70b51ffa2b98b4d34a5712c5291115464e3': { // IQ 
      [NAME]: 'Everipedia IQ' + config.suffix,
      [SYMBOL]: 'IQ',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xaa8c5341ac0bd9c4646c282bb20d52d2f65e6a47',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xdae6c2a48bfaa66b43815c5548b10800919c993e': { // KTN 
      [NAME]: 'Kattana' + config.suffix,
      [SYMBOL]: 'KTN',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x78861ea345a5a4ff46d77f2a38d332e1814a71c4',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x1ccca1ce62c62f7be95d4a67722a8fdbed6eecb4': { // PLF
      [NAME]: 'PolkaFinance' + config.suffix,
      [SYMBOL]: 'PLF',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xd80751e6e2b18433cb8a16944be17696b9fba0b0',
      [REDEEM_MAX_NUM]: 75000,
      [REDEEM_MIN_NUM]: 1,
      [FEE]: 0.001,
      [MAXFEE]: 4,
      [MINFEE]: 0.4,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x0FD4E376C6C125C276D4020EFc1842a495cb1cF3',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 75000,
      [DEPOSIT_MIN_NUM]: 1,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 128, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    '0xd8a1734945b9ba38eb19a291b475e31f49e59877': { // SHARD 
      [NAME]: 'Shard' + config.suffix,
      [SYMBOL]: 'SHARD',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xb1302de0c7ab0ce28ae489dc76f43474a6d98c35',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x264c1383ea520f73dd837f915ef3a732e204a493': { // ZCX 
      [NAME]: 'ZEN Exchange Token' + config.suffix,
      [SYMBOL]: 'ZCX',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x8aeabc3eef61da0fb011340e36dfffa17eb66ccc',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x7ea2be2df7ba6e54b1a9c70676f668455e329d29': { // RULER 
      [NAME]: 'Ruler Protocol' + config.suffix,
      [SYMBOL]: 'RULER',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x8697c0e3352db4956e8112b3e6e115ab57e56c61',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x9610b01aaa57ec026001f7ec5cface51bfea0ba6': { // BIRD 
      [NAME]: 'Bird.Money' + config.suffix,
      [SYMBOL]: 'BIRD',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x24be0b30bca18979eecd1d03f77fb78f8290fd36',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x86b3f23b6e90f5bbfac59b5b2661134ef8ffd255': { // DON 
      [NAME]: 'Donkey' + config.suffix,
      [SYMBOL]: 'DON',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xd90f7e63dbcde0a0e6dfd36608ab6e41a6b5e2aa',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x64d5baf5ac030e2b7c435add967f787ae94d0205': { // GTON 
      [NAME]: 'Graviton' + config.suffix,
      [SYMBOL]: 'GTON',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xec93301afefbf64d1be56a870bd0e6ba4e6ea14e',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x0b32357430fe98c24b2b245b815af68bc9ecfdad': { // BEPRO 
      [NAME]: 'BetProtocolToken' + config.suffix,
      [SYMBOL]: 'BEPRO',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x4927493ef07b1dc6ee4d2615cb35b2157fc388b1',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x595c8481c48894771ce8fade54ac6bf59093f9e8': { // POLK 
      [NAME]: 'Polkamarkets' + config.suffix,
      [SYMBOL]: 'POLK',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x1ab826133f7326a25a7a50b1de20c9712c61bc74',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x4e720dd3ac5cfe1e1fbde4935f386bb1c66f4642': { // INV 
      [NAME]: 'Inverse DAO' + config.suffix,
      [SYMBOL]: 'INV',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xbd77576badc20e2fe797c022804577399dee9a5c',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x22648c12acd87912ea1710357b1302c6a4154ebc': { // WCHI 
      [NAME]: 'Wrapped CHI' + config.suffix,
      [SYMBOL]: 'WCHI',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x4d18d0f6cd1858c5f9b8e5a41ebeecd91a4cd4eb',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xd22a58f79e9481d1a88e00c343885a588b34b68b': { // UDO 
      [NAME]: 'Unido' + config.suffix,
      [SYMBOL]: 'UDO',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x79b44fc8158f4baa40d8ba15b07b10f3246023ac',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xd0660cd418a64a1d44e9214ad8e459324d8157f1': { // WOOFY 
      [NAME]: 'Woofy' + config.suffix,
      [SYMBOL]: 'WOOFY',
      [DECIMALS]: 12,
      [EXCHANGE_ADDRESS]: '0x1a586aceb7b2a387ac5dcf8fceb2cd0ed2782a66',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xb72842d6f5fedf91d22d56202802bb9a79c6322e': { // MOMA 
      [NAME]: 'MOchi MArket' + config.suffix,
      [SYMBOL]: 'MOMA',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x3e0f43da3ec47898c3ad1f3695636561bba3d5c5',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xf44fb887334fa17d2c5c0f970b5d320ab53ed557': { // ALN 
      [NAME]: 'Aluna' + config.suffix,
      [SYMBOL]: 'ALN',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xbe04d23eeb8ab08a6f9f996d8f2f7d619f723794',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x4518231a8fdf6ac553b9bbd51bbb86825b583263': { // MLT 
      [NAME]: 'Media Licensing Token' + config.suffix,
      [SYMBOL]: 'MLT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x788928ee4e3628d40380b9090f7296765e6e10aa',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xbfc044a234e45412ecfec2cd6aae2dd0c083a7cd': { // SIG 
      [NAME]: 'xSigma' + config.suffix,
      [SYMBOL]: 'SIG',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x79ba818d2ba469bfd36b474325b5913c1b67d6a0',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x1c019af5b059f4473289c1ddeea02cc4993478ea': { // KSF 
      [NAME]: 'KESEF.FINANCE' + config.suffix,
      [SYMBOL]: 'KSF',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xcb5a478fcb0680a955828e87c840c3c03223f328',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xb0731d50c681c45856bfc3f7539d5f61d4be81d8': { // MVP 
      [NAME]: 'MVP Token' + config.suffix,
      [SYMBOL]: 'MVP',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x681877a46639b73e20b54f7942e2d214a0c5f703',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x6633c083f54bb65f702f9f276319bb24b65fec18': { // YFT 
      [NAME]: 'TOSHIFY.FINANCE' + config.suffix,
      [SYMBOL]: 'YFT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x3d11f66d7ae979fc2a5a254535e413c92cdbce39',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x0ebd9537a25f56713e34c45b38f421a1e7191469': { // MOOV 
      [NAME]: 'dotmoovs' + config.suffix,
      [SYMBOL]: 'MOOV',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x2d34c35ec562d9e890678bc8f28ad5c833150cd9',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    
    '0x99415856b37be9e75c0153615c7954f9ddb97a6e': { // ROYA 
      [NAME]: 'Royale' + config.suffix,
      [SYMBOL]: 'ROYA',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x03862278ed12d6b5276113883f7d3d0a4ab9d5af',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xe6bf0e14e33a469f2b0640b53949a9f90e675135': { // PRARE 
      [NAME]: 'PolkaRareToken' + config.suffix,
      [SYMBOL]: 'PRARE',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x333424447d87a6c2999c8f69191813b2043599c2',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x3d4e1981f822e87a1a4c05f2e4b3bcade5406ae3': { // OHM 
      [NAME]: 'Olympus' + config.suffix,
      [SYMBOL]: 'OHM',
      [DECIMALS]: 9,
      [EXCHANGE_ADDRESS]: '0x4c7298da2303d01acdb8ccf12182c962982d35c5',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0x4e840aadd28da189b9906674b4afcb77c128d9ea': { // HTB 
      [NAME]: 'Hotbit Token' + config.suffix,
      [SYMBOL]: 'HTB',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x4b7effeb9e29d9520591442ee88aac3bd728fee8',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
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
    '0xcc9b1f919282c255eb9ad2c0757e8036165e0cad': { // PTT 
      [NAME]: 'OpenLand' + config.suffix,
      [SYMBOL]: 'PTT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x73a482aed0730e53cea808b4a76ac3474057fd48',
      [REDEEM_MAX_NUM]: 5000,
      [REDEEM_MIN_NUM]: 0.16,
      [FEE]: 0.001,
      [MAXFEE]: 0.8,
      [MINFEE]: 0.08,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x0FD4E376C6C125C276D4020EFc1842a495cb1cF3',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 143000,
      [DEPOSIT_MIN_NUM]: 0.16,
      [EXTENDOBJ]:  {
        BRIDGE: [
          { type: 128, isSwitch: 1 }
        ],
        VERSION: 'V2'
      }
    },
    // '0x01c3d9cbcf40482ba0d5206f63e3f04ef9e134d9': { // SFI 
    //   [NAME]: 'Spice' + config.suffix,
    //   [SYMBOL]: 'SFI',
    //   [DECIMALS]: 18,
    //   [EXCHANGE_ADDRESS]: '0x4faa009b28f6fd60d7044b4ca4cc878b086f76e3',
    //   [REDEEM_MAX_NUM]: 5000,
    //   [REDEEM_MIN_NUM]: 0.16,
    //   [FEE]: 0.001,
    //   [MAXFEE]: 0.8,
    //   [MINFEE]: 0.08,
    //   [ISSWITCH]: dirSwitch(0),
    //   [ISDEPOSIT]: 1,
    //   [ISREDEEM]: 1,
    //   [DEPOSIT_ADDRESS]: '0x533e3c0e6b48010873b947bddc4721b1bdff9648',
    //   [DEPOSIT_TYPE]: 1,
    //   [DEPOSIT_MAX_NUM]: 143000,
    //   [DEPOSIT_MIN_NUM]: 0.16,
    //   [EXTENDOBJ]:  {
    //     BRIDGE: [
    //       { type: 1, isSwitch: 1 }
    //     ],
    //     VERSION: 'V2'
    //   }
    // },
  },
  [BNB_TEST_CHAINID]: {
    '0x29D827A5a08D50bD6f64bA135bCFE2C5d1108711': { // USDT
      [NAME]: 'ANY Tether',
      [SYMBOL]: config.prefix + 'USDT',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0xb116c4df54e5928ca0dca2dba712b875e114c5ba',
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
      [EXTENDOBJ]: {},
    },
    '0x4ce47351aeafbd81f9888187288996fe0322ffa2': { // ANY
      [NAME]: 'Anyswap',
      [SYMBOL]: 'ANY',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x92fa2adedc403f49a8c50493e5cb21a72dfa3ca2',
      [REDEEM_MAX_NUM]: 1000000,
      [REDEEM_MIN_NUM]: 0.1,
      [FEE]: 0.001,
      [MAXFEE]: 50,
      [MINFEE]: 1,
      [ISSWITCH]: dirSwitch(0),
      [ISDEPOSIT]: 1,
      [ISREDEEM]: 1,
      [DEPOSIT_ADDRESS]: '0x609F57C29faDDc455a966F6fadD958c681893Aff',
      [DEPOSIT_TYPE]: 1,
      [DEPOSIT_MAX_NUM]: 0,
      [DEPOSIT_MIN_NUM]: 0,
      [EXTENDOBJ]: {},
    },
    '0xa5a3c93776ba2e1a78c79e88a2cb5abab2a0097f': { // FOOD
      [NAME]: 'ANY FoodToken',
      [SYMBOL]: config.prefix + 'FOOD',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x11f836dcdc61bf92f38f98565dcb6573337d6a5f',
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
      [EXTENDOBJ]: {},
    },
    '0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867': { // DAI
      [NAME]: 'ANY Dai',
      [SYMBOL]: config.prefix + 'DAI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x4a5bbc9c05ba36409bf2c7b06ac6c6baa1da3969',
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
      [EXTENDOBJ]: {},
    },
    '0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378': { // ETH
      [NAME]: 'ANY Ethereum',
      [SYMBOL]: config.prefix + 'ETH',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x7a7cffa0927d3c7f1cf779d6bd19e98a892b87e3',
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
      [EXTENDOBJ]: {},
    },
  },
}