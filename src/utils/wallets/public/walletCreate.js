// const wallet = require('../ethereum/wallet')
import wallet from '../ethereum/wallet'
const HDKey = require('hdkey')
const hdk = new HDKey()


function walletCreate (publicKey, chainCode, walletType, path, page) {
  page = page ? page : 0
  let moreAddr = []
  let wallets = []
  let skip = page * 5
  hdk.publicKey = new Buffer(publicKey, "hex")
  hdk.chainCode = new Buffer(chainCode, "hex")
  for (let i = skip; i < (skip + 5); i++) {
    let derivedKey = hdk.derive("m/" + i)
    if (walletType === 'ledger') {
      wallets.push(new wallet(undefined, derivedKey.publicKey, path + "/" + i, walletType))
    } else {
      wallets.push(new wallet(undefined, derivedKey.publicKey, path + "/" + i, walletType))
    }
    moreAddr.push({addr: wallets[i - skip].getChecksumAddressString(), path: path + "/" + i})
  }
  return moreAddr
}

export default walletCreate