import "@stdlib/deploy";

contract Addresses with Deployable {
    address: Address = address("EQC9kBFDf5nnKUtNLNqqLpq9FRGOYqpb11FwVm2ChDc8I1Ka"); // 264 bits. Storing 1000 addresses in contract -> 0.189 TON per year

    init() {
        self.address2: Address = myAddress();
        self.address3: Address = sender();
        self.address4: Address = newAddress(0, 0);
    }
}
