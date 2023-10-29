import {Blockchain, SandboxContract, TreasuryContract} from '@ton-community/sandbox';
import {toNano} from 'ton-core';
import {DynamicSmartContractCreator} from '../wrappers/DynamicSmartContractCreator';
import '@ton-community/test-utils';
import {DynamicSmartContract} from "../build/DynamicSmartContractCreator/tact_DynamicSmartContract";
import {LinkedSmartContract} from "../build/DynamicSmartContractCreator/tact_LinkedSmartContract";

describe('DynamicSmartContractCreator', () => {
    let blockchain: Blockchain;
    let dynamicSmartContractCreator: SandboxContract<DynamicSmartContractCreator>;
    let linkedSmartContract: SandboxContract<LinkedSmartContract>;
    let deployer: SandboxContract<TreasuryContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        dynamicSmartContractCreator = blockchain.openContract(await DynamicSmartContractCreator.fromInit());
        linkedSmartContract = blockchain.openContract(await LinkedSmartContract.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployCreatorResult = await dynamicSmartContractCreator.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployCreatorResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: dynamicSmartContractCreator.address,
            deploy: true,
            success: true,
        });

        const deployCreatableResult = await linkedSmartContract.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployCreatableResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: linkedSmartContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and dynamicSmartContractCreator are ready to use
    });

    it('should return addresses', async () => {
        const creatorAddress = await dynamicSmartContractCreator.getMyAddress()
        const creatableAddress = await linkedSmartContract.getMyAddress()

        const dynamicContractAddress = await dynamicSmartContractCreator.getLinkedContractAddress();
        const creatorAddressFromCreated = await linkedSmartContract.getContractCreatorAddress();

        expect(creatorAddress).toEqualAddress(creatorAddressFromCreated);
        expect(creatableAddress).toEqualAddress(dynamicContractAddress);

        dynamicSmartContractCreator.send(deployer.getSender(), {
            value: toNano('0.05'),
        }, {
            $$type: 'DeployDynamicContract',
            id: 14n,
        });

        const dynamicContract = await dynamicSmartContractCreator.getDynamicContractAddress(14n);
        expect(dynamicContract).not.toBeNull();

    });
});
