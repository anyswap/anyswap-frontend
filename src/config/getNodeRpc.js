import {chainInfo} from './coinbase/nodeConfig'

export function getNodeRpc (node) {
  if (chainInfo[node]) {
    return chainInfo[node].rpc
  } else {
    return ''
  }
}