import "@stdlib/deploy";

contract Strings with Deployable {
    s1: String = "hello";
    s2: String = "yes unicode: 🤔";

    init() {
        let i: Int = -12345;
        let s3: String = i.toString();
        let s4: String = i.toFloatString(3);
        let s5: String = i.toCoinsString();

        let sb: StringBuilder = beginString();
        sb.append("hello");
        sb.append(" ");
        sb.append("world");
        let s6: String = sb.toString();
    }
}
