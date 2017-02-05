/**
 * Created by patrick on 2017/2/3.
 */

console.log('hello world');

var name = 'sunyiwei';
console.log(name);

var owe = 351;
console.log(owe);

owe -= 35;
console.log(owe);

var one, two = 2, three = 'three';
console.log(one);
console.log(two);
console.log(three);

//测试函数变量
var func = function () {
    return 'hello world';
};
console.log(func());
console.log(typeof func());


//测试console.log函数
var value = 5;
console.log('The value of value is ', value);

//测试函数的返回值
console.log(Math.max(1, 3, 5, 7, 2, 4, 6, 8));

func = function () {
    return function () {
        return 'hello world';
    }
};
console.log(func());
console.log(typeof func);
console.log(func()());

//测试环境函数
// confirm("R U sure?");
if (isNaN('5')) {
    console.log('Condition is true.');
} else {
    console.log('Condition is false.');
}

//测试do...while...逻辑
var a = 0;
while (a <= 1000) {
    console.log(a);
    a += 500;
}

//测试break和continue
for (var i = 0; true; i++) {
    if (i < 3) {
        continue;
    }

    console.log(i);
    if (i < 4) {
        break;
    }
}

//测试switch/case
var b = 'hello';
switch (b) {
    case 'world':
        console.log("world");
        break;
    case 'hello':
        console.log("hello");
        break;
    default:
        console.log('unknown');
        break;
}

//变量名的大小写
var tmp = 'tmp';
var TMP = 'TMP';
console.log(tmp);
console.log(TMP);
console.log(tmp === TMP);

//练习1
var repeat = function (ele, times) {
    var result = '';
    for (var i = 0; i < times; i++) {
        result += ele;
    }

    return result;
}

var stars = 1;
while (stars++ <= 7) {
    console.log(repeat('*', stars - 1));
}

stars = '';
while (stars.length < 7) {
    stars += '*';
    console.log(stars);
}

//练习2
for (var i = 0; i <= 100; i++) {
    if (i % 3 == 0) {
        console.log('Fizz');
    } else if (i % 5 == 0) {
        console.log('Buzz');
    } else if (i % 15 == 0) {
        console.log('FizzBuzz');
    } else {
        console.log(i);
    }
}

//练习3
for (var row = 0; row < 8; row++) {
    var result = '';
    for (var col = 0; col < 8; col++) {
        if ((row + col) % 2) {
            result += 'o';
        } else {
            result += '*';
        }
    }

    console.log(result);
}

//chapter 3
//测试子模块1
var sub = {
    a: function () {
        return "sub_a";
    },

    b: function () {
        return "sub_b";
    }
};

console.log(sub.a());


//练习JS方法
function math() {
    return {
        add: function (a, b) {
            return a + b;
        },

        sub: function (a, b) {
            return a - b;
        }
    };

    return result;
};

console.log(math().add(1, 3));
console.log(math().sub(1, 3));

//测试return
console.log(function () {
    return;
}());


//测试闭包
function wrapValue(n) {
    var localValue = n;
    return function () {
        return localValue;
    }
}

var wrap1 = wrapValue(1);
var wrap2 = wrapValue(2);

console.log(wrap1());
console.log(wrap2());

//测试闭包2
function multiplier(n) {
    return function (m) {
        return m * n;
    }
}

var twice = multiplier(2);
console.log(twice(5));


//测试高阶函数
function operator(func, a, b) {
    return func(a, b);
}

console.log(operator(function (a, b) {
    return a - b;
}, 5, 10));

//测试数组
var arr = [2, 3, '5', function () {
}, {'name': 'sunyiwei'}];
for (var obj in arr) {
    console.log(arr[obj]);
}

//测试属性
var obj = {
    name: 'sunyiwei',
    age: 27,
    3: 103,
    sayHello: function (name) {
        console.log('hello, ' + name);
    }
}

var propName = 'age';
console.log(obj['name']);
console.log(obj[propName]);
console.log(obj[3]);
obj.sayHello('essviv');

//测试数组的push, pop方法
var tmpArr = [];
tmpArr.push('essviv');
tmpArr.push('patrick');
tmpArr.push('syw');
tmpArr.push('lisa');
console.log(tmpArr.join(' + '));

tmpArr.pop();
tmpArr.pop();
console.log(tmpArr);

//测试读取不存在的属性
var obj = {};
console.log(obj.unExistProp);
obj.unExistProp = 'existNow';
console.log(obj.unExistProp);

//测试对象的属性操作
obj = {
    name: '熊猫',
    // age: 27
};

console.log(obj.name);

judge(obj, 'age');

obj.age = 27; //赋值操作
judge(obj, 'age');

delete obj.age; //删除属性操作
judge(obj, 'age');

function judge(obj, prop) {
    console.log(prop in obj); //判断当前属性是否存在
    console.log(obj[prop]); //直接打印
}

//测试数组常见的方法
arr = [];
arr.push('hello'); //在末尾加入元素
arr.pop(); //在末尾弹出元素
arr.unshift('world'); //在开始加入元素
arr.shift(); //在开始去掉元素

//测试数组的子串功能，浅拷贝
arr.push('hello', 'world', 'nihao', 'sawadika');
var sliceArr = arr.slice(0, 2); //取子串
sliceArr[0] = 'sub0';
console.log(sliceArr);
console.log(arr);

//测试函数的arguments参数
function join(obj, seperator) {
    var result = '';

    var index = 0;
    for (var prop in obj) {
        if (index++ == 0) {
            result += (obj[prop]);
        } else {
            result += (seperator + obj[prop]);
        }
    }
    return result;
}

function testArg() {
    console.log('You gave me ' + arguments.length + ' arguments.' + join(arguments, ' + '));
}

testArg('name', 'age', 'height', {});
testArg();

//测试全局变量
// console.log(window.arr);

//chapter 4 练习
function range(start, end, step) {
    if (step === undefined || isNaN(step)) {
        step = 1;
    }

    var arr = [];

    if (step > 0) {
        for (var i = start; i <= end; i += step) {
            arr.push(i);
        }
    }else{
        for (var i = start; i >= end; i += step) {
            arr.push(i);
        }
    }

    return arr;
}

function sum(arr) {
    var length = arr.length;
    var sum = 0;
    for (var i = 0; i < length; i++) {
        sum += arr[i];
    }

    return sum;
}

console.log(sum(range(10, 1, -1)));

//反转数组
function reverse(arr){
    var length = arr.length;
    var newArr = [];

    for(var i = length - 1; i >= 0; i--){
       newArr.push(arr[i]);
    }

    return newArr;
}

function reverseInPlace(arr){
    var length = arr.length;
    for(var i = 0; i <= length / 2; i++){
        swap(arr, i, length - 1 - i);
    }
}

function swap(arr, from, to){
    var tmp = arr[from];
    arr[from] = arr[to];
    arr[to] = tmp;
}

function randArr(){
    var arr = [];
    var length = randInt(10) + 3; //at least 3
    for(var i = 0; i < length; i++){
        arr.push(randInt(10));
    }

    return arr;
}

function randInt(max){
    return Math.floor(Math.random() * max);
}

function printArr(arr){
    console.log(arr.join(', '));
}

var oriArr = randArr();
printArr(oriArr);

var reverseArr = reverse(oriArr);
printArr(oriArr);
printArr(reverseArr);

reverseInPlace(oriArr);
printArr(oriArr);
