import React from 'react'
import styled from 'styled-components'

import Modal from '../Modal'
import { useWalletModalToggle } from '../../contexts/Application'

import { Spinner } from '../../theme'
import { ReactComponent as Close } from '../../assets/images/x.svg'
import Circle from '../../assets/images/circle.svg'
import ANYLogo from '../../assets/images/ANY.svg'

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`
const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.chaliceGray};
  }
`


const Wrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  margin: 0;
  padding: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundColor};
`

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1.5rem 1.5rem;
  font-weight: 500;
  color: ${props => (props.color === 'blue' ? ({ theme }) => theme.royalBlue : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`
const HoverText = styled.div`
  :hover {
    cursor: pointer;
  }
`

const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  padding: 2rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 1rem`};
`

const UpperSection = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.concreteGray};

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`
const SpinnerWrapper = styled(Spinner)`
  width: 100%;
  height:50px;
  margin: 20px 0;;
`

const LogoBox = styled.div`
  width: 80px;
  height: 80px;
  margin: 0px auto 20px;

  img{
    height: 100%;
    display:block;
  }
`

const ErrorTip = styled.div`
  text-align:center;
`

const ConfirmContent = styled.div`
  display:flex;
  justify-content: center;
  align-item: center;
  flex-wrap: wrap;;
`

const ConfirmText = styled.div`
  width:100%;
  text-align:center;
  color:#999;
  margin-bottom:20px;
  font-size: ${({ size }) => size}
`


export default function HardwareTip({
  HardwareTipOpen,
  closeHardwareTip = () => {},
  error = false,
  txnsInfo
}) {
  const toggleWalletModal = useWalletModalToggle()


  return (
    <Modal
      style={{ userSelect: 'none' }}
      isOpen={HardwareTipOpen}
      minHeight={null}
      maxHeight={90}
    >
      <Wrapper>
        <UpperSection>
          <CloseIcon onClick={closeHardwareTip}>
            <CloseColor alt={'close icon'} />
          </CloseIcon>
          <HeaderRow>
            <HoverText>{
              error ? 'Error' : 'Confirm Transaction'
            }</HoverText>
          </HeaderRow>
          <ContentWrapper>
            <LogoBox>
              <img src={ANYLogo} alt={'logo'} />
            </LogoBox>
            {
              error ? (
                <ErrorTip>
                  <h3>Sign Failed!</h3>
                  <p>Please make sure your Ledger unlocked, on Ethereum app with contract data setting allowed</p>
                </ErrorTip>
              ) : (
                <ConfirmContent>
                  {txnsInfo ? (
                    <h3>{txnsInfo}</h3>
                  ) : (<></>)}
                  <SpinnerWrapper src={Circle} alt="loader" />
                  <ConfirmText size={'16px'}>Confirm the transaction.</ConfirmText>
                  <ConfirmText size={'12px'}>
                    Make sure open the ethereum app on your ledger and Contract Data enabled.
                  </ConfirmText>
                </ConfirmContent>
              )
            }
          </ContentWrapper>
        </UpperSection>
      </Wrapper>
    </Modal>
  )
}