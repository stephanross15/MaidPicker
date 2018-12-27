"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
exports.signUpResponse = function (otp, userId) {
    return {
        //  accessToken: accessToken,
        otp: otp,
        userId: userId
    };
};
;
exports.phoneVerificationResponse = function (success) {
    return {
        success: success
    };
};
;
exports.forgotPasswordResponse = function (otp) {
    return {
        otp: otp
    };
};
