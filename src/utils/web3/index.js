const NETWORK_URL =
  process.env.REACT_APP_IS_PRODUCTION_DEPLOY === 'true'
    ? process.env.REACT_APP_NETWORK_URL_PROD
    : process.env.REACT_APP_NETWORK_URL
const Web3Fn = require('web3')
const web3Fn = new Web3Fn(new Web3Fn.providers.HttpProvider(NETWORK_URL))


export default web3Fn