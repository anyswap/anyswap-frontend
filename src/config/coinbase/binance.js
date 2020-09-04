import coin from './coin'

const MAINNET = 'https://bsc-dataseed1.binance.org:443'
const MAIN_CHAINID = 56
const ANY_MAIN_TOKEN = ''

const TESTNET = ' https://data-seed-prebsc-1-s1.binance.org:8545'
const TEST_CHAINID = 97
const ANY_TEST_TOKEN = '0x6fb8125c42a53dced3c4c05e1712e4c5ca1c6dc2'

const COIN_BASE ={
  symbol: 'BNB',
  name: 'Binance',
  testUrl: '',
  mainUrl: '',
  decimals: 18
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
  initToken: ANY_MAIN_TOKEN,
  initBridge: '',
  explorerUrl: 'https://fsnex.com',
  marketsUrl: 'https://markets.anyswap.exchange/#/'
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
    marketsUrl: 'https://markets.anyswap.exchange/#/'
  }
  return coinConfig
}

export default getBNBConfig