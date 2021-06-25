import React from 'react'
import styled from 'styled-components'

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

const initPath = require('../../../../assets/images/question.svg')

function getSourcePath (symbol) {
  let path = ''
  // console.log(symbol)
  try {
    path = require('../../../../assets/images/coin/source/' + symbol + '.svg')
  } catch (error) {
    try {
      path = require('../../../../assets/images/coin/source/' + symbol + '.png')
    } catch (error) {
      path = initPath
    }
  }
  return path
}
function getAnyPath (symbol) {
  let path = ''
  try {
    path = require('../../../../assets/images/coin/any/' + symbol + '.svg')
  } catch (error) {
    try {
      path = require('../../../../assets/images/coin/any/' + symbol + '.png')
    } catch (error) {
      path = initPath
    }
  }
  return path
}

export default function TokenLogo({ url, symbol, size = '1rem', ...rest }) {
  let path = initPath
  if (url) {
    path = url
  } else if (symbol) {
    // console.log(symbol)
    symbol = symbol.replace('any', '').replace('a', '')
    path = getSourcePath(symbol)
  }
  return (
    <ImageBox
      {...rest}
      size={size}
    >
      <img src={path} alt={path} />
    </ImageBox>
  )
}
