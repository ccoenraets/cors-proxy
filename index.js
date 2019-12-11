"use strict";
exports.__esModule = true;
var server_ts_1 = require("./server-ts");
var bodyLimit = typeof (process.argv[2]) != 'undefined' ? process.argv[2] : '100kb';
exports.app = server_ts_1.Server.bootstrap(bodyLimit).app;
exports.app.listen(3000, function (err) {
    if (!err)
        console.log("cors proxy listening at 3000");
    else {
        console.error(err);
    }
});
