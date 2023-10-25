import { Blockchain, SandboxContract, TreasuryContract } from '@ton-community/sandbox';
import { toNano } from 'ton-core';
import { BulkAdder } from '../wrappers/BulkAdder';
import '@ton-community/test-utils';
import { CounterContract } from '../wrappers/CounterContract';

describe('BulkAdder', () => {
    let blockchain: Blockchain;
    let bulkAdder: SandboxContract<BulkAdder>;
    let counter: SandboxContract<CounterContract>;
    let deployer: SandboxContract<TreasuryContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        bulkAdder = blockchain.openContract(await BulkAdder.fromInit());
        counter = blockchain.openContract(await CounterContract.fromInit(1n));
        deployer = await blockchain.treasury('deployer');

        const deployResultBuldAdder = await bulkAdder.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        const deployResultCounter = await counter.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResultBuldAdder.transactions).toHaveTransaction({
            from: deployer.address,
            to: bulkAdder.address,
            deploy: true,
            success: true,
        });

        expect(deployResultCounter.transactions).toHaveTransaction({
            from: deployer.address,
            to: counter.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and bulkAdder are ready to use
    });

    it('should increase to target', async () => {
        const target = 3n;
        const result = await bulkAdder.send(
            deployer.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'Destination',
                address: counter.address,
                target: target,
            }
        );

        const count = await counter.getCounter();
        expect(count).toEqual(target);

        console.log("events amount = " + result.events.length);
    });
});
