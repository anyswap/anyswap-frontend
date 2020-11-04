function getNode (type, INIT_NODE) {
  switch (type) {
    case 'fusion':
      return 'FSN_MAIN'
    case 'fusiontestnet':
      return 'FSN_TEST'
    case 'bsc':
      return 'BNB_MAIN'
    case 'bsctestnet':
      return 'BNB_TEST'
    case 'fantom':
      return 'FTM_MAIN'
    default:
      return INIT_NODE
  }
}

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

export function getNetwork (ENV_NODE_CONFIG, INIT_NODE) {
  let nc = ''
  let urlParams = getParams('network')
  if (urlParams) {
    nc = getNode(urlParams, INIT_NODE)
    localStorage.setItem(ENV_NODE_CONFIG, nc)
  } else {
    let localStr = localStorage.getItem(ENV_NODE_CONFIG)
    if (localStr) {
      nc = localStr
    } else {
      nc = INIT_NODE
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