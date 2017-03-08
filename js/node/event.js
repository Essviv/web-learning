/**
 * Created by sunyiwei on 2017/3/8.
 */
//nodejs中events模块的学习


const EventEmitter = require('events');

var emitter = new EventEmitter();

emitter.on("newListener", (eventName, listener) => {
    console.log(`newListener: {eventName: ${eventName}, listener: ${listener}}`);
});

emitter.on("removeListener", (eventName, listener) => {
    console.log(`removeListener: {eventName: ${eventName}, listener: ${listener}}`);
});

emitter.on("addInternal", () => {
    emitter.on("get", () => {
        console.log("add internal.");
    });
});

emitter.on("get", () => {
    console.log("get event invoke.");
});

emitter.on("post", (body) => {
    console.log(`post event invoke: {body: ${body}`);
});

emitter.once("trace", () => {
    console.log("trace event invoke");
});

emitter.prependListener("post", (body) => {
    console.log(`prepend post: {body: ${body}}`);
});

emitter.removeAllListeners("post");


emitter.emit("get");
emitter.emit("post");
emitter.emit("trace");

console.log("DefaultMaxListeners: " + EventEmitter.defaultMaxListeners);
console.log("MaxListeners: " + emitter.getMaxListeners());
console.log(emitter.listenerCount("get"));
console.log(emitter.eventNames());
