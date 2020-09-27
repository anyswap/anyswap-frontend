

// import { createWatcher } from '@makerdao/multicall'
import * as multicall from '@makerdao/multicall'

// const MKR_TOKEN = '0x83A01027e6a18143be8f43D0f1A5cd74Ef951bb2';
const MKR_TOKEN = '0x3368e6012066bc08ece5f2b2582c883cca1424e5';
// const MKR_WHALE = '0xdb33dfd3d61308c33c63209845dad3e6bfb2c674';
const MKR_WHALE = '0x3368e6012066bc08ece5f2b2582c883cca1424e5'
const MKR_FISH = '0x2dfcedcb401557354d0cf174876ab17bfd6f4efd';

// Preset can be 'mainnet', 'kovan', 'rinkeby', 'goerli' or 'xdai'
const config = {
  rpcUrl: 'https://testnet.anyswap.exchange',
  // multicallAddress: '0xc7c64ac6d46be3d6ea318ec6276bb55291f8e496'
  multicallAddress: MKR_TOKEN
}
console.log(multicall)

// multicall.aggregate({

// }, config)




// Create watcher
const watcher = multicall.createWatcher(
  [
    {
      target: MKR_TOKEN,
      call: ['balanceOf(address)(uint256)', '0xC03033d8b833fF7ca08BF2A58C9BC9d711257249'],
      returns: [['BALANCE_OF_MKR_WHALE', val => val / 10 ** 18]]
    },
    // {
    //   target: MKR_TOKEN,
    //   call: ['balanceOf(address)(uint256)', MKR_WHALE],
    //   returns: [['BALANCE_OF_MKR_WHALE', val => val / 10 ** 18]]
    // }
  ],
  config
);

// Subscribe to state updates
watcher.subscribe(update => {
console.log(`Update: ${update.type} = ${update.value}`);
});

// Subscribe to batched state updates
watcher.batch().subscribe(updates => {
  console.log(`Update: ${updates.type} = ${updates.value}`);
  // Handle batched updates here
  // Updates are returned as { type, value } objects, e.g:
  // { type: 'BALANCE_OF_MKR_WHALE', value: 70000 }
});

// Subscribe to new block number updates
watcher.onNewBlock(blockNumber => {
  console.log('New block:', blockNumber);
});

// Start the watcher polling
watcher.start();



const test = () => {}
export default test