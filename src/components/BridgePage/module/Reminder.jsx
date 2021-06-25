import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import {thousandBit} from '../../../utils/tools'
import BulbIcon from '../../../assets/images/icon/bulb.svg'

const SubCurrencySelectBox = styled.div`
  width: 100%;
  object-fit: contain;
  border-radius: 0.5625rem;
  border: solid 0.5px ${({ theme }) => theme.tipBorder};
  background-color: ${({ theme }) => theme.tipBg};
  padding: 1rem 1.25rem;
  margin-top: 0.625rem;

  .tip {
    ${({ theme }) => theme.flexSC};
    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.tipColor};
    padding: 2px 20px 18px;
    border-bottom: 1px solid #f1f6fa;
    word-break:break-all;
    img {
      display:inlne-block;
    }
    p {
      ${({ theme }) => theme.flexSC};
      flex-wrap:wrap;
      display:inline-block;
      margin: 0;
      line-height: 1rem;
      .span {
        text-decoration: underline;
        margin: 0 5px;
      }
      a {
        display:inline-block;
        overflow:hidden;
        height: 1rem;
      }
    }
  }
  .list {
    margin:0;
    padding: 0 0px 0;
    font-size: 12px;
    color: ${({ theme }) => theme.tipColor};
    dt {
      ${({ theme }) => theme.flexSC};
      font-weight: bold;
      line-height: 1.5;
      img {
        margin-right: 8px;
      }
    }
    dd {
      font-weight: 500;
      line-height: 1.83;
      i{
        display:inline-block;
        width:4px;
        height: 4px;
        border-radius:100%;
        background:${({ theme }) => theme.tipColor};
        margin-right: 10px;
      }
    }
  }
`

function SwapinView (bridgeConfig) {
  const { t } = useTranslation()
  if (!bridgeConfig) {
    return (
      <></>
    )
  }
  const viewSymbol = bridgeConfig.symbol
  return (
    <SubCurrencySelectBox>
      <dl className='list'>
        <dt>
          <img src={BulbIcon} alt='' />
          {t('Reminder')}:
        </dt>
        <dd><i></i>{t('mintTip1', {
          dMinFee: bridgeConfig.SrcToken.MinimumSwapFee,
          coin: viewSymbol,
          dMaxFee: bridgeConfig.SrcToken.MaximumSwapFee,
          dFee: Number(bridgeConfig.SrcToken.SwapFeeRate)
        })}</dd>
        <dd><i></i>{t('mintTip2')} {thousandBit(bridgeConfig.SrcToken.MinimumSwap, 'no')} {viewSymbol}</dd>
        <dd><i></i>{t('mintTip3')} {thousandBit(bridgeConfig.SrcToken.MaximumSwap, 'no')} {viewSymbol}</dd>
        <dd><i></i>{t('mintTip4')}</dd>
        <dd><i></i>{t('mintTip5', {
          depositBigValMoreTime: thousandBit(bridgeConfig.SrcToken.BigValueThreshold, 'no'),
          coin: viewSymbol,
        }) + (viewSymbol ? '' : '')}</dd>
      </dl>
    </SubCurrencySelectBox>
  )
}

function SwapoutView (bridgeConfig) {
  const { t } = useTranslation()
  if (!bridgeConfig) {
    return (
      <></>
    )
  }
  const viewSymbol = bridgeConfig.symbol
  return (
    <SubCurrencySelectBox>
      <dl className='list'>
        <dt>
          <img src={BulbIcon} alt='' />
          {t('Reminder')}:
        </dt>
        <dd><i></i>{t('redeemTip1', {
          minFee: bridgeConfig.SrcToken.MinimumSwapFee,
          coin: viewSymbol,
          maxFee: bridgeConfig.SrcToken.MaximumSwapFee,
          fee: Number(bridgeConfig.SrcToken.SwapFeeRate)
        })}</dd>
        <dd><i></i>{t('redeemTip2')} {thousandBit(bridgeConfig.SrcToken.MinimumSwap, 'no')} {viewSymbol}</dd>
        <dd><i></i>{t('redeemTip3')} {thousandBit(bridgeConfig.SrcToken.MaximumSwap, 'no')} {viewSymbol}</dd>
        <dd><i></i>{t('redeemTip4')}</dd>
        <dd><i></i>{t('redeemTip5', {
          redeemBigValMoreTime: thousandBit(bridgeConfig.SrcToken.BigValueThreshold, 'no'),
          coin: viewSymbol,
        })}</dd>
      </dl>
    </SubCurrencySelectBox>
  )
}

export default function Reminder ({
  bridgeConfig,
  bridgeType
}) {
  // console.log(bridgeConfig)
  if (bridgeType === 'swapin') {
    return SwapinView(bridgeConfig)
  }
  if (bridgeType === 'swapout') {
    return SwapoutView(bridgeConfig)
  }
  return (
    <></>
  )
}