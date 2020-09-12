import coin from './coin'

const MAINNET = 'https://bsc-dataseed1.binance.org/'
const MAIN_CHAINID = 56
const ANY_MAIN_TOKEN = 'ANY'

const TESTNET = ' https://data-seed-prebsc-1-s1.binance.org:8545'
const TEST_CHAINID = 97
const ANY_TEST_TOKEN = '0x6fb8125c42a53dced3c4c05e1712e4c5ca1c6dc2'

const COIN_BASE ={
  symbol: 'BNB',
  name: 'Binance',
  testUrl: '',
  mainUrl: '',
  decimals: 18,
  networkNamr: 'BSC'
}
let coinConfig = {
  ...COIN_BASE,
  nodeRpc: MAINNET,
  chainID: MAIN_CHAINID,
  any: {
    token: ANY_MAIN_TOKEN
  },
  coininfo: {
    // [coin.BTC]: {url: 'https://testnet.smpcwallet.com/btc2fsn'},
    [coin.ETH]: {url: ''},
    [coin.USDT]: {url: ''},
  },
  initToken: '0xae9269f27437f0fcbc232d39ec814844a51d6b8f',
  initBridge: '',
  explorerUrl: 'https://explorer.binance.org/smart',
  marketsUrl: '',
  document: 'https://anyswap-faq.readthedocs.io/en/latest/index.html',
  btcConfig: {
    lookHash: 'https://sochain.com/tx/BTCTEST/',
    queryTxns: 'https://sochain.com/api/v2/get_tx_received/BTC/',
    queryHashStatus: 'https://sochain.com/api/v2/get_confidence/BTC/',
    btcAddr: ''
  },
  isOPenBridge: 0,
  isOpenRewards: 0,
  isChangeDashboard: 0
}

function getBNBConfig (type) {
  if (type.toLowerCase() === 'main') {
    return coinConfig
  }
  coinConfig = {
    ...COIN_BASE,
    nodeRpc: TESTNET,
    chainID: TEST_CHAINID,
    any: {
      token: ANY_TEST_TOKEN
    },
    coininfo: {
      // [coin.BTC]: {url: 'https://testnet.smpcwallet.com/btc2fsn'},
      [coin.ETH]: {url: ''},
      [coin.USDT]: {url: ''},
    },
    initToken: ANY_TEST_TOKEN,
    initBridge: '0x29D827A5a08D50bD6f64bA135bCFE2C5d1108711',
    explorerUrl: 'https://explorer.binance.org/smart-testnet',
    marketsUrl: 'https://markets.anyswap.exchange/#/',
    document: 'https://anyswap-faq.readthedocs.io/en/latest/index.html',
    btcConfig: {
      lookHash: 'https://sochain.com/tx/BTCTEST/',
      queryTxns: 'https://sochain.com/api/v2/get_tx_received/BTCTEST/',
      queryHashStatus: 'https://sochain.com/api/v2/get_confidence/BTCTEST/',
      btcAddr: ''
    },
    isOPenBridge: 1,
    isOpenRewards: 0,
    isChangeDashboard: 0
  }
  return coinConfig
}

export default getBNBConfig