import { toNano } from 'ton-core';
import { Boolean } from '../wrappers/Boolean';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const boolean = provider.open(await Boolean.fromInit());

    await boolean.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(boolean.address);

    // run methods on `boolean`
}
