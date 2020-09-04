import coin from './coin'
const MAINNET = 'https://mainnet.anyswap.exchange'
const MAIN_CHAINID = 32659
const ANY_MAIN_TOKEN = '0x0c74199D22f732039e843366a236Ff4F61986B32'

const TESTNET = 'https://testnet.anyswap.exchange'
const TEST_CHAINID = 46688
const ANY_TEST_TOKEN = '0xC20b5E92E1ce63Af6FE537491f75C19016ea5fb4'

const COIN_BASE ={
  symbol: 'FSN',
  name: 'Fusion',
  testUrl: 'https://test.anyswap.exchange',
  mainUrl: 'https://anyswap.exchange',
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
    [coin.ETH]: {url: 'https://ethapi.anyswap.exchange/rpc'},
    [coin.USDT]: {url: 'https://usdtapi.anyswap.exchange/rpc'},
  },
  initToken: ANY_MAIN_TOKEN,
  initBridge: '0xc7c64ac6d46be3d6ea318ec6276bb55291f8e496',
  explorerUrl: 'https://fsnex.com',
  marketsUrl: 'https://markets.anyswap.exchange/#/'
}

function getFSNConfig (type) {
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
      [coin.ETH]: {url: 'https://testethapi.anyswap.exchange/rpc'},
      [coin.USDT]: {url: 'https://testusdtapi.anyswap.exchange/rpc'},
    },
    initToken: ANY_TEST_TOKEN,
    initBridge: '0x3368e6012066bc08ece5f2b2582c883cca1424e5',
    explorerUrl: 'https://fsnex.com',
    marketsUrl: 'https://markets.anyswap.exchange/#/'
  }
  return coinConfig
}

export default getFSNConfig