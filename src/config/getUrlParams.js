import {
  chainInfo,
  BNB_MAIN_CHAINID,
  BNB_TEST_CHAINID,
  FSN_MAIN_CHAINID,
  FSN_TEST_CHAINID,
  ETH_MAIN_CHAINID,
  FTM_MAIN_CHAINID,
  HT_MAIN_CHAINID,
  HT_TEST_CHAINID,
  OKT_TEST_CHAINID,
  ARBITRUM_TEST_CHAINID,
  MATIC_MAIN_CHAINID,
  xDAI_MAIN_CHAINID,
  AVAX_MAIN_CHAINID,
  DEV_TEST_CHAINID
} from './coinbase/nodeConfig'


function getParams (param) {
  let str = location.href.indexOf('?') ? location.href.split('?')[1] : ''
  if (str) {
    let arr = str.split('&')
    let value = ''
    for (let str2 of arr) {
      let arr2 = str2.split('=')
      if (arr2[0] === param) {
        value = arr2[1]
        break
      }
    }
    return value
  } else {
    return ''
  }
}

function getParamNode (type, INIT_NODE) {
  switch (type) {
    case 'fusion':
      return chainInfo[FSN_MAIN_CHAINID].label
    case 'fusiontestnet':
      return chainInfo[FSN_TEST_CHAINID].label
    case 'bsc':
      return chainInfo[BNB_MAIN_CHAINID].label
    case 'bsctestnet':
      return chainInfo[BNB_TEST_CHAINID].label
    case 'fantom':
      return chainInfo[FTM_MAIN_CHAINID].label
    case 'eth':
      return chainInfo[ETH_MAIN_CHAINID].label
    case 'huobi':
      return chainInfo[HT_MAIN_CHAINID].label
    case 'huobitestnet':
      return chainInfo[HT_TEST_CHAINID].label
    case 'okbtest':
      return chainInfo[OKT_TEST_CHAINID].label
    case 'arbitrumtestnet':
      return chainInfo[ARBITRUM_TEST_CHAINID].label
    case 'polygon':
      return chainInfo[MATIC_MAIN_CHAINID].label
    case 'xdai':
      return chainInfo[xDAI_MAIN_CHAINID].label
    case 'avax':
      return chainInfo[AVAX_MAIN_CHAINID].label
    case 'dev':
      return chainInfo[DEV_TEST_CHAINID].label
    default:
      return INIT_NODE
  }
}
function getNode (type, INIT_NODE) {
  if (type.indexOf('fsn') !== -1) {
    return chainInfo[FSN_MAIN_CHAINID].label
  } else if (type.indexOf('bsc') !== -1) {
    return chainInfo[BNB_MAIN_CHAINID].label
  } else if (type.indexOf('ftm') !== -1) {
    return chainInfo[FTM_MAIN_CHAINID].label
  } else if (type.indexOf('eth') !== -1) {
    return chainInfo[ETH_MAIN_CHAINID].label
  } else if (type.indexOf('huobi') !== -1) {
    return chainInfo[HT_MAIN_CHAINID].label
  } else if (type.indexOf('okex') !== -1) {
    return chainInfo[OKT_TEST_CHAINID].label
  } else {
    return INIT_NODE
  }
}
export function getNetwork (ENV_NODE_CONFIG, INIT_NODE) {
  let nc = ''
  let urlParams = getParams('network')
  let localHost = window.location.host
  let localStr = localStorage.getItem(ENV_NODE_CONFIG)
  if (urlParams) {
    nc = getParamNode(urlParams, INIT_NODE)
    localStorage.setItem(ENV_NODE_CONFIG, nc)
  } else {
    if (localStr) {
      nc = localStr
    } else {
      nc = getNode(localHost, INIT_NODE)
      localStorage.setItem(ENV_NODE_CONFIG, nc)
    }
  }
  return nc
}

const ID_CODE = 'ID_CODE'
export function getIdCode () {
  let urlParams = getParams('agent')
  if (urlParams) {
    localStorage.setItem(ID_CODE, urlParams)
  }
}