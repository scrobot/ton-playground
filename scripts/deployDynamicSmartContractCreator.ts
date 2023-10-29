import { toNano } from 'ton-core';
import { DynamicSmartContractCreator } from '../wrappers/DynamicSmartContractCreator';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const dynamicSmartContractCreator = provider.open(await DynamicSmartContractCreator.fromInit());

    await dynamicSmartContractCreator.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(dynamicSmartContractCreator.address);

    // run methods on `dynamicSmartContractCreator`
}
