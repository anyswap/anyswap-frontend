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
        resolve({
          swapInfo: {}
        })
      }
    }).catch(err => {
      console.log(err)
      resolve({
        swapInfo: {}
      })
    })
  })
}

export const RegisterAddress = (url, address) => {
  return new Promise(resolve => {
    axios.post(url, {
      id:0,
      jsonrpc:"2.0",
      method:"swap.RegisterP2shAddress",
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

export const GetBTCtxnsAll = (url, address, coin, dec) => {
  // let url = `https://sochain.com/api/v2/get_tx_unspent/BTC/${address}` // 主网
  let sochainUrl = `https://sochain.com/api/v2/get_tx_received/BTCTEST/${address}` // 测试网
  let cbData = {
    mintTip: false,
    mintValue: 0,
    mintHash: '',
    status: '',
    from: ''
  }
  if (['mETH', 'mUSDT'].includes(coin)) {
    return new Promise(resolve => {
      GetAddressTxnStatusAPI(url, address).then(txns => {
        // console.log(txns)
        if (txns.result) {
          // cbData.mintValue = useTxns.value
          // cbData.mintTip = true
          // cbData.mintHash = useTxns.txid
          // cbData.status = txns.result.status
          // cbData.from = txns.result.from
          txns.result = txns.result[0]
          if ([0,5,7,8,9].includes(txns.result.status)) {
            cbData.mintValue = Number((txns.result.value / Math.pow(10, dec)).toFixed(16))
            cbData.mintTip = true
            cbData.mintHash = txns.result.txid
            cbData.status = txns.result.status
            cbData.from = txns.result.from
          } else {
            cbData.mintTip = false
          }
        } else {
          cbData.mintTip = false
        }
        resolve(cbData)
      })
    })
  } 
  return new Promise(resolve => {
    GetBTCTxnsAPI(sochainUrl).then(res => {
      // console.log(res)
      if (res.status === "success" && res.data && res.data.txs.length > 0) {
        let useTxns = res.data.txs[res.data.txs.length - 1]
        GetTxnStatusAPI(url, useTxns.txid).then(txns => {
          // console.log(txns)
          if (txns.result) {
            // cbData.mintValue = useTxns.value
            // cbData.mintTip = true
            // cbData.mintHash = useTxns.txid
            // cbData.status = txns.result.status
            // cbData.from = txns.result.from
            if ([0,5,7,8,9].includes(txns.result.status)) {
              cbData.mintValue = useTxns.value
              cbData.mintTip = true
              cbData.mintHash = useTxns.txid
              cbData.status = txns.result.status
              cbData.from = txns.result.from
            } else {
              cbData.mintTip = false
            }
          } else {
            cbData.mintTip = false
          }
          resolve(cbData)
        })
      } else {
        cbData.mintTip = false
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

function getApiUrlData (url, token) {
  return new Promise(resolve => {
    axios.get(url).then(res => {
      if (res && res.data && res.status === 200) {
        // let price = res.data[0].current_price
        localStorage.setItem(token, JSON.stringify({
          timestamp: Date.now(),
          data: res.data
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

function getApiData (url, token, intarval) {
  let localData = localStorage.getItem(token)
  return new Promise(resolve => {
    if (localData) {
      let localObj = JSON.parse(localData)
      if (Date.now() - Number(localObj.timestamp) > intarval || !localObj.data) {
        getApiUrlData(url, token).then(res => {
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
      getApiUrlData(url, token).then(res => {
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
    getApiData(url, 'REWARDS', 3 * 60 * 1000).then(res => {
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