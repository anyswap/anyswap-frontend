
import config from '../../config'
const Web3Fn = require('web3')
const web3Fn = new Web3Fn(new Web3Fn.providers.HttpProvider(config.nodeRpc))


export default web3Fn