import config from '../../config'
import ERC20_ABI from '../../constants/abis/erc20'
import TOKEN from '../../contexts/Tokens_erc20'

const ERC20_RPC = config.ercConfig.nodeRpc
const allToken = TOKEN[config.ercConfig.chainID]
console.log(ERC20_RPC)
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider(ERC20_RPC))
console.log(web3)
// console.log(web3.isConnected())

// let contract = web3.eth.contract(ERC20_ABI) 
console.log(allToken)
export const getErcBalance = (coin) => {
  // let tt = contract.at(allToken[coin].token)
  // console.log(web3)
  // let balance = tt.balanceOf('0xE000E632124aa65B80f74E3e4cc06DC761610583')
  // console.log(balance)
  web3.eth.getBalance('0xE000E632124aa65B80f74E3e4cc06DC761610583').then(res => {
    console.log(res)
  })
}

// export default erc20Web3