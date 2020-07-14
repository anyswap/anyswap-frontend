import React, { useState, useEffect, useCallback  } from 'react'
// import ReactGA from 'react-ga'
import { ethers } from 'ethers'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { useWeb3React } from '../../hooks'
import { formatTokenBalance, formatEthBalance, amountFormatter } from '../../utils'
import { useAddressBalance} from '../../contexts/Balances'
import { useAllTokenDetails} from '../../contexts/Tokens'
import { useExchangeContract } from '../../hooks'
import TokenLogo from '../TokenLogo'
import { useAllBalances } from '../../contexts/Balances'
import { TitleBox, BorderlessInput } from '../../theme'

import SearchIcon from '../../assets/images/icon/search.svg'
import { NavLink } from 'react-router-dom'

import GraphUpIcon from '../../assets/images/icon/graph-up.svg'
import AnyillustrationIcon from '../../assets/images/icon/any-illustration.svg'

import { ReactComponent as Dropup } from '../../assets/images/dropup-blue.svg'
import { ReactComponent as Dropdown } from '../../assets/images/dropdown-blue.svg'
const MyBalanceBox = styled.div`
  width: 100%;
  
  border-radius: 0.5625rem;
  box-shadow: 0.4375rem 0.125rem 1.625rem 0 rgba(0, 0, 0, 0.06);
  background-color: #ffffff;
  padding: 1rem 2.5rem;
  @media screen and (max-width: 960px) {
    padding: 1rem 1rem;
  }
`

const TitleAndSearchBox = styled.div`
  ${({theme}) => theme.FlexBC};
  margin-bottom:1.5625rem;
  h3 {
    font-size: 1rem;
    font-weight: bold;
    line-height: 1.5;
    color: #062536;
    margin:0 1.25rem 0 0;
    white-space:nowrap;
  }
`
const SearchBox = styled.div`
  width: 100%;
  max-width: 296px;
  height: 2.5rem;
  
  border-radius: 0.5625rem;
  box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.04);
  border: solid 0.0625rem rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding-left: 2.5rem;
  position:relative;

  .icon {
    ${({theme}) => theme.FlexC};
    width:2.5rem;
    height:2.5rem;
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
  
  font-size: 0.75rem;
  font-weight: normal;
  
  
  line-height: 1.67;
  
  color: #062536;
  padding-right:0.625rem;

  ::placeholder {
  }
`

const WrapperBox = styled.div`
  ${({theme}) => theme.FlexBC};
  margin-top:1rem;
  @media screen and (max-width: 960px) {
    justify-content:center;;
    flex-wrap:wrap;
    flex-direction: column-reverse ;
  }
`
const EarningsBox = styled.div`
  width: 33.33%;
  height: 386px;
  border-radius: 0.5625rem;
  box-shadow: 0.4375rem 0.125rem 1.625rem 0 rgba(0, 0, 0, 0.06);
  background-color: #ffffff;
  padding:1.25rem;
  .bgImg {
    width: 149px;
    height: 148px;
    margin: 0 auto 1.875rem;
    padding-bottom:1.875rem;
    border-bottom: 0.0625rem solid #ededed;
  }
  h3 {
    font-size: 1.625rem;
    font-weight: bold;
    line-height: 1.15;
    letter-spacing: -1.18px;
    text-align: center;
    color: #062536;
    text-align:center;
    white-space:nowrap;
    margin: 1.875rem 0 6px;
  }
  p {
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.43;
    text-align: center;
    color: #062536;
    text-align:center;
    margin: 0 0 1.5625rem;
  }
  .txt {
    ${({theme}) => theme.FlexC};
    height: 42px;
    border-radius: 6px;
    border: solid 0.0625rem #a3daab;
    background-color: #e2f9e5;
    font-size: 0.875rem;
    font-weight: normal;
    line-height: 0.86;
    color: #031a6e;
    span {
      font-weight:bold;
      margin-left:5px;
    }
  }
  @media screen and (max-width: 960px) {
    width: 100%;
  }
`

const ProvideLiqBox = styled.div`
width: 64.92%;
height: 386px;

border-radius: 0.5625rem;
box-shadow: 0.4375rem 0.125rem 1.625rem 0 rgba(0, 0, 0, 0.06);
background-color: #ffffff;
padding: 1rem 2.5rem;
@media screen and (max-width: 960px) {
  padding: 1rem 1rem;
  width: 100%;
  margin-bottom:1rem;
}
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
  
  border-radius: 0.5625rem;
  box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.04);
  border: solid 1px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding: 1rem 0;
  margin-bottom: 0.625rem;
  @media screen and (max-width: 960px) {
    padding: 1rem 5px;
  }
`
const TokenTableCoinBox  = styled.div`
${({theme}) => theme.FlexSC};
  border-right: 0.0625rem  solid rgba(0, 0, 0, 0.1);
  padding: 0 1.5625rem;
  min-width: 217px
  width:30%;
  @media screen and (max-width: 960px) {
    min-width: 140px;
    padding: 0 5px;
  }
`
const TokenTableLogo = styled.div`
${({theme}) => theme.FlexC};
  width: 36px;
  height: 36px;
  
  box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.04);
  border: solid 0.0625rem rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  border-radius:100%;
  padding: 0.625rem;
  margin-right: 1.25rem;
  @media screen and (max-width: 960px) {
    margin-right: 5px;
    padding: 5px;
  }
`

const TokenNameBox  = styled.div`
  h3 {
    margin:0;
    
    font-size: 1rem;
    font-weight: 800;
    
    
    line-height: 1.25;
    
    color: #031a6e;
    white-space:nowrap;
  }
  p {
    margin: 0.125rem 0 0;
    
    font-size: 0.75rem;
    font-weight: normal;
    
    
    line-height: 1;
    
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
    
    font-size: 0.75rem;
    font-weight: normal;
    
    
    line-height: 1;
    
    color: #062536;
    white-space:nowrap;
  }
  p {
    padding-left: 17.97%;
    margin: 0.125rem 0 0;
    
    font-size: 0.875rem;
    font-weight: 800;
    
    
    line-height: 1.43;
    
    color: #062536;
  }
  @media screen and (max-width: 960px) {
    min-width: 100px
    h3 {
      padding-left: 1rem;
    }
    p {
      padding-left: 1rem;
    }
  }
`

const TokenActionBox  = styled.div`
${({theme}) => theme.FlexEC};
  width: 40%;
  padding: 0 1.25rem;
`
const TokenActionBtn  = styled(NavLink)`
${({theme}) => theme.FlexC};
  width: 88px;
  height: 38px;
  
  border-radius: 0.5625rem;
  background: #ecf6ff;
  margin-right: 0.125rem;
  
  font-size: 0.75rem;
  font-weight: 500;
  
  
  line-height: 1;
  
  color: #062536;
  box-shadow: none;
  padding:0;
  text-decoration: none;
  &:hover,&:focus,&:active {
    background:#ecf6ff;
  }
`
const TokenActionBtnSwap = styled(TokenActionBtn)`
margin-right:0.125rem;
`

const TokenActionBtnSend = styled(TokenActionBtn)`

`

const MoreBtnBox = styled.div`
${({theme}) => theme.FlexC};
  width: 110px;
  height: 34px;
  
  border-radius: 6px;
  background-color: #f9fafb;
  
  font-size: 0.75rem;
  font-weight: 500;
  
  
  line-height: 1.17;
  
  color: #734be2;
  margin: 1.25rem auto 0;
  cursor:pointer;
`

const WrappedDropup = ({ isError, highSlippageWarning, ...rest }) => <Dropup {...rest} />
const ColoredDropup = styled(WrappedDropup)`
margin-right: 0.625rem;
  path {
    stroke: ${({ theme }) => theme.royalBlue};
  }
`

const WrappedDropdown = ({ isError, highSlippageWarning, ...rest }) => <Dropdown {...rest} />
const ColoredDropdown = styled(WrappedDropdown)`
margin-right: 0.625rem;
  path {
    stroke: ${({ theme }) => theme.royalBlue};
  }
`

export default function DashboardDtil () {
  const { account, library } = useWeb3React()
  const allBalances = useAllBalances()
  const allTokens = useAllTokenDetails()
  const { t } = useTranslation()

  // console.log(allTokens)
  let allCoins = {}
  for (let obj in allTokens) {
    allCoins[allTokens[obj].symbol] = {
      ...allTokens[obj],
      token: obj
    }
  }
  // console.log(allCoins)
  /**
   * BTC start
   *  */
  const poolTokenBalanceBTC = useAddressBalance(account, allCoins.mBTC.exchangeAddress)
  const exchangeETHBalanceBTC = useAddressBalance(allCoins.mBTC.exchangeAddress, 'FSN')
  const exchangeTokenBalanceBTC = useAddressBalance(allCoins.mBTC.exchangeAddress, allCoins.mBTC.token)
  const exchangeContractBTC = useExchangeContract(allCoins.mBTC.exchangeAddress)
  const [totalPoolTokensBTC, setTotalPoolTokensBTC] = useState()
  const fetchPoolTokensBTC = useCallback(() => {
    if (exchangeContractBTC) {
      exchangeContractBTC.totalSupply().then(totalSupply => {
        setTotalPoolTokensBTC(totalSupply)
      })
    }
  }, [exchangeContractBTC])
  useEffect(() => {
    fetchPoolTokensBTC()
    library.on('block', fetchPoolTokensBTC)

    return () => {
      library.removeListener('block', fetchPoolTokensBTC)
    }
  }, [fetchPoolTokensBTC, library])
  const poolTokenPercentageBTC =
    poolTokenBalanceBTC && totalPoolTokensBTC && !totalPoolTokensBTC.isZero()
        ? poolTokenBalanceBTC.mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18))).div(totalPoolTokensBTC)
        : undefined
  const ethShareBTC =
    exchangeETHBalanceBTC && poolTokenPercentageBTC
      ? exchangeETHBalanceBTC
          .mul(poolTokenPercentageBTC)
          .div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
      : undefined
  const tokenShareBTC =
    exchangeTokenBalanceBTC && poolTokenPercentageBTC
      ? exchangeTokenBalanceBTC
          .mul(poolTokenPercentageBTC)
          .div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
      : undefined
  /**
   * BTC end
   *  */

  /**
   * ANY start
   *  */
  const poolTokenBalanceANY = useAddressBalance(account, allCoins.ANY.exchangeAddress)
  const exchangeETHBalanceANY = useAddressBalance(allCoins.ANY.exchangeAddress, 'FSN')
  const exchangeTokenBalanceANY = useAddressBalance(allCoins.ANY.exchangeAddress, allCoins.ANY.token)
  const exchangeContractANY = useExchangeContract(allCoins.ANY.exchangeAddress)
  const [totalPoolTokensANY, setTotalPoolTokensANY] = useState()
  const fetchPoolTokensANY = useCallback(() => {
    if (exchangeContractANY) {
      exchangeContractANY.totalSupply().then(totalSupply => {
        setTotalPoolTokensANY(totalSupply)
      })
    }
  }, [exchangeContractANY])
  useEffect(() => {
    fetchPoolTokensANY()
    library.on('block', fetchPoolTokensANY)

    return () => {
      library.removeListener('block', fetchPoolTokensANY)
    }
  }, [fetchPoolTokensANY, library])
  const poolTokenPercentageANY =
    poolTokenBalanceANY && totalPoolTokensANY && !totalPoolTokensANY.isZero()
        ? poolTokenBalanceANY.mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18))).div(totalPoolTokensANY)
        : undefined
  const ethShareANY =
    exchangeETHBalanceANY && poolTokenPercentageANY
      ? exchangeETHBalanceANY
          .mul(poolTokenPercentageANY)
          .div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
      : undefined
  const tokenShareANY =
    exchangeTokenBalanceANY && poolTokenPercentageANY
      ? exchangeTokenBalanceANY
          .mul(poolTokenPercentageANY)
          .div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
      : undefined
  /**
   * ANY end
   *  */

  /**
   * ETH start
   *  */
  const poolTokenBalanceETH = useAddressBalance(account, allCoins.mETH.exchangeAddress)
  const exchangeETHBalanceETH = useAddressBalance(allCoins.mETH.exchangeAddress, 'FSN')
  const exchangeTokenBalanceETH = useAddressBalance(allCoins.mETH.exchangeAddress, allCoins.mETH.token)
  const exchangeContractETH = useExchangeContract(allCoins.mETH.exchangeAddress)
  const [totalPoolTokensETH, setTotalPoolTokensETH] = useState()
  const fetchPoolTokensETH = useCallback(() => {
    if (exchangeContractETH) {
      exchangeContractETH.totalSupply().then(totalSupply => {
        setTotalPoolTokensETH(totalSupply)
      })
    }
  }, [exchangeContractETH])
  useEffect(() => {
    fetchPoolTokensETH()
    library.on('block', fetchPoolTokensETH)

    return () => {
      library.removeListener('block', fetchPoolTokensETH)
    }
  }, [fetchPoolTokensETH, library])
  const poolTokenPercentageETH =
    poolTokenBalanceETH && totalPoolTokensETH && !totalPoolTokensETH.isZero()
        ? poolTokenBalanceETH.mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18))).div(totalPoolTokensETH)
        : undefined
  const ethShareETH =
    exchangeETHBalanceETH && poolTokenPercentageETH
      ? exchangeETHBalanceETH
          .mul(poolTokenPercentageETH)
          .div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
      : undefined
  const tokenShareETH =
    exchangeTokenBalanceETH && poolTokenPercentageETH
      ? exchangeTokenBalanceETH
          .mul(poolTokenPercentageETH)
          .div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
      : undefined
  /**
   * ETH end
   *  */

   /**
   * USDT start
   *  */
  const poolTokenBalanceUSDT = useAddressBalance(account, allCoins.mUSDT.exchangeAddress)
  const exchangeETHBalanceUSDT = useAddressBalance(allCoins.mUSDT.exchangeAddress, 'FSN')
  const exchangeTokenBalanceUSDT = useAddressBalance(allCoins.mUSDT.exchangeAddress, allCoins.mUSDT.token)
  const exchangeContractUSDT = useExchangeContract(allCoins.mUSDT.exchangeAddress)
  const [totalPoolTokensUSDT, setTotalPoolTokensUSDT] = useState()
  const fetchPoolTokensUSDT = useCallback(() => {
    if (exchangeContractUSDT) {
      exchangeContractUSDT.totalSupply().then(totalSupply => {
        setTotalPoolTokensUSDT(totalSupply)
      })
    }
  }, [exchangeContractUSDT])
  useEffect(() => {
    fetchPoolTokensUSDT()
    library.on('block', fetchPoolTokensUSDT)

    return () => {
      library.removeListener('block', fetchPoolTokensUSDT)
    }
  }, [fetchPoolTokensUSDT, library])
  const poolTokenPercentageUSDT =
    poolTokenBalanceUSDT && totalPoolTokensUSDT && !totalPoolTokensUSDT.isZero()
        ? poolTokenBalanceUSDT.mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18))).div(totalPoolTokensUSDT)
        : undefined
  const ethShareUSDT =
    exchangeETHBalanceUSDT && poolTokenPercentageUSDT
      ? exchangeETHBalanceUSDT
          .mul(poolTokenPercentageUSDT)
          .div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
      : undefined
  const tokenShareUSDT =
    exchangeTokenBalanceUSDT && poolTokenPercentageUSDT
      ? exchangeTokenBalanceUSDT
          .mul(poolTokenPercentageUSDT)
          .div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
      : undefined
  /**
   * USDT end
   *  */


  function getFSNper() {
    let BTCPER = poolTokenPercentageBTC ? amountFormatter(poolTokenPercentageBTC, 16, 2) : 0
    let ANYPER = poolTokenPercentageANY ? amountFormatter(poolTokenPercentageANY, 16, 2) : 0
    let ETHPER = poolTokenPercentageETH ? amountFormatter(poolTokenPercentageETH, 16, 2) : 0
    let USDTPER = poolTokenPercentageUSDT ? amountFormatter(poolTokenPercentageUSDT, 16, 2) : 0
    return Number(BTCPER) + Number(ANYPER) + Number(ETHPER) + Number(USDTPER)
  }
  const FSNPER = getFSNper()
  const poolTokenBalance = [
    {
      name: 'Anyswap',
      symbol: 'ANY',
      address: '0xC20b5E92E1ce63Af6FE537491f75C19016ea5fb4',
      decimals: 18,
      balance: tokenShareANY,
      // percent: poolTokenPercentageANY ? poolTokenPercentageANY.toString() : '0'
      percent: poolTokenPercentageANY
    },
    {
      name: 'Fusion',
      symbol: 'FSN',
      address: 'FSN',
      decimals: 18,
      balance: useAddressBalance(account, 'FSN'),
      percent: poolTokenPercentageANY
    },
    {
      name: 'SMPC Bitcoin',
      symbol: 'mBTC',
      address: '0xeaeaeb2cf9921a084ef528f43e9e121e8291a947',
      decimals: 8,
      balance: tokenShareBTC,
      // percent: poolTokenPercentageBTC ? poolTokenPercentageBTC.toString() : '0'
      percent: poolTokenPercentageBTC
    },
    {
      name: 'Ethereum',
      symbol: 'mETH',
      address: '0xeCd0fad9381b19feB74428Ab6a732BAA293CdC88',
      decimals: 18,
      balance: tokenShareETH,
      // percent: poolTokenPercentageETH ? poolTokenPercentageETH.toString() : '0'
      percent: poolTokenPercentageETH
    },
    {
      name: 'Tether',
      symbol: 'mUSDT',
      address: '0x19543338473caaa6f404dbe540bb787f389d5462',
      decimals: 6,
      balance: tokenShareUSDT,
      // percent: poolTokenPercentageUSDT ? poolTokenPercentageUSDT.toString() : '0'
      percent: poolTokenPercentageUSDT
    },
  ]
  // console.log(poolTokenPercentageBTC)

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

  function getPoolToken () {
    // if (!account) return
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
                      <TokenTableLogo><TokenLogo address={item.address} size={'1.625rem'} ></TokenLogo></TokenTableLogo>
                      <TokenNameBox>
                        <h3>{item.symbol}</h3>
                        <p>{item.name}</p>
                      </TokenNameBox>
                    </TokenTableCoinBox>
                    <TokenBalanceBox>
                      <h3>{t('balances')}</h3>
                      <p>{item.balance ? (
                        amountFormatter(
                          item.balance,
                          item.decimals,
                          Math.min(6, item.decimals)
                        )
                      ) : '-'}</p>
                      {/* <p>{item.balance ? (
                        formatTokenBalance(ethers.utils.bigNumberify(item.balance), item.decimals)
                      ) : '-'}</p> */}
                    </TokenBalanceBox>
                    <TokenBalanceBox>
                      <h3>{t("Percentage")}</h3>
                      <p>{
                        item.percent ? amountFormatter(item.percent, 16, 2) : (item.symbol === 'FSN' && account ? FSNPER : '-')
                        } %</p>
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
    // if (!account) return
    const myAccount = account ? allBalances[account] : ''
    
    let tokenList = Object.keys(allTokens).map(k => {
      // console.log(k)
      let balance = '-'
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
    // console.log(tokenList)
    let ANYItem = {}
    for (let i = 0,len = tokenList.length; i < len; i++) {
      if (tokenList[i].symbol === 'ANY') {
        ANYItem = tokenList[i]
        tokenList.splice(i, 1)
        break
      }
    }
    tokenList.unshift(ANYItem)
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
                      <TokenTableLogo><TokenLogo address={item.address} size={'1.625rem'} ></TokenLogo></TokenTableLogo>
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
          <h3>{account ? '0.00' : '0.00'} ANY</h3>
          <p>{t('Accumulated')}</p>
          <div className='txt'>
            <img src={GraphUpIcon} />
            <span>{account ? '0.00' : '0.00'}%</span>
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