/**
 * Created by sunyiwei on 2017/3/19.
 */
const fs = require("fs");

const existingFilename = "/tmp/target";
const newPath = "/tmp/linkPath";

fs.link(existingFilename, newPath, (err) => {
    if (!err) {
        console.log("Link completed.");
        process.exit();
    }
});

