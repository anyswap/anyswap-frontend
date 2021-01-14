const navLang = navigator.language

const BNB_MAINNET = 'https://bsc-dataseed1.binance.org/'
const BNB_MAIN_CHAINID = 56
const BNB_MAIN_EXPLORER = 'https://bscscan.com'

const BNB_TESTNET = 'https://data-seed-prebsc-1-s1.binance.org:8545'
const BNB_TEST_CHAINID = 97
const BNB_TEST_EXPLORER = 'https://explorer.binance.org/smart-testnet'


// const FSN_MAINNET = 'https://fsnmainnet2.anyswap.exchange'
const FSN_MAINNET = 'https://mainnet.anyswap.exchange'
const FSN_MAINNET1 = 'https://mainnet.anyswap.exchange'
const FSN_MAIN_CHAINID = 32659
const FSN_MAIN_EXPLORER = 'https://fsnex.com'

// const FSN_TESTNET = 'https://testnet.anyswap.exchange'
const FSN_TESTNET = 'https://testnet.fsn.dev/api'
const FSN_TEST_CHAINID = 46688
const FSN_TEST_EXPLORER = 'https://fsnex.com'

const ETH_MAINNET = 'https://ethmainnet.anyswap.exchange'
// const ETH_MAINNET = 'https://mainnet.infura.io/v3/0e40cfd5e7a64b2d9aea8427e4bd52a0'
const ETH_MAIN_CHAINID = 1
const ETH_MAIN_EXPLORER = navLang === 'zh-CN' ? 'https://cn.etherscan.com' : 'https://etherscan.io'


const ETH_TESTNET = 'https://rinkeby.infura.io/v3/0e40cfd5e7a64b2d9aea8427e4bd52a0'
const ETH_TEST_CHAINID = 4
const ETH_TEST_EXPLORER = 'https://rinkeby.etherscan.io'

const FTM_MAINNET = 'https://rpc.fantom.network'
const FTM_MAIN_CHAINID = 250
const FTM_MAIN_EXPLORER = 'https://explorer.fantom.network'

const HT_MAINNET = 'https://http-mainnet.hecochain.com'
const HT_MAIN_CHAINID = 128
const HT_MAIN_EXPLORER = 'https://scan.hecochain.com'

const HT_TESTNET = 'https://http-testnet.hecochain.com'
const HT_TEST_CHAINID = 256
const HT_TEST_EXPLORER = 'https://scan-testnet.hecochain.com'

const OKT_TESTNET = 'http://13.230.73.12:8545'
const OKT_TEST_CHAINID = 2
const OKT_TEST_EXPLORER = 'https://scan-testnet.hecochain.com'


let chainInfo = {
  1: {
    rpc: ETH_MAINNET,
    chainID: ETH_MAIN_CHAINID,
    lookHash: ETH_MAIN_EXPLORER + '/tx/',
    lookAddr: ETH_MAIN_EXPLORER + '/address/',
    explorer: ETH_MAIN_EXPLORER,
    symbol: 'ETH',
    name: 'Ethereum',
    type: 'main',
    label: 'ETH_MAIN',
    isSwitch: 1
  },
  2: {
    rpc: OKT_TESTNET,
    chainID: OKT_TEST_CHAINID,
    lookHash: OKT_TEST_EXPLORER + '/tx/',
    lookAddr: OKT_TEST_EXPLORER + '/address/',
    explorer: OKT_TEST_EXPLORER,
    symbol: 'OKT',
    name: 'OKT',
    type: 'test',
    label: 'OKT_TEST',
    isSwitch: 1
  },
  4: {
    rpc: ETH_TESTNET,
    chainID: ETH_TEST_CHAINID,
    lookHash: ETH_TEST_EXPLORER + '/tx/',
    lookAddr: ETH_TEST_EXPLORER + '/address/',
    explorer: ETH_TEST_EXPLORER,
    symbol: 'ETH',
    name: 'Ethereum',
    type: 'test',
    label: 'ETH_TEST',
    isSwitch: 0
  },
  56: {
    rpc: BNB_MAINNET,
    chainID: BNB_MAIN_CHAINID,
    lookHash: BNB_MAIN_EXPLORER + '/tx/',
    lookAddr: BNB_MAIN_EXPLORER + '/address/',
    explorer: BNB_MAIN_EXPLORER,
    symbol: 'BNB',
    name: 'BSC',
    type: 'main',
    label: 'BNB_MAIN',
    isSwitch: 1
  },
  97: {
    rpc: BNB_TESTNET,
    chainID: BNB_TEST_CHAINID,
    lookHash: BNB_TEST_EXPLORER + '/tx/',
    lookAddr: BNB_TEST_EXPLORER + '/address/',
    explorer: BNB_TEST_EXPLORER,
    symbol: 'BNB',
    name: 'BSC',
    type: 'test',
    label: 'BNB_TEST',
    isSwitch: 1
  },
  128: {
    rpc: HT_MAINNET,
    chainID: HT_MAIN_CHAINID,
    lookHash: HT_MAIN_EXPLORER + '/tx/',
    lookAddr: HT_MAIN_EXPLORER + '/address/',
    explorer: HT_MAIN_EXPLORER,
    symbol: 'HT',
    name: 'Huobi',
    type: 'main',
    label: 'HT_MAIN',
    isSwitch: 1
  },
  256: {
    rpc: HT_TESTNET,
    chainID: HT_TEST_CHAINID,
    lookHash: HT_TEST_EXPLORER + '/tx/',
    lookAddr: HT_TEST_EXPLORER + '/address/',
    explorer: HT_TEST_EXPLORER,
    symbol: 'HT',
    name: 'Huobi',
    type: 'test',
    label: 'HT_TEST',
    isSwitch: 1
  },
  250: {
    rpc: FTM_MAINNET,
    chainID: FTM_MAIN_CHAINID,
    lookHash: FTM_MAIN_EXPLORER + '/transactions/',
    lookAddr: FTM_MAIN_EXPLORER + '/address/',
    explorer: FTM_MAIN_EXPLORER,
    symbol: 'FTM',
    name: 'Fantom',
    type: 'main',
    label: 'FTM_MAIN',
    isSwitch: 1
  },
  32659: {
    rpc: FSN_MAINNET,
    rpc1: FSN_MAINNET1,
    chainID: FSN_MAIN_CHAINID,
    lookHash: FSN_MAIN_EXPLORER + '/transaction/',
    lookAddr: FSN_MAIN_EXPLORER + '/address/',
    explorer: FSN_MAIN_EXPLORER,
    symbol: 'FSN',
    name: 'Fusion',
    type: 'main',
    label: 'FSN_MAIN',
    isSwitch: 1
  },
  46688: {
    rpc: FSN_TESTNET,
    chainID: FSN_TEST_CHAINID,
    lookHash: FSN_TEST_EXPLORER + '/transaction/',
    lookAddr: FSN_TEST_EXPLORER + '/address/',
    explorer: FSN_TEST_EXPLORER,
    symbol: 'FSN',
    name: 'Fusion',
    type: 'test',
    label: 'FSN_TEST',
    isSwitch: 1
  },
}

let chainList = {
  main: [
    chainInfo['1'],
    chainInfo['32659'],
    chainInfo['56'],
    chainInfo['250'],
    chainInfo['128'],
  ],
  test: [
    chainInfo['46688'],
    chainInfo['97'],
    chainInfo['256'],
    chainInfo['2'],
  ]
}

export {
  chainInfo,
  chainList
}