import {chainInfo} from './nodeConfig'

const NAME_PREFIX = 'ANY'

const ANY_MAIN_TOKEN = '0x0c74199d22f732039e843366a236ff4f61986b32'
const ANY_TEST_TOKEN = '0x40af41149a6e82e378fe8ad7e1ae11e42c78a985'

const REWARDS_DAY = 33000 / 2
// const REWARDS_DAY = 7600
const DEPOSIT_AMOUNT = 10000

const CHAIN_MAIN_INFO = chainInfo['66']
const CHAIN_TEST_INFO = chainInfo['2']

const COIN_BASE ={
  symbol: 'OKT', // 符号
  name: 'OKExChain', // 代币名
  decimals: 18, // 小数位
  networkName: 'OKT', // 网络名称
  reverseSwitch: 0,  // 是否反向禁用,
  suffix: '', // 后缀
  prefix: 'any',
  keepDec: 6, // 保留小数位
  namePrefix: NAME_PREFIX, // 币名前缀
  marketsUrl: 'https://markets.anyswap.exchange/?trade=ANY_FSN', // K线图地址
  rewardUrl: 'https://rewardapiv2.anyswap.exchange/accounts/getReward/', // 获取奖励地址
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
    // console.log(totalBaseAmount)
    return coinObj
  }
}

const INIT_MAIN_TOKEN = ANY_MAIN_TOKEN
const INIT_TEST_TOKEN = ANY_TEST_TOKEN

const MAIN_CONFIG = {
  ...COIN_BASE,
  nodeRpc: CHAIN_MAIN_INFO.rpc, // 节点地址
  nodeRpc1: CHAIN_MAIN_INFO.rpc1, // 节点地址
  chainID: CHAIN_MAIN_INFO.chainID, // 节点chainID
  initToken: INIT_MAIN_TOKEN, // 交易默认合约
  initBridge: '0x445166c4854836292a5af7e3f165a3b8b4eedf97', // 跨链桥默认合约
  explorerUrl: CHAIN_MAIN_INFO.explorer, // 浏览器地址
  document: 'https://anyswap-faq.readthedocs.io/en/latest/index.html', // 文档地址
  btc: { // btc配置
    lookHash: 'https://www.blockchain.com/btc/tx/', // 
    queryTxns: 'https://sochain.com/api/v2/get_tx_received/BTC/', // 
    queryHashStatus: 'https://sochain.com/api/v2/get_confidence/BTC/', // 
    initAddr: '',  // 
  },
  ltc: { // ltc配置
    lookHash: 'https://blockchair.com/litecoin/transaction/', // 
    queryTxns: 'https://sochain.com/api/v2/get_tx_received/LTC/', // 
    queryHashStatus: 'https://sochain.com/api/v2/get_confidence/LTC/', // 
    initAddr: '',  // 
  },
  isOpenRewards: 0, // 是否打开奖励数据
  isChangeDashboard: 1, // 是否改变资产顺序
  noSupportBridge: [
    COIN_BASE.symbol,
    ANY_MAIN_TOKEN,
  ], // 不支持的跨链合约或币种
  queryToken: '0xfa9343c3897324496a05fc75abed6bac29f8a40f' // 查询余额合约
}

const TEST_CONFIG = {
  ...COIN_BASE,
  nodeRpc: CHAIN_TEST_INFO.rpc,
  nodeRpc1: CHAIN_TEST_INFO.rpc, // 节点地址
  chainID: CHAIN_TEST_INFO.chainID,
  initToken: INIT_TEST_TOKEN,
  initBridge: '0x67198ea7208d00864a36bcf9c98a6352b2941de9',
  explorerUrl: CHAIN_TEST_INFO.explorer,
  document: 'https://anyswap-faq.readthedocs.io/en/latest/index.html',
  btc: {
    lookHash: 'https://sochain.com/tx/BTCTEST/',
    queryTxns: 'https://sochain.com/api/v2/get_tx_received/BTCTEST/',
    queryHashStatus: 'https://sochain.com/api/v2/get_confidence/BTCTEST/',
    initAddr: 'mmBUP62PJNDndtSvH4ef65gUAucgQY5dqA'
  },
  ltc: {

  },
  isOpenRewards: 0,
  isChangeDashboard: 1,
  noSupportBridge: [COIN_BASE.symbol],
  queryToken: '0x980709557df48df842e1ba6a99ed6854e1dbcf24' // 查询余额合约
}

function getOKTConfig (type) {
  if (type.toLowerCase() === 'main') {
    return MAIN_CONFIG
  }
  return TEST_CONFIG
}

export default getOKTConfig