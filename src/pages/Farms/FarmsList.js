import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import Title from '../../components/Title'
import config from '../../config'

const FarmListBox = styled.div`
  ${({ theme }) => theme.FlexSC};
  flex-wrap:wrap;
  width: 100%;
  margin-top:20px;
`

const FarmList = styled.div`
width: 50%;
height: 220px;
&:nth-child(2n) {
  padding-left: 10px;
}
&:nth-child(2n-1) {
  padding-right: 10px;
}
@media screen and (max-width: 960px) {
  width: 100%;
  &:nth-child(2n) {
    padding-left: 0px;
  }
  &:nth-child(2n-1) {
    padding-right: 0px;
  }
}
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
    padding: 52px 10px 0;
    border-radius: 10px;
    .img {
      ${({ theme }) => theme.FlexC};
      height:82px;
      border-radius:100%;
      margin:auth;
      img {
        display:block;
        height:100%;
      }
    }
    .info {
      width:100%;
      text-align:center;
      margin:10px 0 0;
      h3 {
        color: #fff;
        font-size:18px;
        margin:0;
        font-weight: 800;
      }
      p {
        color: #fff;
        font-size:14px;
        margin:0;
        padding:0;
        line-height: 35px;
        .pecent {
          padding: 2px 3px;
          background: #14A15E;
          border-radius:4px;
          display:inline-block;
          margin-left: 5px;
          line-height: 21px;
        }
      }
    }
    &.anyStaking {
      background: ${({ theme }) => theme.gradientPurpleLR};
    }
    &.cycStaking {
      background: linear-gradient(180deg, #81BEFA 0%, #4A8AF4 100%);
    }
  }
`
const BannerBox = styled.div`
  width:100%
  img {
    width:100%;
    display:block;
  }
`

export default function FarmsList () {
  
  const { t } = useTranslation()
  return (
    <>
      <Title
        title={t('farms')}
      ></Title>
      <BannerBox>
        <img src={require('../../assets/images/banner/farm.png')} />
      </BannerBox>
      <FarmListBox>
        <FarmList>
          <StyledNavLink to={config.farmUrl + 'staking'}>
            <div className='default anyStaking'>
              <div className='img'><img src={require('../../assets/images/icon/anyIcon.svg')} alt=""/></div>
              <div className='info'>
                <h3>ANY Staking</h3>
                <p>存ANY挖矿 年化收益率<span className='pecent'>400%</span></p>
              </div>
            </div>
          </StyledNavLink>
        </FarmList>
        <FarmList>
          <StyledNavLink to={config.farmUrl + 'bscfarming'}>
            <div className='default cycStaking'>
              <div className='img'><img src={require('../../assets/images/icon/cycIcon.svg')} alt=""/></div>
              <div className='info'>
                <h3>Christmas Staking</h3>
                <p>圣诞节挖Rebase彩蛋 年化收益率<span className='pecent'>400%</span></p>
              </div>
            </div>
          </StyledNavLink>
        </FarmList>
      </FarmListBox>
    </>
  )
}