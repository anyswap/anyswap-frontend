import coin from './coin'

const MAINNET = 'https://bsc-dataseed1.binance.org/'
const MAIN_CHAINID = 56
const ANY_MAIN_TOKEN = 'ANY'

const TESTNET = ' https://data-seed-prebsc-1-s1.binance.org:8545'
const TEST_CHAINID = 97
const ANY_TEST_TOKEN = '0x6fb8125c42a53dced3c4c05e1712e4c5ca1c6dc2'

const COIN_BASE ={
  symbol: 'BNB',
  name: 'Binance-BEP20',
  testUrl: 'https://bsctest.anyswap.exchange',
  mainUrl: 'https://bsc.anyswap.exchange',
  decimals: 18,
  networkNamr: 'BSC'
}
const INIT_MAIN_TOKEN = '0xae9269f27437f0fcbc232d39ec814844a51d6b8f'
const INIT_TEST_TOKEN = ANY_TEST_TOKEN
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
  initToken: INIT_MAIN_TOKEN,
  initBridge: 'BTC',
  explorerUrl: 'https://bscscan.com',
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
  isChangeDashboard: 0,
  noSupportBridge: [
    COIN_BASE.symbol,
    '0xae9269f27437f0fcbc232d39ec814844a51d6b8f',
    '0x55d398326f99059ff775485246999027b3197955',
    '0xacd6b5f76db153fb45eae6d5be5bdbd45d1b2a8c',
    '0xE4Ae305ebE1AbE663f261Bc00534067C80ad677C',
    '0x8E9f5173e16Ff93F81579d73A7f9723324d6B6aF'
  ]
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
    initToken: INIT_TEST_TOKEN,
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
    isChangeDashboard: 0,
    noSupportBridge: [COIN_BASE.symbol]
  }
  return coinConfig
}

export default getBNBConfig