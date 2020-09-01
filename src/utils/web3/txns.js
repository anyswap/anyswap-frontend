import web3Fn from './index'
import EXCHANGE_ABI from '../../constants/abis/exchange.json'
import {toSign as toLedgerSign} from '../wallets/ledger/index'
import config from  '../../config'

const CHAINID = config.chainID

export function getWeb3ConTract (ABI, ContractAddress) {
  // console.log(web3Fn)
  ABI = ABI ? ABI : EXCHANGE_ABI
  // return new web3Fn.eth.contract(EXCHANGE_ABI, ContractAddress)
  // let contract = web3Fn.eth.contract(ABI) 
  return new web3Fn.eth.Contract(ABI, ContractAddress)
}


export function getWeb3BaseInfo (ContractAddress, DcrmAddress, input, address, value) {
  let walletType = sessionStorage.getItem('walletType')
  let HDPath = sessionStorage.getItem('HDPath')
  let data = {
    chainId: web3Fn.utils.toHex(CHAINID),
    from: address,
    gas: '',
    gasPrice: "",
    nonce: "",
    to: ContractAddress,
    value: value ? value : "0x0",
    data: input
  }
  // console.log(data)
  return new Promise(resolve => {
    let count = 0, time = Date.now()
    const batch = new web3Fn.BatchRequest()
    // batch.add(web3Fn.eth.estimateGas.request({to: ContractAddress}, (err, res) => {
    batch.add(web3Fn.eth.estimateGas.request(data, (err, res) => {
      if (err) {
        // console.log(err)
        data.gas = web3Fn.utils.toHex(100000)
        count ++
      } else {
        data.gas = web3Fn.utils.toHex(parseInt(Number(res) * 1.2))
        count ++
      }
    }))
    batch.add(web3Fn.eth.getTransactionCount.request(address, (err, res) => {
      if (err) {
        console.log(err)
      } else {
        // console.log(2)
        data.nonce = web3Fn.utils.toHex(res)
        count ++
      }
    }))
    batch.add(web3Fn.eth.getGasPrice.request((err, res) => {
      if (err) {
        console.log(err)
      } else {
        // console.log(res)
        // console.log(Number(res))
        data.gasPrice = web3Fn.utils.toHex(res)
        count ++
      }
    }))
    batch.execute()
    let getDataIntervel = setInterval(() => {
      if (count >= 3 && ( (Date.now() - time) <= 30000 )) {
        // this.dataPage = data
        // this.getInputData()
        toLedgerSign(HDPath, data).then(res => {
          if (res.msg === 'Success') {
            web3Fn.eth.sendSignedTransaction(res.info.signedTx, (err, hash) => {
              // console.log(hash)
              if (err) {
                resolve({
                  msg: 'Error',
                  error: err
                })
              } else {
                data.hash = hash
                resolve({
                  msg: 'Success',
                  info: data
                })
              }
            })
          } else {
            resolve({
              msg: 'Error',
              error: res.error
            })
          }
        })
        clearInterval(getDataIntervel)
      } else if (count < 3 && ( (Date.now() - time) > 30000 )) {
        resolve({
          msg: 'Error',
          error: res.error
        })
        clearInterval(getDataIntervel)
      }
    }, 1000)
  //   const batch = web3Fn.createBatch()
  //   batch.add(web3Fn.eth.estimateGas.request({to: ContractAddress}))
  //   batch.add(web3Fn.eth.getTransactionCount.request(address))
  //   batch.add(web3Fn.eth.getGasPrice.request())
  //   batch.requestManager.sendBatch(batch.requests, (err, results) => {
  //     if (err) {
  //       resolve({
  //         msg: 'Error',
  //         error: err
  //       })
  //       return
  //     }
  //     data.gas = results[0].result ? web3Fn.utils.toHex(results[0].result * 100) : web3Fn.utils.toHex(12600 * 100)
  //     data.nonce = results[1].result ? web3Fn.utils.toHex(results[1].result) : web3Fn.utils.toHex(0)
  //     data.gasPrice = results[2].result ? web3Fn.utils.toHex(results[2].result) : web3Fn.utils.toHex(1000000000)
  //     toLedgerSign(HDPath, data).then(res => {
  //       // console.log(res)
  //       if (res.msg === 'Success') {
  //         web3Fn.eth.sendRawTransaction(res.info.signedTx, (err, hash) => {
  //           // console.log(hash)
  //           if (err) {
  //             resolve({
  //               msg: 'Error',
  //               error: err
  //             })
  //           } else {
  //             data.hash = hash
  //             resolve({
  //               msg: 'Success',
  //               info: data
  //             })
  //           }
  //         })
  //       } else {
  //         resolve({
  //           msg: 'Error',
  //           error: res.error
  //         })
  //       }
  //     })
  //   })
  })
}