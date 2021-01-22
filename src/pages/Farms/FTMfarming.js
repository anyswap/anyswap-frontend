import React from 'react'
import Farming from '../../components/Farming'
import { getQueryParam } from '../../utils'
import config from '../../config'
import Title from '../../components/Title'

export default function FTMfaring({ initialTrade }) {
  let initLpToken = getQueryParam(window.location, 'lpToken')
  let CHAINID = '46688'
  let FARMTOKEN = '0xc6818f8524a4293c09045c1b1203cd2ea37068bb'

  if (config.env === 'main') {
    CHAINID = config.farmConfig['FTM'].CHAINID
    FARMTOKEN = config.farmConfig['FTM'].FARMTOKEN
  }
  return (
    <>
      <Title title='Stake LP tokens to earn ANY'></Title>
      <Farming
        initLpToken = {initLpToken}
        initialTrade = {initialTrade}
        CHAINID = {CHAINID}
        FARMTOKEN = {FARMTOKEN}
        FARMURL = {config.farmUrl + 'ftmfarming'}
        // initPairs = {['ANY', 'anyBTC', 'anyETH', 'anyUSDT', 'anyBNB', 'anyFSN']}
        poolCoin = 'ANY'
        BASEMARKET={10}
      />
    </>
  )
}
