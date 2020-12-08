import React, { useState } from 'react'
import styled from 'styled-components'
import { isAddress } from '../../utils'

const Image = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  max-width:100%;
  max-height:100%;
  background-color: white;
  border-radius: ${({ size }) => size};
`

export default function TokenLogo({ address, size = '1rem', isAny = true, ...rest }) {
  let path = ''
  // console.log(address)
  // address = address ? address.replace('any', '') : ''
  if (address) {
    if (isAny) {
      if (address.indexOf('a') === 0 && address.indexOf('any') === -1) {
        address = address.replace('a', 'any')
        try {
          path = require('../../assets/images/coin/any/' + address + '.svg')
        } catch (error) {
          path = require('../../assets/images/coin/any/' + address + '.png')
        }
      } else if (address.indexOf('any') !== -1) {
        try {
          path = require('../../assets/images/coin/any/' + address + '.svg')
        } catch (error) {
          path = require('../../assets/images/coin/any/' + address + '.png')
        }
      } else {
        if (address.lastIndexOf('B') === (address.length - 1) && address.indexOf('BNB') === -1) {
          address = address.substr(0, address.lastIndexOf('B'))
          try {
            path = require('../../assets/images/coin/source/' + address + '.svg')
          } catch (error) {
            path = require('../../assets/images/coin/source/' + address + '.png')
          }
        } else {
          try {
            path = require('../../assets/images/coin/source/' + address + '.svg')
          } catch (error) {
            path = require('../../assets/images/coin/source/' + address + '.png')
          }
        }
      }
    } else {
      address = address.replace('any', '').replace('a', '')
      try {
        path = require('../../assets/images/coin/' + address + '.svg')
      } catch (error) {
        try {
          path = require('../../assets/images/coin/' + address + '.png')
        } catch (error) {
          path = require('../../assets/images/question.svg')
        }
      }
    }
  } else {
    path = require('../../assets/images/question.svg')
  }
  // if (address) {
  //   try {
  //     // path = require('../../assets/images/coin/' + address + '.svg')
  //     path = require('../../assets/images/coin/' + address + '.svg')
  //   } catch (error) {
  //     try {
  //       path = require('../../assets/images/coin/' + address + '.png')
  //     } catch (error) {
  //       path = require('../../assets/images/question.svg')
  //     }
  //   }
  // } else {
  //   path = require('../../assets/images/question.svg')
  // }

  return (
    <Image
      {...rest}
      alt={address}
      src={path}
      size={size}
    />
  )
}
