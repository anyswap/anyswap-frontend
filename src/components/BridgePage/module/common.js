import {formatCoin} from '../../../utils/tools'
import config from '../../../config'

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

export function formatLabel (name, chainId) {
  name = name === config.namePrefix || name === config.suffix ? name : name.replace(config.namePrefix, '').replace(config.suffix, '')

  if (chainId) {
    if (Number(chainId) === 1 && name.indexOf('Ethereum') === -1) {
      if (name === 'Frapped USDT') {
        name = 'Tether-ERC20'
      } else {
        name = name + '-ERC20'
      }
    } else if (Number(chainId) === 56) {
      name = name + '-BEP20'
    } else if (Number(chainId) === 128) {
      name = name + '-HECO'
    } else if (Number(chainId) === 250) {
      name = name + '-FRC20'
    } else if (Number(chainId) === 32659) {
      name = name + '(Fusion)'
    } else if (Number(chainId) === 1666600000) {
      name = name + '(Harmony)'
    }
  }
  return name
}