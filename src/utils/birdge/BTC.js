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
};

function createAddress (address, network, coin) {
  address = address.replace('0x', '')
  const {hash} = bitcoin.address.fromBase58Check(config[coin].initAddr)

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

function createBTCaddress (address) {
  return createAddress(address, NETWORK, 'btc')
}

function createLTCaddress (address) {
  return createAddress(address, LITECOIN, 'ltc')
}

function isBTCAddress (address, coin) {
  let network = NETWORK
  if (coin.indexOf('LTC') !== -1) {
    network = LITECOIN
  }
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

function GetBTChashStatus (hash, index, coin, status, account, version) {
  let type = 'btc'
  if (coin.indexOf('LTC') !== -1) {
    type = 'ltc'
  }
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
  let type = 'btc'
  if (coin.indexOf('LTC') !== -1) {
    type = 'ltc'
  }
  let sochainUrl = config[type].queryTxns + address // 主网
  let cbData = ''
  return new Promise(resolve => {
    GetBTCTxnsAPI(sochainUrl).then(res => {
      // console.log(res)
      if (res.status === "success" && res.data && res.data.txs.length > 0) {
        let useTxns = res.data.txs[res.data.txs.length - 1]
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
  createBTCaddress,
  createLTCaddress,
  isBTCAddress,
  GetBTChashStatus,
  GetBTCtxnsAll
}
