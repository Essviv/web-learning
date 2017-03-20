/**
 * Created by sunyiwei on 2017/3/16.
 */
var fs = require("fs");
var util = require("util");

var filename = "/tmp";
fs.readdir(filename, (err, files) => {
    files.forEach((file) => {
        var path = filename + "/" + file;
        fs.stat(path, (err, stat) => {
            dump(path, stat);
        });
    });
});

function dump(file, stat) {
    console.log(`${file}:`);
    console.log(`isFile: ${stat.isFile()}`);
    console.log(`isDir: ${stat.isDirectory()}`);
    console.log(`isBlockDevice: ${stat.isBlockDevice()}`);
    console.log(`isCharacterDevice: ${stat.isCharacterDevice()}`);
    console.log(`isSymbolicLink: ${stat.isSymbolicLink()}`);
    console.log(`isFIFO: ${stat.isFIFO()}`);
    console.log(`isSocket: ${stat.isSocket()}`);
    console.log("-------------");
}
