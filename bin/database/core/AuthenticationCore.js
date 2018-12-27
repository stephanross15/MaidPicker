"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Models_1 = require("./../models/Models");
var AuthenticationDao = /** @class */ (function () {
    function AuthenticationDao() {
        this.AuthenticationModel = Models_1.models.AuthenticationModel;
    }
    AuthenticationDao.prototype.saveUserData = function (userId, accessToken, deviceId, uniqueId, deviceType, deviceVersion) {
        var userObj = {};
        userObj.userId = userId;
        userObj.accessToken = accessToken;
        userObj.deviceId = deviceId;
        userObj.uniqueId = uniqueId;
        userObj.deviceType = deviceType;
        userObj.deviceVersion = deviceVersion;
        var auth = new this.AuthenticationModel(userObj);
        return auth.save();
    };
    //generic function created for finding records.
    AuthenticationDao.prototype.get = function (condition) {
        return this.AuthenticationModel
            .findOne(condition)
            .exec();
    };
    //generic function created for updating records.
    AuthenticationDao.prototype.update = function (conditions, update) {
        return this.AuthenticationModel
            .findOneAndUpdate(conditions, update, { new: true })
            .exec();
    };
    AuthenticationDao.prototype.getUserByAccessToken = function (accessToken) {
        return this.get({ 'accessToken': accessToken });
    };
    AuthenticationDao.prototype.logout = function (accessToken) {
        return this.removeLogin({ 'accessToken': accessToken });
    };
    AuthenticationDao.prototype.removeLogin = function (condition) {
        return this.AuthenticationModel
            .remove(condition)
            .exec();
    };
    AuthenticationDao.prototype.saveFacebookData = function (userId, accessToken, deviceId, uniqueId, deviceType, deviceVersion) {
        var userObj = {};
        userObj.userId = userId;
        userObj.accessToken = accessToken;
        userObj.deviceId = deviceId;
        userObj.uniqueId = uniqueId;
        userObj.deviceType = deviceType;
        userObj.deviceVersion = deviceVersion;
        var auth = new this.AuthenticationModel(userObj);
        return auth.save();
    };
    return AuthenticationDao;
}());
exports.authenticationDao = new AuthenticationDao();
