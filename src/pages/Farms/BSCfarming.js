import React , {useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import styled from 'styled-components'

import Farming from '../../components/Farming'
import { getQueryParam } from '../../utils'
import config from '../../config'

import { Button } from '../../theme'


import Title from '../../components/Title'
import Modal from '../../components/Modal'
import ModalContent from '../../components/Modal/ModalContent'

import question from '../../assets/images/question.svg'

const Flex = styled.div`
  display: flex;
  justify-content: center;

  button {
    max-width: 20rem;
  }
`
const Button1 = styled(Button)`
white-space:nowrap;
`
const Button2 = styled(Button)`
white-space:nowrap;
padding:0;
background: ${({ theme }) => theme.moreBtn};
margin: 0 10px;
color:${({ theme }) => theme.textColor1};
box-shadow: none;
&:hover,&:focus {
  background: ${({ theme }) => theme.moreBtn};
}
`

const BackLink = styled(NavLink)`
  ${({ theme }) => theme.FlexC};
  width:100%;
  color:${({ theme }) => theme.textColor1};
  height: 100%;
  text-decoration: none;
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

const ActivityInfoBox = styled.div`
  width: 100%;
  // max-height: 500px;
  overflow:auto;
  padding: 0 20px 20px;
  .header {
    font-size: 18px;
    font-weight: bold;
    text-align:center;
    color:${({ theme }) => theme.textColorBold};
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    color:${({ theme }) => theme.textColorBold};
    margin-bottom:0;
  }
  .box {
    width:100%;
    margin-top:0;
    .item {
      width: 100%;
      margin:0;
      padding-left: 10px;
      font-size: 14px;
      color:${({ theme }) => theme.textColorBold};
      white-space:normal;
      word-break: break-all;
    }
  }
`

const BSCAGREESTAKING = 'BSCAGREESTAKING'

export default function HTfaring({ initialTrade }) {

  const [showPopup, setPopup] = useState(!localStorage.getItem(BSCAGREESTAKING))
  const { t } = useTranslation()

  let initLpToken = getQueryParam(window.location, 'lpToken')
  let CHAINID = '46688'
  let FARMTOKEN = '0x38999f5c5be5170940d72b398569344409cd4c6e'

  if (config.env === 'main') {
    CHAINID = '56'
    FARMTOKEN = '0x6a411104ca412c8265bd8e95d91fed72006934fd'
  }
  return (
    <>
      <Modal
        style={{ userSelect: 'none' }}
        isOpen={showPopup}
        minHeight={null}
        maxHeight={90}
      >
        <ModalContent
          onClose={setPopup}
          isShowClose={!!localStorage.getItem(BSCAGREESTAKING)}
        >
          <ActivityInfoBox>
            <h1 className='header'>{t('anyBscStakingTip0')}</h1>

            <h3 className='title'>{t('anyBscStakingTip10')}</h3>
            <dl className='box'>
              <dd className='item'>{t('anyBscStakingTip11')}</dd>
            </dl>

            <h3 className='title'>{t('anyBscStakingTip20')}</h3>
            <dl className='box'>
              <dd className='item'>{t('anyBscStakingTip21')}</dd>
              <dd className='item'>{t('anyBscStakingTip22')}</dd>
            </dl>

            <h3 className='title'>{t('anyBscStakingTip30')}</h3>
            <dl className='box'>
              <dd className='item' dangerouslySetInnerHTML = { 
                {__html: t('anyBscStakingTip31')}
              }></dd>
              <dd className='item'>{t('anyBscStakingTip32')}</dd>
              <dd className='item'>{t('anyBscStakingTip33')}</dd>
              <dd className='item'>{t('anyBscStakingTip34')}</dd>
              <dd className='item'>{t('anyBscStakingTip35')}</dd>
            </dl>

            <h3 className='title'>{t('anyBscStakingTip40')}</h3>
            <dl className='box'>
              <dd className='item'>{t('anyBscStakingTip41')}</dd>
            </dl>
            {
              !localStorage.getItem(BSCAGREESTAKING) ? (
                <Flex>
                  <Button2 style={{height: '45px',maxWidth: '200px'}}>
                    <BackLink to={config.farmUrl}>
                      {t('disagree')}
                    </BackLink>
                  </Button2>
                  <Button1 onClick={() => {
                    localStorage.setItem(BSCAGREESTAKING, 1)
                    setPopup(false)
                  }}  style={{height: '45px',maxWidth: '200px'}}>
                    {t('agree')}
                  </Button1>
                </Flex>
              ) : ''
            }
          </ActivityInfoBox>
        </ModalContent>
      </Modal>
      <Title title='Stake LP tokens to earn CYC'>
        <QuestionWrapper
          onClick={() => {
            setPopup(!showPopup)
          }}
        >
          <HelpCircleStyled src={question} alt="popup" />
        </QuestionWrapper>
      </Title>
      <Farming
        initLpToken = {initLpToken}
        initialTrade = {initialTrade}
        CHAINID = {CHAINID}
        FARMTOKEN = {FARMTOKEN}
        FARMURL = {config.farmUrl + 'bscfarming'}
        poolCoin = 'CYC'
      />
    </>
  )
}
