import axios from 'axios'
import config from '../config'

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

// const FSN_PRICE = 'FSN_PRICE'

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
// export const getPrice = () => {
//   return new Promise(resolve => {
//     let url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=fsn&order=market_cap_desc&per_page=100&page=1&sparkline=false'
//     getApiData(url, FSN_PRICE, 1000 * 60 * 60).then(res => {
//       // console.log(res)
//       if (res && res.length > 0) {
//         let price = res[0].current_price
//         resolve(price)
//       } else {
//         resolve('')
//       }
//     })
//   })
// }

export const getRewards = (address) => {
  return new Promise(resolve => {
    // let url = `https://rewardapi.anyswap.exchange/accounts/getRewards/${address}`
    let url = config.rewardUrl + address
    console.log(url)
    getApiData(url, 'REWARDS' + config.chainID, 3 * 60 * 1000, address).then(res => {
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