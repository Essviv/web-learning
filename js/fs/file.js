/**
 * Created by sunyiwei on 2017/3/16.
 */
var fs = require("fs");
var strUtils = require("./strUtils");

var filename = "/tmp/" + strUtils.randStr(8);

var data = strUtils.randStr(256);

fs.access(filename, fs.constants.W_OK | fs.constants.R_OK, () => {
    fs.writeFile(filename, data, (_) => {
        fs.readFile(filename, (err, data) => {
            console.log(`${filename}: ${data}`);

            fs.unlink(filename);
        });
    });
});

var tmp = "/etc/passwd";
fs.access(tmp, fs.constants.W_OK, (err) => {
    if (err) {
        console.log(`Current process has not right to write to ${tmp}`);
    }
});
