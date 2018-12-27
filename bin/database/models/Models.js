"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../schemas/User");
var ModelDB_1 = require("./ModelDB");
var MongooseInitializer_1 = require("../schemas/mongoose/MongooseInitializer");
var Authentication_1 = require("../schemas/Authentication");
var Models = /** @class */ (function () {
    function Models() {
        var mongoose = MongooseInitializer_1.mongooseIntializer.mongoose;
        this.UserModel = mongoose.model(ModelDB_1.default.USER, User_1.userSchema);
        this.AuthenticationModel = mongoose.model(ModelDB_1.default.AUTHENTICATION, Authentication_1.authenticationSchema);
    }
    return Models;
}());
;
exports.models = new Models();
