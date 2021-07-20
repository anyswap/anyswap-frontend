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
  OKT_MAIN_CHAINID,
  OKT_TEST_CHAINID,
  ARBITRUM_TEST_CHAINID,
  MATIC_MAIN_CHAINID,
  xDAI_MAIN_CHAINID,
  AVAX_MAIN_CHAINID,
  DEV_TEST_CHAINID,
  ONE_MAIN_CHAINID,
  KCS_MAIN_CHAINID,
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
  if (type === 'fusion' || type === 'fsn' || type.toString() === FSN_MAIN_CHAINID.toString()) return chainInfo[FSN_MAIN_CHAINID].label
  if (type === 'fusiontestnet' || type === 'fsntestnet' || type.toString() === FSN_TEST_CHAINID.toString()) return chainInfo[FSN_TEST_CHAINID].label
  if (type === 'bsc' || type.toString() === BNB_MAIN_CHAINID.toString()) return chainInfo[BNB_MAIN_CHAINID].label
  if (type === 'bsctestnet' || type.toString() === BNB_TEST_CHAINID.toString()) return chainInfo[BNB_TEST_CHAINID].label
  if (type === 'fantom' || type === 'ftm' || type.toString() === FTM_MAIN_CHAINID.toString()) return chainInfo[FTM_MAIN_CHAINID].label
  if (type === 'eth' || type.toString() === ETH_MAIN_CHAINID.toString()) return chainInfo[ETH_MAIN_CHAINID].label
  if (type === 'huobi' || type === 'ht' || type.toString() === HT_MAIN_CHAINID.toString()) return chainInfo[HT_MAIN_CHAINID].label
  if (type === 'huobitestnet' || type === 'httestnet' || type.toString() === HT_TEST_CHAINID.toString()) return chainInfo[HT_TEST_CHAINID].label
  if (type === 'okb' || type.toString() === OKT_MAIN_CHAINID.toString()) return chainInfo[OKT_MAIN_CHAINID].label
  if (type === 'okbtest' || type.toString() === OKT_TEST_CHAINID.toString()) return chainInfo[OKT_TEST_CHAINID].label
  if (type === 'arbitrumtestnet' || type.toString() === ARBITRUM_TEST_CHAINID.toString()) return chainInfo[ARBITRUM_TEST_CHAINID].label
  if (type === 'polygon' || type === 'natic' || type.toString() === MATIC_MAIN_CHAINID.toString()) return chainInfo[MATIC_MAIN_CHAINID].label
  if (type === 'xdai' || type.toString() === xDAI_MAIN_CHAINID.toString()) return chainInfo[xDAI_MAIN_CHAINID].label
  if (type === 'avax' || type.toString() === AVAX_MAIN_CHAINID.toString()) return chainInfo[AVAX_MAIN_CHAINID].label
  if (type === 'moonbeamtest' || type.toString() === DEV_TEST_CHAINID.toString()) return chainInfo[DEV_TEST_CHAINID].label
  if (type === 'harmony' || type.toString() === ONE_MAIN_CHAINID.toString()) return chainInfo[ONE_MAIN_CHAINID].label
  if (type === 'kcs' || type.toString() === KCS_MAIN_CHAINID.toString()) return chainInfo[KCS_MAIN_CHAINID].label
  return INIT_NODE
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