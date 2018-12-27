"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var body_parser_1 = require("body-parser");
var Contants_1 = require("../util/Contants");
var cors = require('cors');
var bodyParser = require('body-parser');
var UserLogService_1 = require("../controllers/UserLogService");
var HomeService_1 = require("../controllers/HomeService");
var SignUpService_1 = require("../controllers/SignUpService");
var LoginService_1 = require("../controllers/LoginService");
var ApiRouter = /** @class */ (function () {
    function ApiRouter() {
        this.router = express();
        this.router.use(cors());
        this.addMiddlewares();
        this.addRoutes();
    }
    // Add all middlewares here that will get request before routes.
    ApiRouter.prototype.addMiddlewares = function () {
        //  Used to parse req.body into json object
        // this.router.use(bodyParser.urlencoded({ extended: true}));
        this.router.use(body_parser_1.json());
        this.router.use(bodyParser.urlencoded({ extended: false }));
        this.router.use(UserLogService_1.default.logRequest);
    };
    ApiRouter.prototype.addRoutes = function () {
        this.router.get(Contants_1.ApiNames.HOME, HomeService_1.default.Init);
        this.router.post(Contants_1.ApiNames.SIGNUP, SignUpService_1.default.signUp);
        this.router.post(Contants_1.ApiNames.VERIFY, SignUpService_1.default.phoneVerification);
        this.router.post(Contants_1.ApiNames.LOGIN, LoginService_1.default.LoginCases);
        this.router.post(Contants_1.ApiNames.LOGOUT, LoginService_1.default.Logout);
        this.router.post(Contants_1.ApiNames.FORGOTPASSWORD, SignUpService_1.default.ForgotPassword);
        // this.router.post(ApiNames.RESETPASSWORD, Signup.ResetPassword);
    };
    return ApiRouter;
}());
exports.default = new ApiRouter().router;
