import React, { useState, useReducer, useEffect } from 'react'
// import ReactGA from 'react-ga'
import { ethers } from 'ethers'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { useWeb3React } from '../../hooks'
import { brokenTokens } from '../../constants'
import { isAddress, calculateGasMargin, formatToUsd, formatTokenBalance, formatEthBalance } from '../../utils'
import { useAddressBalance, useExchangeReserves } from '../../contexts/Balances'
import { useTokenDetails, useAllTokenDetails, INITIAL_TOKENS_CONTEXT } from '../../contexts/Tokens'
import { useExchangeContract } from '../../hooks'
import TokenLogo from '../TokenLogo'
import { useETHPriceInUSD, useAllBalances } from '../../contexts/Balances'
import { Button, TitleBox, BorderlessInput } from '../../theme'

import SearchIcon from '../../assets/images/icon/search.svg'
import { withRouter, NavLink } from 'react-router-dom'

import GraphUpIcon from '../../assets/images/icon/graph-up.svg'
import AnyillustrationIcon from '../../assets/images/icon/any-illustration.svg'

import { ReactComponent as Dropup } from '../../assets/images/dropup-blue.svg'
import { ReactComponent as Dropdown } from '../../assets/images/dropdown-blue.svg'
const MyBalanceBox = styled.div`
  width: 100%;
  object-fit: contain;
  border-radius: 9px;
  box-shadow: 7px 2px 26px 0 rgba(0, 0, 0, 0.06);
  background-color: #ffffff;
  padding: 17px 40px;
`

const TitleAndSearchBox = styled.div`
  ${({theme}) => theme.FlexBC};
  margin-bottom:25px;

  h3 {
    font-family: Manrope;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color: #062536;
    margin:0 20px 0 0;
    white-space:nowrap;
  }
`
const SearchBox = styled.div`
  width: 100%;
  max-width: 296px;
  height: 40px;
  object-fit: contain;
  border-radius: 9px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
  border: solid 0.5px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding-left: 40px;
  position:relative;

  .icon {
    ${({theme}) => theme.FlexC};
    width:40px;
    height:40px;
    position:absolute;
    top:0;
    left:0;
    cursor: pointer;
  }
`

const SearchInput = styled(BorderlessInput)`
  width: 100%;
  height: 100%;
  border:none;
  background:none;
  font-family: Manrope;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: #062536;
  padding-right:10px;

  ::placeholder {
  }
`

const WrapperBox = styled.div`
  ${({theme}) => theme.FlexBC};
  margin-top:15px;
`
const EarningsBox = styled.div`
width: 33.33%;
height: 386px;
object-fit: contain;
border-radius: 9px;
box-shadow: 7px 2px 26px 0 rgba(0, 0, 0, 0.06);
background-color: #ffffff;
padding:20px;
.bgImg {
  width: 149px;
  height: 148px;
  object-fit: contain;
  margin: 0 auto 30px;
  padding-bottom:30px;
  border-bottom: 1px solid #ededed;
}
h3 {
  font-family: Manrope;
  font-size: 26px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.15;
  letter-spacing: -1.18px;
  text-align: center;
  color: #062536;
  text-align:center;
  white-space:nowrap;
  margin: 30px 0 6px;
}
p {
  font-family: Manrope;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: center;
  color: #062536;
  text-align:center;
  margin: 0 0 25px;
}
.txt {
  ${({theme}) => theme.FlexC};
  height: 42px;
  object-fit: contain;
  border-radius: 6px;
  border: solid 1px #a3daab;
  background-color: #e2f9e5;
  font-family: Manrope;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.86;
  letter-spacing: normal;
  color: #031a6e;
  span {
    font-weight:bold;
  }
}
`

const ProvideLiqBox = styled.div`
width: 64.92%;
height: 386px;
object-fit: contain;
border-radius: 9px;
box-shadow: 7px 2px 26px 0 rgba(0, 0, 0, 0.06);
background-color: #ffffff;
padding: 17px 40px;
`
const MyBalanceTokenBox  = styled.div`
width:100%;
height: 240px;
overflow:hidden;
&.showMore {
  height:auto;
  overflow:auto;
}
`
const MyBalanceTokenBox1 = styled(MyBalanceTokenBox)`
overflow:auto;
`
const TokenTableBox = styled.ul`
  width:100%;
  list-style:none;
  margin:0;
  padding:0;
`

const TokenTableList = styled.li`
${({theme}) => theme.FlexBC};
  width: 100%;
  height: 70px;
  object-fit: contain;
  border-radius: 9px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
  border: solid 0.5px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding: 16px 0;
  margin-bottom: 10px;
`
const TokenTableCoinBox  = styled.div`
${({theme}) => theme.FlexSC};
  border-right: 1px  solid rgba(0, 0, 0, 0.1);
  padding: 0 25px;
  min-width: 217px
  width:30%;
`
const TokenTableLogo = styled.div`
${({theme}) => theme.FlexC};
  width: 46px;
  height: 46px;
  object-fit: contain;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
  border: solid 1px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  border-radius:100%;
  padding: 10px;
  margin-right: 20px;
`

const TokenNameBox  = styled.div`
  h3 {
    margin:0;
    font-family: Manrope;
    font-size: 16px;
    font-weight: 800;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: normal;
    color: #031a6e;
    white-space:nowrap;
  }
  p {
    margin: 2px 0 0;
    font-family: Manrope;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    color: #031a6e;
  }
`

const TokenBalanceBox  = styled.div`
  min-width: 120px
  width:30%;
  text-align:left;
  h3 {
    padding-left: 17.97%;
    margin:0;
    font-family: Manrope;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    color: #062536;
    white-space:nowrap;
  }
  p {
    padding-left: 17.97%;
    margin: 2px 0 0;
    font-family: Manrope;
    font-size: 14px;
    font-weight: 800;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: normal;
    color: #062536;
  }
`

const TokenActionBox  = styled.div`
${({theme}) => theme.FlexEC};
  width: 40%;
  padding: 0 20px;
`
const TokenActionBtn  = styled(NavLink)`
${({theme}) => theme.FlexC};
  width: 88px;
  height: 38px;
  object-fit: contain;
  border-radius: 9px;
  background: #ecf6ff;
  margin-right: 2px;
  font-family: Manrope;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #062536;
  box-shadow: none;
  padding:0;
  text-decoration: none;
  &:hover,&:focus,&:active {
    background:#ecf6ff;
  }
`
const TokenActionBtnSwap = styled(TokenActionBtn)`
margin-right:2px;
`

const TokenActionBtnSend = styled(TokenActionBtn)`

`

const MoreBtnBox = styled.div`
${({theme}) => theme.FlexC};
  width: 110px;
  height: 34px;
  object-fit: contain;
  border-radius: 6px;
  background-color: #f9fafb;
  font-family: Manrope;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: normal;
  color: #734be2;
  margin: 20px auto 0;
  cursor:pointer;
`

const WrappedDropup = ({ isError, highSlippageWarning, ...rest }) => <Dropup {...rest} />
const ColoredDropup = styled(WrappedDropup)`
margin-right: 10px;
  path {
    stroke: ${({ theme }) => theme.royalBlue};
  }
`

const WrappedDropdown = ({ isError, highSlippageWarning, ...rest }) => <Dropdown {...rest} />
const ColoredDropdown = styled(WrappedDropdown)`
margin-right: 10px;
  path {
    stroke: ${({ theme }) => theme.royalBlue};
  }
`

export default function DashboardDtil () {
  const { account, chainId, error } = useWeb3React()
  const allBalances = useAllBalances()
  const allTokens = useAllTokenDetails()
  const { t } = useTranslation()
  // console.log(allTokens)
  
  // getPoolToken()
  // const poolTokenBalance = Object.keys(allTokens).map(k => {
  //   // return useAddressBalance(account, allTokens[k].exchangeAddress)
  //   // const poolTokenBalance = useAddressBalance(account, allTokens[k].exchangeAddress)
  //   if (k === 'FSN') {
  //     return {
  //       name: allTokens[k].name,
  //       symbol: allTokens[k].symbol,
  //       address: k,
  //       decimals: allTokens[k].decimals,
  //       balance: useAddressBalance(account, 'FSN'),
  //     }
  //   }
  //   return {
  //     name: allTokens[k].name,
  //     symbol: allTokens[k].symbol,
  //     address: k,
  //     decimals: allTokens[k].decimals,
  //     balance: useAddressBalance(account, allTokens[k].exchangeAddress),
  //   }
  // })
  const poolTokenBalance = [
    {
      name: 'Fusion',
      symbol: 'FSN',
      address: 'FSN',
      decimals: 18,
      balance: useAddressBalance(account, 'FSN'),
    },
    {
      name: 'SMPC Bitcoin',
      symbol: 'mBTC',
      address: '0xeaeaeb2cf9921a084ef528f43e9e121e8291a947',
      decimals: 8,
      balance: useAddressBalance(account, '0x0e711afa0da54bc718c777ae404386d3ad4774bc'),
    },
    {
      name: 'Anyswap',
      symbol: 'ANY',
      address: '0xC20b5E92E1ce63Af6FE537491f75C19016ea5fb4',
      decimals: 18,
      balance: useAddressBalance(account, '0x4dee5f0705ff478b452419375610155b5873ef5b'),
    },
    {
      name: 'Ethereum',
      symbol: 'mETH',
      address: '0xeCd0fad9381b19feB74428Ab6a732BAA293CdC88',
      decimals: 18,
      balance: useAddressBalance(account, '0x9ab217c352b4122128d0024219f06e3503a8c7eb'),
    },
    {
      name: 'Tether',
      symbol: 'mUSDT',
      address: '0x19543338473caaa6f404dbe540bb787f389d5462',
      decimals: 6,
      balance: useAddressBalance(account, '0x763858d914ebc7936977ab7c93b7331cea77b37c'),
    },
  ]
  // console.log(poolTokenBalance)
  const [searchBalance, setSearchBalance] =  useState('')
  const [searchPool, setSearchPool] =  useState('')
  const [showMore, setShowMore] =  useState(false)
  function searchBox (type) {
    return (
      <>
        <SearchBox>
          <div className='icon'>
            <img src={SearchIcon} />
          </div>
          <SearchInput
            placeholder={t('searchToken')}
            onChange={e => {
              if (type === 1) {
                setSearchBalance(e.target.value)
              } else {
                setSearchPool(e.target.value)
              }
            }}
          ></SearchInput>
        </SearchBox>
      </>
    )
  }


  function getPercent (val) {
    let allVal = 0
    for (let obj of poolTokenBalance) {
      try {
        allVal += Number(formatTokenBalance(ethers.utils.bigNumberify(obj.balance), obj.decimals))
      } catch (error) {
        
      }
    }
    if (!allVal) return '0.00'
    return ((val / allVal) * 100).toFixed(2) + '%'
  }
  function getPoolToken () {
    if (!account) return
    // console.log(tokenPoolList)
    return (
      <MyBalanceTokenBox1>
        <TokenTableBox>
          {
            poolTokenBalance.map((item, index) => {
              if (
                !searchPool
                || item.symbol.toLowerCase().indexOf(searchPool.toLowerCase()) !== -1
                || item.name.toLowerCase().indexOf(searchPool.toLowerCase()) !== -1
                || item.address.toLowerCase().indexOf(searchPool.toLowerCase()) !== -1
              ) {
                return (
                  <TokenTableList key={index}>
                    <TokenTableCoinBox>
                      <TokenTableLogo><TokenLogo address={item.address} size={'26px'} ></TokenLogo></TokenTableLogo>
                      <TokenNameBox>
                        <h3>{item.symbol}</h3>
                        <p>{item.name}</p>
                      </TokenNameBox>
                    </TokenTableCoinBox>
                    <TokenBalanceBox>
                      <h3>{t('balances')}</h3>
                      <p>{item.balance ? (
                        formatTokenBalance(ethers.utils.bigNumberify(item.balance), item.decimals)
                      ) : '-'}</p>
                    </TokenBalanceBox>
                    <TokenBalanceBox>
                      <h3>{t("Percentage")}</h3>
                      <p>{item.balance ? (
                        getPercent(formatTokenBalance(ethers.utils.bigNumberify(item.balance), item.decimals))
                      ) : '-'}</p>
                    </TokenBalanceBox>
                  </TokenTableList>
                )
              } else {
                return ''
              }
            })
          }
        </TokenTableBox>
      </MyBalanceTokenBox1>
    )
  }
  function getMyAccount () {
    if (!account) return
    const myAccount = allBalances[account]
    
    const tokenList = Object.keys(allTokens).map(k => {
      // console.log(k)
      let balance
      // only update if we have data
      if (k === 'FSN' && myAccount && myAccount && myAccount[k].value) {
        balance = formatEthBalance(ethers.utils.bigNumberify(myAccount[k].value))
      } else if (myAccount && myAccount[k] && myAccount[k].value) {
        balance = formatTokenBalance(ethers.utils.bigNumberify(myAccount[k].value), allTokens[k].decimals)
      }
      return {
        name: allTokens[k].name,
        symbol: allTokens[k].symbol,
        address: k,
        balance: balance,
      }
    })
    return (
        <TokenTableBox>
          {
            tokenList.map((item, index) => {
              if (
                !searchBalance
                || item.name.toLowerCase().indexOf(searchBalance.toLowerCase()) !== -1
                || item.symbol.toLowerCase().indexOf(searchBalance.toLowerCase()) !== -1
                || item.address.toLowerCase().indexOf(searchBalance.toLowerCase()) !== -1
              ) {
                return (
                  <TokenTableList key={index}>
                    <TokenTableCoinBox>
                      <TokenTableLogo><TokenLogo address={item.address} size={'26px'} ></TokenLogo></TokenTableLogo>
                      <TokenNameBox>
                        <h3>{item.symbol}</h3>
                        <p>{item.name}</p>
                      </TokenNameBox>
                    </TokenTableCoinBox>
                    <TokenBalanceBox>
                      <h3>{t('balances')}</h3>
                      <p>{item.balance}</p>
                    </TokenBalanceBox>
                    <TokenActionBox>
                      <TokenActionBtnSwap to={'/swap?inputCurrency=' + item.address}>{t('swap')}</TokenActionBtnSwap>
                      <TokenActionBtnSend to={'/send?inputCurrency=' + item.address}>{t('send')}</TokenActionBtnSend>
                    </TokenActionBox>
                  </TokenTableList>
                )
              }
              return ''
            })
          }
        </TokenTableBox>
    )
  }
  return (
    <>
      <TitleBox>{t('dashboard')}</TitleBox>
      <MyBalanceBox>
        <TitleAndSearchBox>
          <h3>{t('myBalance')}</h3>
          {searchBox(1)}
        </TitleAndSearchBox>
        <MyBalanceTokenBox className={showMore ? 'showMore' : ''}>
          {getMyAccount()}
        </MyBalanceTokenBox>
        <MoreBtnBox onClick={() => {
          setShowMore(!showMore)
        }}>
          {
            showMore ? (
              <>
                <ColoredDropup></ColoredDropup>
                {t('pichUp')}
              </>
            ) : (
              <>
                <ColoredDropdown></ColoredDropdown>
                {t('showMore')}
              </>
            )
          }
        </MoreBtnBox>
      </MyBalanceBox>
      <WrapperBox>
        <EarningsBox>
          <div className='bgImg'><img src={AnyillustrationIcon} /></div>
          <h3>2,245.05 ANY</h3>
          <p>{t('Accumulated')}</p>
          <div className='txt'>
            <img src={GraphUpIcon} />
            <span>+12%</span>
            {t('last7Day')}
          </div>
        </EarningsBox>
        <ProvideLiqBox>
        <TitleAndSearchBox>
          <h3>{t('ProvidingLiquidity')}</h3>
          {searchBox(2)}
        </TitleAndSearchBox>
        {getPoolToken()}
        </ProvideLiqBox>
      </WrapperBox>
    </>
  )
}