import React, {useCallback, useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ethers } from 'ethers'
import { transparentize } from 'polished'
import { useWeb3React, useSwapTokenContract } from '../../hooks'
// import { useAddressAllowance } from '../../contexts/Allowances'
// import { INITIAL_TOKENS_CONTEXT } from '../../contexts/Tokens/index.js'
import { useTransactionAdder } from '../../contexts/Transactions'
import { useWalletModalToggle } from '../../contexts/Application'
import { useDarkModeManager } from '../../contexts/LocalStorage'

import { Button } from '../../theme'

import STAKE_ABI from '../../constants/abis/Stake.json'
import ERC20_ABI from '../../constants/abis/erc20'

import Title from '../../components/Title'
import Modal from '../../components/Modal'
import ModalContent from '../../components/Modal/ModalContent'
import HardwareTip from '../../components/HardwareTip'

import { amountFormatter } from '../../utils'
import {getWeb3BaseInfo} from '../../utils/web3/txns'
import config from '../../config'
import {chainInfo} from '../../config/coinbase/nodeConfig'
import {thousandBit, formatNum} from '../../utils/tools'

import {getSupply} from '../../utils/staking'
import TokenLogo from '../../components/TokenLogo'

const StakingBox = styled.div`
  width:100%;
`

const TokenLogo1 = styled(TokenLogo)`
background:none;
`

const StakingList = styled.ul`
  ${({ theme }) => theme.FlexC};
  list-style:none;
  padding:0!important;

  .item {
    ${({ theme }) => theme.FlexC};
    flex-wrap:wrap;
    width:100%;
    max-width: 320px;
    background: ${({ theme }) => theme.contentBg};
    box-shadow: 0.4375rem 0.125rem 1.625rem 0 rgba(0, 0, 0, 0.06);
    margin: 15px 15px 20px;
    padding: 25px 15px 40px;
    border-radius: 10px;

    .pic {
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
    .btn {
      ${({ theme }) => theme.FlexC};
      width:100%;
    }
  }
  .green {
    color: #2ead65;
  }
  @media screen and (max-width: 960px) {
    flex-wrap:wrap;
  }
`

const StakingLi = styled.li`
  width: 320px;
  ${({ theme }) => theme.FlexSC};
  // flex-wrap:wrap;
  background: ${({ theme }) => theme.contentBg};
  box-shadow: 0.4375rem 0.125rem 1.625rem 0 rgba(0, 0, 0, 0.06);
  margin: 20px 15px 0;
  padding: 25px 15px 25px;
  border-radius: 10px;
  .title {
    width:100%;
    margin:0;
    font-size:14px;
    color: ${({ theme }) => theme.textColorBold};
  }
  .num {
    width:100%;
    margin:10px 0 0;
    font-size:16px;
    color: ${({ theme }) => theme.textColorBold};
  }
  .content {
    width:100%;
    margin-left:15px;
  }
`

const InputRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: 0 25px;
  width:100%;
`
const Input = styled.input`
  outline: none;
  border: none;
  flex: 1 1 auto;
  width: 0;
  background-color: transparent;
  border-bottom: 0.0625rem solid ${({theme}) => theme.inputBorder};

  color: ${({ error, theme }) => (error ? theme.salmonRed : theme.textColorBold)};
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'Manrope';
  font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: -0.0625rem;
  padding: 8px 0.75rem;
  ::placeholder {
    color: ${({ theme }) => theme.placeholderGray};
  }
`
const MaxBox = styled.div`
  ${({ theme }) => theme.FlexC};
  width:60px;
  height:50px;
  margin-left:15px;
  border-radius:10px;
  cursor:pointer;
  background:${({ theme }) => theme.tipBg};
`

const StakingModalBox = styled.div`
  ${({ theme }) => theme.FlexC}
  width:100%;
  padding: 25px 15px 30px;
  flex-wrap:wrap;
`

const AddBox = styled(Button)`
  ${({ theme }) => theme.FlexC};
  width: 45px;
  min-width: 45px;
  height:45px;
  border: solid 0.5px ${({ theme }) => theme.tipBorder};
  box-shadow: 0 0.25rem 8px 0 ${({ theme }) => transparentize(0.95, theme.shadowColor)};
  background: ${({theme}) => theme.tipBg};
  border-radius: 9px;
  margin-left:15px;
  cursor:pointer;
  padding:0;
  &:hover, &:focus{
    border: solid 0.5px ${({ theme }) => theme.tipBorder};
    box-shadow: 0 0.25rem 8px 0 ${({ theme }) => transparentize(0.95, theme.shadowColor)};
    background: ${({theme}) => theme.tipBg};
  }
`

const AmountView = styled.div`
  width:100%;
  padding:10px 25px;
  font-size:14px;
  color:${({ theme }) => theme.textColor};
  margin-bottom:20px;
`
const Flex = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;

  button {
    max-width: 20rem;
  }
`

function formatCellData(str, len, start) {
  start = start ? start : 0
  let str1 = str.substr(start, len)
  str1 = str1.indexOf('0x') === 0 ? str1 : '0x' + str1
  return ethers.utils.bigNumberify(str1)
}

const Web3Fn = require('web3')
// const CHAINID = '46688'
// const useChain = chainInfo[CHAINID]
// const web3Fn = new Web3Fn(new Web3Fn.providers.HttpProvider(useChain.rpc))


export default function Staking () {
  const { account, library, chainId } = useWeb3React()
  const { t } = useTranslation()
  const [isDark] = useDarkModeManager()
  const addTransaction = useTransactionAdder()
  const toggleWalletModal = useWalletModalToggle()
  const walletType = sessionStorage.getItem('walletType')

  let CHAINID = '46688'
  let useChain = chainInfo[CHAINID]
  let web3Fn = new Web3Fn(new Web3Fn.providers.HttpProvider(useChain.rpc))
  let ANY_TOKEN = '0xc20b5e92e1ce63af6fe537491f75c19016ea5fb4'
  let STAKE_TOKEN = '0xeb96e36e8269a0f0d53833bab9683f1b4e1107a8'
  if (config.env === 'main') {
    CHAINID = '32659'
    useChain = chainInfo[CHAINID]
    web3Fn = new Web3Fn(new Web3Fn.providers.HttpProvider(useChain.rpc))
    ANY_TOKEN = '0x0c74199d22f732039e843366a236ff4f61986b32'
    // STAKE_TOKEN = '0xa5a3c93776ba2e1a78c79e88a2cb5abab2a0097f'
    STAKE_TOKEN = '0x2e1f1c7620eecc7b7c571dff36e43ac7ed276779'
  }
  

  const web3Contract = new web3Fn.eth.Contract(STAKE_ABI, STAKE_TOKEN)
  const web3ErcContract = new web3Fn.eth.Contract(ERC20_ABI, ANY_TOKEN)
  const MMContract = useSwapTokenContract(STAKE_TOKEN, STAKE_ABI)
  const MMErcContract = useSwapTokenContract(ANY_TOKEN, ERC20_ABI)

  const [pendingReward, setPendingReward] = useState(0)
  const [approveAmount, setApproveAmount] = useState()
  const [balance, setBalance] = useState()
  const [stakingType, setStakingType] = useState()
  const [stakingModal, setStakingModal] = useState(false)
  const [stakeDisabled, setStakeDisabled] = useState(true)

  const [stakeAmount, setStakeAmount] = useState()
  const [userInfo, setUserInfo] = useState()
  const [unlocking, setUnlocking] = useState(false)
  const [isHardwareTip, setIsHardwareTip] = useState(false)
  const [hardwareTxnsInfo, setHardwareTxnsInfo] = useState('')

  const [HarvestDisabled, setHarvestDisabled] = useState(true)
  const [DepositDisabled, setDepositDisabled] = useState(true)
  const [WithdrawDisabled, setWithdrawDisabled] = useState(true)

  const [StakePool, setStakePool] = useState()
  const [BlockReward, setBlockReward] = useState()
  const [StakingAPY, setStakingAPY] = useState()
  const [CirculatingSupply, setCirculatingSupply] = useState()

  const [BtnDelayDisabled, setBtnDelayDisabled] = useState(0)

  useEffect(() => {
    if (approveAmount && Number(approveAmount) && account && Number(CHAINID) === Number(chainId)) {
      if (pendingReward && Number(pendingReward) > 0 && BtnDelayDisabled !== 2) {
        setHarvestDisabled(false)
      } else {
        setHarvestDisabled(true)
      }

      if (balance && Number(balance) > 0 && BtnDelayDisabled !== 1) {
        setDepositDisabled(false)
      } else {
        setDepositDisabled(true)
      }
      
      if (userInfo && Number(userInfo) > 0 && BtnDelayDisabled !== 2) {
        setWithdrawDisabled(false)
      } else {
        setWithdrawDisabled(true)
      }
    } else {
      setHarvestDisabled(true)
      setDepositDisabled(true)
      setWithdrawDisabled(true)
    }
  }, [approveAmount, pendingReward, balance, userInfo, account, BtnDelayDisabled])


  const getBaseInfo = useCallback(() => {
    const batch = new web3Fn.BatchRequest()
    if (account && Number(CHAINID) === Number(chainId)) {
      const prData = web3Contract.methods.pendingReward(account).encodeABI()
      batch.add(web3Fn.eth.call.request({data: prData, to: STAKE_TOKEN}, 'latest', (err, reward) => {
        if (!err) {
          console.log('reward')
          console.log(formatCellData(reward, 66).toString())
          setPendingReward(formatCellData(reward, 66))
        }
      }))

      const blData = web3ErcContract.methods.balanceOf(account).encodeABI()
      batch.add(web3Fn.eth.call.request({data: blData, to: ANY_TOKEN}, 'latest', (err, balance) => {
        if (!err) {
          setBalance(formatCellData(balance, 66))
        }
      }))

      const alData = web3ErcContract.methods.allowance(account, STAKE_TOKEN).encodeABI()
      batch.add(web3Fn.eth.call.request({data: alData, to: ANY_TOKEN}, 'latest', (err, allowance) => {
        if (!err) {
          setApproveAmount(formatCellData(allowance, 66))
          if (Number(formatCellData(allowance, 66).toString()) > 0) {
            setUnlocking(false)
          }
        }
      }))

      const uiData = web3Contract.methods.userInfo(account).encodeABI()
      batch.add(web3Fn.eth.call.request({data: uiData, to: STAKE_TOKEN}, 'latest', (err, userInfo) => {
        if (!err) {
          setUserInfo(formatCellData(userInfo, 66))
        }
      }))
    }

    const tsData = web3ErcContract.methods.balanceOf(STAKE_TOKEN).encodeABI()
    batch.add(web3Fn.eth.call.request({data: tsData, to: ANY_TOKEN}, 'latest', (err, res) => {
      if (!err && res) {
        setStakePool(ethers.utils.bigNumberify(res))
      }
    }))

    const rpbData = web3Contract.methods.rewardPerBlock().encodeABI()
    batch.add(web3Fn.eth.call.request({data: rpbData, to: STAKE_TOKEN}, 'latest', (err, res) => {
      if (!err && res) {
        // console.log(ethers.utils.bigNumberify(res).toString())
        setBlockReward(ethers.utils.bigNumberify(res))
      }
    }))
    batch.execute()
    
    getSupply().then(res => {
      // console.log(res)
      if (res.CirculatingSupply) {
        setCirculatingSupply(res.CirculatingSupply)
      }
    })
  }, [account])

  useEffect(() => {
    if (StakePool && StakePool.gt(ethers.constants.Zero) && BlockReward && BlockReward.gt(ethers.constants.Zero)) {
      let apy = BlockReward.mul(6600 * 365 * 10000).div(StakePool)
      setStakingAPY(apy)
    }
  }, [BlockReward, StakePool])
  

  useEffect(() => {
    getBaseInfo()
    library.on('block', getBaseInfo)

    return () => {
      library.removeListener('block', getBaseInfo)
    }
  }, [getBaseInfo, library])

  useEffect(() => {
    let status = true
    if (stakeAmount && !isNaN(stakeAmount) && Number(stakeAmount) > 0 && !BtnDelayDisabled) {
      let amount = ethers.utils.parseUnits(stakeAmount.toString(), 18)
      if (stakingType === 'deposit') {
        if (!balance || balance.lt(amount) || balance.lte(ethers.constants.Zero)) {
          status = true
        } else {
          status = false
        }
      } else {
        if (!userInfo || userInfo.lt(amount) || userInfo.lte(ethers.constants.Zero)) {
          status = true
        } else {
          status = false
        }
      }
    } else {
      if (Number(stakeAmount) !== 0) {
        setStakeAmount('')
      }
    }
    
    setStakeDisabled(status)
  }, [stakingType, pendingReward, balance, stakeAmount, BtnDelayDisabled])

  function backInit () {
    setStakingModal(false)
    setIsHardwareTip(false)
    setStakeAmount('')
    setStakingType('')
  }

  function deposit () {
    if (isNaN(stakeAmount)) {
      setStakeAmount('')
      alert('Param is error!')
      return
    } else if (Number(stakeAmount) <= 0) {
      setStakeAmount('')
      alert('Amount must be greater than 0!')
      return
    }
    setBtnDelayDisabled(1)
    setTimeout(() => {
      setBtnDelayDisabled(0)
    }, 3000)
    let amount = ethers.utils.parseUnits(stakeAmount.toString(), 18)
    amount = amount.toString()
    console.log(amount.toString())
    if (config.supportWallet.includes(walletType)) {
      setIsHardwareTip(true)
      setHardwareTxnsInfo('Deposit ' + stakeAmount + ' ANY')
      const data = web3Contract.methods.deposit(amount).encodeABI()
      getWeb3BaseInfo(STAKE_TOKEN, data, account).then(res => {
        if (res.msg === 'Success') {
          console.log(res.info)
          addTransaction(res.info)
        } else {
          alert(res.error)
        }
        backInit()
      })
      return
    }
    MMContract.deposit(amount).then(res => {
      console.log(res)
      addTransaction(res)
      backInit()
    }).catch(err => {
      console.log(err)
      backInit()
    })
  }

  function withdraw (amount) {
    if (isNaN(stakeAmount) && !amount) {
      setStakeAmount('')
      alert('Param is error!')
      return
    } else if (Number(stakeAmount) <= 0 && amount) {
      setStakeAmount('')
      alert('Amount must be greater than 0!')
      return
    }
    setBtnDelayDisabled(2)
    setTimeout(() => {
      setBtnDelayDisabled(0)
    }, 3000)
    amount = amount || amount === 0 ? amount : ethers.utils.parseUnits(stakeAmount.toString(), 18)
    console.log(amount.toString())
    if (config.supportWallet.includes(walletType)) {
      setIsHardwareTip(true)
      setHardwareTxnsInfo('Withdraw ' + stakeAmount + ' ANY')
      const data = web3Contract.methods.withdraw(amount).encodeABI()
      getWeb3BaseInfo(STAKE_TOKEN, data, account).then(res => {
        if (res.msg === 'Success') {
          console.log(res.info)
          addTransaction(res.info)
        } else {
          alert(res.error)
        }
        backInit()
      })
      return
    }
    MMContract.withdraw(amount).then(res => {
      console.log(res)
      addTransaction(res)
      backInit()
    }).catch(err => {
      console.log(err)
      backInit()
    })
  }

  function approve () {
    let _userTokenBalance = ethers.constants.MaxUint256.toString()
    if (config.supportWallet.includes(walletType)) {
      setIsHardwareTip(true)
      setHardwareTxnsInfo('Approve ANY Token')
      const data = web3ErcContract.methods.approve(STAKE_TOKEN, _userTokenBalance).encodeABI()
      getWeb3BaseInfo(ANY_TOKEN, data, account).then(res => {
        if (res.msg === 'Success') {
          console.log(res.info)
          addTransaction(res.info)
          setUnlocking(true)
        } else {
          alert(res.error)
        }
        backInit()
      })
      return
    }
    MMErcContract.approve(STAKE_TOKEN, _userTokenBalance).then(res => {
      console.log(res)
      addTransaction(res)
      setUnlocking(true)
      backInit()
    }).catch(err => {
      console.log(err)
      backInit()
    })
  }

  function onMax () {
    let amount = ''
    if (stakingType === 'deposit') {
      let bl = ethers.utils.bigNumberify(balance)
      amount = amountFormatter(bl, 18, 18)
    } else {
      let bl = ethers.utils.bigNumberify(userInfo)
      amount = amountFormatter(bl, 18, 18)
    }
    setStakeAmount(amount)
  }

  function stakingView () {
    let btnView = ''
    if (Number(CHAINID) !== Number(chainId)) {
      btnView = <Button onClick={() => {
        localStorage.setItem(config.ENV_NODE_CONFIG, useChain.label)
        history.go(0)
      }}  style={{height: '45px', maxWidth: '200px'}}>
        {t('SwitchTo')} Fusion {t('mainnet')}
      </Button>
    } else if (!account) {
      btnView = <Button onClick={toggleWalletModal}  style={{height: '45px',maxWidth: '200px'}}>
        {t('connectToWallet')}
      </Button>
    } else if (approveAmount && Number(approveAmount)) {
      btnView = <>
        <Button style={{height: '45px', maxWidth: '200px'}} disabled={WithdrawDisabled} onClick={() => {
          setStakingType('Unstake')
          setStakingModal(true)
        }}>{t('Unstake')}</Button>
        <AddBox disabled={DepositDisabled} onClick={() => {
          setStakingType('deposit')
          setStakingModal(true)
        }}>
          {
            isDark ? (
              <img src={require('../../assets/images/icon/add-fff.svg')} alt='' />
            ) : (
              <img src={require('../../assets/images/icon/add.svg')} alt='' />
            )
          }
        </AddBox>
      </>
    } else {
      btnView = <Button style={{height: '45px', maxWidth: '200px'}} disabled={unlocking} onClick={() => {
        approve()
      }}>{unlocking ? t('pending') : t('unlock')}</Button>
    }
    return (
      <>
        <StakingBox>
          <StakingList>
            <li className='item'>
              <div className='pic'><img src={require('../../assets/images/coin/ANY.svg')} /></div>
              <div className='info'>
                <h3>{pendingReward && Number(pendingReward.toString()) > 0 ? amountFormatter(pendingReward, 18, config.keepDec) : '0.00'}</h3>
                <p>
                  ANY {t('Earned')}<span className='green' style={{marginLeft:'2px'}}>(APY:{StakingAPY ? (Number(StakingAPY) / 100).toFixed(2) : '0.00'}%)</span>
                </p>
              </div>
              <div className='btn'><Button style={{height: '45px', maxWidth: '200px'}} disabled={HarvestDisabled} onClick={() => {
                withdraw(0)
              }}>{t('Harvest')}</Button></div>
            </li>
            <li className='item'>
              <div className='pic'><img src={require('../../assets/images/coin/ANY.svg')} /></div>
              <div className='info'>
                <h3>{userInfo && Number(userInfo.toString()) > 0 ? formatNum(amountFormatter(userInfo, 18, config.keepDec)) : '0.00'}</h3>
                <p>ANY Tokens {t('Staked')}</p>
              </div>
              <div className='btn'>
                {btnView}
              </div>
            </li>
          </StakingList>
        </StakingBox>
      </>
    )
  }

  let amountView = ''
  if (stakingType === 'deposit') {
    amountView = balance ? amountFormatter(ethers.utils.bigNumberify(balance), 18, config.keepDec) : '0.00'
  } else {
    amountView = userInfo ? amountFormatter(ethers.utils.bigNumberify(userInfo), 18, config.keepDec) : '0.00'
  }

  // function test (amount) {
  //   if (config.supportWallet.includes(walletType)) {
  //     setIsHardwareTip(true)
  //     const data = web3Contract.methods.emergencyWithdraw().encodeABI()
  //     getWeb3BaseInfo(STAKE_TOKEN, data, account).then(res => {
  //       if (res.msg === 'Success') {
  //         console.log(res.info)
  //         addTransaction(res.info)
  //       } else {
  //         alert(res.error)
  //       }
  //       backInit()
  //     })
  //     return
  //   }
  //   MMContract.emergencyWithdraw().then(res => {
  //     console.log(res)
  //     addTransaction(res)
  //     backInit()
  //   }).catch(err => {
  //     console.log(err)
  //     backInit()
  //   })
  // }
  return (
    <>
      <HardwareTip
        HardwareTipOpen={isHardwareTip}
        closeHardwareTip={() => {
          setIsHardwareTip(false)
        }}
        txnsInfo={hardwareTxnsInfo}
        title={t(stakingType ? stakingType : 'deposit')}
      >
      </HardwareTip>
      <Modal
        style={{ userSelect: 'none' }}
        isOpen={stakingModal}
        onDismiss={() => {
          setStakingModal(!stakingModal)
        }}
        minHeight={null}
        maxHeight={90}
      >
        <ModalContent
          title={t(stakingType ? stakingType : 'deposit')}
          onClose={setStakingModal}
        >
          <StakingModalBox>
            <InputRow>
              <Input type="text"  placeholder="" value={stakeAmount} onChange={e => {
                setStakeAmount(e.target.value)
              }}/>
              <MaxBox onClick={() => {onMax()}}>Max</MaxBox>
            </InputRow>
            <AmountView>
              {amountView} ANY
            </AmountView>
            <Button style={{height: '45px',width: '150px'}} disabled={stakeDisabled} onClick={() => {
              if (stakingType === 'deposit') {
                deposit()
              } else {
                withdraw()
              }
            }}>{t(stakingType)}</Button>
          </StakingModalBox>
        </ModalContent>
      </Modal>

      <Title title={t('staking')}></Title>
      {/* <Flex>
        <Button onClick={() => {test()}} style={{height: '45px',width: '240px'}}>Withdraw All</Button>
      </Flex> */}
      <StakingBox>
        <StakingList>
          <StakingLi>
            <TokenLogo1 address='ANY' size='48px'></TokenLogo1>
            <div className='content'>
              <h2 className='title'>{t('TotalStaking')}</h2>
              <h3 className='num'>{StakePool ? thousandBit(amountFormatter(StakePool), 2) : '0.00'}</h3>
            </div>
          </StakingLi>
          <StakingLi>
            {/* <h2 className='title'>Total ANY Supply</h2> */}
            <div className='content'>
              <h2 className='title'>{t('CirculatingSupply')}</h2>
              <h3 className='num'>{CirculatingSupply ? thousandBit(CirculatingSupply, 2) : '0.00'}</h3>
            </div>
          </StakingLi>
        </StakingList>
      </StakingBox>
      {/* {Number(CHAINID) !== Number(chainId) || !account ? connectWallet() : ''} */}
      {stakingView()}
    </>
  )
}