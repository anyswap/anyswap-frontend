let bitcoin = require('bitcoinjs-lib');
let OPS = require('bitcoin-ops');
// console.log(bitcoin)
function createBTCaddress (address) {
  // address = 'cf5104b5feda7ac8acb267c2acb97155ab51525b'
  address = address.replace('0x', '')
  const reddemScript = bitcoin.script.compile([
    Buffer.from(address, 'hex'),
    OPS.OP_DROP,
    OPS.OP_DUP,
    OPS.OP_HASH160,
    Buffer.from("97f19711bc103e8f30a731b77cfc12f33a9784ad",'hex'),
    OPS.OP_EQUALVERIFY,
    OPS.OP_CHECKSIG,
  ])
  const output = bitcoin.script.compile([
    OPS.OP_HASH160,
    bitcoin.crypto.hash160(reddemScript),
    OPS.OP_EQUAL,
  ])
  const p2shAddress = bitcoin.payments.p2sh({
    output: output,
    network: bitcoin.networks.testnet,
  })
  // console.log(p2shAddress.address)
  return p2shAddress.address;
}

export default createBTCaddress
