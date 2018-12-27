"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModelDB_1 = require("../models/ModelDB");
var References_1 = require("../models/References");
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
/**
 * Schema for Authentication document of mongoDb
 */
exports.authenticationSchema = new mongoose_1.Schema({
    userId: { type: mongoose.Schema.Types.String, ref: ModelDB_1.default.USER },
    deviceId: { type: mongoose.Schema.Types.String },
    uniqueId: { type: mongoose.Schema.Types.String },
    deviceType: { type: mongoose.Schema.Types.String },
    deviceVersion: { type: mongoose.Schema.Types.String },
    accessToken: { type: mongoose.Schema.Types.String },
    loggedInOn: { type: Date, default: Date.now },
}, { versionKey: false });
exports.authenticationSchema.set('toJSON', { virtuals: true });
exports.authenticationSchema.virtual(References_1.default.USERS_USERDATA, {
    ref: ModelDB_1.default.USER,
    localField: References_1.default.USERS_USERID,
    foreignField: References_1.default.USERS_OBJECTID
});
