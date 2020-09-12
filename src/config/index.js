
import coin from './coinbase/coin'
import getFSNConfig from './coinbase/fusion'
import getBNBConfig from './coinbase/binance'
// console.log(coin)
const ENV_CONFIG = 'BNB_MAIN'
// const ENV_CONFIG = 'BNB_TEST'
// const ENV_CONFIG = 'FSN_TEST'
// const ENV_CONFIG = 'FSN_MAIN'
let netArr = ENV_CONFIG.split('_')
let netConfig = {}
if (netArr[0] === 'FSN') {
  netConfig = getFSNConfig(netArr[1])
} else if (netArr[0] === 'BNB') {
  netConfig = getBNBConfig(netArr[1])
  coin.prefix = ''
}

// /**
//  * @description 配置以太坊网络节点
//  */
let ercConfig = {
      chainID: 4,
      nodeRpc: 'https://rinkeby.infura.io/v3/0e40cfd5e7a64b2d9aea8427e4bd52a0',
      lookHash: 'https://rinkeby.etherscan.io/tx/'
    },
    reg = {
      [coin.BTC]: /^[13][0-9a-zA-Z]{26,34}$|^[2mn][0-9a-zA-Z]{25,34}$/
    }
if (netArr[1].toLowerCase() === 'main') {
  ercConfig = {
    chainID: 1,
    // nodeRpc: 'https://mainnet.infura.io/v3/0e40cfd5e7a64b2d9aea8427e4bd52a0',
    nodeRpc: 'https://ethmainnet.anyswap.exchange',
    lookHash: 'https://etherscan.io/tx/'
  }
  reg = {
    [coin.BTC]: /^[13][0-9a-zA-Z]{26,34}$/
  }
}

export default {
  ...netConfig,
  ...coin,
  env: netArr[1].toLowerCase(),
  supportWallet: ['Ledger'],
  reg,
  ercConfig,
}