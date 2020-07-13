import React, { useState, useReducer, useEffect, useCallback  } from 'react'
// import ReactGA from 'react-ga'
import { ethers } from 'ethers'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { useWeb3React } from '../../hooks'
import { brokenTokens } from '../../constants'
import { isAddress, calculateGasMargin, formatToUsd, formatTokenBalance, formatEthBalance, amountFormatter } from '../../utils'
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
    margin-left:5px;
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
  const { account, chainId, library } = useWeb3React()
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
  const poolTokenBalanceFSN = useAddressBalance(account, 'FSN')

  // const poolTokenBalanceBTC = useAddressBalance(account, allTokens['0xeaeaeb2cf9921a084ef528f43e9e121e8291a947'].exchangeAddress)
  // const exchangeETHBalanceBTC = useAddressBalance(allTokens['0xeaeaeb2cf9921a084ef528f43e9e121e8291a947'].exchangeAddress, 'FSN')
  // const exchangeTokenBalanceBTC = useAddressBalance(allTokens['0xeaeaeb2cf9921a084ef528f43e9e121e8291a947'].exchangeAddress, '0xeaeaeb2cf9921a084ef528f43e9e121e8291a947')
  // const exchangeContractBTC = useExchangeContract(allTokens['0xeaeaeb2cf9921a084ef528f43e9e121e8291a947'].exchangeAddress)


  /**
   * BTC start
   *  */
  const BTCToken = '0xeaeaeb2cf9921a084ef528f43e9e121e8291a947'
  const poolTokenBalanceBTC = useAddressBalance(account, allTokens[BTCToken].exchangeAddress)
  const exchangeETHBalanceBTC = useAddressBalance(allTokens[BTCToken].exchangeAddress, 'FSN')
  const exchangeTokenBalanceBTC = useAddressBalance(allTokens[BTCToken].exchangeAddress, BTCToken)
  const exchangeContractBTC = useExchangeContract(allTokens[BTCToken].exchangeAddress)
  const decimalsBTC = allTokens[BTCToken].decimals
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
  const ANYToken = '0xC20b5E92E1ce63Af6FE537491f75C19016ea5fb4'
  const poolTokenBalanceANY = useAddressBalance(account, allTokens[ANYToken].exchangeAddress)
  const exchangeETHBalanceANY = useAddressBalance(allTokens[ANYToken].exchangeAddress, 'FSN')
  const exchangeTokenBalanceANY = useAddressBalance(allTokens[ANYToken].exchangeAddress, ANYToken)
  const exchangeContractANY = useExchangeContract(allTokens[ANYToken].exchangeAddress)
  const decimalsANY = allTokens[ANYToken].decimals
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
  const ETHToken = '0xeCd0fad9381b19feB74428Ab6a732BAA293CdC88'
  const poolTokenBalanceETH = useAddressBalance(account, allTokens[ETHToken].exchangeAddress)
  const exchangeETHBalanceETH = useAddressBalance(allTokens[ETHToken].exchangeAddress, 'FSN')
  const exchangeTokenBalanceETH = useAddressBalance(allTokens[ETHToken].exchangeAddress, ETHToken)
  const exchangeContractETH = useExchangeContract(allTokens[ETHToken].exchangeAddress)
  const decimalsETH = allTokens[ETHToken].decimals
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
  const USDTToken = '0x19543338473caaa6f404dbe540bb787f389d5462'
  const poolTokenBalanceUSDT = useAddressBalance(account, allTokens[USDTToken].exchangeAddress)
  const exchangeETHBalanceUSDT = useAddressBalance(allTokens[USDTToken].exchangeAddress, 'FSN')
  const exchangeTokenBalanceUSDT = useAddressBalance(allTokens[USDTToken].exchangeAddress, USDTToken)
  const exchangeContractUSDT = useExchangeContract(allTokens[USDTToken].exchangeAddress)
  const decimalsUSDT = allTokens[USDTToken].decimals
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



  // const poolTokenBalanceETH = useAddressBalance(account, allTokens['0xeCd0fad9381b19feB74428Ab6a732BAA293CdC88'].exchangeAddress)
  // const exchangeETHBalanceETH = useAddressBalance(allTokens['0xeCd0fad9381b19feB74428Ab6a732BAA293CdC88'].exchangeAddress, 'FSN')
  // const exchangeTokenBalanceETH = useAddressBalance(allTokens['0xeCd0fad9381b19feB74428Ab6a732BAA293CdC88'].exchangeAddress, '0xeCd0fad9381b19feB74428Ab6a732BAA293CdC88')
  // const exchangeContractETH = useExchangeContract(allTokens['0xeCd0fad9381b19feB74428Ab6a732BAA293CdC88'].exchangeAddress)
  
  // const poolTokenBalanceUSDT = useAddressBalance(account, allTokens['0x19543338473caaa6f404dbe540bb787f389d5462'].exchangeAddress)
  // const exchangeETHBalanceUSDT = useAddressBalance(allTokens['0x19543338473caaa6f404dbe540bb787f389d5462'].exchangeAddress, 'FSN')
  // const exchangeTokenBalanceUSDT = useAddressBalance(allTokens['0x19543338473caaa6f404dbe540bb787f389d5462'].exchangeAddress, '0x19543338473caaa6f404dbe540bb787f389d5462')
  // const exchangeContractUSDT = useExchangeContract(allTokens['0x19543338473caaa6f404dbe540bb787f389d5462'].exchangeAddress)

  // const [totalPoolTokens, setTotalPoolTokens] = useState()
  // const fetchPoolTokens = useCallback(() => {
  //   if (exchangeContract) {
  //     exchangeContract.totalSupply().then(totalSupply => {
  //       setTotalPoolTokens(totalSupply)
  //     })
  //   }
  // }, [exchangeContract])
  // useEffect(() => {
  //   fetchPoolTokens()
  //   library.on('block', fetchPoolTokens)

  //   return () => {
  //     library.removeListener('block', fetchPoolTokens)
  //   }
  // }, [fetchPoolTokens, library])

  // const poolTokenPercentageFSN =
  //   poolTokenBalanceFSN && totalPoolTokens && !totalPoolTokens.isZero()
  //     ? poolTokenBalanceFSN.mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18))).div(totalPoolTokens)
  //     : undefined
  // const poolTokenPercentageBTC =
  //   poolTokenBalanceBTC && totalPoolTokens && !totalPoolTokens.isZero()
  //     ? poolTokenBalanceBTC.mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18))).div(totalPoolTokens)
  //     : undefined
  // const poolTokenPercentageANY =
  //   poolTokenBalanceANY && totalPoolTokensANY && !totalPoolTokensANY.isZero()
  //       ? poolTokenBalanceANY.mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18))).div(totalPoolTokensANY)
  //       : undefined
  // const poolTokenPercentageETH =
  //   poolTokenBalanceETH && totalPoolTokens && !totalPoolTokens.isZero()
  //       ? poolTokenBalanceETH.mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18))).div(totalPoolTokens)
  //       : undefined
  // const poolTokenPercentageUSDT =
  //   poolTokenBalanceUSDT && totalPoolTokens && !totalPoolTokens.isZero()
  //       ? poolTokenBalanceUSDT.mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18))).div(totalPoolTokens)
  //       : undefined

  // const ethShareBTC =
  //   exchangeETHBalanceBTC && poolTokenPercentageBTC
  //     ? exchangeETHBalanceBTC
  //         .mul(poolTokenPercentageBTC)
  //         .div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
  //     : undefined
  // const tokenShareBTC =
  //   exchangeTokenBalanceBTC && poolTokenPercentageBTC
  //     ? exchangeTokenBalanceBTC
  //         .mul(poolTokenPercentageBTC)
  //         .div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
  //     : undefined

  // const ethShareANY =
  //   exchangeETHBalanceANY && poolTokenPercentageANY
  //     ? exchangeETHBalanceANY
  //         .mul(poolTokenPercentageANY)
  //         .div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
  //     : undefined
  // const tokenShareANY =
  //   exchangeTokenBalanceANY && poolTokenPercentageANY
  //     ? exchangeTokenBalanceANY
  //         .mul(poolTokenPercentageANY)
  //         .div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
  //     : undefined
  // if (ethShareANY && tokenShareANY) {
  //   console.log(ethShareANY.toString())
  //   console.log(amountFormatter(ethShareANY, 18, 4))
  //   console.log(tokenShareANY.toString())
  //   console.log(amountFormatter(
  //     tokenShareANY,
  //     decimalsANY,
  //     Math.min(4, decimalsANY)
  //   ))
  // }
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
                      <TokenTableLogo><TokenLogo address={item.address} size={'26px'} ></TokenLogo></TokenTableLogo>
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
          <h3>{account ? '2,245.05' : '0.00'} ANY</h3>
          <p>{t('Accumulated')}</p>
          <div className='txt'>
            <img src={GraphUpIcon} />
            <span>{account ? '+12' : '0.00'}%</span>
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