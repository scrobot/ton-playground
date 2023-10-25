import {Blockchain, SandboxContract, TreasuryContract} from '@ton-community/sandbox';
import { toNano } from 'ton-core';
import { Fund } from '../wrappers/Fund';
import '@ton-community/test-utils';
import {Company} from "../build/Company/tact_Company";

describe('Fund', () => {
    let blockchain: Blockchain;
    let fund: SandboxContract<Fund>;
    let company: SandboxContract<Company>;
    let deployer: SandboxContract<TreasuryContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        fund = blockchain.openContract(await Fund.fromInit());
        company = blockchain.openContract(await Company.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployFundResult = await fund.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployFundResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: fund.address,
            deploy: true,
            success: true,
        });

        const deployCompanyResult = await company.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployCompanyResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: company.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and fund are ready to use
    });

    it('should withdraw', async () => {
        const res = await fund.send(deployer.getSender(), {
            value: toNano('0.05'),
        }, {
            $$type: 'Withdraw',
            amount: 3n,
            target: company.address,
        });
        const balanceFund = await fund.getBalance();
        const companyBalance = await company.getBalance();

        expect(balanceFund).toEqual(7n);
        expect(companyBalance).toEqual(3n);
    });
});
