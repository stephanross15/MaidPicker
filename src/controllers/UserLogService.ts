import * as fs from 'fs';
import { Request, Response, NextFunction } from 'express-serve-static-core';

interface IRequest extends Request {

    //  uniqueIdForLog is used to remember req number, so we can assign that number to response also.
    //  This helps in logging req and res with same id.
    uniqueIdForLog?: Number,
    file?:File
}

export default class Log {

    public static logError(err: String) {
        err = `Error: ${err}`;
        Log.log(err);
    }

    public static logMessage(msg: String) {
        msg = `Message: ${msg}`;
        Log.log(msg);
    }


    public static logRequest_new(request: IRequest, res: Response, next: NextFunction) {
          let body = '';
                request.on('data', chunk => {
                    body += chunk.toString();
                });
                request.on('end', () => {
               //  console.log(body);
                });
                 let fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
                // if (request.params) {
                //     fullUrl += [].join.call(request.params, "/");
                // }
        
                 const uniqueIdForLog = Math.floor(Math.random() * 15463);
                 request.uniqueIdForLog = uniqueIdForLog;
        
                 let msg = "Req" + String(uniqueIdForLog) + ": " + fullUrl;
                 msg += "\r\n Body: " + body;
                 Log.log(msg);
        next();

    }

    public static logRequest(req: IRequest, res: Response, next: NextFunction) {
    
        let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        if (req.params) {
            fullUrl += [].join.call(req.params, "/");
        }

        const uniqueIdForLog = Math.floor(Math.random() * 15463);
        req.uniqueIdForLog = uniqueIdForLog;

        let msg = "Req" + String(uniqueIdForLog) + ": " + fullUrl;
        msg += "\r\n Body: " + JSON.stringify(req.body)
      //  console.log(msg);
       Log.log(msg);

        next();
    }

    public static logResponse(req: IRequest, res: any) {

        let msg = "Res" + String(req.uniqueIdForLog) + ": " + JSON.stringify(res);
        Log.log(msg);
    }
    
    private static log(data: String) {
        data += "\r\n";

        const dir = "UserLogs";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        let name = dir + "/logs_";
        const date = new Date();
        name += date.getFullYear() + "_";
        name += date.getMonth() + 1 + "_";
        name += date.getDate() + ".txt";

        fs.appendFile(name, String(data), err => {
            if (err) console.log(err);
            else console.log(data);
        });
    }

   
}