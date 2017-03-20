/**
 * Created by sunyiwei on 2017/3/17.
 */

const fs = require("fs");

const dir = "/tmp";
fs.watch(dir, {recursive: true}, (et, filename) => {
    console.log(`${filename}: ${et}`);
});
