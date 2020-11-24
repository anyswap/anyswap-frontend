import React from 'react'
import styled from 'styled-components'

import { ReactComponent as Close } from '../../assets/images/x.svg'


const Wrapper = styled.div`
${({ theme }) => theme.flexColumnNoWrap}
margin: 0;
padding: 0;
width: 100%;
background-color: ${({ theme }) => theme.backgroundColor};
`
const UpperSection = styled.div`
position: relative;
width: 100%;
font-family: 'Manrope';

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
const ContentWrapper = styled.div`
width: 100%;
background-color: ${({ theme }) => theme.backgroundColor};
padding: 0rem;
${({ theme }) => theme.mediaWidth.upToMedium`padding: 1rem`};
`
const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 0.875rem;
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

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1.5rem 1.5rem 0;
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

export default function ModalContent ({
  title,
  onClose = () => {},
  children
}) {
  return (
    <>
      <Wrapper>
        <UpperSection>
          <CloseIcon onClick={() =>  {
            onClose(false)
          }}>
            <CloseColor alt={'close icon'} />
          </CloseIcon>
          <HeaderRow>
            <HoverText>{title}</HoverText>
          </HeaderRow>
          <ContentWrapper>
            {children}
          </ContentWrapper>
        </UpperSection>
      </Wrapper>
    </>
  )
}