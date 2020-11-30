import {chainInfo} from './nodeConfig'

const NAME_PREFIX = 'ANY'

// const ANY_TEST_TOKEN = '0xC20b5E92E1ce63Af6FE537491f75C19016ea5fb4'

const REWARDS_DAY = 5610 
const DEPOSIT_AMOUNT = 10000

const CHAIN_MAIN_INFO = chainInfo['1']
// const CHAIN_TEST_INFO = chainInfo['46688']

const COIN_BASE ={
  symbol: 'ETH', // 符号
  name: 'Ethereum', // 代币名
  decimals: 18, // 小数位
  networkName: 'ETH', // 网络名称
  reverseSwitch: 0,  // 是否反向禁用,
  suffix: 'ERC20', // 后缀
  prefix: 'a',
  keepDec: 6, // 保留小数位
  namePrefix: NAME_PREFIX, // 币名前缀
  marketsUrl: 'https://markets.anyswap.exchange/?trade=ANY_FSN', // K线图地址
  rewardUrl: 'https://rewardapiv2.anyswap.exchange/accounts/getETHReward/', // 获取奖励地址
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

// const INIT_TEST_TOKEN = ANY_TEST_TOKEN

const MAIN_CONFIG = {
  ...COIN_BASE,
  nodeRpc: CHAIN_MAIN_INFO.rpc, // 节点地址
  nodeRpc1: CHAIN_MAIN_INFO.rpc1, // 节点地址
  chainID: CHAIN_MAIN_INFO.chainID, // 节点chainID
  initToken: '0xf99d58e463a2e07e5692127302c20a191861b4d6', // 交易默认合约
  initBridge: '0x51600b0cff6bbf79e7767158c41fd15e968ec404', // 跨链桥默认合约
  explorerUrl: CHAIN_MAIN_INFO.explorer, // 浏览器地址
  document: 'https://anyswap-faq.readthedocs.io/en/latest/index.html', // 文档地址
  btcConfig: { // btc配置
    lookHash: 'https://www.blockchain.com/btc/tx/', // 
    queryTxns: 'https://sochain.com/api/v2/get_tx_received/BTC/', // 
    queryHashStatus: 'https://sochain.com/api/v2/get_confidence/BTC/', // 
    btcAddr: '1918DgsaJCsRF5E5rTp2AsE5XyFTF95tTQ',  // 
  },
  isOpenRewards: 1, // 是否打开奖励数据
  isChangeDashboard: 0, // 是否改变资产顺序
  noSupportBridge: [
    COIN_BASE.symbol,
    '0x514910771af9ca656af840dff83e8264ecf986ca',
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    '0x6b175474e89094c44da98b954eedeac495271d0f',
    '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
    '0xdac17f958d2ee523a2206206994597c13d831ec7',
    '0x4e15361fd6b4bb609fa63c81a2be19d873717870',
    '0xf21661d0d1d76d3ecb8e1b9f1c923dbfffae4097'
  ], // 不支持的跨链合约或币种
  queryToken: '0x575bA30c7b77fa0EEbd34cc5416538323C4e5612' // 查询余额合约
}

// const TEST_CONFIG = {
//   ...COIN_BASE,
//   nodeRpc: CHAIN_TEST_INFO.rpc,
//   nodeRpc1: CHAIN_TEST_INFO.rpc, // 节点地址
//   chainID: CHAIN_TEST_INFO.chainID,
//   initToken: INIT_TEST_TOKEN,
//   initBridge: '0x67198ea7208d00864a36bcf9c98a6352b2941de9',
//   explorerUrl: CHAIN_TEST_INFO.explorer,
//   document: 'https://anyswap-faq.readthedocs.io/en/latest/index.html',
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

function getETHConfig (type) {
  if (type.toLowerCase() === 'main') {
    return MAIN_CONFIG
  }
  // return TEST_CONFIG
}

export default getETHConfig