"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var MongooseInitializer_1 = require("./database/schemas/mongoose/MongooseInitializer");
var Router_1 = require("./router/Router");
var Contants_1 = require("./util/Contants");
var Main = /** @class */ (function () {
    function Main() {
        this.initApp();
    }
    // It will initiate express and provide router that will handle all routes.
    Main.prototype.initApp = function () {
        this.app = express();
        this.app.use(Router_1.default);
        // this.app.use(express.static(path.join(__dirname, '../images')));
        this.app.set("templates", path.join(__dirname, "../templates"));
        this.app.set("view engine", "ejs");
    };
    // This is the core point from where server starts.
    Main.prototype.startServer = function (port) {
        var server = this.app.listen(port, function () {
            return console.log("Connected successfully");
        });
        server.timeout = 1000 * 60 * 300;
    };
    // This will connect to mongoDb database.
    Main.prototype.connectToDatabase = function (dbName, port) {
        MongooseInitializer_1.mongooseIntializer.createConnection(dbName, port);
    };
    return Main;
}());
var isQARelease = false;
var isStagingRelease = false;
var isProdRelease = false;
//const serverPort =  process.env.PORT || 3000; ;
var serverPort = isQARelease ? Contants_1.ProjectConstants.QAPORT : isStagingRelease ? Contants_1.ProjectConstants.STAGINGPORT : isProdRelease ? Contants_1.ProjectConstants.PRODPORT : Contants_1.ProjectConstants.LOCALPORT;
var databaseName = isQARelease ? Contants_1.ProjectConstants.QADATABASENAME : isStagingRelease ? Contants_1.ProjectConstants.STAGINGDATABASENAME : isProdRelease ? Contants_1.ProjectConstants.PRODDATABASENAME : Contants_1.ProjectConstants.LOCALDATABASENAME;
var databasePort = isQARelease ? Contants_1.ProjectConstants.QADATABASEPORT : isStagingRelease ? Contants_1.ProjectConstants.STAGINGDATABASEPORT : isProdRelease ? Contants_1.ProjectConstants.PRODDATABASEPORT : Contants_1.ProjectConstants.LOCALDATABASEPORT;
var main = new Main();
main.startServer(serverPort);
main.connectToDatabase(databaseName, databasePort);
