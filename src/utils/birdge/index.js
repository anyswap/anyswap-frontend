import axios from 'axios'
import config from '../../config'
function GetTxnStatusAPI (hash, coin, api, account, version, node, pairid) {
  // console.log(pairid)
  coin = coin.replace('any', '')
  return new Promise(resolve => {
    let url = config.serverInfoUrl['V1'] + '/' + api + '/' + hash + '/' + config.chainID + '/' + coin + (pairid ? ('?pairid=' + pairid) : '')
    if (version === 'V2') {
      url = config.serverInfoUrl['V2'] + '/' + api + '/' + account + '/' + hash + '/' + config.chainID + '/' + coin + '/' + (node ? node : 0) + (pairid ? ('?pairid=' + pairid) : '')
    }
    // console.log(url)
    axios.get(url).then(res => {
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

export function getChainHashStatus (hash, coin, account, version, node, pairid) {
  // console.log(coin)
  return new Promise(resolve => {
    // let symbol = coin
    GetTxnStatusAPI(hash, coin, 'getHashStatus', account, version, node, pairid).then(res => {
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

export function getSwapoutHashStatus (hash, coin, account, version, node, pairid) {
  // console.log(coin)
  return new Promise(resolve => {
    // let symbol = coin
    GetTxnStatusAPI(hash, coin, 'getWithdrawHashStatus', account, version, node, pairid).then(res => {
      // console.log(res)
      if (res) {
        let statusType = 'pending', status = res.status, outStatus = 0
        if ([0, 5].includes(status)) {
          statusType = 'confirming'
        } else if ([8, 9].includes(status)) {
          statusType = 'success' // fusionsuccess
        } else if ([10].includes(status)) {
          outStatus = 1
          statusType = 'success' // outnetsuccess
        } else if ([1, 2, 3, 4, 6, 11].includes(status)) {
          outStatus = 2
          statusType = 'failure'
        } else if ([20].includes(status)) {
          outStatus = 2
          statusType = 'timeout'
        } else {
          statusType = 'pending'
        }
        resolve({
          status: outStatus,
          swapHash: res.swaptx,
          swapStatus: statusType,
          swapTime: res.txtime,
        })
      } else {
        resolve('')
      }
    })
  })
}