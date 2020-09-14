
export const getBaseCoin = (prefix) => {
  let coinObj = {}
  prefix = prefix ? prefix : ''
  coinObj[coinObj['BTC'] = prefix + 'BTC'] = 'BTC'
  coinObj[coinObj['ETH'] = prefix + 'ETH'] = 'ETH'
  coinObj[coinObj['USDT'] = prefix + 'USDT'] = 'USDT'
  coinObj[coinObj['DAI'] = prefix + 'DAI'] = 'DAI'
  coinObj[coinObj['LTC'] = prefix + 'LTC'] = 'LTC'
  coinObj[coinObj['XRP'] = prefix + 'XRP'] = 'XRP'
  coinObj['prefix'] = prefix
  // console.log(coinObj)
  return coinObj
}