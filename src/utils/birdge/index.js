import axios from 'axios'
import config from '../../config'
function GetTxnStatusAPI (hash, coin, api) {
  return new Promise(resolve => {
    let url = config.serverInfoUrl + '/' + api + '/' + hash + '/' + config.chainID + '/' + coin
    // console.log(url)
    axios.get(url).then(res => {
      // console.log(res)

      resolve(res.data.info)
    }).catch(err => {
      console.log(err)
      resolve(err)
    })
  })
}

function getStatus (status) {
  let statusType = ''
  if ([0, 5, 8].includes(status)) {
    statusType = 'confirming'
  } else if ([7, 9].includes(status)) {
    statusType = 'minting'
  } else if ([10].includes(status)) {
    statusType = 'success'
  } else if ([1, 2, 3, 4, 6, 11].includes(status)) {
    statusType = 'failure'
  } else if ([20].includes(status)) {
    statusType = 'timeout'
  }
  return statusType
}

export function getChainHashStatus (hash, coin) {
  // console.log(coin)
  return new Promise(resolve => {
    // let symbol = coin
    GetTxnStatusAPI(hash, coin, 'getHashStatus').then(res => {
      // console.log(res)
      if (res) {
        resolve({
          swapHash: res.swaptx,
          swapStatus: getStatus(res.status),
          swapTime: res.txtime,
        })
      } else {
        resolve('')
      }
    })
  })
}

export function getSwapoutHashStatus (hash, coin) {
  // console.log(coin)
  return new Promise(resolve => {
    // let symbol = coin
    GetTxnStatusAPI(hash, coin, 'getWithdrawHashStatus').then(res => {
      // console.log(res)
      if (res) {
        resolve({
          swapHash: res.swaptx,
          swapStatus: getStatus(res.status),
          swapTime: res.txtime,
        })
      } else {
        resolve('')
      }
    })
  })
}