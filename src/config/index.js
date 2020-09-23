
import {getBaseCoin} from './coinbase/coin'
import getFSNConfig from './coinbase/fusion'
import getBNBConfig from './coinbase/binance'
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
  ETH_TEST_EXPLORER
} from './coinbase/nodeConfig'

// const ENV_CONFIG = 'BNB_MAIN'
// const ENV_CONFIG = 'FSN_MAIN'
// const ENV_CONFIG = 'BNB_TEST'
const ENV_CONFIG = 'FSN_TEST'


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
}

const COIN = getBaseCoin(prefix)
// /**
//  * @description 配置以太坊网络节点
//  */
let reg = {
  [COIN.BTC]: /^[13][0-9a-zA-Z]{26,34}$|^[2mn][0-9a-zA-Z]{25,34}$/
}
let bridge = {
  46688: {
    rpc: FSN_TESTNET,
    chainID: FSN_TEST_CHAINID,
    lookHash: FSN_TEST_EXPLORER + '/transaction/',
    isOpen: 1
  },
  97: {
    rpc: BNB_TESTNET,
    chainID: BNB_TEST_CHAINID,
    lookHash: BNB_TEST_EXPLORER + '/tx/',
    isOpen: 0
  },
  4: {
    rpc: ETH_TESTNET,
    chainID: ETH_TEST_CHAINID,
    lookHash: ETH_TEST_EXPLORER + '/tx/',
    isOpen: 0
  },
}
if (netArr[1].toLowerCase() === 'main') {
  reg = {
    [COIN.BTC]: /^[13][0-9a-zA-Z]{26,34}$/
  }
  bridge = {
    32659: {
      rpc: FSN_MAINNET,
      chainID: FSN_MAIN_CHAINID,
      lookHash: FSN_MAIN_EXPLORER + '/transaction/',
      isOpen: 1
    },
    56: {
      rpc: BNB_MAINNET,
      chainID: BNB_MAIN_CHAINID,
      lookHash: BNB_MAIN_EXPLORER + '/tx/',
      isOpen: 0
    },
    1: {
      rpc: ETH_MAINNET,
      chainID: ETH_MAIN_CHAINID,
      lookHash: ETH_MAIN_EXPLORER + '/tx/',
      isOpen: 1
    },
  }
}
const dirSwitchFn = (type) => {
  if (netConfig.reverseSwitch) {
    if (type) return 1
    else return 0
  } else {
    if (type) return 0
    else return 1
  }
}
// console.log(bridge[useBridge])
// console.log(useBridge)
export default {
  ...netConfig,
  ...COIN,
  bridgeAll: bridge,
  env: netArr[1].toLowerCase(),
  supportWallet: ['Ledger'],
  reg,
  bridge: bridge[useBridge],
  bridgeType: useBridge,
  dirSwitchFn
}