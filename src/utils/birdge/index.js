import axios from 'axios'
import config from '../../config'
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

export function getChainHashStatus (hash, coin) {
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