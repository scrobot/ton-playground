import "@stdlib/deploy";

contract Getters with Deployable {
    someValue: Int as Int32;

    init() {
        self.someValue = 42;
    }

    get fun someValue(): Int32 {
        return self.someValue;
    }

    get fun location(): Address {
        return myAddress();
    }

    get fun greeting(): String {
        return "Hello, world!";
    }

    get fun someSum(b: Int32): Int32 {
        return self.someValue + b;
    }

    get fun conjunction(a: Bool, b: Bool): Bool {
        return a && b;
    }
}
