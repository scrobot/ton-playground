import "@stdlib/deploy";

message Deposit {
    amount: Int as uint32;
}

message Withdraw {
    amount: Int as uint32;
    target: Address;
}

struct ErrorsDictionary {
    common: Int as uint32;
}

contract Fund with Deployable {

    balance: Int as uint32;
    errors: ErrorsDictionary;

    init() {
        self.balance = 10;
        self.errors = ErrorsDictionary{
            common: 111
        };
    }

    receive() {
        throw(self.errors.common);
    }

    receive(msg: Withdraw) {
        require(msg.amount <= self.balance, "Not enough balance");
        self.balance = self.balance - msg.amount;
        send(
            SendParameters{
                to: msg.target,
                value: 0,
                mode: SendRemainingValue + SendIgnoreErrors,
                body: Deposit{amount: msg.amount}.toCell()
            }
        );
    }

    receive(msg: Deposit) {
        self.balance = self.balance + msg.amount;
    }

    get fun balance(): Int {
        return self.balance;
    }

    bounced(msg: Deposit) {
        self.balance = self.balance + msg.amount;
    }

}
