import "@stdlib/deploy";

message PartialWithdraw {
    requested_amount: Int as coins;
}

contract SendTon with Deployable {
    const MIN_TON_FOR_STORAGE: Int = ton("0.01"); // 1KB for 2.5 years
    owner: Address;

    init() {
        self.owner = sender();
    }

    receive() {
        // accept incoming TONs
    }

    receive("withdraw all") {
        self.validateOwner();
        send(SendParameters{
            to: sender(),
            value: 0,
            bounce: true,
            mode: SendRemainingBalance + SendIgnoreErrors
        });
    }

    receive("withdraw safe") {
        self.validateOwner();
        send(SendParameters{
            to: sender(),
            value: self.minAvailableBalance(),
            bounce: true,
            mode: SendRemainingValue + SendIgnoreErrors
        });
    }
    
    receive(msg: PartialWithdraw) {
        self.validateOwner();
        let amount: Int = min(msg.requested_amount, self.minAvailableBalance());
        require(amount > 0, "Insufficient balance");

        send(SendParameters{
            to: sender(),
            value: amount,
            bounce: true,
            mode: SendRemainingValue + SendIgnoreErrors
        });
    }
    
    get fun balance(): String {
        return myBalance().toCoinsString();
    }
    
    fun validateOwner() {
        require(sender() == self.owner, "Only owner can call this function");
    }
    
    fun minAvailableBalance(): Int {
        return myBalance() - context().value - self.MIN_TON_FOR_STORAGE;
    }
}
