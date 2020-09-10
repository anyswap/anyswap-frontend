import axios from 'axios'
import config from '../config'

export const GetServerInfo = (url) => {
  return new Promise(resolve => {
    axios.post(url, {
      id:0,
      jsonrpc:"2.0",
      method:"swap.GetServerInfo",
      params:[]
    }).then((res) => {
      if(res.status === 200){
        let data = res.data.result
        resolve({
          swapInfo: data
        })
      }else{
        resolve({})
      }
    }).catch(err => {
      console.log(err)
      resolve({})
    })
  })
}

export const RegisterAddress = (url, address, coin) => {
  return new Promise(resolve => {
    let methods = 'swap.RegisterAddress'
    if (coin === 'BTC')  {
      methods = 'swap.RegisterP2shAddress'
    }
    axios.post(url, {
      id:0,
      jsonrpc:"2.0",
      method: methods,
      params:[address]
    }).then(res => {
      // console.log(res)
      resolve(res.data)
    }).catch(err => {
      console.log(err)
      resolve(err)
    })
  })
}

function GetTxnStatusAPI (url, hash) {
  return new Promise(resolve => {
    axios.post(url, {
      id:0,
      jsonrpc:"2.0",
      method:"swap.GetSwapin",
      params:[hash]
    }).then(res => {
      // console.log(res)
      resolve(res.data)
    }).catch(err => {
      console.log(err)
      resolve(err)
    })
  })
}

function GetAddressTxnStatusAPI (url, address) {
  return new Promise(resolve => {
    axios.post(url, {
      id:0,
      jsonrpc:"2.0",
      method:"swap.GetSwapin",
      params:[address]
    }).then(res => {
      // console.log(res)
      resolve(res.data)
    }).catch(err => {
      console.log(err)
      resolve(err)
    })
  })
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

export const GetBTCtxnsAll = (url, address, account, coin) => {
  let sochainUrl = `https://sochain.com/api/v2/get_tx_unspent/BTC/${address}` // 主网
  if (config.env === 'test') {
    sochainUrl = `https://sochain.com/api/v2/get_tx_received/BTCTEST/${address}` // 测试网
  }
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
        GetTxnStatusAPI(url, useTxns.txid).then(txns => {
          // console.log(txns)
          if (txns.result) {
            let swapHash = txns.result.swapHash ? txns.result.swapHash : '',
                swapStatus,
                swapTime = txns.result.swapTime ? txns.result.swapTime : ''
            if ([0, 5, 8].includes(txns.result.status)) {
              swapStatus = 'confirming'
            } else if ([7, 9].includes(txns.result.status)) {
              swapStatus = 'minting'
            } else if ([10].includes(txns.result.status)) {
              swapStatus = 'success'
            } else if ([1, 2, 3, 4, 6, 11].includes(txns.result.status)) {
              swapStatus = 'failure'
            } else if ([20].includes(txns.result.status)) {
              swapStatus = 'timeout'
            }
            cbData = {
              account: account,
              coin: coin,
              value: useTxns.value,
              hash: useTxns.txid,
              from: '',
              to: res.data.address,
              status: 1,
              timestamp: useTxns.time,
              swapHash: swapHash,
              swapStatus: swapStatus,
              swapTime: swapTime,
            }
          } else {
            cbData = {
              account: account,
              coin: coin,
              value: useTxns.value,
              hash: useTxns.txid,
              from: '',
              to: res.data.address,
              status: 1,
              timestamp: useTxns.time,
              swapHash: '',
              swapStatus: '',
              swapTime: '',
            }
          }
          resolve(cbData)
        })
      } else {
        resolve(cbData)
      }
    })
  })
}

export const getAxiosData = (method, params) => {
  return new Promise(resolve => {
    axios.post(config.nodeRpc, {
      id:0,
      jsonrpc:"2.0",
      method:method,
      params:params
    }).then(res => {
      // console.log(res)
      resolve(res.data)
    }).catch(err => {
      console.log(err)
      resolve(err)
    })
  })
}

const FSN_PRICE = 'FSN_PRICE'

function getApiUrlData (url, token, address) {
  return new Promise(resolve => {
    axios.get(url).then(res => {
      if (res && res.data && res.status === 200) {
        // let price = res.data[0].current_price
        localStorage.setItem(token, JSON.stringify({
          timestamp: Date.now(),
          data: res.data,
          address: address
        }))
        resolve({
          msg: 'Success',
          data: res.data
        })
      } else {
        localStorage.setItem(token, '')
        resolve({
          msg: 'Error',
          data: ''
        })
      }
    }).catch(err => {
      console.log(err)
      localStorage.setItem(token, '')
      resolve({
        msg: 'Error',
        data: ''
      })
    })
  })
}

function getApiData (url, token, intarval, address) {
  let localData = localStorage.getItem(token)
  return new Promise(resolve => {
    if (localData) {
      let localObj = JSON.parse(localData)
      if (
        (Date.now() - Number(localObj.timestamp) > intarval)
        || !localObj.data
        || (address && address !== localObj.address)
      ) {
        getApiUrlData(url, token, address).then(res => {
          // console.log(res)
          if (res.msg === 'Success') {
            resolve(res.data)
          } else {
            resolve('')
          }
        })
      } else {
        resolve(localObj.data)
      }
    } else {
      getApiUrlData(url, token, address).then(res => {
        // console.log(res)
        if (res.msg === 'Success') {
          resolve(res.data)
        } else {
          resolve('')
        }
      })
    }
  })
}
export const getPrice = () => {
  return new Promise(resolve => {
    let url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=fsn&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    getApiData(url, FSN_PRICE, 1000 * 60 * 60).then(res => {
      // console.log(res)
      if (res && res.length > 0) {
        let price = res[0].current_price
        resolve(price)
      } else {
        resolve('')
      }
    })
  })
}

export const getRewards = (address) => {
  return new Promise(resolve => {
    let url = `https://rewardapi.anyswap.exchange/accounts/getRewards/${address}`
    getApiData(url, 'REWARDS', 3 * 60 * 1000, address).then(res => {
      // console.log(res)
      if (res && res.msg === 'Success') {
        // let price = res.data[0].current_price
        resolve(res)
      } else {
        resolve('')
      }
    })
  })
}