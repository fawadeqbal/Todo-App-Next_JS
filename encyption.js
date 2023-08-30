const CryptoJS = require("crypto-js");

function get() {
    const encrypted = CryptoJS.AES.encrypt("password", "secret").toString();
    console.log(encrypted);

    const bytes = CryptoJS.AES.decrypt(encrypted, "secret").toString(CryptoJS.enc.Utf8);
    const decrypted = bytes;
    console.log(bytes);
}

get();
