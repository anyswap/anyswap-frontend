import {getBaseCoin} from './coin'
import {
  FSN_MAINNET,
  FSN_MAIN_CHAINID,
  FSN_MAIN_EXPLORER,
  FSN_TESTNET,
  FSN_TEST_CHAINID,
  FSN_TEST_EXPLORER,
} from './nodeConfig'

const PREFIX = 'a'
const SUFFIX = ''
const NAME_PREFIX = 'ANY'

const COIN = getBaseCoin(PREFIX)

const ANY_MAIN_TOKEN = '0x0c74199D22f732039e843366a236Ff4F61986B32'
const ANY_TEST_TOKEN = '0xC20b5E92E1ce63Af6FE537491f75C19016ea5fb4'

const REWARDS_DAY = 33000 / 2
const DEPOSIT_AMOUNT = 10000



const COIN_BASE ={
  symbol: 'FSN', // 符号
  name: 'Fusion', // 代币名
  decimals: 18, // 小数位
  networkNamr: 'FSN', // 网络名称
  reverseSwitch: 0,  // 是否反向禁用,
  suffix: SUFFIX, // 后缀
  keepDec: 6, // 保留小数位
  namePrefix: NAME_PREFIX, // 币名前缀
  marketsUrl: 'https://markets.anyswap.exchange/?trade=ANY_FSN', // K线图地址
  rewardRate (arr) {
    let totalLq = 0
    let coinObj = {}
    for (let obj of arr) {
      let mt = Number(obj.market) / Math.pow(10, 18)
      // let totalBaseAmount = Number(obj.baseAmount) + Number(obj.tokenAmount) / mt
      let totalBaseAmount = Number(obj.baseAmount) * 2 /  Math.pow(10, 18)
      if (obj.coin === 'ANY') {
        totalBaseAmount = totalBaseAmount * 2
      }
      totalLq += totalBaseAmount
      coinObj[obj.coin] = {
        ...obj,
        market: mt,
        totalBaseAmount
      }
    }
    // totalLq = totalLq  /  Math.pow(10, 18)
    for (let obj in coinObj) {
      coinObj[obj].pecent = coinObj[obj].totalBaseAmount / totalLq
      coinObj[obj].totalReward = REWARDS_DAY * coinObj[obj].pecent
      if (obj === 'ANY') {
        coinObj[obj].poolShare = (DEPOSIT_AMOUNT / coinObj[obj].totalBaseAmount) * 2
        coinObj[obj].accountReward = coinObj[obj].poolShare * coinObj[obj].totalReward / coinObj[obj].market
        coinObj[obj].ROIPerDay = coinObj[obj].accountReward / DEPOSIT_AMOUNT
        coinObj[obj].AnnualizedROI = coinObj[obj].ROIPerDay * 100 * 365
      } else {
        coinObj[obj].poolShare = (DEPOSIT_AMOUNT / coinObj[obj].totalBaseAmount)
        coinObj[obj].accountReward = coinObj[obj].poolShare * coinObj[obj].totalReward / coinObj['ANY'].market
        coinObj[obj].ROIPerDay = coinObj[obj].accountReward / DEPOSIT_AMOUNT
        coinObj[obj].AnnualizedROI = coinObj[obj].ROIPerDay * 100 * 365
      }
    }
    // console.log(coinObj)
    return coinObj
  }
}

const INIT_MAIN_TOKEN = ANY_MAIN_TOKEN
const INIT_TEST_TOKEN = ANY_TEST_TOKEN

const MAIN_CONFIG = {
  ...COIN_BASE,
  nodeRpc: FSN_MAINNET, // 节点地址
  chainID: FSN_MAIN_CHAINID, // 节点chainID
  any: {
    token: ANY_MAIN_TOKEN,  // ANY合约地址
  },
  coininfo: { // 跨链桥配置
    // [COIN.BTC]: {url: 'https://btcapi.anyswap.exchange/rpc'},
    [COIN.BTC]: {url: 'https://btc2fsnapi.anyswap.exchange/rpc'},
    [COIN.ETH]: {url: 'https://ethapi.anyswap.exchange/rpc'},
    [COIN.USDT]: {url: 'https://usdtapi.anyswap.exchange/rpc'},
    [COIN.UNI]: {url: 'https://uni2fsnapi.anyswap.exchange/rpc'},
  },
  initToken: INIT_MAIN_TOKEN, // 交易默认合约
  initBridge: '0x445166c4854836292a5af7e3f165a3b8b4eedf97', // 跨链桥默认合约
  explorerUrl: FSN_MAIN_EXPLORER, // 浏览器地址
  document: 'https://anyswap-faq.readthedocs.io/en/latest/index.html', // 文档地址
  btcConfig: { // btc配置
    lookHash: 'https://www.blockchain.com/btc/tx/', // 
    queryTxns: 'https://sochain.com/api/v2/get_tx_received/BTC/', // 
    queryHashStatus: 'https://sochain.com/api/v2/get_confidence/BTC/', // 
    btcAddr: '1HvrEMgxsYadWGhijpfygKSqPZ5p418g45',  // 
  },
  isOpenRewards: 1, // 是否打开奖励数据
  isChangeDashboard: 1, // 是否改变资产顺序
  noSupportBridge: [COIN_BASE.symbol, ANY_MAIN_TOKEN], // 不支持的跨链合约或币种
  queryToken: '0x25afd2058b6e5e00995467d58778a2790a0e5038' // 查询余额合约
}

const TEST_CONFIG = {
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
  queryToken: '0x2fd94457b707b2776d4f4e4292a4280164fe8a15' // 查询余额合约
}

function getFSNConfig (type) {
  if (type.toLowerCase() === 'main') {
    return MAIN_CONFIG
  }
  return TEST_CONFIG
}

export default getFSNConfig