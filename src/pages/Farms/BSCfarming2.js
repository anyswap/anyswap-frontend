import React from 'react'
import Farming from '../../components/Farming'
import { getQueryParam } from '../../utils'
import config from '../../config'
import Title from '../../components/Title'

export default function HTfaring({ initialTrade }) {
  let initLpToken = getQueryParam(window.location, 'lpToken')
  let CHAINID = '46688'
  let FARMTOKEN = '0xc6818f8524a4293c09045c1b1203cd2ea37068bb'

  if (config.env === 'main') {
    CHAINID = '56'
    FARMTOKEN = '0x9c1b92e97c19286c98a2a35684366823f315f74b'
  }
  return (
    <>
      <Title title='Stake LP tokens to earn ANY'></Title>
      <Farming
        initLpToken = {initLpToken}
        initialTrade = {initialTrade}
        CHAINID = {CHAINID}
        FARMTOKEN = {FARMTOKEN}
        FARMURL = {config.farmUrl + 'bscfarming2'}
        // initPairs = {['ANY', 'anyBTC', 'anyETH', 'anyUSDT', 'anyBNB', 'anyFSN']}
        poolCoin = 'ANY'
      />
    </>
  )
}
