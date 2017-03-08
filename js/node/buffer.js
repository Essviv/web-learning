/**
 * Created by sunyiwei on 2017/3/7.
 */

function printLog(arr, prefix) {
    console.log(prefix + ": " + arr);
}

var arr1 = Buffer.alloc(10);
console.log(arr1);

var arr2 = Buffer.alloc(10, 0xf0);
console.log(arr2);

var arr3 = Buffer.from('test');
console.log(arr3);

var arr4 = Buffer.from('hello');
console.log(arr4);

var arr5 = Buffer.allocUnsafe(10);
console.log(arr5);

var arr6 = Buffer.from('helloworld');
printLog(arr6, "arr6")

var arr7 = Buffer.from(arr6);
printLog(arr7, "arr7")

arr6.fill(0x65);
printLog(arr6, "arr6");
printLog(arr7, "arr7");

var arr8 = Buffer.from("hello world", "ascii");
printLog(arr8, "arr8");
printLog(arr8.toString("hex"), "arr8-hex");
printLog(arr8.toString("base64"), "arr8-binary");

var arr9 = Buffer.from([1, 3, 4, 5]);
for(var elem of arr9){
    console.log(elem);
}

for(var key of arr9.keys()){
    console.log(key);
}

for(var value of arr9.values()){
    console.log(value);
}

for(var entry of arr9.entries()){
    console.log(entry);
}

//alloc
var arr10 = Buffer.alloc(10, "abcdef", "utf-8");
console.log(arr10);

//allocUnsafe
console.log(Buffer.allocUnsafe(8));

//byteLength
var str = "hello中国";
console.log(Buffer.byteLength(str, "utf-8"));
console.log(str.length);

//compare
var str1 = Buffer.from("2345");
var str2 = Buffer.from("0123");
console.log(Buffer.compare(str2, str1));
var strArr = [str1, str2];
console.log(strArr.sort(Buffer.compare));

//copy
var str3 = Buffer.allocUnsafe(26);
for (var i = 0; i < str3.length; i++) {
    str3[i] = 97 + i;
}

var str4 = Buffer.allocUnsafe(26);
str4.fill('!');

str3.copy(str4, 3, 3, 15);
console.log(str3.toString("ascii"));
console.log(str4.toString("ascii"));

console.error("error message.");
console.warn("warn message.");
console.info("info message.");
