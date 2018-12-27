
import { Request, Response } from 'express-serve-static-core';


export default class HomeService{

    public static Init(req: Request, res: Response)
    {
       

    // indexCore.AddWebAdminMasters(adminEncrypted)
    // .then(data => {
    //     if(isNullOrUndefined(data)){
         res.sendStatus(200).send("<div style='color:gray;margin-top:15%;text-transform:uppercase;text-align:center;'><h1>404 API NOT FOUND</h1></div>");
    //     }
    // }).catch(err => ResponseController.catchError(req, res, err));

   
    }

  
}