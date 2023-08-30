const CryptoJS = require("crypto-js");

function get() {
    const encrypted = CryptoJS.AES.encrypt("password", "secret").toString();
    console.log(encrypted);

    const bytes = CryptoJS.AES.decrypt(encrypted, "secret");
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    console.log(decrypted);
}

get();
