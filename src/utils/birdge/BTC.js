import config from '../../config'
import axios from 'axios'
import { getChainHashStatus } from '../birdge'
import { resolve } from 'path';
const bitcoin = require('bitcoinjs-lib');
const OPS = require('bitcoin-ops');

const NETWORK = config.env === 'test' ? bitcoin.networks.testnet : bitcoin.networks.bitcoin

function createBTCaddress (address) {
  address = address.replace('0x', '')
  // const compressed = true
  // const ecpair = bitcoin.ECPair.fromPublicKey(Buffer.from(config.btcConfig.pubkey, 'hex'), {compressed, network})
  const {hash} = bitcoin.address.fromBase58Check(config.btcConfig.btcAddr)

  // const ripemd160 = bitcoin.crypto.hash160(ecpair.publicKey);

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
    network: NETWORK,
  })
  // console.log(p2shAddress.address)
  return p2shAddress.address;
}

function isBTCAddress (address) {
  try {
    bitcoin.address.toOutputScript(address, NETWORK)
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

function GetBTChashStatus (hash, index, coin, status) {
  let sochainUrl = config.btcConfig.queryHashStatus + hash // 主网
  return new Promise(resolve => {
    if (status) {
      getChainHashStatus(hash, coin).then(result => {
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
            getChainHashStatus(hash, coin).then(result => {
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

function getSochcainTxns (address, account, coin) {
  let sochainUrl = config.btcConfig.queryTxns + address // 主网
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
        getChainHashStatus(useTxns.txid, coin).then(result => {
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

function GetBTCtxnsAll (address, account, coin) {
  return new Promise(resolve => {
    Promise.race([
      getSochcainTxns(address, account, coin),
      timeout()
    ]).then(res => {
      // console.log(res)
      resolve(res)
    })
  })
}


export {
  createBTCaddress,
  isBTCAddress,
  GetBTChashStatus,
  GetBTCtxnsAll
}
