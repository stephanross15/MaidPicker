
import * as Twilio from 'twilio';
import TwilioAccountDetail from './TwilioAccountDetail';
import * as Promise from 'bluebird';
export class  TwilioHelper{
client: any;

constructor() 
{
  //  this.client = Twilio(TwilioAccountDetail.ACCOUNT_SID, TwilioAccountDetail.AUTH_TOKEN);
  this.client  = require('twilio')(TwilioAccountDetail.ACCOUNT_SID, TwilioAccountDetail.AUTH_TOKEN);
}


    private sendMessage(msg: string, phoneNumber: String): Promise<any> {

        const params = {
            body: msg,
            to: phoneNumber,
            from: TwilioAccountDetail.FROM
        };
        return Promise.resolve(this.client.messages.create(params));
    }

    public sendOtp(userName: String, otp: String, phoneNumber: String): Promise<any> {

        userName = userName[0].toUpperCase() + userName.slice(1);
        const message = `Dear ${userName}, Your one time password is ${otp}. Regards MaidPicker`;

        console.log(message);
        return this.sendMessage(message, phoneNumber);
    }
}

export const twilioHelper = new TwilioHelper();
 //export default twilioHelper;