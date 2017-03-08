//const util = require('util');

//const debuglog = util.debuglog('foo');

//debuglog('hello from %d', 123);

var url = require('url');

var urlObj = url.parse("http://www.baidu.com/");

console.log("Protocol: " + urlObj.protocol);

console.log("Pathname: " + urlObj.pathname);

console.log("Path: " + urlObj.path);

