import styled, { keyframes } from 'styled-components'
import { darken } from 'polished'

export const Button = styled.button.attrs(({ warning, theme }) => ({
  backgroundColor: warning ? theme.salmonRed : theme.royalBlue
}))`
${({ theme }) => theme.FlexC};
  padding: 1rem 2rem 1rem 2rem;
  border-radius: 0.5625rem;
  cursor: pointer;
  user-select: none;
  font-size: 1rem;
  border: none;
  outline: none;
  background: ${({theme}) => theme.bgColorLinear};
  color: ${({ theme }) => theme.white};
  width: 100%;
  font-weight: 800;
  font-family: 'Manrope';
  box-shadow: 6px 0.875rem 22px 0 rgba(118, 68, 203, 0.27);

  :hover,
  :focus {
    background-color: ${({ backgroundColor }) => darken(0.05, backgroundColor)};
  }

  :active {
    background-color: ${({ backgroundColor }) => darken(0.1, backgroundColor)};
  }

  :disabled {
    background: linear-gradient(to right, rgba(115, 76, 226, 0.27) , rgba(96, 107, 251, 0.27));
    color: #ffffff;
    cursor: auto;
    box-shadow: none;
  }
`
export const TitleBox = styled.h3`
  height: 38px;
  line-height: 38px;
  font-family: Manrope;
  font-size: 24px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  margin: 0 0 1rem;
  color: ${({ theme }) => theme.textColorBold};
  white-space:nowrap;
  @media screen and (max-width: 960px) {
    display:none;
  }
`

export const Link = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer'
})`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.royalBlue};

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`

export const BorderlessInput = styled.input`
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;
  outline: none;
  border: none;
  flex: 1 1 auto;
  width: 0;
  background-color: transparent;

  [type='number'] {
    -moz-appearance: textfield;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.chaliceGray};
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Spinner = styled.img`
  animation: 2s ${rotate} linear infinite;
  width: 1rem;
  height: 1rem;
`
