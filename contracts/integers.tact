import "@stdlib/deploy";

contract Integers with Deployable {

    i1: Int as int257 = 1000; // -2^256 <= i1 <= 2^256, storage costs 0.184 TON per year
    i2: Int as unt256; // 0 <= i2 <= 2^256
    i3: Int as int32 = 1000; // -2^31 <= i1_1 <= 2^31, storage costs 0.023 TON per year
    i4: Int as uint128 = 0x82f; // 0 <= i4 <= 2^128
    i5: Int as int128 = ton("1.23"); // -2^127 <= i5 <= 2^127
    i6: Int as coins; // 0 <= i6 <= 2^120
    i7: Int as uint64; // 0 <= i7 <= 2^64
    i8: Int as int64; // -2^63 <= i8 <= 2^63
    i9: Int as uint32; // 0 <= i9 <= 2^32
    i10: Int as int32; // -2^31 <= i10 <= 2^31
    i11: Int as uint16; // 0 <= i11 <= 2^16
    i12: Int as int16; // -2^15 <= i12 <= 2^15
    i13: Int as uint8; // 0 <= i13 <= 2^8
    i14: Int as int8; // -2^7 <= i14 <= 2^7

    receive() {
        let some: Int as int32 = 3001;
        let another: Int as int64 = 57;
        let i: Int as int8 = 100;

        i = some * 3 - (another -1); // 9002 - 56 = 8946
        i = some % 10; // 1
        i = some / 1000; // 3001 / 1000 = 3
        i = some >> 2; // 3001 >> 2 = 750
        i = some << 2; // 3001 << 2 = 12004
        i = min(some, another); // 57
        i = max(some, another); // 3001
        i = abs(-some); // 3001
    }

    init() {

    }
}
