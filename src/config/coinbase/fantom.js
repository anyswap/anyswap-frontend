import {chainInfo} from './nodeConfig'

const NAME_PREFIX = 'ANY'

const ANY_MAIN_TOKEN = '0xb688e18f34e6e424c44b247318f22367ed7df3e2'
const ANY_TEST_TOKEN = '0xC20b5E92E1ce63Af6FE537491f75C19016ea5fb4'

const REWARDS_DAY = 33000 / 2
const DEPOSIT_AMOUNT = 10000

const CHAIN_MAIN_INFO = chainInfo['250']
const CHAIN_TEST_INFO = chainInfo['97']

const COIN_BASE ={
  symbol: 'FTM', // 符号
  name: 'Fantom', // 代币名
  decimals: 18, // 小数位
  networkName: 'FTM', // 网络名称
  reverseSwitch: 0,  // 是否反向禁用,
  suffix: '', // 后缀
  prefix: '',
  keepDec: 6, // 保留小数位
  namePrefix: NAME_PREFIX, // 币名前缀
  marketsUrl: 'https://markets.anyswap.exchange/?trade=ANY_FSN', // K线图地址
  rewardUrl: 'https://rewardapiv2.anyswap.exchange/accounts/getReward/', // 获取奖励地址
  document: 'https://anyswap-faq.readthedocs.io/en/latest/index.html', // 文档地址
  rewardRate (arr) {
    let totalLq = 0
    let coinObj = {}
    return coinObj
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
  nodeRpc1: CHAIN_MAIN_INFO.rpc, // 节点地址
  chainID: CHAIN_MAIN_INFO.chainID, // 节点chainID
  any: {
    token: ANY_MAIN_TOKEN,  // ANY合约地址
  },
  initToken: INIT_MAIN_TOKEN, // 交易默认合约
  initBridge: '0xb688e18f34e6e424c44b247318f22367ed7df3e2', // 跨链桥默认合约
  explorerUrl: CHAIN_MAIN_INFO.explorer, // 浏览器地址
  btcConfig: { // btc配置
    lookHash: 'https://www.blockchain.com/btc/tx/', // 
    queryTxns: 'https://sochain.com/api/v2/get_tx_received/BTC/', // 
    queryHashStatus: 'https://sochain.com/api/v2/get_confidence/BTC/', // 
    btcAddr: '',  // 
  },
  isOpenRewards: 0, // 是否打开奖励数据
  isChangeDashboard: 0, // 是否改变资产顺序
  noSupportBridge: [
    COIN_BASE.symbol,
    '0xAd84341756Bf337f5a0164515b1f6F993D194E1f',
    '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83'
  ], // 不支持的跨链合约或币种
  queryToken: '0x938fD483657Fd233CF93D78f99698662674c1894' // 查询余额合约
}

// const TEST_CONFIG = {
//   ...COIN_BASE,
//   nodeRpc: CHAIN_TEST_INFO.rpc,
//   nodeRpc1: CHAIN_TEST_INFO.rpc, // 节点地址
//   chainID: CHAIN_TEST_INFO.chainID,
//   any: {
//     token: ANY_TEST_TOKEN
//   },
//   initToken: INIT_TEST_TOKEN,
//   initBridge: '0x67198ea7208d00864a36bcf9c98a6352b2941de9',
//   explorerUrl: CHAIN_TEST_INFO.explorer,
//   btcConfig: {
//     lookHash: 'https://sochain.com/tx/BTCTEST/',
//     queryTxns: 'https://sochain.com/api/v2/get_tx_received/BTCTEST/',
//     queryHashStatus: 'https://sochain.com/api/v2/get_confidence/BTCTEST/',
//     btcAddr: 'mmBUP62PJNDndtSvH4ef65gUAucgQY5dqA'
//   },
//   isOpenRewards: 1,
//   isChangeDashboard: 1,
//   noSupportBridge: [COIN_BASE.symbol, ANY_TEST_TOKEN],
//   queryToken: '0x2fd94457b707b2776d4f4e4292a4280164fe8a15' // 查询余额合约
// }

function getFSNConfig (type) {
  if (type.toLowerCase() === 'main') {
    return MAIN_CONFIG
  }
  // return TEST_CONFIG
  return {}
}

export default getFSNConfig