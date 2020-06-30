import axios from 'axios'
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