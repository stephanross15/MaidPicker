"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HomeService = /** @class */ (function () {
    function HomeService() {
    }
    HomeService.Init = function (req, res) {
        // indexCore.AddWebAdminMasters(adminEncrypted)
        // .then(data => {
        //     if(isNullOrUndefined(data)){
        res.sendStatus(200).send("<div style='color:gray;margin-top:15%;text-transform:uppercase;text-align:center;'><h1>404 API NOT FOUND</h1></div>");
        //     }
        // }).catch(err => ResponseController.catchError(req, res, err));
    };
    return HomeService;
}());
exports.default = HomeService;
