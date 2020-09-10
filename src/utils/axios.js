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

function getChainHashStatus (hash, coin) {
  // console.log(coin)
  return new Promise(resolve => {
    coin = coin.indexOf(config.prefix) === -1 ? (config.prefix + coin) : coin
    if (config.coininfo[coin] && config.coininfo[coin].url) {
      let url = config.coininfo[coin].url
      GetTxnStatusAPI(url, hash).then(res => {
        // console.log(res)
        if (res && res.result) {
          let status = res.result.status,
              statusType = ''
          if ([0, 5, 8].includes(status)) {
            // obj = { status: this.$t('state').confirming, class: 'color_green' }
            statusType = 'confirming'
          } else if ([7, 9].includes(status)) {
            // obj = { status: this.$t('state').minting, class: 'color_green' }
            statusType = 'minting'
          } else if ([10].includes(status)) {
            // obj = { status: this.$t('state').success, class: 'color_green' }
            statusType = 'success'
          } else if ([1, 2, 3, 4, 6, 11].includes(status)) {
            // obj = { status: this.$t('state').fail, class: 'color_red' }
            statusType = 'failure'
          } else if ([20].includes(status)) {
            // obj = { status: this.$t('state').timeout, class: 'color_red' }
            statusType = 'timeout'
          }
          resolve({
            swapHash: res.result.swaptx,
            swapStatus: statusType,
            swapTime: res.result.txtime,
          })
        } else {
          resolve('')
        }
      })
    } else {
      resolve('')
    }
  })
}

export const GetBTChashStatus = (hash, index, coin, status) => {
  let sochainUrl = `https://sochain.com/api/v2/get_confidence/BTC/${hash}` // 主网
  if (config.env === 'test') {
    sochainUrl = `https://sochain.com/api/v2/get_confidence/BTCTEST/${hash}` // 测试网
  }
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
            })
          }
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