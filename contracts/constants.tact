import "@stdlib/deploy";

const global: Int = 1000;

contract Constants with Deployable {
    const SOME: Int = 1000 + ton("1.512") // free for storing. It is a part of code 

    init() {
        let result = self.SOME + global
    }
}
