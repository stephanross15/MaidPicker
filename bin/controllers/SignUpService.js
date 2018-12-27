"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require('nodemailer');
var ejs = require("ejs");
var ResponseService_1 = require("./ResponseService");
var Contants_1 = require("../util/Contants");
var UtilityMethods_1 = require("../util/UtilityMethods");
var TwilioHelper_1 = require("../twilio/TwilioHelper");
var SignUpResponse_1 = require("../responses/SignUpResponse");
var UserCore_1 = require("../database/core/UserCore");
var Contants_2 = require("../util/Contants");
var util_1 = require("util");
var SignUp = /** @class */ (function () {
    function SignUp() {
    }
    SignUp.signUp = function (req, res) {
        var json = req.body;
        var userDetailObject = {};
        json.emailId = json.emailId.toLowerCase();
        var response = SignUpResponse_1.signUpResponse(undefined, undefined);
        //  Check if user is already registered or not, if not then sign up the user
        UserCore_1.userDao.getUserDetailByEmail(json.emailId)
            .then(function (userDetail) {
            if (userDetail) {
                throw Contants_1.ResponseMessages.SIGNUP_EMAIL_ALREADY_REGISTERED;
            }
            return UserCore_1.userDao.getUserDetailByPhoneNumber(json.phoneNumber);
        })
            .then(function (user) {
            if (user) {
                throw Contants_1.ResponseMessages.SIGNUP_PHONE_NUMBER_ALREADY_REGISTERED;
            }
            response.otp = UtilityMethods_1.UtilityMethods.generateOtp();
            return UserCore_1.userDao.saveUserDetail(json.phoneNumber, json.emailId, json.password, json.firstName, json.lastName, response.otp);
        })
            .then(function (userDetailObj) {
            if (!userDetailObj) {
                throw Contants_1.ResponseMessages.SOMETHING_WENT_WRONG;
            }
            userDetailObject.userId = userDetailObj._id;
            userDetailObject.firstName = userDetailObj.firstName;
            userDetailObject.lastName = userDetailObj.lastName;
            return TwilioHelper_1.twilioHelper.sendOtp(userDetailObject.firstName, response.otp, userDetailObj.phoneNumber);
        }).then(function (msg) {
            if (!msg) {
            }
            var emailTemplate = "templates/AccountRegistration.ejs";
            ejs.renderFile(emailTemplate, { userName: userDetailObject.firstName + userDetailObject.lastName, otp: response.otp }, function (error, data) {
                if (error) {
                    throw Contants_1.ResponseMessages.SOMETHING_WENT_WRONG;
                    //  res.send()
                }
                else {
                    return SignUp.SendEmailTemplate(data, json.emailId, Contants_1.EmailConstants.ACCOUNT_REGISTRATION_EMAIL_SUBJECT);
                }
            });
            ResponseService_1.default.sendResponse(req, res, SignUpResponse_1.signUpResponse(response.otp, userDetailObject.userId), Contants_2.ErrorCodes.OK, Contants_1.ResponseMessages.SIGNUP_SUCCESSFULLY);
        }).catch(function (err) { return ResponseService_1.default.catchError(req, res, err); });
    };
    SignUp.phoneVerification = function (req, res) {
        var json = req.body;
        UserCore_1.userDao.getUserDetailByUserId(json.userId)
            .then(function (userDetail) {
            console.log(userDetail);
            if (!userDetail || util_1.isNullOrUndefined(userDetail)) {
                throw Contants_1.ResponseMessages.YOU_ARE_UNAUTHORIZED_TO_VERIFY;
            }
            if (userDetail.accountVerificationOTP != Number(json.otp))
                return UserCore_1.userDao.updatePhoneVerificationByUserId(json.userId);
        })
            .then(function (userDetailObj) {
            if (!userDetailObj || util_1.isNullOrUndefined(userDetailObj)) {
                throw Contants_1.ResponseMessages.SOMETHING_WENT_WRONG;
            }
            // NewResponseController.sendResponse(req, res, phoneVerificationResponse(true) , ErrorCodes.OK, ResponseMessages.VERIFICATION_SUCCESSFULLY);}
            ResponseService_1.default.sendResponse(req, res, SignUpResponse_1.phoneVerificationResponse(true), Contants_2.ErrorCodes.OK, Contants_1.ResponseMessages.VERIFICATION_SUCCESSFULLY);
        }).catch(function (err) { return ResponseService_1.default.catchError(req, res, err); });
    };
    SignUp.ForgotPassword = function (req, res) {
        var json = req.body;
        UserCore_1.userDao.getUserByEmail(json.emailId)
            .then(function (user) {
            if (!user || util_1.isNullOrUndefined(user))
                throw Contants_1.ResponseMessages.NO_USER_FOUND;
            var emailTemplate = "templates/ForgetPassword.ejs";
            //let userName : String=   user.firstName + user.lastName;
            var otp = UtilityMethods_1.UtilityMethods.generateOtp();
            ejs.renderFile(emailTemplate, { userName: user.firstName + " " + user.lastName, otp: otp }, function (error, data) {
                if (error) {
                    throw Contants_1.ResponseMessages.SOMETHING_WENT_WRONG;
                }
                else {
                    return SignUp.SendEmailTemplate(data, json.emailId, Contants_1.EmailConstants.FORGOT_PASSWORD_EMAIL_SUBJECT);
                }
            });
            ResponseService_1.default.sendResponse(req, res, {}, Contants_2.ErrorCodes.OK, Contants_1.ResponseMessages.EMAIL_SENT_SUCESSFULLY);
        })
            // .then(msg => {
            //  if (!msg) { }
            //  NewResponseController.sendResponse(req, res, {}, ErrorCodes.OK, ResponseMessages.EMAIL_SENT_SUCESSFULLY);
            //  })
            .catch(function (err) { return ResponseService_1.default.catchError(req, res, err); });
    };
    SignUp.SendEmailTemplate = function (emaliTemplate, email, title) {
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: Contants_1.EmailConstants.SENDER_EMAIL_ID,
                pass: Contants_1.EmailConstants.SENDER_EMAIL_PASSWORD
            },
            tls: { rejectUnauthorized: false }
        });
        //   console.log(emaliTemplate);
        var mailOptions = {
            from: Contants_1.EmailConstants.SENDER_EMAIL_ID,
            to: email,
            subject: title,
            html: emaliTemplate // You can choose to send an HTML body instead
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                //   return error;
            }
            else {
                console.log('Message sent: ' + info.response);
                // return info;
            }
            ;
        });
    };
    return SignUp;
}());
exports.default = SignUp;
