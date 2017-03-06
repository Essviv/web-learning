/**
 * Created by sunyiwei on 2017/3/6.
 */

define(['./math', './go'], function (math) {
    //do some init jog
    console.log("init module cities");

    return {
        name: "sunyiwei",
        height: 1.8,
        calc: math.multiply(3, 5)
    }
});
