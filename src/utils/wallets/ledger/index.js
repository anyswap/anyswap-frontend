import walletCreate from '../public/walletCreate.js'

// import React, { useState, useReducer, useEffect, useContext, createContext } from 'react'
// import { AbstractConnector } from '@web3-react/abstract-connector';
// import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
// import { NetworkContextName } from '../../constants'
// import {setAccount} from '../../../hooks'
// import {LedgerConnect} from './ledgerConnect'
// const ethUtil = require('ethereumjs-util')
const Tx  = require("ethereumjs-tx")
const Ledger3 = require("./ledger3")
const LedgerEth = require("./ledger-eth")
const ledger = new Ledger3("w0w")
const app = new LedgerEth(ledger)
const rlp = require('rlp')
function getLedgerAddressArr (HDPath, page) {
  return new Promise(resolve => {
    let data = { msg: 'Error', info: []}
    app.getAddress(HDPath, (res, err) => {
      let addressArr = []
      if (err) {
        data.error = err.toString()
      } else {
        addressArr = walletCreate(res["publicKey"], res["chainCode"], "ledger", HDPath, page)
        data.msg = 'Success'
        data.info = addressArr
      }
      resolve(data)
    }, false, true)
  })
}

function signTxLedger (app, eTx, rawTx, HDPath, old) {
  return new Promise(resolve => {
    let data = { msg: 'Error', info: ''}
    eTx.raw[6] = rawTx.chainId
    eTx.raw[7] = eTx.raw[8] = 0
    let toHash = old ? eTx.raw.slice(0, 6) : eTx.raw
    let txToSign = rlp.encode(toHash)
    app.signTransaction(HDPath, txToSign.toString('hex'), (result, error) => {
      // console.log(result)
      // console.log(error)
      if (typeof error != "undefined") {
        // error = error.errorCode ? u2f.getErrorByCode(error.errorCode) : error
        data = { error: error}
      } else {
        let v = result['v'].toString(16);
        if (!old) {
          // EIP155 support. check/recalc signature v value.
          let rv = parseInt(v, 16)
          let cv = rawTx.chainId * 2 + 35
          if (rv !== cv && (rv & cv) !== rv) {
            cv += 1 // add signature v bit.
            // console.log(cv)
          }
          v = cv.toString(16);
        }
        rawTx.v = "0x" + v;
        rawTx.r = "0x" + result['r'];
        rawTx.s = "0x" + result['s'];
        eTx = new Tx(rawTx);
        // rawTx.rawTx = JSON.stringify(rawTx);
        rawTx.signedTx = '0x' + eTx.serialize().toString('hex');
        rawTx.isError = false
        data = { msg: 'Success', info: rawTx}
      }
      resolve(data)
    })
  })
}

function toSign (HDPath, rawTx) {
  return new Promise(resolve => {
    let eTx = new Tx(rawTx)
    let EIP155Supported = false
    app.getAppConfiguration((result, error) => {
      // console.log(result)
      // console.log(error)
      if (typeof error != "undefined") {
        // this.$$.errTip(error)
        return
      }
      let splitVersion = result['version'].split('.');
      if (parseInt(splitVersion[0]) > 1) {
          EIP155Supported = true;
      } else if (parseInt(splitVersion[1]) > 0) {
          EIP155Supported = true;
      } else if (parseInt(splitVersion[2]) > 2) {
          EIP155Supported = true;
      }
      signTxLedger(app, eTx, rawTx, HDPath, !EIP155Supported).then(res => {
        resolve(res)
      })
    })
  })
}

var abstractConnector = require('@web3-react/abstract-connector').AbstractConnector
// const Context = createContext(123)
function ledgerConnect () {
  
  const test = new abstractConnector({supportedChainIds: 46688})
  console.log(test)
  test.emitUpdate({
    account: 123
  })
  // const {count} = useContext(Context)
  // console.log(useContext)
  // let _this3 = AbstractConnector.call(this, {})
  // console.log(LedgerConnect())
  // const contextNetwork = useWeb3ReactCore(NetworkContextName)
  // contextNetwork.account = 123
  // setAccount(123)
  // AbstractConnector.emitUpdate({
  //   account: 123
  // })
  // return getLedgerAddressArr("m/44'/60'/0'", 0)
  // return (
  //   <div>{count}</div>
  // )
}
export {
  getLedgerAddressArr,
  toSign,
  ledgerConnect
}