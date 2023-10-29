import {Blockchain, SandboxContract, TreasuryContract} from '@ton-community/sandbox';
import {toNano} from 'ton-core';
import {PartialWithdraw, SendTon} from '../wrappers/SendTon';
import '@ton-community/test-utils';
import {Integers} from "../build/Integers/tact_Integers";
import {fromNano} from "ton";

describe('SendTon', () => {
    let blockchain: Blockchain;
    let sendTon: SandboxContract<SendTon>;
    let deployer: SandboxContract<TreasuryContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        sendTon = blockchain.openContract(await SendTon.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await sendTon.send(
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
            to: sendTon.address,
            deploy: true,
            success: true,
        });

        await sendTon.send(
            deployer.getSender(),
            {
                value: toNano('500'),

            }, null
        )
    });

    it('should deploy', async () => {
        const balance: number = Number.parseFloat(await sendTon.getBalance());
        // parse balance to number from string
        console.log("Balance:", balance);
        expect(balance).toBeGreaterThanOrEqual(499);
        // the check is done inside beforeEach
        // blockchain and sendTon are ready to use
    });

    it('should withdraw', async () => {
        const user = await blockchain.treasury('user');
        const userBalanceBefore = await user.getBalance()
        console.log("User balance before:", fromNano(userBalanceBefore));

        await sendTon.send(
            user.getSender(),
            {
                value: toNano('0.05'),
            },
            'withdraw all'
        )

        const userBalanceAfter = await user.getBalance()
        console.log("User balance after:", fromNano(userBalanceAfter));

        expect(userBalanceBefore).toBeGreaterThanOrEqual(userBalanceAfter);

        const deployerBalanceBefore = await deployer.getBalance()
        console.log("Deployer balance before:", fromNano(deployerBalanceBefore));

        await sendTon.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            'withdraw all'
        )

        const deployerBalanceAfter = await deployer.getBalance()
        console.log("Deployer balance after:", fromNano(deployerBalanceAfter));

        expect(deployerBalanceBefore).toBeLessThan(deployerBalanceAfter);
    });

    it('should withdraw safe', async () => {
        const user = await blockchain.treasury('user');
        const userBalanceBefore = await user.getBalance()
        console.log("User balance before:", fromNano(userBalanceBefore));

        await sendTon.send(
            user.getSender(),
            {
                value: toNano('0.05'),
            },
            'withdraw safe'
        )

        const userBalanceAfter = await user.getBalance()
        console.log("User balance after:", fromNano(userBalanceAfter));

        expect(userBalanceBefore).toBeGreaterThanOrEqual(userBalanceAfter);

        const deployerBalanceBefore = await deployer.getBalance()
        console.log("Deployer balance before:", fromNano(deployerBalanceBefore));

        await sendTon.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            'withdraw safe'
        )

        const deployerBalanceAfter = await deployer.getBalance()
        console.log("Deployer balance after:", fromNano(deployerBalanceAfter));

        expect(deployerBalanceBefore).toBeLessThan(deployerBalanceAfter);

        const contractBalance = Number.parseFloat(await sendTon.getBalance());

        expect(contractBalance).toBeGreaterThan(0)
    });

    it('should withdraw with message', async () => {
        const amount = 150;
        const message: PartialWithdraw = {
            $$type: "PartialWithdraw",
            requested_amount: toNano(amount)
        }
        const user = await blockchain.treasury('user');
        const userBalanceBefore = await user.getBalance()
        console.log("User balance before:", fromNano(userBalanceBefore));

        await sendTon.send(
            user.getSender(),
            {
                value: toNano('0.05'),
            },
            message
        )

        const userBalanceAfter = await user.getBalance()
        console.log("User balance after:", fromNano(userBalanceAfter));

        expect(userBalanceBefore).toBeGreaterThanOrEqual(userBalanceAfter);

        const deployerBalanceBefore = await deployer.getBalance()
        console.log("Deployer balance before:", fromNano(deployerBalanceBefore));

        await sendTon.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            message
        )

        const deployerBalanceAfter = await deployer.getBalance()
        console.log("Deployer balance after:", fromNano(deployerBalanceAfter));

        expect(deployerBalanceBefore).toBeLessThanOrEqual(deployerBalanceAfter + toNano(amount));

        const contractBalance = Number.parseFloat(await sendTon.getBalance());

        expect(contractBalance).toBeGreaterThan(0)
    });

});
