/**
 * Created by sunyiwei on 2017/3/6.
 */

define(['./go'], {
    add: function (a, b) {
        return a + b;
    },

    minus: function (a, b) {
        return a - b;
    },

    multiply: function (a, b) {
        return a * b;
    },

    divide: function (a, b) {
        return b == 0 ? NaN : a / b;
    }
});