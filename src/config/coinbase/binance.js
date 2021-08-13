import {chainInfo} from './nodeConfig'

const NAME_PREFIX = '-BEP20'

const REWARDS_DAY = 10000 / 2
const REWARDS_ANY_DAY = 5000
const DEPOSIT_AMOUNT = 10000

const CHAIN_MAIN_INFO = chainInfo['56']
const CHAIN_TEST_INFO = chainInfo['97']

const COIN_BASE ={
  symbol: 'BNB',
  name: 'Binance-Peg Binance',
  decimals: 18,
  networkName: 'BSC',
  reverseSwitch: 0,
  suffix: '-BEP20',
  prefix: '',
  keepDec: 6,
  namePrefix: NAME_PREFIX,
  marketsUrl: 'https://markets.anyswap.exchange/?trade=ANY_BNB', // K线图地址
  rewardUrl: 'https://rewardapiv2.anyswap.exchange/accounts/getBSCReward/', // 获取奖励地址
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
      if (obj === 'ANY') {
        coinObj[obj].totalReward = (REWARDS_DAY + REWARDS_ANY_DAY) * coinObj[obj].pecent
        coinObj[obj].poolShare = (DEPOSIT_AMOUNT / coinObj[obj].totalBaseAmount) * 2
        coinObj[obj].accountReward = coinObj[obj].poolShare * coinObj[obj].totalReward / coinObj[obj].market
        coinObj[obj].ROIPerDay = coinObj[obj].accountReward / DEPOSIT_AMOUNT
        coinObj[obj].AnnualizedROI = coinObj[obj].ROIPerDay * 100 * 365
      } else {
        coinObj[obj].totalReward = REWARDS_DAY * coinObj[obj].pecent
        coinObj[obj].poolShare = (DEPOSIT_AMOUNT / coinObj[obj].totalBaseAmount)
        coinObj[obj].accountReward = coinObj[obj].poolShare * coinObj[obj].totalReward / coinObj['ANY'].market
        coinObj[obj].ROIPerDay = coinObj[obj].accountReward / DEPOSIT_AMOUNT
        coinObj[obj].AnnualizedROI = coinObj[obj].ROIPerDay * 100 * 365
      }
    }
    // console.log(coinObj)
    // console.log(totalLq)
    return coinObj
  }
}
const INIT_MAIN_TOKEN = '0xf68c9df95a18b2a5a5fa1124d79eeeffbad0b6fa'
const INIT_TEST_TOKEN = '0x29D827A5a08D50bD6f64bA135bCFE2C5d1108711'
const MAIN_CONFIG = {
  ...COIN_BASE,
  nodeRpc: CHAIN_MAIN_INFO.rpc,
  nodeRpc1: CHAIN_MAIN_INFO.rpc, // 节点地址
  chainID: CHAIN_MAIN_INFO.chainID,
  initToken: INIT_MAIN_TOKEN,
  initBridge: '0xf68c9df95a18b2a5a5fa1124d79eeeffbad0b6fa',
  explorerUrl: CHAIN_MAIN_INFO.explorer,
  document: 'https://anyswap-faq.readthedocs.io/en/latest/index.html',
  btc: {
    lookHash: 'https://www.blockchain.com/btc/tx/',
    queryTxns: 'https://sochain.com/api/v2/get_tx_received/BTC/',
    queryHashStatus: 'https://sochain.com/api/v2/get_confidence/BTC/',
    initAddr: '1MECwqonAq9UDKN838vnBuqsUCWpWyB1pN'
  },
  ltc: { // ltc配置
    lookHash: 'https://blockchair.com/litecoin/transaction/', // 
    queryTxns: 'https://sochain.com/api/v2/get_tx_received/LTC/', // 
    queryHashStatus: 'https://sochain.com/api/v2/get_confidence/LTC/', // 
    initAddr: 'Lf2GpJmz2FZM1xW5V8xo1ZvA3Rh7ZX51iQ',  // 
  },
  colx: { // colx配置
    lookHash: 'https://chainz.cryptoid.info/colx/tx.dws?', // 
    queryTxns: '', // 
    queryHashStatus: 'https://chainz.cryptoid.info/colx/api.dws?q=txinfo&t=', // 
    initAddr: 'DD7AMhT66bK3TpDUKdq6AsUBj8gt6pSd2o',  // 
  },
  block: { // block配置
    lookHash: 'https://block.ccore.online/transaction/', // 
    queryTxns: 'https://block.ccore.online/ext/getaddress/', // 
    queryHashStatus: 'https://block.ccore.online/api/getrawtransaction?txid=', // 
    initAddr: 'BdoLAaBkUrJmrNwApnwqwLwdFETNLMeX3c',  // 
  },
  isOpenRewards: 0,
  isChangeDashboard: 1,
  noSupportBridge: [
    COIN_BASE.symbol,
    '0xae9269f27437f0fcbc232d39ec814844a51d6b8f',
    '0x55d398326f99059ff775485246999027b3197955',
    '0xacd6b5f76db153fb45eae6d5be5bdbd45d1b2a8c',
    '0xe4ae305ebe1abe663f261bc00534067c80ad677c',
    '0x8e9f5173e16ff93f81579d73a7f9723324d6b6af',
    '0x40929fb2008c830731a3d972950bc13f70161c75',
    '0xe02df9e3e622debdd69fb838bb799e3f168902c5',
    '0xaf53d56ff99f1322515e54fdde93ff8b3b7dafd5',
    '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    '0x658a109c5900bc6d2357c87549b651670e5b0539',
    '0x4b0f1812e5df2a09796481ff14017e6005508003',
    '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    '0xd4cb328a82bdf5f03eb737f37fa6b370aef3e888',
    '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    '0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd',
    '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
    '0xbf5140a22578168fd562dccf235e5d43a02ce9b1',
    '0x88f1a5ae2a3bf98aeaf342d26b30a79438c9142e',
    '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    '0x5e1f55645a1c85436f15948cbc29e0c2333ce9e2',
    '0x4028433877f9c14764eb93d0bb6570573da2726f',
    '0x93d5a19a993d195cfc75acdd736a994428290a59'
  ],
  queryToken: '0x7e8b5b722f1a3c5ab2bd8510eaba24dae97565d1' // 查询余额合约
}

const TEST_CONFIG = {
  ...COIN_BASE,
  nodeRpc: CHAIN_TEST_INFO.rpc,
  nodeRpc1: CHAIN_TEST_INFO.rpc, // 节点地址
  chainID: CHAIN_TEST_INFO.chainID,
  initToken: INIT_TEST_TOKEN,
  initBridge: '0x4ce47351aeafbd81f9888187288996fe0322ffa2',
  explorerUrl: CHAIN_TEST_INFO.explorer,
  document: 'https://anyswap-faq.readthedocs.io/en/latest/index.html',
  btc: {
    lookHash: 'https://sochain.com/tx/BTCTEST/',
    queryTxns: 'https://sochain.com/api/v2/get_tx_received/BTCTEST/',
    queryHashStatus: 'https://sochain.com/api/v2/get_confidence/BTCTEST/',
    initAddr: ''
  },
  isOpenRewards: 0,
  isChangeDashboard: 1,
  noSupportBridge: [COIN_BASE.symbol],
  queryToken: '' // 查询余额合约
}

function getBNBConfig (type) {
  if (type.toLowerCase() === 'main') {
    return MAIN_CONFIG
  }
  return TEST_CONFIG
}

export default getBNBConfig