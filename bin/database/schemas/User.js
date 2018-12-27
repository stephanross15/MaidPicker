"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
var ModelDB_1 = require("../models/ModelDB");
var References_1 = require("../models/References");
/**
 * Schema for UserDetail document of mongoDb
 */
exports.userSchema = new mongoose_1.Schema({
    firstName: { type: mongoose.Schema.Types.String, default: null },
    lastName: { type: mongoose.Schema.Types.String, default: null },
    emailId: { type: mongoose.Schema.Types.String, default: null },
    password: { type: mongoose.Schema.Types.String, default: null },
    phoneNumber: { type: mongoose.Schema.Types.String, default: null },
    isAccountVerified: { type: mongoose.Schema.Types.Boolean, default: false },
    accountVerificationOTP: { type: mongoose.Schema.Types.Number },
    isFacebookSignup: { type: mongoose.Schema.Types.Boolean, default: false },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now },
    isFacebookUrl: { type: mongoose.Schema.Types.Boolean, default: false }
}, { versionKey: false });
exports.userSchema.set('toJSON', { virtuals: true });
exports.userSchema.virtual(References_1.default.USERS_AUTHENTICATIONDATA, {
    ref: ModelDB_1.default.AUTHENTICATION,
    localField: References_1.default.USERS_OBJECTID,
    foreignField: References_1.default.AUTHENTICATION_USERID
});
