/**
 * Created by sunyiwei on 2017/3/1.
 */

require.config({
    baseUrl: "../js",
    paths: {
        jquery: "jquery-3.1.1.min",
        flatpickr: "https://cdnjs.cloudflare.com/ajax/libs/flatpickr/2.4.2/flatpickr.min"
    },
    shim: {
        flatpickr: {
            exports: "flatpickr"
        }
    }
});


// requirejs.config({
//     baseUrl: 'lib',
//     paths: {
//         app: '../app'
//     }
// });
