import {formatCoin} from '../../../utils/tools'

export function isSpecialCoin (coin) {
  if (formatCoin(coin) === 'BTC') {
    return 1
  } else if (formatCoin(coin) === 'LTC') {
    return 2
  } else if (formatCoin(coin) === 'BLOCK') {
    return 3
  } else {
    return 0
  }
}