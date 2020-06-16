import axios from 'axios'
const swapURL = 'https://testnet.smpcwallet.com/btc2fsn'
const swapInfo = {
  BlockChain: "Fusion",
  Confirmations: 0,
  ContractAddress: "0xbd8d4dcdc017ea031a46754b0b74b2de0cd5eb74",
  DcrmAddress: "0x4B4c806c949B2375a58275178DEf06560b79351A",
  Decimals: 8,
  Description: "cross chain bridge BTC with mBTC",
  MaximumSwap: 100,
  MinimumSwap: 0.00001,
  Name: "SMPC Bitcoin",
  NetID: "Testnet",
  SwapFeeRate: 0.001,
  Symbol: "mBTC"
}
export const GetServerInfo = () => {
  return new Promise(resolve => {
    axios.post(swapURL, {
      id:0,
      jsonrpc:"2.0",
      method:"swap.GetServerInfo",
      params:[]
    }).then((res) => {
      if(res.status === 200){
        let data = res.data.result
        resolve({
          swapInfo: data.DestToken
        })
      }else{
        resolve({
          swapInfo: swapInfo
        })
      }
    }).catch(err => {
      console.log(err)
      resolve({
        swapInfo: swapInfo
      })
    })
  })
}

export const RegisterAddress = (address) => {
  return new Promise(resolve => {
    axios.post(swapURL, {
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

function GetTxnStatusAPI (hash) {
  return new Promise(resolve => {
    axios.post(swapURL, {
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

export const GetBTCtxnsAll = (address) => {
  // let url = `https://sochain.com/api/v2/get_tx_unspent/BTC/${address}` // 主网
  let url = `https://sochain.com/api/v2/get_tx_received/BTCTEST/${address}` // 测试网
  let cbData = {
    mintTip: false,
    mintValue: 0,
    mintHash: '',
    status: '',
    from: ''
  }
  return new Promise(resolve => {
    GetBTCTxnsAPI(url).then(res => {
      console.log(res)
      if (res.status === "success" && res.data && res.data.txs.length > 0) {
        let useTxns = res.data.txs[res.data.txs.length - 1]
        GetTxnStatusAPI(useTxns.txid).then(txns => {
          console.log(txns)
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