import {chainInfo} from './coinbase/nodeConfig'

export function getNodeRpc (node) {
  // console.log(node)
  // console.log(chainInfo[node])
  if (chainInfo[node]) {
    return chainInfo[node].rpc
  } else {
    return ''
  }
}