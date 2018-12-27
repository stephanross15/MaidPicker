"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseService_1 = require("./ResponseService");
var Contants_1 = require("../util/Contants");
var UtilityMethods_1 = require("../util/UtilityMethods");
var Contants_2 = require("../util/Contants");
var AuthenticationCore_1 = require("../database/core/AuthenticationCore");
var LoginResponse_1 = require("../responses/LoginResponse");
var UserCore_1 = require("../database/core/UserCore");
var request = require('request-promise');
var Login = /** @class */ (function () {
    function Login() {
    }
    Login.Logout = function (req, res) {
        var json = req.body;
        AuthenticationCore_1.authenticationDao.getUserByAccessToken(json.accessToken)
            .then(function (loggedin) {
            if (!loggedin)
                throw Contants_1.ResponseMessages.BAD_TOKEN_REQUEST;
            if (loggedin.refreshToken == "" || !loggedin.refreshToken)
                throw Contants_1.ResponseMessages.BAD_REFRESH_TOKEN_REQUEST;
            return AuthenticationCore_1.authenticationDao.logout(json.accessToken);
        }).then(function () {
            ResponseService_1.default.sendResponse(req, res, {}, Contants_2.ErrorCodes.OK, Contants_1.ResponseMessages.LOGOUT_SUCCESSFULLY);
        }).catch(function (err) {
            ResponseService_1.default.catchError(req, res, err);
        });
    };
    Login.LoginCases = function (req, res) {
        var json = req.body;
        if (json.isFaceBookSignup == false) // APP login
         {
            var loginDetails = {};
            UserCore_1.userDao.getUserByEmail(json.emailId)
                .then(function (user) {
                if (user == null || !(user)) { //User Not Registered .... allow him/her to register ...
                    throw Contants_1.ResponseMessages.NO_USER_FOUND;
                }
                else {
                    // User already registered...
                    // var encryptedjsonPassword : String =  UtilityMethods.AesEncrypt(json.password.toString());
                    //user.password already encrypted..
                    if (!user.isAccountVerified) {
                        throw Contants_1.ResponseMessages.PHONE_NUMBER_NOT_VERIFY;
                    }
                    if (user.password == json.password) {
                        var accessToken = UtilityMethods_1.UtilityMethods.generateNewAuthToken();
                        return AuthenticationCore_1.authenticationDao.saveUserData(user._id, accessToken, json.deviceId, json.uniqueId, json.deviceType, json.deviceVersion)
                            .then(function (savedLogin) {
                            if (!savedLogin)
                                throw Contants_1.ResponseMessages.SOMETHING_WENT_WRONG;
                            ResponseService_1.default.sendResponse(req, res, LoginResponse_1.loginResponse(savedLogin.accessToken), Contants_2.ErrorCodes.OK, Contants_1.ResponseMessages.LOGIN_SUCCESSFULLY);
                        }).catch(function (err) { return ResponseService_1.default.catchError(req, res, err); });
                    }
                    else {
                        throw Contants_1.ResponseMessages.LOGIN_INCORRECT_PASSWORD;
                    }
                }
            }).catch(function (err) { return ResponseService_1.default.catchError(req, res, err); });
        }
        else {
            var fbAccessToken = req.body.fbAccessToken;
            var userFieldSet = 'id,name,email,picture.type(large)';
            var url = "https://graph.facebook.com/v3.1/me?access_token=" + fbAccessToken + "&fields=" + userFieldSet;
            var options = {
                method: 'GET',
                uri: url,
            };
            request(options)
                .then(function (facebookRes, err) {
                if (err)
                    throw err;
                facebookRes = JSON.parse(facebookRes);
                var fbDetails = {};
                fbDetails.userName = facebookRes.name;
                fbDetails.emailId = facebookRes.email;
                fbDetails.imageHeight = facebookRes.picture.data.height;
                fbDetails.imageWidth = facebookRes.picture.data.width;
                fbDetails.imageurl = facebookRes.picture.data.url;
                fbDetails.id = facebookRes.id;
                if (!facebookRes.email) {
                    throw Contants_1.ResponseMessages.FACEBOOK_SITE_ERROR;
                }
                else {
                    res.send(facebookRes);
                    //Login.CheckOnFBData(req, res, fbDetails, json);
                }
            }).catch(function (err) {
                ResponseService_1.default.catchError(req, res, err);
            });
        }
    };
    Login.CheckOnFBData = function (req, res, fbres, json) {
        UserCore_1.userDao.getDataForFaceBook(fbres.emailId)
            .then(function (data) {
            if (!data) {
                Login.FBDBCaseNo(req, res, fbres, json, data);
            }
            else {
                if (data.isFacebookSignup == false) {
                    throw Contants_1.ResponseMessages.FACEBOOK_LOGIN_ERROR;
                }
                else {
                    Login.FBDBCaseYes(req, res, fbres, json, data);
                }
            }
        }).catch(function (err) { return ResponseService_1.default.catchError(req, res, err); });
    };
    Login.FBDBCaseNo = function (req, res, fbres, json, data) {
        UserCore_1.userDao.addFacebookData(fbres)
            .then(function (datas) {
            if (!datas) {
                throw Contants_1.ResponseMessages.SOMETHING_WENT_WRONG;
            }
            var accessToken = UtilityMethods_1.UtilityMethods.generateNewAuthToken();
            return AuthenticationCore_1.authenticationDao.saveFacebookData(datas._id, accessToken, json.deviceId, json.uniqueId, json.deviceType, json.deviceVersion);
        }).then(function (userData) {
            if (!userData) {
                throw Contants_1.ResponseMessages.SOMETHING_WENT_WRONG;
            }
            ResponseService_1.default.sendResponse(req, res, LoginResponse_1.loginResponse(userData.accessToken), Contants_2.ErrorCodes.OK, Contants_1.ResponseMessages.LOGIN_SUCCESSFULLY);
        }).catch(function (err) { return ResponseService_1.default.catchError(req, res, err); });
    };
    Login.FBDBCaseYes = function (req, res, fbres, json, data) {
        // userDao.UpdateFacebookData(json.lat, json.lng, data._id)
        //     .then(datas => {
        //         if (!datas) { throw ResponseMessages.SOMETHING_WENT_WRONG; }
        var accessToken = UtilityMethods_1.UtilityMethods.generateNewAuthToken();
        //   const refreshToken = UtilityMethods.generateNewAuthToken();
        AuthenticationCore_1.authenticationDao.saveFacebookData(data._id, accessToken, json.deviceId, json.uniqueId, json.deviceType, json.deviceVersion)
            //   })
            .then(function (userData) {
            if (!userData) {
                throw Contants_1.ResponseMessages.SOMETHING_WENT_WRONG;
            }
            ResponseService_1.default.sendResponse(req, res, LoginResponse_1.loginResponse(userData.accessToken), Contants_2.ErrorCodes.OK, Contants_1.ResponseMessages.LOGIN_SUCCESSFULLY);
        }).catch(function (err) { return ResponseService_1.default.catchError(req, res, err); });
    };
    return Login;
}());
exports.default = Login;
