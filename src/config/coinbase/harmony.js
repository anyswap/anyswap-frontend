import {chainInfo} from './nodeConfig'

const NAME_PREFIX = ''

const REWARDS_DAY = 33000 / 2
// const REWARDS_DAY = 7600
const DEPOSIT_AMOUNT = 10000

const CHAIN_MAIN_INFO = chainInfo['1666600000']
// const CHAIN_TEST_INFO = chainInfo['46688']

const COIN_BASE ={
  symbol: 'ONE', // 符号
  name: 'Harmony', // 代币名
  decimals: 18, // 小数位
  networkName: 'ONE', // 网络名称
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

const MAIN_CONFIG = {
  ...COIN_BASE,
  nodeRpc: CHAIN_MAIN_INFO.rpc, // 节点地址
  nodeRpc1: CHAIN_MAIN_INFO.rpc1, // 节点地址
  chainID: CHAIN_MAIN_INFO.chainID, // 节点chainID
  initToken: '0x03732a1b4297ec285999402a9129cfad62a65463', // 交易默认合约
  initBridge: '0x03732a1b4297ec285999402a9129cfad62a65463', // 跨链桥默认合约
  explorerUrl: CHAIN_MAIN_INFO.explorer, // 浏览器地址
  document: 'https://anyswap-faq.readthedocs.io/en/latest/index.html', // 文档地址
  btc: { // btc配置
    lookHash: 'https://www.blockchain.com/btc/tx/', // 
    queryTxns: 'https://sochain.com/api/v2/get_tx_received/BTC/', // 
    queryHashStatus: 'https://sochain.com/api/v2/get_confidence/BTC/', // 
    initAddr: '1J3XMw4HnR4dm65QtwG2oJRBjRXFqGS1ap',  // 
  },
  ltc: { // ltc配置
    lookHash: 'https://blockchair.com/litecoin/transaction/', // 
    queryTxns: 'https://sochain.com/api/v2/get_tx_received/LTC/', // 
    queryHashStatus: 'https://sochain.com/api/v2/get_confidence/LTC/', // 
    initAddr: 'LU8AFfxreA4srSH6rYWAoivzH3U35iBiPK',  // 
  },
  isOpenRewards: 0, // 是否打开奖励数据
  isChangeDashboard: 0, // 是否改变资产顺序
  noSupportBridge: [
    COIN_BASE.symbol,
  ], // 不支持的跨链合约或币种
  queryToken: '0xB44a9B6905aF7c801311e8F4E76932ee959c663C' // 查询余额合约
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
//   btc: {
//     lookHash: 'https://sochain.com/tx/BTCTEST/',
//     queryTxns: 'https://sochain.com/api/v2/get_tx_received/BTCTEST/',
//     queryHashStatus: 'https://sochain.com/api/v2/get_confidence/BTCTEST/',
//     initAddr: 'mmBUP62PJNDndtSvH4ef65gUAucgQY5dqA'
//   },
//   ltc: {

//   },
//   isOpenRewards: 0,
//   isChangeDashboard: 1,
//   noSupportBridge: [COIN_BASE.symbol, ANY_TEST_TOKEN],
//   queryToken: '0x2fd94457b707b2776d4f4e4292a4280164fe8a15' // 查询余额合约
// }

function getONEConfig (type) {
  if (type.toLowerCase() === 'main') {
    return MAIN_CONFIG
  }
  // return TEST_CONFIG
}

export default getONEConfig