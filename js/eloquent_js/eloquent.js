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

//测试子模块2
var math = function () {
    var result = {
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
    return function(m) {
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


