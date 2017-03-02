/**
 * Created by sunyiwei on 2017/2/28.
 */

(function ($) {
    $.fn.color = function (options) {
        var options = $.extend({
            "color": "green",
            "background-color": "darkred"
        }, options);

        return this.css(options);
    };

    $.fn.form = function (options) {
        var options = $.extend({
            "myRequired": true
        }, options);

        //需要校验表单中的必填字段
        if (options.myRequired) {
            this.submit(function () {
                return $(this).find("input:text[myRequired]").each(function (idx, elem) {
                    if (!this.value) {
                        alert("请填写必填字段! ");
                    }
                });
            });
        }

        return this;
    };
})(jQuery);
