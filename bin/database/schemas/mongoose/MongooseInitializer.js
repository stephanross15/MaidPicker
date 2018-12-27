"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Promise = require("bluebird");
/**
 * This provide helper method to create a mongodb connection.
 */
var MongooseInitializer = /** @class */ (function () {
    function MongooseInitializer() {
        this.mongoose = new mongoose_1.Mongoose();
        this.mongoose.Promise = Promise;
    }
    MongooseInitializer.prototype.createConnection = function (dbName, port) {
        this.mongoose.connect("mongodb://localhost:" + port + "/" + dbName, {
        // useMongoClient: true
        });
        var db = this.mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () { return console.log("Mongoose connected."); });
    };
    MongooseInitializer.prototype.checkIfCollectionExist = function () {
        var db = this.mongoose.connection;
        var isSubjectMasterExist = db.collection('m_subject').find({});
        return isSubjectMasterExist;
    };
    return MongooseInitializer;
}());
var mongooseIntializer = new MongooseInitializer;
exports.mongooseIntializer = mongooseIntializer;
