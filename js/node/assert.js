/**
 * Created by sunyiwei on 2017/3/7.
 */

const assert = require("assert");

assert(true);

assert(0 === 0, "assert fail");

assert(true, "assert fail");

assert.ok("kk", "assert failed");

//deepEquals
var obj1 = {a: {b: 1}};
var obj2 = {a: {b: 2}};
var obj3 = {a: {b: 1}};

// assert.deepEqual(obj1, obj2, "assert failed in deepEquals");
assert.deepEqual(obj1, obj3, "assert failed in deepEquals");

var obj4 = {a: {b: "1"}};
var obj5 = {a: {b: 1}};

assert.deepEqual(obj4, obj5);
// assert.deepStrictEqual(obj4, obj5, "deep strict equal fail.");


//doesNotThrow
// assert.doesNotThrow(() => {
//     throw new TypeError("Wrong type");
// }, TypeError, "typeError");

//equals
// assert.equal({a: {b: 1}}, {a: {b: '1'}});
assert.deepEqual({a: {b: 1}}, {a: {b: '1'}});

//ifError
assert.ifError(false);
// assert.ifError(1);

//not strict equal
assert.notStrictEqual(1, '1', "not strict equal");

//throw
assert.throws(()=>{
    throw new Error("Wrong value");
}, /value/, "throw error msg");
