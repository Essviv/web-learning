/**
 * Created by sunyiwei on 2017/3/17.
 */

const fs = require("fs");
const strUtils = require("./strUtils");

var ori = "/tmp/" + strUtils.randStr(6);
console.log(`oriFilename = ${ori}`);

var dst = "/tmp/" + strUtils.randStr(6);
console.log(`dstFilename = ${dst}`);

//create tmpfile and create its content
randomFileContent(ori, () => {
    //read content from file and write back to another one
    var is = fs.createReadStream(ori);
    var os = fs.createWriteStream(dst);
    is.pipe(os);
});

function randomFileContent(filename, callback) {
    var length = Math.floor(Math.random() * Math.pow(2, 16));
    var data = strUtils.randStr(length);

    var ws = fs.createWriteStream(filename);
    ws.on("open", (_) => {
        ws.end(data, callback);
    });
}