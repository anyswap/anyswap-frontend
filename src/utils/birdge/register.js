import axios from 'axios'
import config from '../../config'

const SERVER_BRIDGE_REGISTER = 'SERVER_BRIDGE_REGISTER'

function getLocalConfig (account, token) {
  let lstr = sessionStorage.getItem(SERVER_BRIDGE_REGISTER)
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
  let lstr = sessionStorage.getItem(SERVER_BRIDGE_REGISTER)
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
  sessionStorage.setItem(SERVER_BRIDGE_REGISTER, JSON.stringify(lboj))
}

function RegisterAddress(account, coin) {
  return new Promise(resolve => {
    let methods = 'swap.RegisterAddress'
    let url = config.coininfo[coin].url
    let data = {
      msg: 'Error',
      info: ''
    }
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
        let bridgeData = {}
        getCoinInfo(url).then(result => {
          if (result.msg === 'Success') {
            let dObj = result.info.SrcToken, // 充值信息
                rObj = result.info.DestToken // 提现信息
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
              p2pAddress: rsData.result && rsData.result.P2shAddress ? rsData.result.P2shAddress : ''
            }
            setLocalConfig(account, rObj.ContractAddress, bridgeData)
            data = {
              msg: 'Success',
              info: ''
            }
          } else {
            data.error = 'Get server info error!'
          }
          resolve(data)
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
  })
}