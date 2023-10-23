import { toNano } from 'ton-core';
import { CounterContract } from '../wrappers/CounterContract';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const randomId = BigInt(Math.floor(Math.random() * 10000))
    console.log('ID', randomId);

    const counterContract = provider.open(await CounterContract.fromInit(randomId));

    await counterContract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(counterContract.address);

    console.log('ID', await counterContract.getId());
}
