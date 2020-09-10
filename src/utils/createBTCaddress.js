import config from '../config'
let bitcoin = require('bitcoinjs-lib');
let OPS = require('bitcoin-ops');

function createBTCaddress (address) {
  address = address.replace('0x', '')

  // const compressed = true
  const network = config.env === 'test' ? bitcoin.networks.testnet : bitcoin.networks.bitcoin
  // const ecpair = bitcoin.ECPair.fromPublicKey(Buffer.from(config.btcConfig.pubkey, 'hex'), {compressed, network})
  const {hash} = bitcoin.address.fromBase58Check(config.btcConfig.btcAddr)

  // const ripemd160 = bitcoin.crypto.hash160(ecpair.publicKey);

  const reddemScript = bitcoin.script.compile([
    Buffer.from(address, 'hex'),
    OPS.OP_DROP,
    OPS.OP_DUP,
    OPS.OP_HASH160,
    Buffer.from(hash,'hex'),
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
    network: network,
  })
  // console.log(p2shAddress.address)
  return p2shAddress.address;
}

export default createBTCaddress
