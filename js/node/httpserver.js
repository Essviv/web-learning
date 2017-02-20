/**
 * Created by sunyiwei on 2017/2/17.
 */

var http = require("http");
http.createServer(function (req, resp) {
    console.log("New request coming: " + req.body);
    resp.writeHead("200", {"Content-Type": 'text/plain'});
    resp.end("hello, world", "utf-8");
}).listen(9000, 'localhost');
