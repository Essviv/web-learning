/**
 * Created by sunyiwei on 2017/2/20.
 */

//noinspection JSValidateTypes
if (undefined === typeof jscript) {
    jscript = function () {
    }
}

jscript.array = function () {
};

jscript.array.copyArray = function (src, dst) {
    for (var i = 0; i < src.length; i++) {
        dst.push(src[i]);
    }

    return dst;
};

jscript.array.findInArray = function (srcArr, value) {
    for (var i = 0; i < srcArr.length; i++) {
        if (srcArr[i] == value) {
            return i;
        }
    }

    return -1;
};

jscript.array.avg = function (srcArr) {
    return srcArr.reduce(function (sum, value) {
            return sum += value;
        }, 0) / srcArr.length;
};

jscript.browser = function () {
};

jscript.browser.getBrowserIdentity = function () {
    return navigator.appName + " " + navigator.appVersion;
};

jscript.dateTime = function () {
};

jscript.dateTime.isLeapYear = function (year) {
    return year % 100 == 0 ? year % 400 == 0 : year % 4 == 0;
};

jscript.dateTime.getDaysOfMonth = function (month, year) {
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        case 2:
            return this.isLeapYear(year) ? 29 : 28;
        default:
            return 30;
    }
};


jscript.debug = function () {
};
jscript.debug.enumProps = function (obj) {
    var result = "";
    for (var prop in obj) {
        result += (prop + ": " + obj[prop] + "\n");
    }

    alert(result);
};

jscript.debug.DivLogger = function () {
    this.LEVEL_TRACE = 1;
    this.LEVEL_DEBUG = 2;
    this.LEVEL_INFO = 3;
    this.LEVEL_WARN = 4;
    this.LEVEL_ERROR = 5;
    this.LEVEL_FATAL = 6;

    this.LEVEL_TRACE_COLOR = "a0a000";
    this.LEVEL_DEBUG_COLOR = "64c864";
    this.LEVEL_INFO_COLOR = "000000";
    this.LEVEL_WARN_COLOR = "0000ff";
    this.LEVEL_ERROR_COLOR = "ff8c00";
    this.LEVEL_FATAL_COLOR = "ff0000";

    this.logLevel = 3;
    this.targetDiv = null;
    this.setLevel = function (level) {
        this.logLevel = level;
    };

    this.setTargetDiv = function (targetDiv) {
        this.targetDiv = targetDiv;
        this.targetDiv.innerHTML = "";
    };

    this.shouldLog = function (level) {
        return level >= this.logLevel;
    };

    this.trace = function (msg) {
        log({"levelValue": this.LEVEL_TRACE, "color": this.LEVEL_TRACE_COLOR, "info": "TRACE"}, msg);
    };

    this.debug = function (msg) {
        log({"levelValue": this.LEVEL_DEBUG, "color": this.LEVEL_DEBUG_COLOR, "info": "DEBUG"}, msg);
    };

    this.info = function (msg) {
        log({"levelValue": this.LEVEL_INFO, "color": this.LEVEL_INFO_COLOR, "info": "INFO"}, msg);
    };

    this.warn = function (msg) {
        log({"levelValue": this.LEVEL_WARN, "color": this.LEVEL_WARN_COLOR, "info": "WARN"}, msg);
    };

    this.error = function (msg) {
        log({"levelValue": this.LEVEL_ERROR, "color": this.LEVEL_ERROR_COLOR, "info": "ERROR"}, msg);
    };

    this.fatal = function (msg) {
        log({"levelValue": this.LEVEL_FATAL, "color": this.LEVEL_FATAL_COLOR, "info": "FATAL"}, msg);
    };

    function log(levelObj, msg) {
        if (this.shouldLog(levelObj.levelValue) && this.targetDiv) {
            this.targetDiv.innerHTML = "<div style='color: " + levelObj.color + ";'>[" + levelObj.info + "]: " + msg + "</div>";
        }
    }
};

jscript.dom = function () {
};
jscript.dom.centerH = function (obj) {
    var lca;
    var lcb;
    var lcx;
    var iebody;
    var dsocLeft;


    if (window.innerWidth) {
        lca = window.innerWidth;
    } else {
        lca = document.body.clientWidth;
    }

    lcb = obj.offsetWidth;
    lcx = Math.abs(Math.round((lca - lcb) / 2));
    iebody = (document.compatMode && document.compatMode != "BackCompact") ? document.documentElement : document.body;
    dsocLeft = document.all ? iebody.scrollLeft : window.pageXOffset;
    obj.style.left = lcx + dsocLeft + "px";
};

jscript.dom.centerY = function (obj) {
    var lca;
    var lcb;
    var lcy;
    var iebody;
    var dsocTop;


    if (window.innerHeight) {
        lca = window.innerHeight;
    } else {
        lca = document.body.clientHeight;
    }

    lcb = obj.offsetHeight;
    lcy = Math.abs(Math.round((lca - lcb) / 2));
    iebody = (document.compatMode && document.compatMode != "BackCompact") ? document.documentElement : document.body;
    dsocTop = document.all ? iebody.scrollTop : window.pageYOffset;
    obj.style.top = lcy + dsocTop + "px";
};

jscript.dom.execScript = function (text) {
    var reg = /(<script>(.*)<\/script>)/g;
    var resultArr;
    while ((resultArr = reg.exec(text)) !== null) {
        eval(resultArr[2]);
    }
};

jscript.dom.getElements = function () {
    if (arguments.length == 0) {
        return null;
    }

    if (arguments.length == 1) {
        return document.getElementById(arguments[0]);
    }

    var elems = [];
    for (var i = 0; i < arguments.length; i++) {
        elems.push(document.getElementById(arguments[i]));
    }

    return elems;
};

jscript.form = function () {
};

jscript.form.formToXml = function (form, rootElem) {
    if (form == null || rootElem == null) {
        return null;
    }

    var outXml = buildOpenTag(rootElem);
    for (var i = 0; i < form.length; i++) {
        var ofe = form[i];
        var ofeType = ofe.type.toUpperCase();
        var ofeName = ofe.name;
        var ofeValue = ofe.value;

        if (ofeType == "TEXT" || ofeType == "HIDDEN" || ofeType == "PASSWORD" || ofeType == "TEXTAREA" || ofeType == "SELECT-ONE") {
            outXml += buildOpenTag(ofeName) + ofeValue + buildCloseTag(ofeName);
        }

        if (ofeType == "RADIO" && ofe.checked == "true") {
            outXml += buildOpenTag(ofeName) + ofeValue + buildCloseTag(ofeName);
        }

        if (ofeType == "CHECKBOX") {
            if (ofe.checked) {
                outXml += buildOpenTag(ofeName) + "true" + buildCloseTag(ofeName);
            } else {
                outXml += buildOpenTag(ofeName) + "false" + buildCloseTag(ofeName);
            }
        }
    }

    outXml += buildCloseTag(rootElem);
    return outXml;
};

jscript.dom.selectOption = function (inSelect, inValue, caseSensitive, toSelect) {
    if (inSelect == null || inValue == inValue) {
        return null;
    }

    caseSensitive = caseSensitive || true;
    toSelect = toSelect || false;

    inValue = caseSensitive ? inValue : inValue.toLowerCase();

    var match = false;
    for (var i = 0; i < inSelect.options.length; i++) {
        var option = inSelect.options[i];

        if (caseSensitive) {
            match = (option.value == inValue);
        } else {
            match = (option.value.toLowerCase() == inValue);
        }

        if (match) {
            if (toSelect) {
                option.selected = true;
            }

            return true;
        }
    }

    return false;
};

jscript.dom.selectAll = function (selectElem) {
    setValue(selectElem, true);
};

jscript.dom.unselectAll = function (selectElem) {
    setValue(selectElem, false);
};

jscript.lang = function () {
};

jscript.lang.copyProps = function (src, dst, isOverride) {
    if (!src || !dst) {
        return;
    }

    isOverride = isOverride || false;
    for (var prop in src) {
        if (isOverride || !dst[prop]) {
            dst[prop] = src[prop];
        }
    }

    return dst;
};

jscript.math = function () {
};
jscript.math.random = function (min, max) {
    if (max < min) {
        return 0;
    }

    return Math.random() * (max - min) + min;
};

jscript.page = function () {
};
jscript.page.breakOutFrame = function () {
    if (self != top) {
        top.location = self.location;
    }
};

jscript.storage = function () {
};
jscript.storage.setCookie = function (name, value, expire) {
    if (typeof expire === 'Date') {
        expire = expire.toGMTString();
    }

    document.cookie = name + "=" + escape(value) + ";expires=" + expire;
};

jscript.storage.getCookie = function (name) {
    var cookie = document.cookie;
    var fromIndex = cookie.indexOf(name + "=");
    if (fromIndex == -1) {
        return null;
    }

    fromIndex = cookie.indexOf("=", fromIndex) + 1;
    var endIndex = cookie.indexOf(";", fromIndex);
    if (endIndex == -1) {
        endIndex = cookie.length;
    }

    return unescape(cookie.substr(fromIndex, endIndex));
};

jscript.storage.deleteCookie = function (name) {
    var cookie = this.getCookie(name);
    if (cookie != null) {
        this.setCookie(name, null, new Date(1970, 1, 1));
    }
};

jscript.string = function () {
};
jscript.string.substrCount = function (str, subStr) {
    var reg = new RegExp(subStr, 'g');
    var arr;

    var count = 0;
    while ((arr = reg.exec(str)) !== null) {
        count++;
    }

    return count;
};

jscript.string.replace = function (str, oldSub, newSub) {
    if (!str || !oldSub || !newSub) {
        return;
    }

    while (str.index(oldSub) != -1) {
        str.replace(oldSub, newSub);
    }

    return str;
};

jscript.string.leftTrim = function (str) {
    for (var i = 0; str[i] == " "; i++) {
    }
    return str.substring(i);
};

jscript.string.rightTrim = function (str) {
    for (var i = str.length - 1; str[i] == " "; i--) {
    }
    return str.substring(0, i + 1);
};

jscript.string.fullTrim = function (str) {
    str = this.leftTrim(str);
    return this.rightTrim(str);
};

jscript.string.breakLine = function (str, size) {
    if (!str) {
        return;
    }

    if (str.length <= size) {
        return str;
    }

    var arr = [];
    while (str.length > size) {
        var subStr = str.substring(0, size);
        var y = subStr.indexOf(" ");
        var z = subStr.indexOf("\n");

        if (z != -1) {
            y = z;
        }

        if (y == -1) {
            y = size;
        }

        subStr = str.substring(0, y);
        arr.push(subStr);

        str = str.substring(y);
    }

    return arr;
};

function setValue(selectElem, value) {
    if (!selectElem || !selectElem.options) {
        return;
    }

    for (var i = 0; i < selectElem.options.length; i++) {
        selectElem.options[i].selected = value;
    }
}

function buildOpenTag(value) {
    return "<" + value + ">";
}

function buildCloseTag(value) {
    return "</" + value + ">";
}
