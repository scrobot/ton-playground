import "@stdlib/deploy";

message Destination {
    address: Address;
    target: Int as uint32;
}

message Box {
    value: Int as uint32;
}

contract BulkAdder with Deployable {

    target: Int as uint32;

    init() {
        self.target = 0;
    }

    receive(msg: Destination) {
        self.target = msg.target;
        send(SendParameters{
            to: msg.address,
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
            body: "query".asComment()
        });
    }

    receive(msg: Box) {
        if(self.target > msg.value) {
            send(SendParameters{
                to: sender(),
                value: 0,
                mode: SendRemainingValue + SendIgnoreErrors,
                body: "increment_until".asComment()
            });
        }
    }


}
