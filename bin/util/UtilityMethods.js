"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UtilityMethods = /** @class */ (function () {
    function UtilityMethods() {
    }
    /**
     * Generate 36 digit unique authtoken, used for login authentication
     */
    UtilityMethods.generateNewAuthToken = function () {
        var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-';
        var ID_LENGTH = 36;
        var authToken = '';
        for (var i = 0; i < ID_LENGTH; i++) {
            authToken += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
        }
        return authToken;
    };
    /**
     * Generate 6 digit otp, used for phone verification process.
     */
    UtilityMethods.generateOtp = function () {
        var otp = "";
        otp += Math.floor(Math.random() * 10);
        otp += Math.floor(Math.random() * 10);
        otp += Math.floor(Math.random() * 10);
        otp += Math.floor(Math.random() * 10);
        // otp += Math.floor(Math.random() * 10);
        // otp += Math.floor(Math.random() * 10);
        return otp;
    };
    /**
     * Clone all the hasOwnProperty of obj into new object.
     * @param obj object from which hasOwnProperty are copied.
     */
    UtilityMethods.clone = function (obj) {
        var clone = {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                clone[key] = obj[key];
            }
        }
        return clone;
    };
    /**
     * Copy available source key-value into destination.
     * @param source From which values are copied.
     * @param destination Into values are copied.
     */
    UtilityMethods.copyValuesFrom = function (source, destination) {
        for (var destkey in destination) {
            for (var srcKey in source) {
                if (destkey == srcKey) {
                    destination[srcKey] = source[srcKey];
                }
            }
        }
    };
    return UtilityMethods;
}());
exports.UtilityMethods = UtilityMethods;
