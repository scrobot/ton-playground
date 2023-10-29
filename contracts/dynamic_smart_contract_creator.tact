import "@stdlib/deploy";

contract DynamicSmartContractCreator with Deployable {
    id: Int as uint64 = 1;

    init() {}

    get fun myAddress(): Address {
        return myAddress();
    }

    get fun dynamicContractAddress(id: Int): Address {
        let init: StateInit = initOf DynamicSmartContract(id);
        return contractAddress(init);
    }

    get fun linkedContractAddress(): Address {
        let init: StateInit = initOf LinkedSmartContract();
        return contractAddress(init);
    }

    receive(msg: DeployDynamicContract) {
        let init: StateInit = initOf DynamicSmartContract(msg.id);
        let address: Address = contractAddress(init);

        send(SendParameters{
            to: address,
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
            bounce: true,
            code: init.code,
            data: init.data,
            body: Deploy{queryId: 0}.toCell()
        });
    }
}

contract LinkedSmartContract with Deployable {
    id: Int as uint64 = 2;

    init() {}

    get fun myAddress(): Address {
        return myAddress();
    }

    get fun contractCreatorAddress(): Address {
        let init: StateInit = initOf DynamicSmartContractCreator();
        return contractAddress(init);
    }
}

message DeployDynamicContract {
    id: Int as uint64;
}

contract DynamicSmartContract with Deployable {
    id: Int as uint64;

    init(id: Int) {
        self.id = id;
    }

    get fun myAddress(): Address {
        return myAddress();
    }

    get fun contractCreatorAddress(id: Int): Address {
        let init: StateInit = initOf DynamicSmartContract(id);
        return contractAddress(init);
    }
}
