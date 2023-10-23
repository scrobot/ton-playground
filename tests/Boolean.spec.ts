import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { toNano } from 'ton-core';
import { Boolean } from '../wrappers/Boolean';
import '@ton-community/test-utils';

describe('Boolean', () => {
    let blockchain: Blockchain;
    let boolean: SandboxContract<Boolean>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        boolean = blockchain.openContract(await Boolean.fromInit());

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await boolean.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: boolean.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and boolean are ready to use
    });
});
