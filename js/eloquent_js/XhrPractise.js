/**
 * Created by sunyiwei on 2017/2/16.
 */
// 测试使用xhr

var proxy = function (config) {
    var xhr = new XMLHttpRequest();

    var method = config.method || "GET";
    var target = config.target;
    var isAsync = config.async || true;
    xhr.open(method, target, isAsync);

    if (config.onload) {
        xhr.addEventListener("load", config.onload);
    }

    if (config.onerror) {
        xhr.addEventListener("error", config.onerror);
    }

    if (config.onprogress) {
        xhr.addEventListener("progress", config.onprogress);
    }

    xhr.send(config.data);
};

proxy({
    method: "GET",
    target: "../../html/Form.html",
    async: true,

    onload: function(){
        console.log("load complete");
    },

    onprogress: function(evt){
        console.log("Progress: " + evt.loaded / evt.total);
    }
});


