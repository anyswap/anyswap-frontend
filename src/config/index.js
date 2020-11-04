
import {getBaseCoin} from './coinbase/coin'
import getFSNConfig from './coinbase/fusion'
import getBNBConfig from './coinbase/binance'
import getFTMConfig from './coinbase/fantom'
import {
  FSN_MAINNET,
  FSN_MAIN_CHAINID,
  FSN_MAIN_EXPLORER,
  FSN_TESTNET,
  FSN_TEST_CHAINID,
  FSN_TEST_EXPLORER,

  BNB_MAINNET,
  BNB_MAIN_CHAINID,
  BNB_MAIN_EXPLORER,
  BNB_TESTNET,
  BNB_TEST_CHAINID,
  BNB_TEST_EXPLORER,

  ETH_MAINNET,
  ETH_MAIN_CHAINID,
  ETH_MAIN_EXPLORER,
  ETH_TESTNET,
  ETH_TEST_CHAINID,
  ETH_TEST_EXPLORER,

  
  FTM_MAINNET,
  FTM_MAIN_CHAINID,
  FTM_MAIN_EXPLORER,
  FTM_TESTNET,
  FTM_TEST_CHAINID,
  FTM_TEST_EXPLORER,
} from './coinbase/nodeConfig'

import {getNetwork, getIdCode} from './getUrlParams'
// console.log(location.href)
const ENV_NODE_CONFIG = 'ENV_NODE_CONFIG'
const INIT_NODE = 'FSN_MAIN'
// const INIT_NODE = 'BNB_MAIN'
// const INIT_NODE = 'BNB_TEST'
// const INIT_NODE = 'FSN_TEST'
// const INIT_NODE = 'FTM_MAIN'

getIdCode()
let ENV_CONFIG = getNetwork(ENV_NODE_CONFIG, INIT_NODE)
// ENV_CONFIG = 'FTM_MAIN'
console.log(ENV_CONFIG)

let netArr = ENV_CONFIG.split('_')

let useBridge = ''

let netConfig = {}
let prefix = 'a'
if (netArr[0] === 'FSN') {
  netConfig = getFSNConfig(netArr[1])
  if (netArr[1].toLowerCase() === 'main') {
    useBridge = ETH_MAIN_CHAINID
  } else {
    useBridge = ETH_TEST_CHAINID
  }
} else if (netArr[0] === 'BNB') {
  netConfig = getBNBConfig(netArr[1])
  if (netArr[1].toLowerCase() === 'main') {
    useBridge = FSN_MAIN_CHAINID
  } else {
    useBridge = FSN_TEST_CHAINID
  }
  prefix = ''
} else if (netArr[0] === 'FTM') {
  netConfig = getFTMConfig(netArr[1])
  if (netArr[1].toLowerCase() === 'main') {
    useBridge = FTM_MAIN_CHAINID
  } else {
    useBridge = FTM_TEST_CHAINID
  }
  prefix = ''
}

const COIN = getBaseCoin(prefix)

let bridge = {
  46688: {
    rpc: FSN_TESTNET,
    chainID: FSN_TEST_CHAINID,
    lookHash: FSN_TEST_EXPLORER + '/transaction/',
    lookAddr: FSN_TEST_EXPLORER + '/address/',
    isOpen: 1
  },
  250: {
    rpc: FTM_MAINNET,
    chainID: FTM_MAIN_CHAINID,
    lookHash: FTM_MAIN_EXPLORER + '/transactions/',
    lookAddr: FTM_MAIN_EXPLORER + '/address/',
    isOpen: 0
  },
  97: {
    rpc: BNB_TESTNET,
    chainID: BNB_TEST_CHAINID,
    lookHash: BNB_TEST_EXPLORER + '/tx/',
    lookAddr: BNB_TEST_EXPLORER + '/address/',
    isOpen: 0
  },
  4: {
    rpc: ETH_TESTNET,
    chainID: ETH_TEST_CHAINID,
    lookHash: ETH_TEST_EXPLORER + '/tx/',
    lookAddr: ETH_TEST_EXPLORER + '/address/',
    isOpen: 0
  },
  32659: {
    rpc: FSN_MAINNET,
    chainID: FSN_MAIN_CHAINID,
    lookHash: FSN_MAIN_EXPLORER + '/transaction/',
    lookAddr: FSN_MAIN_EXPLORER + '/address/',
    isOpen: 1
  },
  56: {
    rpc: BNB_MAINNET,
    chainID: BNB_MAIN_CHAINID,
    lookHash: BNB_MAIN_EXPLORER + '/tx/',
    lookAddr: BNB_MAIN_EXPLORER + '/address/',
    isOpen: 0
  },
  1: {
    rpc: ETH_MAINNET,
    chainID: ETH_MAIN_CHAINID,
    lookHash: ETH_MAIN_EXPLORER + '/tx/',
    lookAddr: ETH_MAIN_EXPLORER + '/address/',
    isOpen: 1
  },
}

// console.log(bridge[useBridge])
// console.log(useBridge)
let serverInfoUrl = 'https://bridgeapi.anyswap.exchange'
// serverInfoUrl = 'https://testbridgeapi.anyswap.exchange'
// if (netArr[1].toLowerCase() === 'test') {
// }
export default {
  ...netConfig,
  ...COIN,
  ENV_NODE_CONFIG,
  bridgeAll: bridge,
  env: netArr[1].toLowerCase(),
  supportWallet: ['Ledger'],
  FSNtestUrl: 'https://test.anyswap.exchange', // 测试交易所地址
  FSNmainUrl: 'https://anyswap.exchange', // 主网交易所地址
  BSCtestUrl: 'https://bsctest.anyswap.exchange',
  BSCmainUrl: 'https://bsc.anyswap.exchange',
  bridge: bridge[useBridge],
  // serverInfoUrl: 'http://localhost:8107',
  // serverInfoUrl: 'https://bridgeapi.anyswap.exchange',
  serverInfoUrl: {
    V1: serverInfoUrl,
    // V2: 'http://localhost:8107/v2'
    V2: serverInfoUrl + '/v2'
  },
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