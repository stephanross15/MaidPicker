"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Models_1 = require("./../models/Models");
var UserDao = /** @class */ (function () {
    function UserDao() {
        this.UserModel = Models_1.models.UserModel;
    }
    UserDao.prototype.getUserDetailByUserId = function (userId) {
        var obj = {
            '_id': userId
        };
        return this.UserModel.findOne(obj).exec();
    };
    UserDao.prototype.getUserDetailByEmail = function (emailId) {
        var obj = {
            'emailId': emailId
        };
        return this.UserModel.findOne(obj).exec();
    };
    UserDao.prototype.getUserDetailByPhoneNumber = function (phoneNumber) {
        var obj = {
            'phoneNumber': phoneNumber
        };
        return this.UserModel.findOne(obj).exec();
    };
    UserDao.prototype.saveUserDetail = function (phoneNumber, emailId, password, firstName, lastName, otp) {
        //   userObj.userName =  UtilityMethods.AesEncrypt( userObj.userName.toString());
        var userObj = {};
        userObj.phoneNumber = phoneNumber;
        userObj.emailId = emailId.toLowerCase();
        userObj.password = password.toString();
        userObj.firstName = firstName;
        userObj.lastName = lastName;
        userObj.accountVerificationOTP = otp;
        userObj.isAccountVerified = false;
        userObj.isFacebookSignup = false;
        userObj.isFacebookUrl = false;
        var user = new this.UserModel(userObj);
        return user.save();
    };
    UserDao.prototype.updatePhoneVerificationByUserId = function (userId) {
        console.log(userId);
        var obj = {
            '_id': userId
        };
        return this.update({ _id: userId }, { isAccountVerified: true });
    };
    UserDao.prototype.update = function (conditions, update) {
        return this.UserModel
            .findOneAndUpdate(conditions, update, { new: true })
            .exec();
    };
    UserDao.prototype.getUserByEmail = function (emailId) {
        var obj = {
            'emailId': emailId
        };
        return this.UserModel.findOne(obj).exec();
    };
    UserDao.prototype.getDataForFaceBook = function (emailId) {
        var obj = {
            'emailId': emailId
        };
        return this.UserModel.findOne(obj).exec();
    };
    UserDao.prototype.addFacebookData = function (fbDetails) {
        //   userObj.userName =  UtilityMethods.AesEncrypt( userObj.userName.toString());
        var userObj = {};
        fbDetails.userName = fbDetails.name;
        fbDetails.emailId = fbDetails.email;
        // fbDetails.imageHeight = facebookRes.picture.data.height;
        // fbDetails.imageWidth = facebookRes.picture.data.width;
        //  fbDetails.imageurl = facebookRes.picture.data.url;
        fbDetails.id = fbDetails.id;
        //  userObj.otp= otp;
        userObj.isAccountVerified = true;
        userObj.isFacebookSignup = false;
        userObj.isFacebookUrl = false;
        var user = new this.UserModel(userObj);
        return user.save();
    };
    return UserDao;
}());
exports.userDao = new UserDao();
