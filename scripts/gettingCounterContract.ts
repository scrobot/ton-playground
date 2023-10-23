import { toNano } from 'ton-core';
import { CounterContract } from '../wrappers/CounterContract';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const contractId = 112n;
    const counterContract = provider.open(await CounterContract.fromInit(contractId));

    console.log('Address', counterContract.address);
    console.log('ID', await counterContract.getId());
    console.log('COUNTER', await counterContract.getCounter());
}
