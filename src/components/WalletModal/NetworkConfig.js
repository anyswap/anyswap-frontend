import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Copy from '../AccountDetails/Copy'
import config  from '../../config/index'

const NetworkConfigBox = styled.div`
  width:100%;
  paddding: 0;
`

const ConfigBox = styled.div`
  width:100%;
  padding:0 14px 25px;
`

const ConfigTip = styled.div`
  width: 100%;
  padding: 15px;
  border-radius: 9px;
  background-color: ${({ theme }) => theme.selectedBg};
  border: ${({ theme }) => theme.selectedBg};
  p {
    margin:0;
    font-size: 14px;
    line-height: 1;
    letter-spacing: normal;
    color: ${({ theme }) => theme.textColor};
  }
`

const ConfigList = styled.ul`
  list-style:none;
  margin:5px 0 0;
  padding:0;
  li {
    ${({ theme }) => theme.FlexBC};
    padding: 10px 15px;
    border-bottom: 1px  solid ${({ theme }) => theme.networkBorder};
    .left {
      color: ${({ theme }) => theme.textColor};
      .label {
        font-size: 12px;
        font-weight: 500;
        margin-bottom:10px;
      }
      .value {
        font-size: 14px;
        font-weight: bold;
        margin:0;
      }
    }
  }
`

export default function NetworkConfig() {
  const { t } = useTranslation()
  let walletType = sessionStorage.getItem('walletType')
  const configArr = [
    {label: 'Network Name', value: config.symbol + '-' + (config.env === 'main' ? t('mainnet') : t('testnet'))},
    {label: 'New RPC URL', value: config.nodeRpc1},
    {label: 'Chain ID (optional)', value: config.chainID},
    {label: 'Symbol (optional)', value: config.symbol},
    {label: 'Block Explorer URL (optional)', value:  config.explorerUrl},
  ]
  return (
    <>
      <NetworkConfigBox>
        <ConfigBox>
          <ConfigTip>
            <p style={{marginBottom: '12px'}}><strong>Please make sure to use the correct RPC Settings on Metamask.</strong></p>
            <p>Go to <strong>Metamask -&gt; Settings -&gt; Networks</strong> and copy the settings below</p>
          </ConfigTip>
          <ConfigList>
            {
              configArr.map((item, index) => {
                return (
                  <li key={index}>
                    <div className='left'>
                      <span className='label'>{item.label}</span>
                      <p className='value'>{item.value}</p>
                    </div>
                    <Copy toCopy={item.value} color={'#062536'}></Copy>
                  </li>
                )
              })
            }
          </ConfigList>
        </ConfigBox>
      </NetworkConfigBox>
    </>
  )
}