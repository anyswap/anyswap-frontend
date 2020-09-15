import {getBaseCoin} from './coin'
import {
  FSN_MAINNET,
  FSN_MAIN_CHAINID,
  FSN_MAIN_EXPLORER,
  FSN_TESTNET,
  FSN_TEST_CHAINID,
  FSN_TEST_EXPLORER,
} from './nodeConfig'


const COIN = getBaseCoin('a')

const ANY_MAIN_TOKEN = '0x0c74199D22f732039e843366a236Ff4F61986B32'
const ANY_TEST_TOKEN = '0xC20b5E92E1ce63Af6FE537491f75C19016ea5fb4'

const COIN_BASE ={
  symbol: 'FSN', // 符号
  name: 'Fusion', // 代币名
  testUrl: 'https://test.anyswap.exchange', // 测试交易所地址
  mainUrl: 'https://anyswap.exchange', // 主网交易所地址
  decimals: 18, // 小数位
  networkNamr: 'FSN', // 网络名称
  reverseSwitch: 0,  // 是否反向禁用
}

const INIT_MAIN_TOKEN = ANY_MAIN_TOKEN
const INIT_TEST_TOKEN = ANY_TEST_TOKEN

let coinConfig = {
  ...COIN_BASE,
  nodeRpc: FSN_MAINNET, // 节点地址
  chainID: FSN_MAIN_CHAINID, // 节点chainID
  any: {
    token: ANY_MAIN_TOKEN,  // ANY合约地址
  },
  coininfo: { // 跨链桥配置
    [COIN.BTC]: {url: 'https://btcapi.anyswap.exchange/rpc'},
    [COIN.ETH]: {url: 'https://ethapi.anyswap.exchange/rpc'},
    [COIN.USDT]: {url: 'https://usdtapi.anyswap.exchange/rpc'},
  },
  initToken: INIT_MAIN_TOKEN, // 交易默认合约
  initBridge: '0xc7c64ac6d46be3d6ea318ec6276bb55291f8e496', // 跨链桥默认合约
  explorerUrl: FSN_MAIN_EXPLORER, // 浏览器地址
  marketsUrl: 'https://markets.anyswap.exchange/#/', // K线图地址
  document: 'https://anyswap-faq.readthedocs.io/en/latest/index.html', // 文档地址
  btcConfig: { // btc配置
    lookHash: 'https://sochain.com/tx/BTC/', // 
    queryTxns: 'https://sochain.com/api/v2/get_tx_received/BTC/', // 
    queryHashStatus: 'https://sochain.com/api/v2/get_confidence/BTC/', // 
    btcAddr: '1FJSkpkPYhDJoJzMhA2LRSgrmUJHxtVQpj',  // 
  },
  isOpenRewards: 1, // 是否打开奖励数据
  isChangeDashboard: 1, // 是否改变资产顺序
  noSupportBridge: [COIN_BASE.symbol, ANY_MAIN_TOKEN], // 不支持的跨链合约或币种
}

function getFSNConfig (type) {
  if (type.toLowerCase() === 'main') {
    return coinConfig
  }
  coinConfig = {
    ...COIN_BASE,
    nodeRpc: FSN_TESTNET,
    chainID: FSN_TEST_CHAINID,
    any: {
      token: ANY_TEST_TOKEN
    },
    coininfo: {
      [COIN.BTC]: {url: 'https://testbtcapi.anyswap.exchange/rpc'},
      [COIN.ETH]: {url: 'https://testethapi.anyswap.exchange/rpc'},
      [COIN.USDT]: {url: 'https://testusdtapi.anyswap.exchange/rpc'},
    },
    initToken: INIT_TEST_TOKEN,
    initBridge: '0x3368e6012066bc08ece5f2b2582c883cca1424e5',
    explorerUrl: FSN_TEST_EXPLORER,
    marketsUrl: 'https://markets.anyswap.exchange/#/',
    document: 'https://anyswap-faq.readthedocs.io/en/latest/index.html',
    btcConfig: {
      lookHash: 'https://sochain.com/tx/BTCTEST/',
      queryTxns: 'https://sochain.com/api/v2/get_tx_received/BTCTEST/',
      queryHashStatus: 'https://sochain.com/api/v2/get_confidence/BTCTEST/',
      btcAddr: 'mmBUP62PJNDndtSvH4ef65gUAucgQY5dqA'
    },
    isOpenRewards: 1,
    isChangeDashboard: 1,
    noSupportBridge: [COIN_BASE.symbol, ANY_TEST_TOKEN],
  }
  return coinConfig
}

export default getFSNConfig