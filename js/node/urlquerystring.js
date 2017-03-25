/**
 * Created by sunyiwei on 2017/3/22.
 */

var qs = require("querystring");

var result = qs.stringify({"name": "sunyiwei@hello", "age": 27, "hobbies": ['basketball', 'football']}, "*", "=");
console.log(result);
