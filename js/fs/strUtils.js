/**
 * Created by sunyiwei on 2017/3/17.
 */

const fs = require("fs");

exports.randStr = function (length) {
    var strs = "abcdefghijklmnopqrstuvwxyz123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    var result = [];
    for (var i = 0; i < length; i++) {
        result.push(strs[Math.floor(Math.random() * strs.length)])
    }

    return result.join("");
};

exports.randDir = function (prefix) {
    return fs.mkdtempSync(prefix);
};