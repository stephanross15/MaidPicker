
import { Model, Promise } from 'mongoose';
import { models } from './../models/Models';
import { IAuthenticationModel, IAuthenticationSchema } from './../schemas/Authentication';
class AuthenticationDao {
    AuthenticationModel: Model<IAuthenticationModel>;
    constructor() {
        this.AuthenticationModel = models.AuthenticationModel;
    }
    saveUserData(userId: String,accessToken: String, deviceId: String, uniqueId: String, deviceType: String, deviceVersion: String): Promise<IAuthenticationModel>
     {
        let userObj : any = {};
        userObj.userId = userId;
        userObj.accessToken = accessToken;
        userObj.deviceId =   deviceId;
        userObj.uniqueId =  uniqueId;
        userObj.deviceType =deviceType;
        userObj.deviceVersion= deviceVersion;
       
        const auth = new this.AuthenticationModel(userObj);
        return auth.save();
    }
    //generic function created for finding records.
    private get(condition: Object): Promise<IAuthenticationModel> {
        return this.AuthenticationModel
            .findOne(condition)
            .exec();
    }

    //generic function created for updating records.
    private update(conditions: any, update: any): Promise<IAuthenticationModel> {
        return this.AuthenticationModel
            .findOneAndUpdate(conditions, update, { new: true })
            .exec();
    }
    getUserByAccessToken(accessToken: String): Promise<IAuthenticationModel> {
        return this.get({ 'accessToken': accessToken });
    }
    logout(accessToken: String): Promise<void> {
        return this.removeLogin({ 'accessToken': accessToken });
    }

    private removeLogin(condition: Object): Promise<void> {
        return this.AuthenticationModel
            .remove(condition)
            .exec();
    }
    saveFacebookData(userId: String,accessToken: String, deviceId: String, uniqueId: String, deviceType: String, deviceVersion: String): Promise<IAuthenticationModel>
    {
       let userObj : any = {};
       userObj.userId = userId;
       userObj.accessToken = accessToken;
       userObj.deviceId =   deviceId;
       userObj.uniqueId =  uniqueId;
       userObj.deviceType =deviceType;
       userObj.deviceVersion= deviceVersion;
      
       const auth = new this.AuthenticationModel(userObj);
       return auth.save();
   }
}

export const authenticationDao = new AuthenticationDao();