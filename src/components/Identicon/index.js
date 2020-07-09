import React, { useEffect, useRef } from 'react'

import styled from 'styled-components'

import { useWeb3React } from '../../hooks'
import Jazzicon from 'jazzicon'

const StyledIdenticon = styled.div`
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  border-radius: 1.125rem;
  background-color: ${({ theme }) => theme.silverGray};
`

export default function Identicon({size = 16}) {
  const ref = useRef()

  const { account } = useWeb3React()

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(Jazzicon(size, parseInt(account.slice(2, 10), size)))
    }
  }, [account])

  return <StyledIdenticon ref={ref} size={size + 'px'} />
}
