import styled from 'styled-components'
import { transparentize, darken } from 'polished'

import { BorderlessInput } from '../../theme'

export const DownArrowBackground = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  object-fit: contain;
  border-radius: 6px;
  margin: 3px auto;
  cursor:pointer;
  background: ${({ theme }) => theme.swapBg}
`

export const Flex = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;

  button {
    max-width: 20rem;
  }
  &.pd0 {
    padding: 0
  }
`

export const InputPanel = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  z-index: 1;
  box-shadow: 0 0.25rem 8px 0 ${({ theme }) => transparentize(0.95, theme.shadowColor)};
  border-radius: 0.5625rem;
  background: ${({theme}) => theme.contentBg};
  height:154px;
  padding: 1.25rem 2.5rem;
  
  border: 1px solid ${({ error }) => (error ? 'rgb(255, 104, 113)' : 'rgb (255, 92, 177)')};
  @media screen and (max-width: 960px) {
    padding: 1rem 1.5625rem;
  }
`

export const ContainerRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const InputContainer = styled.div`
  flex: 1;
`

export const LabelRow = styled.div`
  ${({ theme }) => theme.FlexBC}
  align-items: center;
  color: ${({ theme }) => theme.doveGray};
  font-size: 0.75rem;
  font-family: 'Manrope';
  line-height: 1rem;
  height: 1.875rem;
  padding: 0;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.doveGray)};
  }
`

export const LabelContainer = styled.div`
  flex: 1 1 auto;
  width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: 'Manrope';
  font-size: 0.875rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: normal;
  color: #96989e;
`

export const InputRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: 0.25rem 0rem 0.75rem;
  width:100%;
`

export const Input = styled(BorderlessInput)`
  outline: none;
  border: none;
  flex: 1 1 auto;
  width: 0;
  height: 70px;
  background-color: transparent;
  border-bottom: 0.0625rem solid ${({theme}) => theme.inputBorder};

  color: ${({ error, theme }) => (error ? theme.salmonRed : theme.textColorBold)};
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'Manrope';
  font-size: 44px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: -0.0625rem;
  padding: 8px 0.75rem;
  margin-right: 1.875rem;
  ::placeholder {
    color: ${({ theme }) => theme.placeholderGray};
  }
  &.small {
    font-size: 24px;
    margin-right: 0rem;
  }
  @media screen and (max-width: 960px) {
    font-size: 32px;
  }
`