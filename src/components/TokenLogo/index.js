import React from 'react'
import styled from 'styled-components'
// import { isAddress } from '../../utils'
import config from '../../config'

const ImageBox = styled.div`
  width: ${({ size }) => size};
  height: ${({ size }) => size};

  min-width: ${({ size }) => size};
  min-height: ${({ size }) => size};
  max-width:100%;
  max-height:100%;
  background-color: white;
  border-radius: ${({ size }) => size};
  padding: 2px;
  img {
    width:100%;
    height:100%;
    display:block;
  }
`
const Image = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  
  min-width: ${({ size }) => size};
  min-height: ${({ size }) => size};
  max-width:100%;
  max-height:100%;
  background-color: white;
  border-radius: ${({ size }) => size};
`

const initPath = require('../../assets/images/question.svg')

function getSourcePath (symbol) {
  let path = ''
  // console.log(symbol)
  try {
    path = require('../../assets/images/coin/source/' + symbol + '.svg')
  } catch (error) {
    try {
      path = require('../../assets/images/coin/source/' + symbol + '.png')
    } catch (error) {
      path = initPath
    }
  }
  return path
}
function getAnyPath (symbol) {
  let path = ''
  try {
    path = require('../../assets/images/coin/any/' + symbol + '.svg')
  } catch (error) {
    try {
      path = require('../../assets/images/coin/any/' + symbol + '.png')
    } catch (error) {
      path = initPath
    }
  }
  return path
}

export default function TokenLogo({ address, size = '1rem', isAny = true, ...rest }) {
  let path = ''
  // console.log(address)
  if (address) {
    if (isAny) {
      if (address.indexOf('a') === 0 && address.indexOf('any') === -1) {
        address = address.replace('a', 'any')
        path = getAnyPath(address)
      } else if (address.indexOf('any') !== -1) {
        path = getAnyPath(address)
      } else {
        if (
          address.lastIndexOf('B') === (address.length - 1)
          && address.indexOf('BNB') === -1
          && address.indexOf('OKB') === -1
          && address.indexOf('HWBTB') === -1
          && address.indexOf('HWBTE') === -1
        ) {
          address = address.substr(0, address.lastIndexOf('B'))
        } else if (
          address.indexOf('HUSD') === -1
          && address.indexOf('HT') === -1
          && address.indexOf('HTC') === -1
          && address.indexOf('Hi') === -1
          && address.indexOf('HWBTB') === -1
          && address.indexOf('HWBTE') === -1
          && address.indexOf('H') === 0
        ) {
          address = address.substr(1)
        }
        path = getSourcePath(address)
      }
    } else {
      address = address.replace('any', '').replace('a', '')
      path = getSourcePath(address)
    }
  } else {
    path = initPath
  }
  
  return (
    <ImageBox
      {...rest}
      size={size}
    >
      <img src={path} alt={address} />
    </ImageBox>
  )
}
