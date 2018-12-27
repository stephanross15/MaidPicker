import {Request, Response }from 'express-serve-static-core'; 
import LogsController from './UserLogService'; 

interface IRESPONSE {
    message:any; 
    data:any; 
    cause?:any; 

}

export default class APIResponse {
   
    public static sendResponse(req:Request, res:Response, resObject:any, resCode:any, message:any):void {
        const response = APIResponse.response(req, resObject, message); 
      if (resCode >= 100 && resCode < 600) {
          //  res.statusMessage = message; 
            res.status(resCode).send(response); 
        }
       else{
            res.status(500).send(response); 
       }
    }

    public static sendWebResponse(req:Request, res:Response, resObject:any, resCode:any, message: string):void {
        const response = APIResponse.response(req, resObject, message); 

      if (resCode >= 100 && resCode < 600) {
            res.statusMessage = message; 
            res.status(resCode).send(response); 
        }
       else{
            res.status(500).send(response); 
       }
    }
    public static catchError(req:Request, res:Response, err:any)
     {
       // let message = ""; 
        console.log(err); 
        //It contains all the thrown away errors.
    
        if (err.errorCode) {
            console.log("IF CASE" + err.errorMessage); 
           // message = 
            err.errorMessage; 
            err.code = err.errorCode; 
            APIResponse.sendResponse(req, res,  {}, err.code, err.errorMessage); 
        }
      else{
          if(err.code)
          {
         
          //  message =  `ErrCode:${err.code}, ErrMsg:${err.message}`
            APIResponse.sendResponse(req, res,  {} , err.code,  `ErrCode:${err.code}, ErrMsg:${err.message}`); 
           // err.message = `ErrCode:${err.code}, ErrMsg:${err.message}`;
          }
          APIResponse.sendResponse(req, res,  {}, err.code,  `ErrCode:${err.code}, ErrMsg:${err.message}`);      
      }
     // APIResponse.sendResponse(req, res,  {}, err.code, message); 
    }
    
    public static catchWebError(req:Request, res:Response, err:any)
    {
      // let message = ""; 
       console.log(err); 
       //It contains all the thrown away errors.
   
       if (err.errorCode) {
           console.log("IF CASE" + err.errorMessage); 
          // message = 
           err.errorMessage; 
           err.code = err.errorCode; 
           APIResponse.sendWebResponse(req, res,  {}, err.code, err.errorMessage); 
       }
     else{
         if(err.code)
         {
           console.log("ELSE CASE" + err.message); 
         //  message =  `ErrCode:${err.code}, ErrMsg:${err.message}`
           APIResponse.sendWebResponse(req, res,  {} , err.code,  `ErrCode:${err.code}, ErrMsg:${err.message}`); 
          // err.message = `ErrCode:${err.code}, ErrMsg:${err.message}`;
         }
         APIResponse.sendWebResponse(req, res,  {}, err.code,  `ErrCode:${err.code}, ErrMsg:${err.message}`);      
     }
    // APIResponse.sendResponse(req, res,  {}, err.code, message); 
   }


    private static response(req:Request, resObject:any, message:String):IRESPONSE {
        const resultResponse:IRESPONSE =  {
            message:message, 
            data:resObject
        }; 
        LogsController.logResponse(req, resultResponse); 
        return resultResponse; 
    }
    
}
