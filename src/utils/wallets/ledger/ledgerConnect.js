'use strict';


var abstractConnector = require('@web3-react/abstract-connector');

var LedgerConnect =
/*#__PURE__*/
function (_AbstractConnector) {

  function LedgerConnect(_ref) {
    var _this;

    _this = _AbstractConnector.call(this, {
      supportedChainIds: _ref.chainId
    }) || this
    return _this;
  }

  var _proto = LedgerConnect.prototype;

  _proto.activate = function activate() {
    console.log('activate')
    // console.log(this)
    return Promise.resolve(12)
  };

  _proto.getProvider = function getProvider() {
    console.log('getProvider')
    return Promise.resolve(2)
  };

  _proto.getChainId = function getChainId() {
    console.log('getChainId')
    return Promise.resolve(46688)
  };

  _proto.getAccount = function getAccount() {
    console.log('getAccount')
    return Promise.resolve(4)
  }
  _proto.deactivate = function deactivate() {};

  _proto.close = function close() {
    console.log('close')
  };

  return LedgerConnect;
}(abstractConnector.AbstractConnector);

exports.LedgerConnect = LedgerConnect;
//# sourceMappingURL=fortmatic-connector.cjs.development.js.map
