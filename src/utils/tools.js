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