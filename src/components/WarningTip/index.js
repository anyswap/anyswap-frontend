import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { transparentize, darken } from 'polished'

import {
  useBetaMessageManager
} from '../../contexts/LocalStorage'

import config from '../../config'

const BetaMessage = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  cursor: pointer;
  flex: 1 0 auto;
  align-items: center;
  position: relative;
  // border: 1px solid ${({ theme }) => transparentize(0.6, theme.wisteriaPurple)};
  // background-color: ${({ theme }) => transparentize(0.9, theme.wisteriaPurple)};
  font-size: 0.875rem;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #734be2;

  width: 100%;
  object-fit: contain;
  border-radius: 0.5625rem;
  border: solid 0.5px #b398f9;
  background-color: #f2edff;
  padding: 1rem 2.5rem;
  margin-top: 0.625rem;
  padding-right: 8.875rem;

  span{
    margin-right: 10px;
  }

  // &:after {
  //   content: '✕';
  //   top: 0.8rem;
  //   right: 1rem;
  //   position: absolute;
  //   color: #734be2;
  // }
  .confirm {
    ${({ theme }) => theme.FlexC};
    width: 110px;
    height: 1.875rem;
    border-radius: 6px;
    outline: none;
    cursor: pointer;
    user-select: none;
    border: #734be2;
    top: 50%;
    right: 1rem;
    position: absolute;
    background:#fff;
    margin-top: -0.9375rem;
    color: ${({ theme }) => theme.textColorBold}
  }
`

export default function WarningTip () {
  const { t } = useTranslation()
  const [showBetaMessage, dismissBetaMessage] = useBetaMessageManager()
  return (
    <>
      {/* {showBetaMessage  && ( */}
      {showBetaMessage && config.env === 'main' ? (
        <BetaMessage>
          <span role="img" aria-label="warning">
            💀
          </span>{' '}
          {t('betaWarning')}
          <div className='confirm' onClick={dismissBetaMessage}>{t('agree')}</div>
        </BetaMessage>
      ) : ''}
    </>
  )
}