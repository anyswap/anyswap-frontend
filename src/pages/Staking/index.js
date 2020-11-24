import React, {useCallback, useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ethers } from 'ethers'
import { useWeb3React, useSwapTokenContract } from '../../hooks'
// import { useAddressAllowance } from '../../contexts/Allowances'
import { INITIAL_TOKENS_CONTEXT } from '../../contexts/Tokens/index.js'
import { useTransactionAdder } from '../../contexts/Transactions'
import { useWalletModalToggle } from '../../contexts/Application'

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

const StakingBox = styled.div`
  width:100%;
`

const StakingList = styled.ul`
  ${({ theme }) => theme.FlexC};
  list-style:none;

  .item {
    ${({ theme }) => theme.FlexC};
    flex-wrap:wrap;
    width:100%;
    max-width: 280px;
    background: ${({ theme }) => theme.contentBg};
    box-shadow: 0.4375rem 0.125rem 1.625rem 0 rgba(0, 0, 0, 0.06);
    margin: 20px 15px;
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
`
const InputRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: 0 25px;
  width:100%;
  margin-bottom:20px;
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

const LogoBox = styled.div`
  width:100%;
  text-align:center;
  .logo {
    width:120px;
    height:100%;
    display:inline-block;
    img {
      display:block;
      width:100%;
    }
  }
  .title {
    width:100%;
    text-align:center;
    margin:20px 0 0;
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
`

const ConnectWalletBox = styled.div`
  ${({ theme }) => theme.FlexC};
  width:100%;
  min-height: 300px;
`

function formatCellData(str, len) {
  let str1 = str.substr(0, len)
  return ethers.utils.bigNumberify(str1)
}

const Web3Fn = require('web3')
const CHAINID = '46688'
const useChain = chainInfo[CHAINID]
const web3Fn = new Web3Fn(new Web3Fn.providers.HttpProvider(useChain.rpc))


export default function Staking () {
  const { account, library, chainId } = useWeb3React()
  const { t } = useTranslation()
  const addTransaction = useTransactionAdder()
  const toggleWalletModal = useWalletModalToggle()
  let walletType = sessionStorage.getItem('walletType')
  // const ANY_TOKEN = '0x0c74199d22f732039e843366a236ff4f61986b32'
  const ANY_TOKEN = '0xc20b5e92e1ce63af6fe537491f75c19016ea5fb4'
  // const ANY_EXCHANGE = CUR_TOKEN[ANY_TOKEN].exchangeAddress
  const STAKE_TOKEN = '0xa205ecb41df3eee2f33a058d4460f9b07c2c5aad'

  // const anyAllowance = useAddressAllowance(account, ANY_TOKEN, ANY_EXCHANGE)
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

  const getBaseInfo = useCallback(() => {
    if (account) {
      const batch = new web3Fn.BatchRequest()

      const prData = web3Contract.methods.pendingReward(account).encodeABI()
      batch.add(web3Fn.eth.call.request({data: prData, to: STAKE_TOKEN}, 'latest', (err, reward) => {
        if (!err) {
          // console.log('reward')
          // console.log(formatCellData(reward, 66).toString())
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
          // console.log('allowance')
          // console.log(formatCellData(allowance, 66).toString())
          setApproveAmount(formatCellData(allowance, 66))
          if (Number(formatCellData(allowance, 66).toString()) > 0) {
            setUnlocking(false)
          }
        }
      }))

      const uiData = web3Contract.methods.userInfo(account).encodeABI()
      batch.add(web3Fn.eth.call.request({data: uiData, to: STAKE_TOKEN}, 'latest', (err, userInfo) => {
        if (!err) {
          // console.log('userInfo')
          // console.log(formatCellData(userInfo, 66).toString())
          setUserInfo(formatCellData(userInfo, 66))
        }
      }))
      batch.execute()
    }
  }, [account])
  

  useEffect(() => {
    getBaseInfo()
    library.on('block', getBaseInfo)

    return () => {
      library.removeListener('block', getBaseInfo)
    }
  }, [getBaseInfo, library])

  function backInit () {
    setStakingModal(false)
    setIsHardwareTip(false)
    setStakeAmount('')
    setStakingType('')
  }

  function deposit () {
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

  function withdraw () {
    let amount = ethers.utils.parseUnits(stakeAmount.toString(), 18)
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

  function farm () {
    if (config.supportWallet.includes(walletType)) {
      setIsHardwareTip(true)
      setHardwareTxnsInfo(t('Harvest') + amountFormatter(pendingReward) + ' ANY')
      const data = web3Contract.methods.farm().encodeABI()
      getWeb3BaseInfo(STAKE_TOKEN, data, account).then(res => {
        if (res.msg === 'Success') {
          console.log(res.info)
          addTransaction(res.info)
        } else {
          alert(res.error)
        }
        backInit()
      })
    }
    MMContract.farm().then(res => {
      console.log(res)
      addTransaction(res)
      backInit()
    }).catch(err => {
      console.log(err)
      backInit()
    })
  }
  function onMax () {
    let amount = ''
    console.log(balance)
    if (stakingType === 'deposit') {
      let bl = ethers.utils.bigNumberify(balance)
      amount = amountFormatter(bl)
    } else {
      let bl = ethers.utils.bigNumberify(userInfo)
      amount = amountFormatter(bl)
    }
    setStakeAmount(amount)
  }

  useEffect(() => {
    let status = true
    if (stakingType === 'deposit') {
      let bl = amountFormatter(balance)
      if (Number(bl) < Number(stakeAmount) || Number(stakeAmount) === 0 || !bl || Number(bl) === 0) {
        status = true
      } else {
        status = false
      }
    } else {
      let pr = amountFormatter(pendingReward)
      if (Number(pr) < Number(stakeAmount) || Number(stakeAmount) === 0 || !pr || Number(pr) === 0) {
        status = true
      } else {
        status = false
      }
    }
    
    setStakeDisabled(status)
  }, [stakingType, pendingReward, balance, stakeAmount])

  function stakingView () {
    return (
      <>
        <LogoBox>
          <div className='logo'><img src={require('../../assets/images/coin/ANY.svg')} /></div>
          <div className='title'>
            <h3>Anyswap Party!</h3>
            <p>Deposit ANY SLP Tokens and earn ANY</p>
          </div>
        </LogoBox>

        <StakingBox>
          <StakingList>
            <li className='item'>
              <div className='pic'><img src={require('../../assets/images/coin/ANY.svg')} /></div>
              <div className='info'>
                <h3>{amountFormatter(pendingReward)}</h3>
                <p>ANY Earned</p>
              </div>
              <div className='btn'><Button style={{height: '45px',width: '150px'}} onClick={() => {
                farm()
              }}>{t('Harvest')}</Button></div>
            </li>
            <li className='item'>
              <div className='pic'><img src={require('../../assets/images/coin/ANY.svg')} /></div>
              <div className='info'>
                <h3>{amountFormatter(userInfo)}</h3>
                <p>ANY Earned</p>
              </div>
              <div className='btn'><Button style={{height: '45px',width: '150px'}} onClick={() => {
                setStakingType('redeem')
                setStakingModal(true)
              }}>{t('redeem')}</Button></div>
            </li>
            <li className='item'>
              <div className='pic'><img src={require('../../assets/images/coin/ANY.svg')} /></div>
              <div className='info'>
                <h3>{amountFormatter(balance)}</h3>
                <p>ANY Tokens Staked</p>
              </div>
              <div className='btn'>
                {
                  approveAmount && Number(approveAmount) ? (
                    <Button style={{height: '45px',width: '150px'}} onClick={() => {
                      setStakingType('deposit')
                      setStakingModal(true)
                    }}>{t('deposit')}</Button>
                  ) : (
                    <Button style={{height: '45px',width: '150px'}} disabled={unlocking} onClick={() => {
                      approve()
                    }}>{unlocking ? t('pending') : t('unlock')}</Button>
                  )
                }
              </div>
            </li>
          </StakingList>
        </StakingBox>
      </>
    )
  }

  function connectWallet () {
    return (
      <>
        <ConnectWalletBox>
          <Button onClick={toggleWalletModal}  style={{height: '45px',width: '150px'}}>
            {t('connectToWallet')}
          </Button>
        </ConnectWalletBox>
      </>
    )
  }

  return (
    <>
      {/* <Button onClick={() => {farm()}}>test</Button> */}
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
              <Input type="number"  placeholder="" value={stakeAmount} onChange={e => {
                setStakeAmount(Number(e.target.value))
              }}/>
              <MaxBox onClick={() => {onMax()}}>Max</MaxBox>
            </InputRow>
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

      {Number(CHAINID) !== Number(chainId) || !account ? connectWallet() : stakingView()}
    </>
  )
}