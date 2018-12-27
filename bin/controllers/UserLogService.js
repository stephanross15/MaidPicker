"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Log = /** @class */ (function () {
    function Log() {
    }
    Log.logError = function (err) {
        err = "Error: " + err;
        Log.log(err);
    };
    Log.logMessage = function (msg) {
        msg = "Message: " + msg;
        Log.log(msg);
    };
    Log.logRequest_new = function (request, res, next) {
        var body = '';
        request.on('data', function (chunk) {
            body += chunk.toString();
        });
        request.on('end', function () {
            //  console.log(body);
        });
        var fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
        // if (request.params) {
        //     fullUrl += [].join.call(request.params, "/");
        // }
        var uniqueIdForLog = Math.floor(Math.random() * 15463);
        request.uniqueIdForLog = uniqueIdForLog;
        var msg = "Req" + String(uniqueIdForLog) + ": " + fullUrl;
        msg += "\r\n Body: " + body;
        Log.log(msg);
        next();
    };
    Log.logRequest = function (req, res, next) {
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        if (req.params) {
            fullUrl += [].join.call(req.params, "/");
        }
        var uniqueIdForLog = Math.floor(Math.random() * 15463);
        req.uniqueIdForLog = uniqueIdForLog;
        var msg = "Req" + String(uniqueIdForLog) + ": " + fullUrl;
        msg += "\r\n Body: " + JSON.stringify(req.body);
        //  console.log(msg);
        Log.log(msg);
        next();
    };
    Log.logResponse = function (req, res) {
        var msg = "Res" + String(req.uniqueIdForLog) + ": " + JSON.stringify(res);
        Log.log(msg);
    };
    Log.log = function (data) {
        data += "\r\n";
        var dir = "UserLogs";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        var name = dir + "/logs_";
        var date = new Date();
        name += date.getFullYear() + "_";
        name += date.getMonth() + 1 + "_";
        name += date.getDate() + ".txt";
        fs.appendFile(name, String(data), function (err) {
            if (err)
                console.log(err);
            else
                console.log(data);
        });
    };
    return Log;
}());
exports.default = Log;
