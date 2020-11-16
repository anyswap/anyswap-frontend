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
  return coin.replace('any', '').replace(config.prefix, '')
}

export function formatDecimal(num, decimal) {
  num = num.toString()
  let index = num.indexOf('.')
  if (index !== -1) {
      num = num.substring(0, decimal + index + 1)
  } else {
      num = num.substring(0)
  }
  return parseFloat(num).toFixed(decimal)
}