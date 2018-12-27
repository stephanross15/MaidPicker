

//import { DefaultNotificationConstants } from './../Contants';
//import notificationAccountDetail from './NotificationAccountDetail';
var FCM = require('fcm-push');
var serverKey = 'AAAAaDR02MM:APA91bGsBx0NUxNREEeleVl51yyss02WneD_JgF-4K9oCV-dSxTIIm6_eAs-gZhQT_mO-iNe4IfzIgcxm2gVwK3mJsmhjCgwmmAhvFxSVorVKQsShdITAVcJb2FyvkfTf0RkvpiS9afC';
var fcm = new FCM(serverKey);


//SecretKey for Notification Sending
//var serverKey =notificationAccountDetail.SECRET_KEY;
// var options = {
//     priority: DefaultNotificationConstants.NOTIFICATION_PRIORITY,
//     timeToLive: DefaultNotificationConstants.NOTIFICATION_TIME_TO_LIVE
// };
var message:any;

export class NotificationHelper 
{     
 static sendNotiFication(registrationdataArr: any , notificationtitle:String ,msgBody:String , type:String ) 
 {
 

   
  //  console.log("************"+registrationdataArr+"***************************");
    var message = {
        registration_ids:registrationdataArr,
        notification: {
          title: notificationtitle,
          body: msgBody
        },
        data: {
            message:msgBody,
            type : type
          }
      };
  fcm.send(message)
 .then(function(response:any , err: any)
 {
   console.log("Successfully sent with response: ", response);
    }).catch(function(err:any){
        console.log("Something has gone wrong!");
       console.error(err);
        });
     
  }

    }




