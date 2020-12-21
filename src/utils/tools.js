import config from '../config'

export const copyTxt = (cont) => {
  if (!cont) return
  // cont = cont.replace(/\s/, '')
  let id = 'copyInputSelectContent'
  let _input = document.createElement('input')
  _input.type = 'text'
  _input.value = cont
  _input.id = id
  document.body.append(_input)
  // document.getElementById(id).select()
  // document.execCommand("Copy")
  
  const activeCodeSapn = document.getElementById(id);
  const range = document.createRange();
  window.getSelection().removeAllRanges(); //清楚页面中已有的selection
  range.selectNode(activeCodeSapn);
  window.getSelection().addRange(range)
  window.getSelection().removeAllRanges()
  document.getElementById(id).remove()
  _input = null
  id = null
}

export function formatCoin (coin) {
  if (coin) {
    return coin.replace('any', '').replace(config.prefix, '')
  } else {
    return coin
  }
}

export function formatDecimal(num, decimal) {
  if (isNaN(num)) {
    return num
  }
  num = (num * 10000).toFixed(decimal) / 10000
  num = num.toString()
  let index = num.indexOf('.')
  if (index !== -1) {
      num = num.substring(0, decimal + index + 1)
  } else {
      num = num.substring(0)
  }
  return Number(parseFloat(num).toFixed(decimal))
}

export function formatNum (num) {
  if (isNaN(num)) {
    return num
  }
  num = Number(num)
  if (num >= 1) {
    return formatDecimal(num, 2)
  } else {
    return formatDecimal(num, config.keepDec)
  }
}

export function thousandBit (num, dec = 8) {
  if (!Number(num)) return '0.00'
  if (Number(num) < 0.00000001) return '<0.00000001'
  if (Number(num) < 1000) {
    if (isNaN(dec)) {
      return num
    } else {
      return Number(num).toFixed(dec)
    }
  }
  let _num = num = Number(num)
  if (isNaN(num)) {
    num = 0
    num = num.toFixed(dec)
  } else {
    if (isNaN(dec)) {
      if (num.toString().indexOf('.') === -1) {
        num = Number(num).toLocaleString()
      } else {
        let numSplit = num.toString().split('.')
        numSplit[1] = numSplit[1].length > 9 ? numSplit[1].substr(0, 8) : numSplit[1]
        num = Number(numSplit[0]).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').toLocaleString()
        num = num.toString().split('.')[0] + '.' + numSplit[1]
      }
    } else {
      num = num.toFixed(dec).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').toLocaleString()
    }
  }
  if (_num < 0 && num.toString().indexOf('-') < 0) {
    num = '-' + num
  }
  return num
}