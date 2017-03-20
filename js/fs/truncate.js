/**
 * Created by sunyiwei on 2017/3/19.
 */

const fs = require("fs");
const strUtils = require("./strUtils");

const filename = "/tmp/" + strUtils.randStr(6);

fs.writeFile(filename, strUtils.randStr(16), (err) => {
    if (!err) {
        fs.open(filename, "r+", (err, fd) => {
            if (!err) {
                fs.ftruncate(fd, 32, (err) => {
                    if (!err) {
                        var data = fs.readFileSync(filename);
                        console.log(data);
                        console.log(data.length);
                    }
                });
            }
        });
    }
});
