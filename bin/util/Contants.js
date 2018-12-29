"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { AppConfig } from './../../config/AppConfig';
var ProjectConstants = /** @class */ (function () {
    function ProjectConstants() {
    }
    ProjectConstants.LOCALPORT = 8020;
    ProjectConstants.QAPORT = 8020;
    ProjectConstants.STAGINGPORT = 8021;
    ProjectConstants.PRODPORT = 8021;
    ProjectConstants.LOCALDATABASENAME = "MaidPicker";
    ProjectConstants.QADATABASENAME = "MaidPickerDBQA";
    ProjectConstants.STAGINGDATABASENAME = "MaidPickerDBStag";
    ProjectConstants.PRODDATABASENAME = "MaidPickerDB";
    ProjectConstants.LOCALDATABASEPORT = 27017;
    //  public static readonly QADATABASEPORT = 27030;
    ProjectConstants.QADATABASEPORT = 27017;
    ProjectConstants.STAGINGDATABASEPORT = 27017;
    ProjectConstants.PRODDATABASEPORT = 27017;
    ProjectConstants.BASE_URI = "http://localhost:";
    //  private static readonly QA_URI = "http://khtlab.kaysharbor.com:";
    ProjectConstants.QA_URI = "http://localhost:";
    ProjectConstants.STAG_URI = "http://localhost:";
    ProjectConstants.PROD_URI = "http://localhost:";
    ProjectConstants.LOCALURI = "http://localhost:" + ProjectConstants.LOCALPORT + "/";
    ProjectConstants.QAURI = ProjectConstants.QA_URI + ProjectConstants.QAPORT + "/";
    ProjectConstants.STAGINGURI = ProjectConstants.STAG_URI + ProjectConstants.STAGINGPORT + "/";
    ProjectConstants.PRODURI = ProjectConstants.PROD_URI + "/";
    ProjectConstants.isQARelease = false;
    ProjectConstants.isStagingRelease = false;
    ProjectConstants.isProdRelease = false;
    ProjectConstants.EnableAES = true;
    return ProjectConstants;
}());
exports.ProjectConstants = ProjectConstants;
var ApiNames = /** @class */ (function () {
    function ApiNames() {
    }
    ApiNames.MAID_PICKER = "/maidPicker/";
    ApiNames.HOME = "" + ApiNames.MAID_PICKER;
    ApiNames.SIGNUP = ApiNames.MAID_PICKER + "signUp";
    ApiNames.VERIFY = ApiNames.MAID_PICKER + "verify";
    ApiNames.LOGIN = ApiNames.MAID_PICKER + "login";
    ApiNames.LOGOUT = ApiNames.MAID_PICKER + "logout";
    ApiNames.FORGOTPASSWORD = ApiNames.MAID_PICKER + "forgotPassword";
    ApiNames.RESETPASSWORD = ApiNames.MAID_PICKER + "resetPassword";
    return ApiNames;
}());
exports.ApiNames = ApiNames;
var EmailConstants = /** @class */ (function () {
    function EmailConstants() {
    }
    EmailConstants.SENDER_SERVICE = "gmail";
    EmailConstants.SENDER_PORT = 465;
    EmailConstants.SENDER_EMAIL_ID = "pickermaid@gmail.com";
    EmailConstants.SENDER_EMAIL_PASSWORD = "Admin@123";
    // public static readonly SENDER_EMAIL_ID = "stephanross15@gmail.com";
    // public static readonly SENDER_EMAIL_PASSWORD = "missanand123";
    // public static readonly SENDER_SERVICE = "tutorSpace";
    // public static readonly SENDER_PORT = 465;
    // public static readonly SENDER_SMTP = "mail.tutorspace.de";
    // public static readonly SENDER_EMAIL_ID = "emailservice@tutorspace.de";
    // public static readonly SENDER_EMAIL_PASSWORD = "Nadipat1";
    EmailConstants.ACCOUNT_REGISTRATION_EMAIL_SUBJECT = "New Registration | MaidPicker";
    EmailConstants.FORGOT_PASSWORD_EMAIL_SUBJECT = "Forgot Password | MaidPicker";
    return EmailConstants;
}());
exports.EmailConstants = EmailConstants;
var ErrorCodes = /** @class */ (function () {
    function ErrorCodes() {
    }
    ErrorCodes.OK = 200;
    ErrorCodes.NO_CONTENT = 204;
    ErrorCodes.BAD_REQUEST = 400;
    ErrorCodes.UNAUTHORIZED = 401;
    ErrorCodes.INVALID_AUTHTOKEN = 403;
    ErrorCodes.PAGE_NOT_FOUND = 404;
    ErrorCodes.NOT_ACCEPTABLE = 406;
    ErrorCodes.REQUEST_TIMEOUT = 408;
    ErrorCodes.CONFLICT = 409;
    ErrorCodes.NO_RESPONSE = 444;
    ErrorCodes.INVALID_TOKEN = 498;
    ErrorCodes.TOKEN_REQUIRED = 499;
    return ErrorCodes;
}());
exports.ErrorCodes = ErrorCodes;
var ResponseMessages = /** @class */ (function () {
    function ResponseMessages() {
    }
    ResponseMessages.error = function (code, msg) {
        return {
            errorCode: code,
            errorMessage: msg
        };
    };
    //Signup Constants.
    ResponseMessages.SIGNUP_EMAIL_ALREADY_REGISTERED = ResponseMessages.error(ErrorCodes.UNAUTHORIZED, "Email Already registered.");
    ResponseMessages.SIGNUP_PHONE_NUMBER_ALREADY_REGISTERED = ResponseMessages.error(ErrorCodes.UNAUTHORIZED, "PhoneNumber Already registered.");
    ResponseMessages.FACEBOOK_LOGIN_ERROR = ResponseMessages.error(ErrorCodes.PAGE_NOT_FOUND, "No User Found.");
    ResponseMessages.USER_ALREADY_VERIFIED = ResponseMessages.error(ErrorCodes.PAGE_NOT_FOUND, "User alraedy Verified.");
    //Misc Contants.
    ResponseMessages.NO_USER_FOUND = ResponseMessages.error(ErrorCodes.PAGE_NOT_FOUND, "No User with this Id Exist.");
    ResponseMessages.LOGIN_INCORRECT_PASSWORD = ResponseMessages.error(ErrorCodes.PAGE_NOT_FOUND, "Your Password is Incorrect , Please provide valid password.");
    ResponseMessages.BAD_TOKEN_REQUEST = ResponseMessages.error(ErrorCodes.INVALID_AUTHTOKEN, "Invalid Access Token.");
    ResponseMessages.BAD_REFRESH_TOKEN_REQUEST = ResponseMessages.error(ErrorCodes.INVALID_TOKEN, "Refresh Token Expired.");
    ResponseMessages.SOMETHING_WENT_WRONG = ResponseMessages.error(ErrorCodes.REQUEST_TIMEOUT, "Something went wrong.");
    ResponseMessages.BAD_REQUEST = ResponseMessages.error(ErrorCodes.BAD_REQUEST, "Request parameters missing");
    ResponseMessages.ERROR_WHILE_FETCHING_CITIES = ResponseMessages.error(ErrorCodes.NO_CONTENT, "Error while fetching location.");
    ResponseMessages.ERROR_UNSUPPORTED_MEDIATYPE = ResponseMessages.error(ErrorCodes.BAD_REQUEST, "Unsupported Mediatype.");
    ResponseMessages.YOU_ARE_UNAUTHORIZED_TO_VERIFY = ResponseMessages.error(ErrorCodes.UNAUTHORIZED, "You are unauthorized to verify Account");
    ResponseMessages.FACEBOOK_SITE_ERROR = ResponseMessages.error(ErrorCodes.NO_RESPONSE, "Error while connecting facebook error.");
    ResponseMessages.PHONE_NUMBER_NOT_VERIFY = ResponseMessages.error(ErrorCodes.BAD_REQUEST, "Phone number Not verfied.");
    ResponseMessages.INVALID_CREDENTIALS = ResponseMessages.error(ErrorCodes.BAD_REQUEST, "Invalid Credentials.");
    ResponseMessages.INVALID_OTP = ResponseMessages.error(ErrorCodes.BAD_REQUEST, "Invalid OTP.");
    ResponseMessages.ALREADY_VERIFIED = ResponseMessages.error(ErrorCodes.BAD_REQUEST, "Already verified.");
    ResponseMessages.SIGNUP_SUCCESSFULLY = "SignUp sucessfully.";
    ResponseMessages.VERIFICATION_SUCCESSFULLY = "Verification sucessfully.";
    ResponseMessages.LOGOUT_SUCCESSFULLY = "Logout sucessfully.";
    ResponseMessages.EMAIL_SENT_SUCESSFULLY = "Email sent sucessfully.";
    ResponseMessages.LOGIN_SUCCESSFULLY = "Login sucessfully.";
    return ResponseMessages;
}());
exports.ResponseMessages = ResponseMessages;
