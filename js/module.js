/**
 * Created by sunyiwei on 2017/2/27.
 */

//module 1
// var add = function (a, b) {
//     return a + b;
// };
//
// var minus = function (a, b) {
//     return a - b;
// };
//
// var multiply = function (a, b) {
//     return a * b;
// };
//
// var divide = function (a, b) {
//     return b == 0 ? NaN : a / b;
// };
//
// console.log(add(1, 2));
// console.log(minus(1, 2));
// console.log(multiply(3, 2));
// console.log(divide(3, 2));

//module 2
// var myMath = function () {
//     var add = function (a, b) {
//         return a + b;
//     };
//
//     var minus = function (a, b) {
//         return a - b;
//     };
//
//     var multiply = function (a, b) {
//         return a * b;
//     };
//
//     var divide = function (a, b) {
//         return b == 0 ? NaN : a / b;
//     };
//
//     return {
//         add: add,
//         minus: minus,
//         multiply: multiply,
//         divide: divide
//     };
// }();
//
// console.log(myMath.add(1, 3));
// console.log(myMath.minus(1, 3));
// console.log(myMath.multiply(1, 3));
// console.log(myMath.divide(1, 3));


//module 3
// var exports;
// (function (exports) {
//     var add = function (a, b) {
//         return a + b;
//     };
//     exports.add = add;
//
//     var minus = function (a, b) {
//         return a - b;
//     };
//     exports.minus = minus;
//
//     var multiply = function (a, b) {
//         return a * b;
//     };
//     exports.multiply = multiply;
//
//     var divide = function (a, b) {
//         return b === 0 ? NaN : a / b;
//     };
//     exports.divide = divide;
// })(exports = {});
//
// console.log(exports.add(1, 3));
// console.log(exports.minus(1, 3));
// console.log(exports.multiply(1, 3));
// console.log(exports.divide(6, 3));

//module 4
// function evalAndExec(code) {
//     eval(code);
//     return x;
// }
//
// console.log(evalAndExec("var x = 5;"));
//
// var plusOne = new Function("n", "return n + 1;");
// console.log(plusOne(5));
//
// require.cache = Object.create(null);
// function require(name) {
//     if(name in require.cache){
//         return require.cache[name];
//     }
//
//     var code = new Function("exports, module", readFile(name));
//     var exports = {}, module = {exports: exports};
//
//     code(exports, module);
//     require.cache[name] = module.exports;
//
//     return module.exports;
// };



