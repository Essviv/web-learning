/**
 * Created by sunyiwei on 2017/3/17.
 */
const fs = require("fs");
const strUtils = require("./strUtils");

// randDirAndFile("/tmp/dir", 0, 3);

// console.log(strUtils.randDir("/tmp" + require("path").sep));

//规定最深路径长度的情况下，随机生成目录和文件
function randDirAndFile(currentPath, currentDepth, maxDepth) {
    //确保当前的目录是已经存在了
    ensureCurrentPath(currentPath, () => {
        //确定目录名和文件名
        var name = randName(currentDepth < maxDepth);

        //生成目录
        if (name.dirs && name.dirs.length > 0) {
            name.dirs.forEach((dir) => {
                randDirAndFile(ensureSlash(currentPath) + dir, currentDepth + 1, maxDepth);
            });
        }

        //生成文件
        name.files.forEach((file) => {
            genFile(ensureSlash(currentPath) + file);
        });
    });
}

function ensureCurrentPath(currentPath, callback) {
    fs.stat(currentPath, (err, stats) => {
        if (err) {
            fs.mkdir(currentPath, callback);
        } else {
            if (!stats.isDirectory()) {
                console.log(`${currentPath} exists but is not a dir.`);
                throw new TypeError();
            }

            callback();
        }
    });
}

function ensureSlash(filename) {
    return filename.endsWith("/") ? filename : filename + "/";
}

function genFile(filename) {
    fs.writeFile(filename, strUtils.randStr(randInt(256)), (err) => {
        if (err) {
            console.log(`filename = ${filename}`);
            console.log(err);
        }

        fs.chmod(filename, 0o444);
    });
}

function randInt(max = 32) {
    return Math.floor(Math.random() * max);
}

function randName(allowDir) {
    var files = [];
    randNames(files);

    var dirs = [];
    if (allowDir) {
        randNames(dirs);
    }

    return {"files": files, "dirs": dirs};
}

function randNames(obj) {
    const fileCount = randInt(5);
    for (let i = 0; i < fileCount; i++) {
        obj.push(strUtils.randStr(6));
    }
}


