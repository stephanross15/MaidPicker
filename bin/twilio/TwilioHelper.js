"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TwilioAccountDetail_1 = require("./TwilioAccountDetail");
var Promise = require("bluebird");
var TwilioHelper = /** @class */ (function () {
    function TwilioHelper() {
        //  this.client = Twilio(TwilioAccountDetail.ACCOUNT_SID, TwilioAccountDetail.AUTH_TOKEN);
        this.client = require('twilio')(TwilioAccountDetail_1.default.ACCOUNT_SID, TwilioAccountDetail_1.default.AUTH_TOKEN);
    }
    TwilioHelper.prototype.sendMessage = function (msg, phoneNumber) {
        var params = {
            body: msg,
            to: phoneNumber,
            from: TwilioAccountDetail_1.default.FROM
        };
        return Promise.resolve(this.client.messages.create(params));
    };
    TwilioHelper.prototype.sendOtp = function (userName, otp, phoneNumber) {
        userName = userName[0].toUpperCase() + userName.slice(1);
        var message = "Dear " + userName + ", Your one time password is " + otp + ". Regards MaidPicker";
        console.log(message);
        return this.sendMessage(message, phoneNumber);
    };
    return TwilioHelper;
}());
exports.TwilioHelper = TwilioHelper;
exports.twilioHelper = new TwilioHelper();
//export default twilioHelper;
