import "@stdlib/deploy";

message Add {
    queryId: Int as uint64;
    amount: Int as uint32;
}

message Box {
    value: Int as uint32;
}

contract CounterContract with Deployable {
    id: Int as uint32;
    counter: Int as uint32;

    init(id: Int) {
        self.id = id;
        self.counter = 0;
    }

    receive("increment") {
        self.counter = (self.counter + 1);
    }

    receive("increment_until") {
        self.counter = (self.counter + 1);
        self.reply(Box{value: self.counter}.toCell());
    }

    receive("decrement") {
        self.counter = (self.counter - 1);
    }

    receive("reset") {
        self.counter = 0;
    }

    receive("query") {
        self.reply(Box{value: self.counter}.toCell());
    }

    receive(msg: Add) {
        self.counter = (self.counter + msg.amount);
    }

    get fun counter(): Int {
        return self.counter;
    }

    get fun id(): Int {
        return self.id;
    }
}
