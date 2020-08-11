import React, { useState } from 'react'
import styled from 'styled-components'
import { isAddress } from '../../utils'

// import { ReactComponent as EthereumLogo } from '../../assets/images/ethereum-logo.svg'
// import { ReactComponent as FusionLogo } from '../../assets/images/fsn.svg'
// import { ReactComponent as BTCLogo } from '../../assets/images/btc.svg'

// const TOKEN_ICON_API = address =>
//   `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${isAddress(
//     address
//   )}/logo.png`

// const TOKEN_ICON_API = address => 
//   // console.log(address)
//   `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${isAddress(
//     address
//   )}/logo.png`


const BAD_IMAGES = {}

const Image = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background-color: white;
  border-radius: 1rem;
`

// const Emoji = styled.span`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: ${({ size }) => size};
//   height: ${({ size }) => size};
// `

// const StyledEthereumLogo = styled(FusionLogo)`
//   width: ${({ size }) => size};
//   height: ${({ size }) => size};
// `

// const StyledBTCLogo = styled(BTCLogo)`
//   width: ${({ size }) => size};
//   height: ${({ size }) => size};
// `

export default function TokenLogo({ address, size = '1rem', ...rest }) {
  const [error, setError] = useState(false)
  let path = ''
  // console.log(address)
  if (address) {
    try {
      path = require('../../assets/images/coin/' + address + '.svg')
    } catch (error) {
      try {
        path = require('../../assets/images/coin/' + address + '.png')
      } catch (error) {
        path = require('../../assets/images/question.svg')
      }
    }
  } else {
    path = require('../../assets/images/question.svg')
  }

  return (
    <Image
      {...rest}
      alt={address}
      src={path}
      size={size}
      onError={() => {
        BAD_IMAGES[address] = true
        setError(true)
      }}
    />
  )
}
