import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'

import { useWeb3React } from '../../hooks'
import { useTokenDetails } from '../../contexts/Tokens'
import { getEtherscanLink } from '../../utils'

import { Link } from '../../theme'
import TokenLogo from '../TokenLogo'
import { ReactComponent as Close } from '../../assets/images/x.svg'
import question from '../../assets/images/question.svg'

const Flex = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;

  button {
    max-width: 20rem;
  }
`

const Wrapper = styled.div`
  background: rgba(243, 190, 30, 0.1);
  position: relative;
  padding: 1rem;
  border: 0.5px solid #f3be1e;
  border-radius: 0.625rem;
  margin-bottom: 1.25rem;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-row-gap: 0.625rem;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-items: flex-start;
  & > * {
    margin-right: 6px;
  }
`

const CloseColor = styled(Close)`
  color: #aeaeae;
`

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 0.875rem;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }

  & > * {
    height: 0.875rem;
    width: 0.875rem;
  }
`

const QuestionWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  margin-left: 0.4rem;
  padding: 0.2rem;
  border: none;
  background: none;
  outline: none;
  cursor: default;
  border-radius: 36px;

  :hover,
  :focus {
    opacity: 0.7;
  }
`

const HelpCircleStyled = styled.img`
  height: 18px;
  width: 18px;
`

const fadeIn = keyframes`
  from {
    opacity : 0;
  }

  to {
    opacity : 1;
  }
`

const Popup = styled(Flex)`
  position: absolute;
  width: 228px;
  right: 110px;
  top: 0.25rem;
  z-index: 10;
  flex-direction: column;
  align-items: center;
  padding: 0.6rem 1rem;
  line-height: 150%;
  background: ${({ theme }) => theme.backgroundColor};
  border: 0.0625rem solid ${({ theme }) => theme.mercuryGray};
  border-radius: 8px;
  animation: ${fadeIn} 0.15s linear;
  color: ${({ theme }) => theme.textColor};
  font-style: italic;

  box-shadow: 0px 0px 0.0625rem rgba(0, 0, 0, 0.04), 0px 0.25rem 8px rgba(0, 0, 0, 0.04), 0px 1rem 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.04);

  ${({ theme }) => theme.mediaWidth.upToSmall`
    left: 0.125rem;
    top: 50px;
  `}
`

const Text = styled.div`
  color: ${({ theme }) => theme.textColor};
`

function WarningCard({ onDismiss, urlAddedTokens, currency }) {
  const [showPopup, setPopup] = useState()
  const { chainId } = useWeb3React()
  const { symbol: inputSymbol, name: inputName } = useTokenDetails(currency)
  const fromURL = urlAddedTokens.hasOwnProperty(currency)

  return (
    <Wrapper>
      <CloseIcon onClick={() => onDismiss()}>
        <CloseColor alt={'close icon'} />
      </CloseIcon>
      <Row style={{ fontSize: '0.75rem' }}>
        <Text>{fromURL ? 'Token imported by URL ' : 'Token imported by user'}</Text>
        <QuestionWrapper
          onClick={() => {
            setPopup(!showPopup)
          }}
          onMouseEnter={() => {
            setPopup(true)
          }}
          onMouseLeave={() => {
            setPopup(false)
          }}
        >
          <HelpCircleStyled src={question} alt="popup" />
        </QuestionWrapper>
        {showPopup ? (
          <Popup>
            <Text>
              The Anyswap smart contracts are designed to support any ERC20 token on Fusion. Any token can be loaded
              into the interface by entering its Fusion address into the search field or passing it as a URL
              parameter. Be careful when interacting with imported tokens as they have not been verified.
            </Text>
          </Popup>
        ) : (
          ''
        )}
      </Row>
      <Row>
        <TokenLogo address={currency} />
        <div style={{ fontWeight: 500 }}>{inputName && inputSymbol ? inputName + ' (' + inputSymbol + ')' : ''}</div>
        <Link style={{ fontWeight: 400 }} href={getEtherscanLink(chainId, currency, 'address')}>
          (View on Etherscan)
        </Link>
      </Row>
      <Row style={{ fontSize: '0.75rem', fontStyle: 'italic' }}>
        <Text>Please verify the legitimacy of this token before making any transactions.</Text>
      </Row>
    </Wrapper>
  )
}

export default WarningCard
