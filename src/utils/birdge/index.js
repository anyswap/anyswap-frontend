import axios from 'axios'
import config from '../../config'
function GetTxnStatusAPI (hash, coin) {
  return new Promise(resolve => {
    let url = config.serverInfoUrl + '/getHashStatus/' + hash + '/' + config.chainID + '/' + coin
    axios.get(url).then(res => {
      // console.log(res)

      resolve(res.data.info)
    }).catch(err => {
      console.log(err)
      resolve(err)
    })
    // axios.post(url, {
    //   id:0,
    //   jsonrpc:"2.0",
    //   method:"swap.GetSwapin",
    //   params:[hash]
    // }).then(res => {
    //   // console.log(res)
    //   resolve(res.data)
    // }).catch(err => {
    //   console.log(err)
    //   resolve(err)
    // })
  })
}

export function getChainHashStatus (hash, coin) {
  // console.log(coin)
  return new Promise(resolve => {
    // let symbol = coin
    GetTxnStatusAPI(hash, coin).then(res => {
      // console.log(res)
      if (res) {
        let status = res.status,
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