import {getBaseCoin} from './coin'
import {
  BNB_MAINNET,
  BNB_MAIN_CHAINID,
  BNB_MAIN_EXPLORER,
  BNB_TESTNET,
  BNB_TEST_CHAINID,
  BNB_TEST_EXPLORER,
} from './nodeConfig'

const COIN = getBaseCoin()

const COIN_BASE ={
  symbol: 'BNB',
  name: 'Binance-BEP20',
  testUrl: 'https://bsctest.anyswap.exchange',
  mainUrl: 'https://bsc.anyswap.exchange',
  decimals: 18,
  networkNamr: 'BSC',
  reverseSwitch: 0
}
const INIT_MAIN_TOKEN = '0xf68c9df95a18b2a5a5fa1124d79eeeffbad0b6fa'
const INIT_TEST_TOKEN = '0x29D827A5a08D50bD6f64bA135bCFE2C5d1108711'
let coinConfig = {
  ...COIN_BASE,
  nodeRpc: BNB_MAINNET,
  chainID: BNB_MAIN_CHAINID,
  coininfo: {
    // [COIN.BTC]: {url: 'https://testnet.smpcwallet.com/btc2fsn'},
    [COIN.ETH]: {url: ''},
    [COIN.USDT]: {url: ''},
    ANY: {url: 'https://any2bscapi.anyswap.exchange/rpc'},
  },
  initToken: INIT_MAIN_TOKEN,
  initBridge: '0xf68c9df95a18b2a5a5fa1124d79eeeffbad0b6fa',
  explorerUrl: BNB_MAIN_EXPLORER,
  marketsUrl: '',
  document: 'https://anyswap-faq.readthedocs.io/en/latest/index.html',
  btcConfig: {
    lookHash: 'https://sochain.com/tx/BTCTEST/',
    queryTxns: 'https://sochain.com/api/v2/get_tx_received/BTC/',
    queryHashStatus: 'https://sochain.com/api/v2/get_confidence/BTC/',
    btcAddr: ''
  },
  isOpenRewards: 0,
  isChangeDashboard: 0,
  noSupportBridge: [
    COIN_BASE.symbol,
    '0xae9269f27437f0fcbc232d39ec814844a51d6b8f',
    '0x55d398326f99059ff775485246999027b3197955',
    '0xacd6b5f76db153fb45eae6d5be5bdbd45d1b2a8c',
    '0xE4Ae305ebE1AbE663f261Bc00534067C80ad677C',
    '0x8E9f5173e16Ff93F81579d73A7f9723324d6B6aF',
    '0x40929fb2008c830731a3d972950bc13f70161c75',
    '0xe02df9e3e622debdd69fb838bb799e3f168902c5',
    '0xaf53d56ff99f1322515e54fdde93ff8b3b7dafd5',
    '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    '0x658A109C5900BC6d2357c87549B651670E5b0539'
  ],
}

function getBNBConfig (type) {
  if (type.toLowerCase() === 'main') {
    return coinConfig
  }
  coinConfig = {
    ...COIN_BASE,
    nodeRpc: BNB_TESTNET,
    chainID: BNB_TEST_CHAINID,
    coininfo: {
      // [COIN.BTC]: {url: 'https://testnet.smpcwallet.com/btc2fsn'},
      [COIN.ETH]: {url: ''},
      [COIN.USDT]: {url: ''},
      ANY: {url: 'https://testany2bscapi.anyswap.exchange/rpc'},
    },
    initToken: INIT_TEST_TOKEN,
    initBridge: '0x4ce47351aeafbd81f9888187288996fe0322ffa2',
    explorerUrl: BNB_TEST_EXPLORER,
    marketsUrl: 'https://markets.anyswap.exchange/#/',
    document: 'https://anyswap-faq.readthedocs.io/en/latest/index.html',
    btcConfig: {
      lookHash: 'https://sochain.com/tx/BTCTEST/',
      queryTxns: 'https://sochain.com/api/v2/get_tx_received/BTCTEST/',
      queryHashStatus: 'https://sochain.com/api/v2/get_confidence/BTCTEST/',
      btcAddr: ''
    },
    isOpenRewards: 0,
    isChangeDashboard: 0,
    noSupportBridge: [COIN_BASE.symbol]
  }
  return coinConfig
}

export default getBNBConfig