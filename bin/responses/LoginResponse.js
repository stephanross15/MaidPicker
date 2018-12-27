"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
exports.loginResponse = function (accessToken) {
    return {
        accessToken: accessToken
    };
};
;
exports.logoutResponse = function (message) {
    return {
        message: message
    };
};
;
exports.deleteAccountResponse = function (userId, sucess) {
    return {
        userId: userId,
        sucess: sucess
    };
};
