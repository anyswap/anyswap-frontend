import config from '../../config'
import axios from 'axios'
import { getChainHashStatus } from '../birdge'
const bitcoin = require('bitcoinjs-lib');
const OPS = require('bitcoin-ops');

const NETWORK = config.env === 'test' ? bitcoin.networks.testnet : bitcoin.networks.bitcoin
const LITECOIN = {
  messagePrefix: '\x19Litecoin Signed Message:\n',
  bech32: 'ltc',
  bip32: {
    public: 0x019da462,
    private: 0x019d9cfe,
  },
  pubKeyHash: 0x30,
  scriptHash: 0x32,
  wif: 0xb0,
}

const BLOCK = {
  messagePrefix: '\x19Blocknet Signed Message:\n',
  bech32: 'block',
  bip32: {
   public: 0x0488B21E,
   private: 0x0488ADE4
  },
  
  pubKeyHash: 0x1a,
  scriptHash: 0x1c,
  wif: 0x9a,
}

function getNetwork (coin) {
  let network = NETWORK
  if (coin.indexOf('BTC') !== -1) {
    network = NETWORK
  } else if (coin.indexOf('LTC') !== -1) {
    network = LITECOIN
  } else if (coin.indexOf('BLOCK') !== -1) {
    network = BLOCK
  } 
  return network
}

function getType (coin) {
  let type = 'btc'
  if (coin.indexOf('LTC') !== -1) {
    type = 'ltc'
  } else if (coin.indexOf('BLOCK') !== -1) {
    type = 'block'
  } 
  return type
}

function createAddress (address, coin, initAddr) {
  let network = getNetwork(coin)
  address = address.replace('0x', '')
  const {hash} = bitcoin.address.fromBase58Check(initAddr)

  const reddemScript = bitcoin.script.compile([
    Buffer.from(address, 'hex'),
    OPS.OP_DROP,
    OPS.OP_DUP,
    OPS.OP_HASH160,
    Buffer.from(hash,'hex'),
    OPS.OP_EQUALVERIFY,
    OPS.OP_CHECKSIG,
  ])
  const output = bitcoin.script.compile([
    OPS.OP_HASH160,
    bitcoin.crypto.hash160(reddemScript),
    OPS.OP_EQUAL,
  ])
  const p2shAddress = bitcoin.payments.p2sh({
    output: output,
    network: network,
  })
  // console.log(p2shAddress.address)
  return p2shAddress.address;
}

function isBTCAddress (address, coin) {
  let network = getNetwork(coin)
  try {
    bitcoin.address.toOutputScript(address, network)
    return true
  } catch (error) {
    return false
  }
}

function GetBTCTxnsAPI (url) {
  return new Promise(resolve => {
    axios.get(url).then(res => {
      // console.log(res)
      resolve(res.data)
    }).catch(err => {
      console.log(err)
      resolve(err)
    })
  })
}

function GetBlockTxnsAPI (address) {
  let url = 'https://plugin-dev.core.cloudchainsinc.com'
  let params = {
    "method": "gethistory",
    "params": ["BLOCK", [address]]
  }
  return new Promise(resolve => {
    axios.post(url, params).then(res => {
      console.log(res.data)
      resolve(res.data)
    }).catch(err => {
      console.log(err)
      resolve(err)
    })
  })
}
// GetBlockTxnsAPI('BqeAD3u6T9yCvgbXizqPcYNBTSCq9RtWrR')

function GetBlockhashStatus (hash) {
  let url = 'https://plugin-dev.core.cloudchainsinc.com'
  let params = {
    "method": "gettransaction",
    "params": ["BLOCK", hash]
  }
  return new Promise(resolve => {
    axios.post(url, params).then(res => {
      console.log(res.data)
      resolve(res.data)
    }).catch(err => {
      console.log(err)
      resolve(err)
    })
  })
}

function GetBTChashStatus (hash, index, coin, status, account, version) {
  let type = getType(coin)
  let sochainUrl = config[type].queryHashStatus + hash // 主网

  return new Promise(resolve => {
    if (status) {
      getChainHashStatus(hash, coin, account, version).then(result => {
        if (result) {
          resolve({
            ...result,
            index,
            hash,
            status
          })
        } else {
          resolve({
            index,
            status
          })
        }
      })
    } else if (type === 'block') {
      GetBlockhashStatus(hash).then(res => {
        console.log(res)
        if (res && res.result && res.result.txid) {
          if (Number(res.result.confirmations) > 0) {
            getChainHashStatus(hash, coin, account, version).then(result => {
              if (result) {
                resolve({
                  ...result,
                  index,
                  hash,
                  status: 1
                })
              } else {
                resolve({
                  index,
                  status: 1
                })
              }
            })
          } else {
            resolve({
              index,
              status: 0
            })
          }
        } else {
          resolve({
            index,
            status: 2
          })
        }
      })
    } else {
      GetBTCTxnsAPI(sochainUrl).then(res => {
        console.log(res)
        if (res && res.data && res.data.txid) {
          if (Number(res.data.confirmations) > 0) {
            getChainHashStatus(hash, coin, account, version).then(result => {
              if (result) {
                resolve({
                  ...result,
                  index,
                  hash,
                  status: 1
                })
              } else {
                resolve({
                  index,
                  status: 1
                })
              }
            })
          } else {
            resolve({
              index,
              status: 0
            })
          }
        } else {
          resolve({
            index,
            status: 2
          })
        }
      })
    }
  })
}

function getSochcainTxns (address, account, coin, version) {
  let type = getType(coin)
  let sochainUrl = config[type].queryTxns + address // 主网
  let cbData = ''
  if (type === 'block') {
    return new Promise(resolve => {
      GetBlockTxnsAPI(address).then(res => {
        // console.log(res)
        if (res && res.length > 0) {
          let useTxns = res[res.length - 1]
          if (((Date.now() / 1000) - Number(useTxns.time)) > (60 * 60 * 24)) {
            resolve(cbData)
            return
          }
          getChainHashStatus(useTxns.txid, coin, account, version).then(result => {
            if (result) {
              resolve({
                ...result,
                account: account,
                coin: coin,
                value: useTxns.amount < 0 ? (0 - useTxns.amount) : useTxns.amount,
                hash: useTxns.txid,
                from: '',
                to: useTxns.address,
                status: 1,
                timestamp: useTxns.time,
                node: 0
              })
            } else {
              resolve({
                account: account,
                coin: coin,
                value: useTxns.amount < 0 ? (0 - useTxns.amount) : useTxns.amount,
                hash: useTxns.txid,
                from: '',
                to: useTxns.address,
                status: 0,
                timestamp: useTxns.time,
                swapHash: '',
                swapStatus: '',
                swapTime: '',
                node: 0
              })
            }
          })
        } else {
          resolve(cbData)
        }
      })
    })
  }
  return new Promise(resolve => {
    GetBTCTxnsAPI(sochainUrl).then(res => {
      // console.log(res)
      if (res.status === "success" && res.data && res.data.txs.length > 0) {
        let useTxns = res.data.txs[res.data.txs.length - 1]
        if (((Date.now() / 1000) - Number(useTxns.time)) > (60 * 60 * 24)) {
          resolve(cbData)
          return
        }
        // console.log(useTxns)
        getChainHashStatus(useTxns.txid, coin, account, version).then(result => {
          // console.log(result)
          if (result) {
            resolve({
              ...result,
              account: account,
              coin: coin,
              value: useTxns.value,
              hash: useTxns.txid,
              from: '',
              to: res.data.address,
              status: 1,
              timestamp: useTxns.time,
              node: 0
            })
          } else {
            resolve({
              account: account,
              coin: coin,
              value: useTxns.value,
              hash: useTxns.txid,
              from: '',
              to: res.data.address,
              status: 0,
              timestamp: useTxns.time,
              swapHash: '',
              swapStatus: '',
              swapTime: '',
              node: 0
            })
          }
        })
      } else {
        resolve(cbData)
      }
    })
  })
}

function timeout () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('')
    }, 1000 * 30)
  })
}

function GetBTCtxnsAll (address, account, coin, version) {
  return new Promise(resolve => {
    Promise.race([
      getSochcainTxns(address, account, coin, version),
      timeout()
    ]).then(res => {
      // console.log(res)
      resolve(res)
    })
  })
}


export {
  createAddress,
  isBTCAddress,
  GetBTChashStatus,
  GetBTCtxnsAll
}
