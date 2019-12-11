"use strict";
exports.__esModule = true;
var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var Server = /** @class */ (function () {
    function Server(bodyLimit) {
        // create expressjs application
        this.app = express();
        // configure application
        this.config(bodyLimit);
        this.enableCors();
    }
    Server.bootstrap = function (bodyLimit) {
        return new Server(bodyLimit);
    };
    Server.prototype.config = function (bodyLimit) {
        // add body parser
        this.app.use(bodyParser.json({ limit: bodyLimit }));
        // mount query string parser
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
    };
    Server.prototype.enableCors = function () {
        console.log("inside cors");
        this.app.use(function (req, res, next) {
            // Set CORS headers: allow all origins, methods, and headers: you may want to lock this down in a production environment
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
            res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));
            if (req.method === 'OPTIONS') {
                // CORS Preflight
                res.send();
            }
            else {
                var targetURL = req.header('Target-URL');
                if (!targetURL) {
                    res.status(500).send({ error: 'There is no Target-Endpoint header in the request' });
                    return;
                }
                request({ url: targetURL + req.url, method: req.method, json: req.body, headers: { 'Authorization': req.header('Authorization') } }, function (error, response, body) {
                    if (error) {
                        console.error('error: ' + response.statusCode);
                    }
                    //                console.log(body);
                }).pipe(res);
            }
        });
    };
    return Server;
}());
exports.Server = Server;
