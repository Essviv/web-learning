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
    speak: function (name) {
        console.log('hello, ' + name);
    }
}

var propName = 'age';
console.log(obj['name']);
console.log(obj[propName]);
console.log(obj[3]);
obj.speak('essviv');

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
    } else {
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
function reverse(arr) {
    var length = arr.length;
    var newArr = [];

    for (var i = length - 1; i >= 0; i--) {
        newArr.push(arr[i]);
    }

    return newArr;
}

function reverseInPlace(arr) {
    var length = arr.length;
    for (var i = 0; i <= length / 2; i++) {
        swap(arr, i, length - 1 - i);
    }
}

function swap(arr, from, to) {
    var tmp = arr[from];
    arr[from] = arr[to];
    arr[to] = tmp;
}

function randArr() {
    var arr = [];
    var length = randInt(10) + 3; //at least 3
    for (var i = 0; i < length; i++) {
        arr.push(randInt(10));
    }

    return arr;
}

function randInt(max) {
    return Math.floor(Math.random() * max);
}

function printArr(arr) {
    console.log(arr.join(', '));
}

var oriArr = randArr();
printArr(oriArr);

var reverseArr = reverse(oriArr);
printArr(oriArr);
printArr(reverseArr);

reverseInPlace(oriArr);
printArr(oriArr);

//chapter 4
//高阶函数
function forEach(arr, func) {
    for (var i = 0; i < arr.length; i++) {
        func(arr[i]);
    }
}

forEach(oriArr, function (item) {
    console.log(item);
});

var sum = 0;
forEach(oriArr, function (item) {
    sum += item;
});
console.log(sum);

var result = '';
forEach(oriArr, function (item) {
    result += item;
});
console.log(result);

//高阶函数2
function greaterThan(m) {
    return function (n) {
        return n > m;
    }
}

var f = greaterThan(10);
console.log(f(3));
console.log(f(13));

//高阶函数3
function noisy(f) {
    return function (arg) {
        console.log("Calling with args: ", arg);
        var val = f(arg);
        console.log("called with ", arg, " - got: ", val);
        return val;
    }
}

function sayHello(name) {
    return 'hello, ' + name;
}

noisy(sayHello)('sunyiwei');

//高阶函数4
function unless(test, then) {
    if (test) {
        then();
    }
}

unless(0 == 0, function () {
    console.log("TRUE")
});

function duplicate(times, func) {
    for (var i = 0; i < times; i++) {
        func(i);
    }
}

duplicate(10, function (index) {
    unless(index % 2 == 0, function () {
        console.log(index + ' is even!');
    })
});

//测试高阶函数时的arguments参数
function outer(f) {
    var outerArgs = arguments;
    console.log(outerArgs);

    return function () {
        var innerArgs = arguments;
        console.log(innerArgs);
    }
}

outer(function () {

})();

function forEach2(arr, f) {
    for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        f(obj);
    }
}

forEach2([2, 3, 4, 5], function () {
    console.log(arguments[0]);
});

var obj = {};
obj.name = 'sunyiwei';
obj.age = 27;
obj.gender = 'M';

var objStr = JSON.stringify(obj);
console.log(objStr);

obj = JSON.parse(objStr);
console.log(obj.age);
console.log(typeof obj);

function filter(arr, test) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        if (test(obj)) {
            newArr.push(obj);
        }
    }

    return newArr;
}


var ages = [23, 24, 25, 27, 29, 30, 31, 35];
var filteredAges = filter(ages, function (age) {
    return age >= 25 && age <= 30;
});
console.log(filteredAges.join(", "));

function map(arr, map) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        newArr.push(map(obj));
    }

    return newArr;
}

var objs = [
    {name: 'sunyiwei', age: 27},
    {name: 'Json', age: 30},
    {name: 'Cavin', age: 31},
    {name: 'Jetty', age: 37},
    {name: 'essviv', age: 25},
    {name: 'patrick', age: 24},
    {name: 'Lisa', age: 23},
    {name: 'God', age: 2000}
];
var mapArr = map(objs, function (obj) {
    return obj.name;
});

console.log(mapArr.join(", "))

function reduce(arr, start, func) {
    for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        start = func(start, obj);
    }

    return start;
}

function avg(arr) {
    return reduce(arr, 0, function (a, b) {
            return a + b;
        }) / arr.length;
}

console.log(reduce([2, 3, 4, 5, 6, 8], 1, function (start, newValue) {
    return start * newValue;
}));

console.log(reduce([2, 3, 4, 5, 6, 8], 0, function (start, newValue) {
    return start + newValue;
}));

console.log(avg([2, 3, 4, 5, 6, 8]));

console.log(reduce(arr, '', function (a, b) {
    if (a === '') {
        return b;
    } else {
        return a + ', ' + b;
    }
}));

//测试bind函数
function isGreaterThan(dst, src) {
    return src > dst;
}

console.log(filter([23, 24, 25, 26, 27, 28, 29, 30], isGreaterThan.bind(null, 25)));


//测试apply方法
x = 31;

var applyObj = {
    x: 23,
    applyObjX: function () {
        return this.x;
    }
};

console.log(x); //expected 31
console.log(applyObj.applyObjX()); //expected 23

var applyObjX = applyObj.applyObjX;
console.log(applyObjX()); //expected 31
console.log(applyObjX.apply(applyObj)); //expected 23

//测试every和some
function every(arr, test) {
    for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        if (!test(obj)) {
            return false;
        }
    }

    return true;
}

function some(arr, test) {
    for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        if (test(obj)) {
            return true;
        }
    }

    return false;
}

function isPrime(val) {
    var ub = Math.floor(Math.sqrt(val));
    for (var i = 2; i <= ub; i++) {
        if (val % i == 0) {
            return false;
        }
    }

    return true;
}

//判断是否全部为素数
console.log(every([2, 3, 5, 7, 11], isPrime));
console.log(every([2, 3, 4, 7, 11], isPrime));

//判断是否包含素数
console.log(some([2, 3, 4, 7, 11], isPrime));
console.log(some([12, 6, 4, 9, 15], isPrime));

//chapter 5

//测试this指针
function speak(line) {
    return "The " + this.type + " rabbit says: '" + line + "'";
}

var black = {
    type: 'black',
    speak: speak
};

var red = {
    type: 'red',
    speak: speak
};

console.log(black.speak("I'm a black rabbit."));
console.log(red.speak("I'm a red rabbit."));

type = 'hallow';
console.log(speak('global'));
console.log(speak.apply(red, ["I'm using apply method."]));
console.log(speak.call(red, "I'm using apply method."));

//测试prototype
var emptyObj = {};
console.log(emptyObj.toString);
console.log(emptyObj.toString());
console.log(Object.getPrototypeOf({}) == Object.prototype);
console.log(Object.getPrototypeOf(Object.prototype));
console.log(Object.prototype.toString());
console.log(Object.getPrototypeOf([]) == Array.prototype);
console.log(Object.getPrototypeOf(isNaN) == Function.prototype);

console.log(Object.prototype == Object.getPrototypeOf(Function.prototype));

function Car() {

}

var car = new Car();
console.log(car.__proto__ == Car.prototype); //true
console.log(car.prototype === undefined); //true
console.log(Object.getPrototypeOf(car) == car.__proto__); //true
console.log(Object.getPrototypeOf(car) == car.prototype); //false

var protoRabbit = {
    speak: function (value) {
        console.log("The " + this.type + " rabbit says: " + value);
    }
};

var killerRabbit = Object.create(protoRabbit);
killerRabbit.type = 'killer';
killerRabbit.speak('SKEEEE!');

var globalFunc = protoRabbit.speak;
type = 'global';
globalFunc('GLOBAL');

//测试constructor
console.log(car.constructor == Car); //true
console.log(Car.prototype == car.__proto__); //true
console.log(Car.prototype == Object.getPrototypeOf(car)); //true
console.log(Object.getPrototypeOf(Car) == Function.prototype);

Car.prototype.fly = function () {
    console.log("Car is flying.");
};

car.fly();

//覆盖属性
Car.prototype.wheelCount = 4;
car.wheelCount = 5;

console.log(car.wheelCount); //5
console.log(new Car().wheelCount); //4

//原型干涉
function put(event, data) {
    map[event] = data;
}

function printAll() {
    console.log('<================>');
    for (var obj in map) {
        console.log(obj);
    }
    console.log('<================>');
}

var map = {};
put('pizza', 'dfsadf');
put('touched', 'toudsafd');

printAll();

Object.prototype.nonsense = 'hi';
printAll();

console.log('nonsense' in map); //true
console.log('toString' in map); //true

delete Object.prototype.nonsense;

//通过defineProperty方法来声明属性
Object.defineProperty(Object.prototype, 'hiddenNonse', {enumerable: false, value: 'hi'});
printAll();
console.log('hiddenNonse' in map); //true
console.log(map.hasOwnProperty('hiddenNonse')); //false
delete Object.prototype.hiddenNonse;

//使用Object.create方法创建对象，并指定它的prototype
var createObj = Object.create(null);
console.log(Object.getPrototypeOf(createObj)); //null
console.log(createObj.prototype); //undefined

var anotherCreateObj = {};
console.log(Object.getPrototypeOf(anotherCreateObj)); //{}
console.log(anotherCreateObj.prototype); //undefined

//测试多态
function Shape() {
    return {
        toString: function () {
            return "shape";
        }
    }
}

var circle = new Shape();
circle.toString = function () {
    return "circle";
};
console.log(circle.toString());

//测试表格布局
function rowHeights(rows) {
    return rows.map(function (row) {
        return row.reduce(function (max, cell) {
            return Math.max(max, cell.minHeight());
        }, 0)
    });
}

function colWidths(rows) {
    return rows[0].map(function (_, i) {
        return rows.reduce(function (max, row) {
            return Math.max(max, row[i].minWidth());
        }, 0);
    });
}

function drawTable(rows) {
    var heights = rowHeights(rows);
    var widths = colWidths(rows);

    function drawLine(blocks, lineNo) {
        return blocks.map(function (block) {
            return block[lineNo];
        }).join(" ");
    }

    function drawRow(row, rowNum) {
        var blocks = row.map(function (cell, colNum) {
            return cell.draw(widths[colNum], heights[rowNum]);
        });

        return blocks[0].map(function (_, lineNo) {
            return drawLine(blocks, lineNo);
        }).join("\n");
    }

    return rows.map(drawRow).join("\n");
}

function repeat(string, times) {
    var result = '';
    for (var i = 0; i < times; i++) {
        result += string;
    }

    return result;
}


function TextCell(isHeader) {
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var charLength = chars.length;

    var length = Math.floor(Math.random() * 10) + 1;
    var result = '';

    for (var i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * charLength)];
    }

    if (isHeader) {
        result += '\n';
        result += repeat('-', length);
    }

    this.text = result.split('\n');
}

TextCell.prototype.minWidth = function () {
    return this.text.reduce(function (width, line) {
        return Math.max(width, line.length);
    }, 0);
};

TextCell.prototype.minHeight = function () {
    return this.text.length;
};

TextCell.prototype.draw = function (width, height) {
    var result = [];
    for (var i = 0; i < height; i++) {
        var line = this.text[i] || '';
        result.push(line + repeat(' ', width - line.length));
    }

    return result;
};

var rows = [];
for (var i = 0; i < 5; i++) {
    var row = [];

    var isHeader = i == 0;

    for (var j = 0; j < 5; j++) {
        row.push(new TextCell(isHeader));
    }
    rows.push(row);
}

var result = drawTable(rows);
console.log(result);

//使用高阶函数打印九九乘法口诀表
function range(from, to) {
    var result = [];
    for (var i = from; i <= to; i++) {
        result.push(i);
    }

    return result;
}

function drawLines(lines) {
    return lines.map(function (line) {
        return line.map(function(cell){
           return cell.draw();
        }).join("  ");
    }).join('\n');
}

function lines(rows, cols){
    return rows.map(function(row){
        return cols.map(function(col){
           return new Cell(row, col);
        });
    });
}

function Cell(row, col) {
    this.row = row;
    this.col = col;
}

Cell.prototype.draw = function () {
    return this.row + "*" + this.col + "=" + this.col * this.row;
};

var rows = range(1, 9);
var cols = range(1, 9);
console.log(drawLines(lines(rows, cols)));
