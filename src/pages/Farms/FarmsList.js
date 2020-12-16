import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import Title from '../../components/Title'
import config from '../../config'

const FarmListBox = styled.div`
  ${({ theme }) => theme.FlexSC};
  width: 100%;
`

const FarmList = styled.div`
width: 25%;
height: 240px;
padding: 10px;
`

const StyledNavLink = styled(NavLink)`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.contentBg};
  box-shadow: 0.4375rem 0.125rem 1.625rem 0 rgba(0, 0, 0, 0.06);
  display:block;
  border-radius: 10px;
  text-decoration: none;
  .default {
    ${({ theme }) => theme.FlexC};
    flex-wrap:wrap;
    width:100%;
    height:100%;
    padding: 30px 10px;
    .img {
      ${({ theme }) => theme.FlexC};
      width:80px;
      height:80px;
      padding:15px;
      background:#fff;
      border-radius:100%;
      margin:auth;
      img {
        display:block;
        width:100%;
      }
    }
    .info {
      width:100%;
      text-align:center;
      margin:30px 0;
      h3 {
        color: ${({ theme }) => theme.textColorBold};
        font-size:16px;
        margin:0;
      }
      p {
        color: ${({ theme }) => theme.textColor};
        font-size:14px;
        margin-bottom:0;
      }
    }
  }
`

export default function FarmsList () {
  
  const { t } = useTranslation()
  return (
    <>
      <Title
        title={t('farms')}
      ></Title>
      <FarmListBox>
        <FarmList>
          <StyledNavLink to={config.farmUrl + 'staking'}>
            <div className='default'>
              <div className='img'><img src={require('../../assets/images/coin/source/ANY.svg')} alt=""/></div>
              <div className='info'>
                <h3>ANY Staking</h3>
              </div>
            </div>
          </StyledNavLink>
        </FarmList>
        <FarmList>
          <StyledNavLink to={config.farmUrl + 'bscfarming'}>
            <div className='default'>
              <div className='img'><img src={require('../../assets/images/coin/source/ANY.svg')} alt=""/></div>
              <div className='info'>
                <h3>Christmas Staking</h3>
              </div>
            </div>
          </StyledNavLink>
        </FarmList>
      </FarmListBox>
    </>
  )
}