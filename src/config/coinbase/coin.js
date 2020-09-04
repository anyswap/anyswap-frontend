const PREFIX = 'a'
let coin
(function() {
  coin[coin['BTC'] = PREFIX + 'BTC'] = 'BTC'
  coin[coin['ETH'] = PREFIX + 'ETH'] = 'ETH'
  coin[coin['USDT'] = PREFIX + 'USDT'] = 'USDT'
  coin[coin['DAI'] = PREFIX + 'DAI'] = 'DAI'
  coin[coin['LTC'] = PREFIX + 'LTC'] = 'LTC'
  coin[coin['XRP'] = PREFIX + 'XRP'] = 'XRP'
})(coin || (coin = {}))
export default{
  ...coin,
  prefix: PREFIX,
}
// export {
//   PREFIX,
//   BTC,
//   ETH,
//   USDT,
//   DAI,
//   LTC,
//   XRP,
// }