import axios from 'axios'
import config from '../../config'

const SERVER_BRIDGE_CONFIG = 'SERVER_BRIDGE_CONFIG'
const SERVER_BRIDGE_REGISTER = 'SERVER_BRIDGE_REGISTER'

function getLocalConfig (account, token) {
  let lstr = sessionStorage.getItem(SERVER_BRIDGE_CONFIG)
  if (!lstr) {
    return false
  } else {
    let lboj = JSON.parse(lstr)
    if (!lboj[account]) {
      return false
    } else if (!lboj[account][token]) {
      return false
    } else if ((Date.now() - lboj[account][token].timestamp) > (1000 * 60 * 10)) {
      return false
    } else {
      return {
        msg: 'Success',
        info:lboj[account][token]
      }
    }
  }
}

function setLocalConfig (account, token, serverInfo) {
  let lstr = sessionStorage.getItem(SERVER_BRIDGE_CONFIG)
  let lboj = {}
  if (!lstr) {
    lboj[account] = {}
    lboj[account][token] = {
      ...serverInfo,
      timestamp: Date.now()
    }
  } else {
    lboj = JSON.parse(lstr)
    if (!lboj[account]) {
      lboj[account] = {}
      lboj[account][token] = {
        ...serverInfo,
        timestamp: Date.now()
      }
    } else {
      lboj[account][token] = {
        ...serverInfo,
        timestamp: Date.now()
      }
    }
  }
  sessionStorage.setItem(SERVER_BRIDGE_CONFIG, JSON.stringify(lboj))
}

export function removeLocalConfig (account, token) {
  let lstr = sessionStorage.getItem(SERVER_BRIDGE_CONFIG)
  if (lstr) {
    let lboj = JSON.parse(lstr)
    lboj[account][token] = undefined
    sessionStorage.setItem(SERVER_BRIDGE_CONFIG, JSON.stringify(lboj))
  }
}


function getRegisterInfo (account, token) {
  let lrInfo = localStorage.getItem(SERVER_BRIDGE_REGISTER)
  if (!lrInfo) {
    return false
  } else {
    let lrObj = JSON.parse(lrInfo)
    if (!lrObj[account] || !lrObj[account][token]) {
      return false
    }
    return lrObj[account][token]
  }
}

function setRegisterInfo (account, token, localInfo) {
  let lstr = localStorage.getItem(SERVER_BRIDGE_REGISTER)
  let lboj = {}
  if (!lstr) {
    // console.log(1)
    lboj[account] = {}
    lboj[account][token] = {
      ...localInfo,
      timestamp: Date.now()
    }
  } else {
    // console.log(2)
    lboj = JSON.parse(lstr)
    if (!lboj[account]) {
      // console.log(3)
      lboj[account] = {}
      lboj[account][token] = {
        ...localInfo,
        timestamp: Date.now()
      }
    } else {
      // console.log(4)
      lboj[account][token] = {
        ...localInfo,
        timestamp: Date.now()
      }
    }
  }
  // console.log(lboj)
  localStorage.setItem(SERVER_BRIDGE_REGISTER, JSON.stringify(lboj))
  // console.log(localStorage.getItem(SERVER_BRIDGE_REGISTER))
}

export function removeRegisterInfo (account, token) {
  let lstr = localStorage.getItem(SERVER_BRIDGE_REGISTER)
  if (lstr) {
    let lboj = JSON.parse(lstr)
    lboj[account][token] = undefined
    localStorage.setItem(SERVER_BRIDGE_REGISTER, JSON.stringify(lboj))
  }
}

function getCoinInfo (url, account, token) {
  return new Promise(resolve => {
    let data = {
      msg: 'Error',
      info: ''
    }
    let bridgeData = {}
    axios.post(url, {
      id:0,
      jsonrpc:"2.0",
      method:"swap.GetServerInfo",
      params:[]
    }).then((res) => {
      if(res.status === 200){
        data = {
          msg: 'Success',
          info: res.data.result
        }
        let dObj = res.data.result.SrcToken, // 充值信息
            rObj = res.data.result.DestToken // 提现信息
        bridgeData = {
          depositAddress: dObj.DepositAddress,
          PlusGasPricePercentage: dObj.PlusGasPricePercentage,
          isDeposit: !dObj.DisableSwap ? 1 : 0,
          depositMaxNum: dObj.MaximumSwap,
          depositMinNum: dObj.MinimumSwap,
          depositBigValMoreTime: dObj.BigValueThreshold,
          outnetToken: dObj.ContractAddress,
          dcrmAddress: dObj.DcrmAddress,
          isRedeem: !rObj.DisableSwap ? 1 : 0,
          redeemMaxNum: rObj.MaximumSwap,
          redeemMinNum: rObj.MinimumSwap,
          maxFee: rObj.MaximumSwapFee,
          minFee: rObj.MinimumSwapFee,
          fee: rObj.SwapFeeRate,
          redeemBigValMoreTime: rObj.BigValueThreshold,
          token: rObj.ContractAddress,
          p2pAddress: getRegisterInfo(account, token).p2pAddress
        }
        setLocalConfig(account, token, bridgeData)
      }
      resolve(data)
    }).catch(err => {
      console.log(err)
      data.error = err
      resolve(data)
    })
  })
}

function setLocalinfo (account, res) {
  let dObj = res.SrcToken, // 充值信息
      rObj = res.DestToken // 提现信息
  let bridgeData = {
    depositAddress: dObj.DepositAddress,
    PlusGasPricePercentage: dObj.PlusGasPricePercentage,
    isDeposit: !dObj.DisableSwap ? 1 : 0,
    depositMaxNum: dObj.MaximumSwap,
    depositMinNum: dObj.MinimumSwap,
    depositBigValMoreTime: dObj.BigValueThreshold,
    outnetToken: dObj.ContractAddress,
    dcrmAddress: dObj.DcrmAddress,
    isRedeem: !rObj.DisableSwap ? 1 : 0,
    redeemMaxNum: rObj.MaximumSwap,
    redeemMinNum: rObj.MinimumSwap,
    maxFee: rObj.MaximumSwapFee,
    minFee: rObj.MinimumSwapFee,
    fee: rObj.SwapFeeRate,
    redeemBigValMoreTime: rObj.BigValueThreshold,
    token: rObj.ContractAddress,
    p2pAddress: getRegisterInfo(account, rObj.ContractAddress).p2pAddress
  }
  setLocalConfig(account, rObj.ContractAddress, bridgeData)
}

function getServerData (account, chainID) {
  return new Promise(resolve => {
    let url = config.serverInfoUrl + chainID
    let data = {
      msg: 'Error',
      info: ''
    }
    axios.get(url).then(res => {
      // console.log(res)
      if(res.status === 200){
        data = {
          msg: 'Success',
          info: res.data.result
        }
        let serverData = res.data
        // console.log(serverData)
        for (let obj in serverData) {
          // console.log(obj)
          setLocalinfo(account, serverData[obj])
        }
      }
      resolve(data)
    }).catch(err => {
      console.log(err)
      data.error = err
      resolve(data)
    })
  })
}

// getServerData('0xC03033d8b833fF7ca08BF2A58C9BC9d711257249', 32659)


function RegisterAddress(account, token, coin, chainID) {
  return new Promise(resolve => {
    // let lrInfo = getRegisterInfo(account, token)
    let url = config.coininfo[coin].url
    let data = {
      msg: 'Error',
      info: ''
    }
    let methods = 'swap.RegisterAddress'
    if (coin.replace(config.prefix, '') === 'BTC')  {
      methods = 'swap.RegisterP2shAddress'
    }
    axios.post(url, {
      id:0,
      jsonrpc:"2.0",
      method: methods,
      params:[account]
    }).then(res => {
      let rsData = res.data
      if ( rsData && (
          (rsData.result && rsData.result === 'Success')
          || (rsData.error && rsData.error.message === 'mgoError: Item is duplicate')
          || (rsData.result && rsData.result.P2shAddress)
        )
      ) {
        // console.log('token', token)
        // console.log(res)
        setRegisterInfo(account, token, {
          isRegister: true,
          p2pAddress: rsData.result && rsData.result.P2shAddress
        })
        resolve({
          msg: 'Success',
          info: ''
        })
      } else {
        data.error = 'Register error!'
        resolve(data)
      }
    }).catch(err => {
      console.log(err)
      data.error = err
      resolve(data)
    })

    // if (!lrInfo) {
    // } else {
    //   // getCoinInfo(url, account, token).then(result => {
    //   getServerData(account, chainID).then(result => {
    //     if (result.msg === 'Success') {
    //       data = {
    //         msg: 'Success',
    //         info: ''
    //       }
    //     } else {
    //       data.error = 'Get server info error!'
    //     }
    //     resolve(data)
    //   })
    // }
  })
}

let getInfoObj = {}
// let count = 0
// let count1 = 0
export function getServerInfo (account, token, coin, chainID) {
  getInfoObj = {account, token, coin}
  // count ++
  return new Promise(resolve => {
    // getAllCoinInfo(account)
    // console.log(getInfoObj)
    // console.log(count)
    if (!account) {
      resolve('')
    } else {
      // console.log(getLocalConfig(account, token))
      let lrInfo = getRegisterInfo(account, token)
      if (!lrInfo) {
      // if (!getLocalConfig(account, token) || !lrInfo) {
        RegisterAddress(account, token, coin, chainID).then(res => {
          // count1 ++ 
          if (res.msg === 'Success') {
            let lData = getLocalConfig(getInfoObj.account, getInfoObj.token)
            if (lData) {
              resolve(lData)
            } else {
              getServerData(account, chainID).then(result => {
                let lData1 = getLocalConfig(getInfoObj.account, getInfoObj.token)
                if (lData1) {
                  resolve(lData1)
                } else {
                  resolve({
                    msg: 'Null'
                  })
                }
              })
            }
          } else {
            resolve(res)
          }
        })
      } else {
        if (!getLocalConfig(account, token)) {
          getServerData(account, chainID).then(result => {
            let lData = getLocalConfig(getInfoObj.account, getInfoObj.token)
            if (lData) {
              resolve(lData)
            } else {
              resolve({
                msg: 'Null'
              })
            }
          })
        } else {
          resolve(getLocalConfig(account, token))
        }
      }
    }
  })
}