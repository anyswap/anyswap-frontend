import React from 'react'
import styled from 'styled-components'
import { Link } from '../../theme'

import AddIcon from '../../assets/images/icon/add.svg'

const InfoCard = styled.button`
  background-color: ${({ theme, active }) => (active ? theme.activeGray : theme.backgroundColor)};
  padding: 1rem;
  outline: none;
  border: none;
  width: 100% !important;
  &:focus {
    box-shadow: 0 0 0 0.0625rem ${({ theme }) => theme.royalBlue};
  }
  border-bottom: 0.0625rem solid ${({ theme, active }) => (active ? 'transparent' : theme.placeholderGray)};
`

const OptionCard = styled(InfoCard)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  padding: 0.625rem 1rem;
`

const OptionCardLeft = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  justify-content: center;
  height: 100%;
`

const OptionCardClickable = styled(OptionCard)`
  margin-top: 0;
  &:hover {
    cursor: ${({ clickable }) => (clickable ? 'pointer' : '')};
    background: rgba(0,0,0,.1);
  }
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
  &:last-child{
    border-bottom:none;
  }
`
  // border: ${({ clickable, theme }) => (clickable ? `0.0625rem solid ${theme.malibuBlue}` : ``)};

const GreenCircle = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  justify-content: center;
  align-items: center;

  &:first-child {
    height: 8px;
    width: 8px;
    margin-right: 8px;
    background-color: ${({ theme }) => theme.connectedGreen};
    border-radius: 50%;
  }
`

const CircleWrapper = styled.div`
  color: ${({ theme }) => theme.connectedGreen};
  display: flex;
  justify-content: center;
  align-items: center;
`

const HeaderText = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  color: ${props => (props.color === 'blue' ? ({ theme }) => theme.royalBlue : ({ theme }) => theme.textColor)};
  font-size: 1rem;
  font-weight: 500;
`

const SubHeader = styled.div`
  color: ${({ theme }) => theme.textColor};
  margin-top: 0.625rem;
  font-size: 0.75rem;
`

const IconWrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  margin-right: 1.25rem;
  border: solid 0.0625rem rgba(0, 0, 0, 0.1);
  width:46px;
  height:46px;
  border-radius:100%;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '1.625rem')};
    width: ${({ size }) => (size ? size + 'px' : '1.625rem')};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: flex-end;
  `};
`
const WalletLogoBox = styled.div`
  ${({theme}) => theme.FlexSC}
`

export default function Option({
  link = null,
  clickable = true,
  size = null,
  onClick = null,
  color,
  header,
  subheader = null,
  icon,
  active = false
}) {
  const content = (
    <OptionCardClickable onClick={onClick} clickable={clickable && !active} active={active}>
      <WalletLogoBox>
        <IconWrapper size={size} active={active}>
          <img src={icon} alt={'Icon'} />
        </IconWrapper>
        <OptionCardLeft>
          <HeaderText color={color}>
            {' '}
            {active ? (
              <CircleWrapper>
                <GreenCircle>
                  <div />
                </GreenCircle>
              </CircleWrapper>
            ) : (
              ''
            )}
            {header}
          </HeaderText>
          {subheader && <SubHeader>{subheader}</SubHeader>}
        </OptionCardLeft>
      </WalletLogoBox>
      <img src={AddIcon} />
    </OptionCardClickable>
  )
  if (link) {
    return <Link href={link}>{content}</Link>
  }

  return content
}
