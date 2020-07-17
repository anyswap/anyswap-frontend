
// const envConfig = 'main'
const envConfig = 'test'

let nodeRpc, chainID
if (envConfig === 'main') {
  nodeRpc = 'https://mainnet.anyswap.exchange'
  chainID = 32659
} else {
  nodeRpc = 'https://testnet.fsn.dev/api'
  chainID = 46688
}


export default {
  env: envConfig,
  nodeRpc: nodeRpc,
  chainID: chainID,
  CoinInfo: {
    FSN: {url: 'https://testnet.smpcwallet.com/btc2fsn'},
    mBTC: {url: 'https://testnet.smpcwallet.com/btc2fsn'},
    mETH: {url: 'https://testnet.smpcwallet.com/eth2fsn'},
    mUSDT: {url: 'https://testnet.smpcwallet.com/usdt2fsn'},
  },
  supportWallet: ['Ledger'],
  reg: {
    'mBTC': /^[13][0-9a-zA-Z]{25,33}$|^[2mn][0-9a-zA-Z]{25,34}$/
  },
  testUrl: 'https://test.anyswap.exchange',
  mainUrl: 'https://anyswap.exchange',
  initToken: envConfig === 'main' ? 'ANY' : '0xC20b5E92E1ce63Af6FE537491f75C19016ea5fb4',
  initBridge: envConfig === 'main' ? 'mBTC' : '0xeaeaeb2cf9921a084ef528f43e9e121e8291a947',
}