import getFSNConfig from './coinbase/fusion'
import getBNBConfig from './coinbase/binance'
import getFTMConfig from './coinbase/fantom'

import {getNetwork, getIdCode} from './getUrlParams'
import {chainInfo} from './coinbase/nodeConfig'
// console.log(location.href)
const ENV_NODE_CONFIG = 'ENV_NODE_CONFIG'
// const INIT_NODE = 'FSN_MAIN'
// const INIT_NODE = 'BNB_MAIN'
// const INIT_NODE = 'BNB_TEST'
// const INIT_NODE = 'FSN_TEST'
const INIT_NODE = 'FTM_MAIN'

getIdCode()

let ENV_CONFIG = getNetwork(ENV_NODE_CONFIG, INIT_NODE)
// ENV_CONFIG = 'FTM_MAIN'
console.log(ENV_CONFIG)

let netArr = ENV_CONFIG.split('_')

let netConfig = {}
if (netArr[0] === 'FSN') {
  netConfig = getFSNConfig(netArr[1])
} else if (netArr[0] === 'BNB') {
  netConfig = getBNBConfig(netArr[1])
} else if (netArr[0] === 'FTM') {
  netConfig = getFTMConfig(netArr[1])
}

let serverInfoUrl = 'https://bridgeapi.anyswap.exchange'
serverInfoUrl = 'https://testbridgeapi.anyswap.exchange'

export default {
  ...netConfig,
  ENV_NODE_CONFIG,
  bridgeAll: chainInfo,
  env: netArr[1].toLowerCase(),
  supportWallet: ['Ledger'],
  FSNtestUrl: 'https://test.anyswap.exchange', // 测试交易所地址
  FSNmainUrl: 'https://anyswap.exchange', // 主网交易所地址
  BSCtestUrl: 'https://bsctest.anyswap.exchange',
  BSCmainUrl: 'https://bsc.anyswap.exchange',
  serverInfoUrl: {
    V1: serverInfoUrl,
    // V2: 'http://localhost:8107/v2'
    V2: serverInfoUrl + '/v2'
  },
  recordsTxnsUrl: 'https://agentapi.anyswap.exchange/recordTxns',
  // recordsTxnsUrl: 'http://localhost:8108/recordTxns',
  dirSwitchFn (type) {
    if (netConfig.reverseSwitch) {
      if (type) return 1
      else return 0
    } else {
      if (type) return 0
      else return 1
    }
  }
}