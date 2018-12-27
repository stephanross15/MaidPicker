"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserLogService_1 = require("./UserLogService");
var APIResponse = /** @class */ (function () {
    function APIResponse() {
    }
    APIResponse.sendResponse = function (req, res, resObject, resCode, message) {
        var response = APIResponse.response(req, resObject, message);
        if (resCode >= 100 && resCode < 600) {
            //  res.statusMessage = message; 
            res.status(resCode).send(response);
        }
        else {
            res.status(500).send(response);
        }
    };
    APIResponse.sendWebResponse = function (req, res, resObject, resCode, message) {
        var response = APIResponse.response(req, resObject, message);
        if (resCode >= 100 && resCode < 600) {
            res.statusMessage = message;
            res.status(resCode).send(response);
        }
        else {
            res.status(500).send(response);
        }
    };
    APIResponse.catchError = function (req, res, err) {
        // let message = ""; 
        console.log(err);
        //It contains all the thrown away errors.
        if (err.errorCode) {
            console.log("IF CASE" + err.errorMessage);
            // message = 
            err.errorMessage;
            err.code = err.errorCode;
            APIResponse.sendResponse(req, res, {}, err.code, err.errorMessage);
        }
        else {
            if (err.code) {
                //  message =  `ErrCode:${err.code}, ErrMsg:${err.message}`
                APIResponse.sendResponse(req, res, {}, err.code, "ErrCode:" + err.code + ", ErrMsg:" + err.message);
                // err.message = `ErrCode:${err.code}, ErrMsg:${err.message}`;
            }
            APIResponse.sendResponse(req, res, {}, err.code, "ErrCode:" + err.code + ", ErrMsg:" + err.message);
        }
        // APIResponse.sendResponse(req, res,  {}, err.code, message); 
    };
    APIResponse.catchWebError = function (req, res, err) {
        // let message = ""; 
        console.log(err);
        //It contains all the thrown away errors.
        if (err.errorCode) {
            console.log("IF CASE" + err.errorMessage);
            // message = 
            err.errorMessage;
            err.code = err.errorCode;
            APIResponse.sendWebResponse(req, res, {}, err.code, err.errorMessage);
        }
        else {
            if (err.code) {
                console.log("ELSE CASE" + err.message);
                //  message =  `ErrCode:${err.code}, ErrMsg:${err.message}`
                APIResponse.sendWebResponse(req, res, {}, err.code, "ErrCode:" + err.code + ", ErrMsg:" + err.message);
                // err.message = `ErrCode:${err.code}, ErrMsg:${err.message}`;
            }
            APIResponse.sendWebResponse(req, res, {}, err.code, "ErrCode:" + err.code + ", ErrMsg:" + err.message);
        }
        // APIResponse.sendResponse(req, res,  {}, err.code, message); 
    };
    APIResponse.response = function (req, resObject, message) {
        var resultResponse = {
            message: message,
            data: resObject
        };
        UserLogService_1.default.logResponse(req, resultResponse);
        return resultResponse;
    };
    return APIResponse;
}());
exports.default = APIResponse;
