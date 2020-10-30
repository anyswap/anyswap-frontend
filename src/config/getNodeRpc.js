import {
  BNB_MAINNET,
  BNB_TESTNET,
  FSN_MAINNET,
  FSN_TESTNET,
  ETH_MAINNET,
  ETH_TESTNET,
  FTM_MAINNET,
  FTM_TESTNET
} from './coinbase/nodeConfig'
import config from './index'

const BRIDGE_RPC = config.bridge.rpc

export function getNodeRpc (node) {
  switch (node) {
    case 56:
      return BNB_MAINNET
    case 97:
      return BNB_TESTNET
    case 250:
      return FTM_MAINNET
    case 32659:
      return FSN_MAINNET
    case 46688:
      return FSN_TESTNET
    case 1:
      return ETH_MAINNET
    case 4:
      return ETH_TESTNET
    default: 
      return BRIDGE_RPC
  }
}