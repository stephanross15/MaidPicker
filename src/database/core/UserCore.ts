import { IUserModel, IUserSchema } from "../schemas/User";
import { Model, Promise } from 'mongoose';
import { models } from './../models/Models';

class UserDao {
    UserModel: Model<IUserModel>;
    constructor() {
        this.UserModel = models.UserModel;
    }


    getUserDetailByUserId(userId:String):Promise<IUserModel>
    {
        const obj = {
            '_id':userId
        }
        return this.UserModel.findOne(obj).exec();
    }
    getUserDetailByEmail(emailId:String):Promise<IUserModel>
    {
        const obj = {
            'emailId':emailId
        }
        return this.UserModel.findOne(obj).exec();
    }
    getUserDetailByPhoneNumber(phoneNumber:String):Promise<IUserModel>
    {
        const obj = {
            'phoneNumber':phoneNumber
        }
        return this.UserModel.findOne(obj).exec();
    }
    saveUserDetail(phoneNumber:String ,
        emailId:String,
         password : String,
          firstName: String , 
          lastName:String , 
          otp : String) :Promise<IUserModel>
 {
 //   userObj.userName =  UtilityMethods.AesEncrypt( userObj.userName.toString());
 let userObj : any = {};
 userObj.phoneNumber = phoneNumber;
 userObj.emailId = emailId.toLowerCase();
 userObj.password =   password.toString();
 userObj.firstName =  firstName;
 userObj.lastName =lastName;
 userObj.otp= otp;
 userObj.isAccountVerified = false;
 userObj.isFacebookSignup = false;
 userObj.isFacebookUrl = false;

 const user = new this.UserModel(userObj);
 return user.save();
 }


 updatePhoneVerificationByUserId(userId:String) : Promise<IUserModel>
 { console.log(userId);
     const obj = {
         '_id':userId
     }
     return this.update({ _id: userId },
        { isAccountVerified: true });
    }
    private update(conditions: any, update: any): Promise<IUserModel> {
        return this.UserModel
            .findOneAndUpdate(conditions, update, { new: true })
            .exec();
    }
    getUserByEmail(emailId:String): Promise<IUserModel>
    {
        const obj = {
            'emailId':emailId
        }
        return this.UserModel.findOne(obj).exec();
       }
       getDataForFaceBook(emailId:String): Promise<IUserModel>
       {
           const obj = {
               'emailId':emailId
           }
           return this.UserModel.findOne(obj).exec();
          }
          addFacebookData(fbDetails : any) :Promise<IUserModel>
          {
          //   userObj.userName =  UtilityMethods.AesEncrypt( userObj.userName.toString());
          let userObj : any = {};
        fbDetails.userName = fbDetails.name;
        fbDetails.emailId = fbDetails.email;
        // fbDetails.imageHeight = facebookRes.picture.data.height;
        // fbDetails.imageWidth = facebookRes.picture.data.width;
      //  fbDetails.imageurl = facebookRes.picture.data.url;
        fbDetails.id = fbDetails.id;
     
        //  userObj.otp= otp;
          userObj.isAccountVerified = true;
          userObj.isFacebookSignup = false;
          userObj.isFacebookUrl = false;
         
          const user = new this.UserModel(userObj);
          return user.save();
          }
}
export const userDao = new UserDao();