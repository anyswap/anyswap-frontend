'use strict';
const NETWORK_URL =
  process.env.REACT_APP_IS_PRODUCTION_DEPLOY === 'true'
    ? process.env.REACT_APP_NETWORK_URL_PROD
    : process.env.REACT_APP_NETWORK_URL
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider(NETWORK_URL))
var abstractConnector = require('@web3-react/abstract-connector');
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
var LedgerConnect =
/*#__PURE__*/
function (_AbstractConnector) {

  function LedgerConnect(_ref) {

    var _this3;

    _this3 = _AbstractConnector.call(this, {
      supportedChainIds: [46688]
    }) || this
    // _this3.handleNetworkChanged = _this3.handleNetworkChanged.bind(_assertThisInitialized(_this3));
    // _this3.handleChainChanged = _this3.handleChainChanged.bind(_assertThisInitialized(_this3));
    // _this3.handleAccountsChanged = _this3.handleAccountsChanged.bind(_assertThisInitialized(_this3));
    // _this3.handleClose = _this3.handleClose.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  // var _proto = LedgerConnect.prototype;

  // // _proto.handleChainChanged = function handleChainChanged() {
  // //   console.log('activate')
  // //   this.emitUpdate({
  // //     chainId: 46688
  // //   })
  // // };

  // _proto.getProvider = function getProvider() {
  //   console.log('getProvider')
  //   console.log(web3)
  //   return Promise.resolve(web3.currentProvider)
  // };

  // _proto.activate = function activate() {
  //   // console.log('getChainId')
  //   // return this.getAccount()
  //   // console.log(this)
  //   return new Promise(resolve => {
  //     resolve({
  //       account: '0x76c2ae4281fe1ee1a79ccbdda2516d4d7eb0eb37',
  //       chainId: 46688
  //     })
  //   })
  // };

  // // _proto.handleAccountsChanged = function handleAccountsChanged () {
  // //   console.log('getAccount')
  // //   // this.emitUpdate({
  // //   //   account: '0x76c2ae4281fe1ee1a79ccbdda2516d4d7eb0eb37'
  // //   // })
  // //   return new Promise(resolve => {
  // //     resolve(4)
  // //   })
  // // }
  // _proto.getChainId = function getChainId () {
  //   console.log('getChainId')
  //   // this.emitUpdate({
  //   //   account: '0x76c2ae4281fe1ee1a79ccbdda2516d4d7eb0eb37'
  //   // })
  //   return new Promise(resolve => {
  //     resolve(46688)
  //   })
  // }
  // _proto.getAccount = function getAccount () {
  //   console.log('getAccount')
  //   // this.emitUpdate({
  //   //   account: '0x76c2ae4281fe1ee1a79ccbdda2516d4d7eb0eb37'
  //   // })
  //   return new Promise(resolve => {
  //     resolve('0x76c2ae4281fe1ee1a79ccbdda2516d4d7eb0eb37')
  //   })
  // }
  // _proto.deactivate = function deactivate() {};

  // _proto.close = function close() {
  //   console.log('close')
  // };

  return LedgerConnect;
}(abstractConnector.AbstractConnector);

exports.LedgerConnect = LedgerConnect;
//# sourceMappingURL=fortmatic-connector.cjs.development.js.map
