import React from 'react'
import styled from 'styled-components'
import { useCopyClipboard } from '../../hooks'

import { Link } from '../../theme'
import { CheckCircle, Copy } from 'react-feather'

const CopyIcon = styled(Link)`
  // color: #734be2;
  flex-shrink: 0;
  margin-right: 1rem;
  margin-left: 0.5rem;
  text-decoration: none;
  :hover,
  :active,
  :focus {
    text-decoration: none;
    color: ${({ theme }) => theme.doveGray};
  }
`
const TransactionStatusText = styled.span`
  margin-left: 0.25rem;
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
`

export default function CopyHelper({ toCopy, color = '#734be2' }) {
  const [isCopied, setCopied] = useCopyClipboard()

  return (
    <CopyIcon onClick={() => setCopied(toCopy)} style={{color: color}}>
      {isCopied ? (
        <TransactionStatusText>
          <CheckCircle size={'16'} />
          <TransactionStatusText>Copied</TransactionStatusText>
        </TransactionStatusText>
      ) : (
        <TransactionStatusText>
          <Copy size={'16'} />
        </TransactionStatusText>
      )}
    </CopyIcon>
  )
}
