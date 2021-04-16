import React, { useState, useEffect, useMemo, useCallback } from 'react'
// import ReactGA from 'react-ga'
import { ethers } from 'ethers'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { useWeb3React } from '../../hooks'
import { formatTokenBalance, formatEthBalance, amountFormatter } from '../../utils'
// import { useAddressBalance} from '../../contexts/Balances'
import { useAllTokenDetails} from '../../contexts/Tokens/index.js'
// import { useExchangeContract } from '../../hooks'
import TokenLogo from '../TokenLogo'
import { useAllBalances } from '../../contexts/Balances'
import { BorderlessInput } from '../../theme'

import SearchIcon from '../../assets/images/icon/search.svg'
import { NavLink } from 'react-router-dom'

import { useDarkModeManager } from '../../contexts/LocalStorage'

// import GraphUpIcon from '../../assets/images/icon/graph-up.svg'
// import AnyillustrationIcon from '../../assets/images/icon/any-illustration.svg'

import { ReactComponent as Dropup } from '../../assets/images/dropup-blue.svg'
import { ReactComponent as Dropdown } from '../../assets/images/dropdown-blue.svg'
import NextkIcon from '../../assets/images/icon/Next.svg'
import PreviouskIcon from '../../assets/images/icon/Previous.svg'
import ScheduleIcon from '../../assets/images/icon/schedule.svg'

import {getRewards} from '../../utils/axios'
// import {getDashBoards} from '../../utils/dashboard/index.js'
import {getPoolInfo} from '../../utils/dashboard/getPoolInfo'

import IconLiquidityRewards from '../../assets/images/icn-liquidity-rewards.svg'
import IconLiquidityRewardsBlack from '../../assets/images/icn-liquidity-rewards-black.svg'
import IconSwapRewards from '../../assets/images/icn-swap-rewards.svg'
import IconSwapRewardsBlack from '../../assets/images/icn-swap-rewards-black.svg'
import IconTotalRewards from '../../assets/images/icn-total-rewards.svg'
import IconTotalRewardsBlack from '../../assets/images/icn-total-rewards-black.svg'
import {formatNum, formatDecimal} from '../../utils/tools'
import config from '../../config'
import Title from '../Title'

const MyBalanceBox = styled.div`
  width: 100%;
  
  border-radius: 0.5625rem;
  box-shadow: 0.4375rem 0.125rem 1.625rem 0 rgba(0, 0, 0, 0.06);
  background-color: ${({ theme }) => theme.contentBg};
  padding: 1rem 2.5rem;
  margin-bottom:20px;
  @media screen and (max-width: 960px) {
    padding: 1rem 1rem;
  }
`

const TitleAndSearchBox = styled.div`
  ${({theme}) => theme.FlexBC};
  margin-bottom:1.5625rem;
  font-family: 'Manrope';
  h3 {
    font-size: 1rem;
    font-weight: bold;
    line-height: 1.5;
    color: ${({theme}) => theme.textColorBold};
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
  // background-color: #ffffff;
  background-color: ${({theme}) => theme.searchBg};
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
  font-family: 'Manrope';
  
  font-size: 0.75rem;
  font-weight: normal;
  
  
  line-height: 1.67;
  
  color: ${({theme}) => theme.textColorBold};
  padding-right:0.625rem;

  ::placeholder {
  }
`

const MyBalanceTokenBox  = styled.div`
width:100%;
height: 230px;
overflow-y:hidden;
overflow-x:auto;
&.showMore {
  height:auto;
  overflow:auto;
}
`

const TokenActionBtn  = styled(NavLink)`
${({theme}) => theme.FlexC};
font-family: 'Manrope';
  width: 88px;
  height: 38px;
  
  border-radius: 0.5625rem;
  background: ${({theme}) => theme.selectedBg};
  margin-right: 0.125rem;
  
  font-size: 0.75rem;
  font-weight: 500;
  
  
  line-height: 1;
  
  color: ${({theme}) => theme.textColorBold};
  box-shadow: none;
  padding:0;
  text-decoration: none;
  &:hover,&:focus,&:active {
    background:${({theme}) => theme.selectedBg};
  }
`
const TokenActionBtnSwap = styled(TokenActionBtn)`
margin-right:0.125rem;
`

const MoreBtnBox = styled.div`
${({theme}) => theme.FlexC};
font-family: 'Manrope';
  width: 110px;
  height: 34px;
  
  border-radius: 6px;
  background-color: ${({theme}) => theme.viewMoreBtn};
  
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

const ComineSoon = styled.div`
${({theme}) => theme.FlexC}
width: 118px;
font-family: 'Manrope';
  font-size: 0.75rem;
  color: #96989e;
  height: 30px;
  padding: 0 8px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.CommingSoon};
  white-space: nowrap;
`

const RewardsBox = styled.div`
  width:100%;
  border-radius: 0.5625rem;
  box-shadow: 0.4375rem 0.125rem 1.625rem 0 rgba(0, 0, 0, 0.06);
  background-color: ${({ theme }) => theme.contentBg};
  padding:1rem;
  font-family: 'Manrope';
  margin: 15px 0;
  ${({theme}) => theme.FlexBC}
  li {
    ${({theme}) => theme.FlexBC}
    width: 100%;
    list-style:none;
    padding: 0 15px;

    .left {
      ${({theme}) => theme.FlexSC};
      .icon {
        width: 36px;
        height: 36px;
        img {
          width: 100%;
        }
      }
      .name {
        font-size: 12px;
        line-height: 1.17;
        color: ${({theme}) => theme.textColorBold};
        // word-break: break-all;
        margin:0 0 0 14px;
      }
    }
    .value {
      font-size: 12px;
      font-weight: 800;
      line-height: 1.67;
      text-align: right;
      color: ${({theme}) => theme.textColorBold};
    }
    &:last-child {
      border-bottom:none;
      .left {
        .name {
          color: #734be2;
        }
      }
      .value {
        color: #734be2;
      }
    }
  }
  .tip {
    width: 100%;
    ${({theme}) => theme.FlexC};
    color:#999;
    margin:0;
  }
  @media screen and (max-width: 960px) {
    flex-wrap:wrap;
  }
`

const DBTables = styled.table`
  
  min-width: 100%;
  table-layer:fixed;
  // border-spacing:0px 10px;
`
const DBThead = styled.thead`
  width: 100%;
  border-radius: 0.5625rem;
  box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.04);
  border: solid 1px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  margin-bottom: 0.625rem;
  font-size: 12px;
  tr {
    box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.04);
  }
  @media screen and (max-width: 960px) {
    padding: 1rem 5px;
  }
`
const DBTh = styled.th`
  color: ${({ theme }) => theme.textColorBold};
  background-color: ${({ theme }) => theme.contentBg};
  padding: 12px 8px;
  white-space:nowrap;
  font-size: 0.875rem;
  font-weight: bold;
  line-height: 1.5;
  &.r{
    text-align:right;
  }
  &.l{
    text-align:left;
  }
  &.c{
    text-align:center;
  }
`
const DBTbody = styled.tbody`
  width: 100%;
  border-radius: 0.5625rem;
  border: solid 1px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  margin-bottom: 0.625rem;
  font-size: 12px;
  tr {
    // margin-bottom: 10px;
    box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.04);
  }
  @media screen and (max-width: 960px) {
    padding: 1rem 5px;
  }
`

const DBTd = styled.td`
  background-color: ${({ theme }) => theme.contentBg};
  padding: 12px 8px;
  white-space:nowrap;
  font-size: 0.875rem;
  font-weight: bold;
  line-height: 1.5;
  color: ${({ theme }) => theme.textColorBold};
  &.r{
    text-align:right;
  }
  &.l{
    text-align:left;
  }
  &.c{
    text-align:center;
  }
  p {
    margin:0;
    &.lr {
      ${({theme}) => theme.FlexBC};
    }
    &.textR {
      ${({theme}) => theme.FlexEC};
    }
  }
`

const TokenTableCoinBox  = styled.div`
${({theme}) => theme.FlexSC};
  // border-right: 0.0625rem  solid rgba(0, 0, 0, 0.1);
  padding: 0 0px;
  // min-width: 160px;
  // width:25%;
  @media screen and (max-width: 960px) {
    // min-width: 120px;
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
  padding: 0.3125rem;
  margin-right: 1.25rem;
  @media screen and (max-width: 960px) {
    margin-right: 5px;
    padding: 5px;
  }
`

const TokenNameBox  = styled.div`
font-family: 'Manrope';
  h3 {
    margin:0;
    font-size: 1rem;
    font-weight: 800;
    line-height: 1.25;
    color: ${({ theme }) => theme.textColorBold};
    white-space:nowrap;
  }
  p {
    margin: 0.125rem 0 0;
    font-size: 0.75rem;
    font-weight: normal;
    white-space:nowrap;
    line-height: 1;
    color: ${({ theme }) => theme.textColorBold};
  }
`

const SelectHDPathPage = styled.div`
  ${({ theme }) => theme.FlexBC};
  height: 34px;
  object-fit: contain;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.moreBtn};
  padding: 0 1.25rem;
`
const ArrowBox = styled.div`
${({theme}) => theme.FlexC}
  font-family: 'Manrope';
  font-size: 0.75rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: ${({theme}) => theme.textColorBold};
  cursor:pointer;
`

function isBaseUSD (coin) {
  if (
    (coin === 'aUSDT' && config.symbol === 'FSN') ||
    (coin === 'anyUSDT' && config.symbol === 'FTM') ||
    (coin === 'HUSD' && config.symbol === 'HT') ||
    (coin === 'USDTB' && config.symbol === 'BNB') ||
    (coin === 'USDC' && config.symbol === 'ETH')
  ) {
    return true
  } else if (coin === 'anyUSDT') {
    return true
  }
  return false
}

const pagesize = 18

export default function DashboardDtil () {
  const { account } = useWeb3React()
  // const account = '0x7aA84636251A56502bbb2C2b2671344b9Ff87CFa'
  const allBalances = useAllBalances()
  const allTokens = useAllTokenDetails()
  const { t } = useTranslation()
  const [poolList, setPoolList] = useState([])
  const [poolObj, setPoolObj] = useState({})
  const [baseMarket, setBaseMarket] = useState()
  // const [rewardAPY, setRewardAPY] = useState({})

  const [pagecount, setPagecount] = useState(0)
  const [poolPagecount, setPoolPagecount] = useState(0)

  const [searchBalance, setSearchBalance] =  useState('')
  const [searchPool, setSearchPool] =  useState('')
  const [showMore, setShowMore] =  useState(false)
  const [showMorePool, setShowMorePool] =  useState(false)
  const [accountRewars, setAccountRewars] = useState([])

  const [darkMode] = useDarkModeManager()

  const poolArr = useMemo(() => {
    const arr = []
    for (const obj in allTokens) {
      arr.push({
        token: obj,
        exchangeAddress: allTokens[obj].exchangeAddress,
        ...allTokens[obj]
      })
    }
    return arr
  }, [allTokens])
  const totalCount = poolArr.length

  const poolInfoObj = {}

  function formatData (res) {
    let arr = []
    let baseAccountBalance = ethers.utils.bigNumberify(0)
    // let baseAllBalance = ethers.utils.bigNumberify(0)
    let rwArr = []
    for (let obj of res) {
      obj.pecent = amountFormatter(obj.pecent, 18, Math.min(config.keepDec, obj.decimals))
      obj.balance = amountFormatter(obj.balance, obj.decimals, Math.min(config.keepDec, obj.decimals))
      if (obj.Basebalance) {
        baseAccountBalance = baseAccountBalance.add(obj.Basebalance)
      }
      // if (obj.exchangeETHBalance) {
      //   baseAllBalance = baseAllBalance.add(obj.exchangeETHBalance)
      // }
      if (isBaseUSD(obj.symbol)) {
        setBaseMarket(Number(amountFormatter( obj.market, 18, Math.min(config.keepDec, obj.decimals) )))
      }
      poolInfoObj[obj.symbol] = obj
      arr.push(obj)
      if (obj.exchangeETHBalance && obj.exchangeTokenBalancem && obj.market) {
        rwArr.push({
          coin: obj.symbol,
          market: obj.market ? obj.market.toString() : 0,
          baseAmount: obj.exchangeETHBalance ? obj.exchangeETHBalance.toString() : 0,
          tokenAmount: obj.exchangeTokenBalancem ? obj.exchangeTokenBalancem.toString() : 0
        })
      }
    }
    if (arr[0].symbol === config.symbol) {
      arr[0].Basebalance = baseAccountBalance
      poolInfoObj[config.symbol].Basebalance = baseAccountBalance
    }
    setPoolObj(poolInfoObj)
    return arr
  }

  async function getData (account) {
    let arr = []
    for (let i = 0; i <= parseInt(totalCount / pagesize); i++) {
      // console.log(i)
      const start = i * pagesize
      const end = start + pagesize
      const resArr = poolArr.slice(start, end)

      const result = await getPoolInfo(resArr, account)
      arr.push(...formatData(result))
      setPoolList(arr)
    }
  }

  useEffect(() => {
    if (poolArr.length > 0) {
      if (poolList.length <= 0) {
        setPoolList(poolArr)
      }
      getData(account)
    }
  }, [poolArr, account])

  // function rewardsPencent (coin, isSwitch) {
  //   if (!config.dirSwitchFn(isSwitch)) {
  //     return (
  //       <ComineSoon>
  //         <img alt={''} src={ScheduleIcon} style={{marginRight: '10px'}} />
  //         {t('ComineSoon')}
  //       </ComineSoon>
  //     )
  //   }
  //   if (config.symbol === 'BNB') {
  //     if (rewardAPY[coin]) {
  //       return formatDecimal(rewardAPY[coin].AnnualizedROI, 2) + '%'
  //     } else {
  //       return '-%'
  //     }
  //   } else {
  //     if (rewardAPY[coin]) {
  //       return formatDecimal(rewardAPY[coin].AnnualizedROI, 2) + '%'
  //     } else {
  //       return '-%'
  //     }
  //   }
  // }

  function changePage (callback, pCount, type) {
    
    return (
      <SelectHDPathPage>
        <ArrowBox onClick={() => {
          if (pCount >= 1) {
            callback(pCount - 1)
            if (type === 1) {
              setSearchBalance('')
            } else {
              setSearchPool('')
            }
          }
        }}><img alt={''} src={PreviouskIcon} style={{marginRight: '0.625rem'}}/>Previous</ArrowBox>
        <ArrowBox onClick={() => {
          if (pCount < parseInt(totalCount / pagesize)) {
            callback(pCount + 1)
            if (type === 1) {
              setSearchBalance('')
            } else {
              setSearchPool('')
            }
          }
        }}>Next<img alt={''} src={NextkIcon} style={{marginLeft: '0.625rem'}} /></ArrowBox>
      </SelectHDPathPage>
    )
  }

  function PoolListView () {
    const start = poolPagecount * pagesize
    const end = start + pagesize
    poolList.sort((a, b) => {
      if (a && b && a.exchangeETHBalance && b.exchangeETHBalance && a.exchangeETHBalance.gt(b.exchangeETHBalance)) {
        return -1
      }
    })
    const resArr = searchPool ? poolList : poolList.slice(start, end)
    return (
      <>
        <DBTables>
          <DBThead>
            <tr>
              <DBTh className='c' width='20%'>{t('Pairs')}</DBTh>
              <DBTh className='r' width='20%'>{t('PoolLiquidity')}</DBTh>
              <DBTh className='r' width='20%'>{t('MyLiquidity')}</DBTh>
              <DBTh className='r' width='20%'>{t('MyPecent')}</DBTh>
              {/* <DBTh className='r'>{t('APY')}</DBTh> */}
            </tr>
          </DBThead>
          <DBTbody>
            {
              resArr.length > 0 ? (
                resArr.map((item, index) => {
                  if (
                    (!searchPool
                    || item.symbol.toLowerCase().indexOf(searchPool.toLowerCase()) !== -1
                    || item.name.toLowerCase().indexOf(searchPool.toLowerCase()) !== -1
                    || item.token.toLowerCase().indexOf(searchPool.toLowerCase()) !== -1) && item.symbol !== config.symbol
                  ) {
                    return (
                      <tr key={index}>
                        <DBTd>
                          <TokenTableCoinBox>
                            <TokenTableLogo><TokenLogo address={item.symbol} size={'1.625rem'} ></TokenLogo></TokenTableLogo>
                            <TokenNameBox>
                              <h3 style={{width: '100px', textAlign: 'right'}}>{item.symbol}_{config.symbol}</h3>
                            </TokenNameBox>
                          </TokenTableCoinBox>
                        </DBTd>
                        {
                          config.dirSwitchFn(item.isSwitch) ? (
                            <>
                              <DBTd className='r'>
                                <p className='textR'>
                                  {/* <span>{item.symbol}</span> */}
                                  {item.exchangeTokenBalancem ? formatNum(amountFormatter( item.exchangeTokenBalancem, item.decimals, config.keepDec )) : '0'}
                                </p>
                                <p className='textR'>
                                  {/* <span>{config.symbol}</span> */}
                                  {item.exchangeETHBalance ? formatNum(amountFormatter( item.exchangeETHBalance, 18, config.keepDec )) : '0'}
                                </p>
                              </DBTd>
                              <DBTd className='r'>
                                {
                                  Number(item.balance) && Number(amountFormatter(item.Basebalance, 18, config.keepDec)) ? (
                                    <>
                                      <p>
                                        {item.balance ? formatNum(item.balance, config.keepDec) : ''}
                                      </p>
                                      <p>
                                        {item.Basebalance ? formatNum(amountFormatter(item.Basebalance, 18, config.keepDec), config.keepDec) : ''}
                                      </p>
                                    </>
                                  ) : '0'
                                }
                              </DBTd>
                              <DBTd className='r'>{Number(item.pecent) && config.dirSwitchFn(item.isSwitch) ?
                              (Number(item.pecent) < 0.0001 ? '<0.01' : formatDecimal(Number(item.pecent) * 100, 2) )
                              : '-'} %</DBTd>
                              {/* <DBTd className='r'>
                                {rewardsPencent(item.symbol, item.isSwitch)}
                                
                              </DBTd> */}
                            </>
                          ) : (
                            <DBTd colSpan={3} className='c'>
                              <ComineSoon>
                                <img alt={''} src={ScheduleIcon} style={{marginRight: '10px'}} />
                                {t('ComineSoon')}
                              </ComineSoon>
                            </DBTd>
                          )
                        }
                      </tr>
                    )
                  } else {
                    return <tr key={index} style={{display: 'none'}}></tr>
                  }
                })
              ) : (<tr key={0}>
                <DBTd className='r'>-</DBTd>
                <DBTd className='r'>-</DBTd>
                <DBTd className='r'>-</DBTd>
                <DBTd className='r'>-</DBTd>
                {/* <DBTd className='r'>-%</DBTd> */}
                </tr>)
            }
          </DBTbody>
        </DBTables>
      </>
    )
  }


  useEffect(() => {
    if (account && config.isOpenRewards) {
      setTimeout(() => {
        getRewards(account).then(res => {
          console.log(res)
          let arr = []
          if (res.msg === 'Success') {
            arr = [
              {
                icon: IconSwapRewards,
                iconDark: IconSwapRewardsBlack,
                value: res.latest.vr ? res.latest.vr : 0,
                name: t('swap')
              },
              {
                icon: IconLiquidityRewards,
                iconDark: IconLiquidityRewardsBlack,
                value: res.latest.lr ? res.latest.lr : 0,
                name: t('lr')
              },
              {
                icon: IconTotalRewards,
                iconDark: IconTotalRewardsBlack,
                value: res.totalReward.ar ? res.totalReward.ar : 0,
                name: t('total')
              },
            ]
          } else {
            arr = []
          }
          setAccountRewars(arr)
        })
      }, 1000)
    }
  }, [account])

  // }, [poolTokenBalanceArr])
  function searchBox (type) {
    return (
      <>
        <SearchBox>
          <div className='icon'>
            <img src={SearchIcon} alt={''} />
          </div>
          <SearchInput
            placeholder={t('searchToken')}
            value={type === 1 ? searchBalance : searchPool}
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

  function getPrice (market, coin) {
    if (isBaseUSD(coin)) {
      return '1'
    }
    if (!market) return '-'
    let mt1 = Number(amountFormatter( market, 18 , config.keepDec))
    if (!mt1) return '0'
    return formatNum((baseMarket / mt1), config.keepDec)
  }
  function getMyAccount () {
    // if (!account) return
    const myAccount = account ? allBalances[account] : ''
    // console.log(allBalances)
    // console.log(myAccount)
    
    let tokenList = Object.keys(allTokens).map(k => {
      // console.log(k)
      let balance = '-'
      let price = '-'
      let tvl = 0
      // only update if we have data
      if (k === config.symbol && myAccount && myAccount[k] && myAccount[k].value) {
        balance = formatEthBalance(ethers.utils.bigNumberify(myAccount[k].value))
        // console.log(myAccount[k].value)
        // console.log(k)
        // console.log(balance)
      } else if (myAccount && myAccount[k] && myAccount[k].value) {
        balance = formatTokenBalance(ethers.utils.bigNumberify(myAccount[k].value), allTokens[k].decimals)
      }
      if (poolObj[allTokens[k].symbol] && baseMarket) {
        if (allTokens[k].symbol === config.symbol) {
          price = formatNum(baseMarket, config.keepDec)
        } else {
          price = getPrice(poolObj[allTokens[k].symbol].market, allTokens[k].symbol)
        }
        if (!isNaN(balance) && !isNaN(price)) {
          tvl = Number(balance) * Number(price)
        }
        // console.log(price)
      }
      return {
        name: allTokens[k].name,
        symbol: allTokens[k].symbol,
        address: k,
        balance: balance,
        isSwitch: allTokens[k].isSwitch,
        price: price,
        tvl: tvl
      }
    })
    tokenList.sort((a, b) => {
      if (!isNaN(a.tvl) && !isNaN(b.tvl) && Number(a.tvl) > Number(b.tvl)) {
        return -1
      }
    })
    // console.log(tokenList)
    if (config.isChangeDashboard) {
      let ANYItem = {}
      for (let i = 0,len = tokenList.length; i < len; i++) {
        if (tokenList[i].symbol === 'ANY') {
          ANYItem = tokenList[i]
          tokenList.splice(i, 1)
          break
        }
      }
      tokenList.unshift(ANYItem)
    }
    const start = pagecount * pagesize
    const end = start + pagesize
    // console.log(tokenList)
    const resArr = searchBalance ? tokenList : tokenList.slice(start, end)
    return (
      <DBTables>
        <DBThead>
          <tr>
            <DBTh className='c' width='20%'>{t('Coins')}</DBTh>
            <DBTh className='l' width='10%'>{t('price')}</DBTh>
            <DBTh className='r' width='15%'>{t('balances')}</DBTh>
            <DBTh className='r' width='15%'>{t('lr')}</DBTh>
            <DBTh className='r' width='15%'>{t('TotalBalance')}</DBTh>
            <DBTh className='c'>{t('Action')}</DBTh>
          </tr>
        </DBThead>
        <DBTbody>
          {
            resArr.length > 0 ? resArr.map((item, index) => {
              if (
                !searchBalance
                || item.name.toLowerCase().indexOf(searchBalance.toLowerCase()) !== -1
                || item.symbol.toLowerCase().indexOf(searchBalance.toLowerCase()) !== -1
                || item.address.toLowerCase().indexOf(searchBalance.toLowerCase()) !== -1
              ) {
                return (
                  <tr key={index}>
                    <DBTd>
                      <TokenTableCoinBox>
                        <TokenTableLogo><TokenLogo address={item.symbol} size={'1.625rem'} ></TokenLogo></TokenTableLogo>
                        <TokenNameBox>
                          <h3>{item.symbol}</h3>
                          <p>{item.name}</p>
                        </TokenNameBox>
                      </TokenTableCoinBox>
                    </DBTd>
                    {
                      poolObj[item.symbol] ? (
                        config.dirSwitchFn(poolObj[item.symbol].isSwitch) ? (
                          <>
                            <DBTd className='l'>$ {item.price}</DBTd>
                            <DBTd className='r'>{account ? item.balance : '-'}</DBTd>
                            {
                              item.symbol === config.symbol ? (
                                <>
                                  <DBTd className='r'>
                                    {poolObj[item.symbol] && config.dirSwitchFn(poolObj[item.symbol].isSwitch) ? 
                                      formatNum(amountFormatter(poolObj[item.symbol].Basebalance, 18, config.keepDec)) : '0'
                                    }
                                  </DBTd>
                                  <DBTd className='r'>
                                    {
                                      poolObj[item.symbol]
                                      && config.dirSwitchFn(poolObj[item.symbol].isSwitch)
                                      && item.balance !== '-'
                                      && !isNaN(item.balance)
                                      && poolObj[item.symbol].Basebalance
                                      ? (
                                        !isNaN(amountFormatter(poolObj[item.symbol].Basebalance, 18, config.keepDec)) ? 
                                        formatDecimal(Number(amountFormatter(poolObj[item.symbol].Basebalance, 18, config.keepDec)) + Number(item.balance), config.keepDec)
                                        :
                                        formatDecimal(Number(item.balance), config.keepDec)
                                      ) : '0'}
                                  </DBTd>
                                </>
                              ) : (
                                <>
                                  <DBTd className='r'>{poolObj[item.symbol] && config.dirSwitchFn(poolObj[item.symbol].isSwitch) && poolObj[item.symbol].balance && !isNaN(poolObj[item.symbol].balance) ? formatNum(poolObj[item.symbol].balance) : '0'}</DBTd>
                                  <DBTd className='r'>
                                    {
                                      poolObj[item.symbol]
                                      && config.dirSwitchFn(poolObj[item.symbol].isSwitch)
                                      && item.balance !== '-'
                                      && !isNaN(item.balance)
                                      && !isNaN(poolObj[item.symbol].balance)
                                      ? (
                                        Number(poolObj[item.symbol].balance) + Number(item.balance) === 0 ?
                                        '0'
                                        :
                                        formatDecimal(Number(poolObj[item.symbol].balance) + Number(item.balance), config.keepDec)
                                      ) : '0'}</DBTd>
                                </>
                              )
                            }
                            <DBTd className='c'>
                              <span style={{display:"inline-block"}}><TokenActionBtnSwap to={'/swap?inputCurrency=' + item.address}>{t('swap')}</TokenActionBtnSwap></span>
                            </DBTd>
                          </>
                        ) : (
                          <DBTd colSpan='5' className='c'>
                            <ComineSoon>
                              <img alt={''} src={ScheduleIcon} style={{marginRight: '10px'}} />
                              {t('ComineSoon')}
                            </ComineSoon>
                          </DBTd>
                        )
                      ) : (
                        <>
                          <DBTd className='l'>$-</DBTd>
                          <DBTd className='r'>-</DBTd>
                          <DBTd className='r'>-</DBTd>
                          <DBTd className='r'>-</DBTd>
                          <DBTd className='r'>-</DBTd>
                        </>
                      )
                    }
                  </tr>
                )
              } else {
                return (<tr key={index} style={{display:'none'}}>
                <DBTd className='c'>$-</DBTd>
                <DBTd className='c'>-</DBTd>
                <DBTd className='c'>-</DBTd>
                <DBTd className='c'>-</DBTd>
                <DBTd className='c'>-</DBTd>
                <DBTd className='c'>-</DBTd>
                </tr>)
              }
            }) : (<tr key={0}>
                <DBTd className='c'>$-</DBTd>
                <DBTd className='c'>-</DBTd>
                <DBTd className='c'>-</DBTd>
                <DBTd className='c'>-</DBTd>
                <DBTd className='c'>-</DBTd>
                <DBTd className='c'>-</DBTd></tr>)
          }
        </DBTbody>
      </DBTables>
    )
  }
  return (
    <>
        {/* <div className='bgImg'><img src={AnyillustrationIcon} alt={''} /></div> */}
      
      {/* <EarningsBox>
      </EarningsBox> */}

      <Title title={t('dashboard')}></Title>
      <MyBalanceBox>
        <TitleAndSearchBox>
          <h3>{t('myBalance')}</h3>
          {searchBox(1)}
        </TitleAndSearchBox>
        <MyBalanceTokenBox className={showMore ? 'showMore' : ''}>
          {getMyAccount()}
        </MyBalanceTokenBox>
        {showMore ? changePage(setPagecount, pagecount, 1) : ''}
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
      {accountRewars.length > 0 && config.isOpenRewards ? (
        <RewardsBox>
          {accountRewars.map((item, index)  => {
            return (
              <li key={index}>
                <div className='left'>
                  <div className='icon'>
                    {darkMode ? (
                      <img src={item.iconDark} alt={''} />
                    ) : (
                      <img src={item.icon} alt={''} />
                    )}
                  </div>
                  <div className='name'>
                    {item.name}
                    <br />{t('rewards')}
                  </div>
                </div>
                <div className='value'>
                  {item.value && item.value > 0 ? formatDecimal(item.value, 2) : '0.00'} ANY
                </div>
              </li>
            )
          })}
        </RewardsBox>
      ) : (
        ''
      )}
      <MyBalanceBox>
        <TitleAndSearchBox>
          <h3>{t('ProvidingLiquidity')}</h3>
          {searchBox(2)}
        </TitleAndSearchBox>
        <MyBalanceTokenBox className={showMorePool ? 'showMore' : ''}>
          {PoolListView()}
        </MyBalanceTokenBox>
        {showMorePool ? changePage(setPoolPagecount, poolPagecount) : ''}
        <MoreBtnBox onClick={() => {
          setShowMorePool(!showMorePool)
        }}>
          {
            showMorePool ? (
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
    </>
  )
}