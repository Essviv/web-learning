/**
 * Created by sunyiwei on 2017/3/19.
 */
const fs = require("fs");

const filename = "/tmp/src";

fs.lchown(filename, 0, 0, (err) => {
    if (!err) {
        console.log("Chown completed.");
    }else{
        console.log(err);
    }
});

