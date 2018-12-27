
import ModelsDB from '../models/ModelDB'; 
import References from '../models/References'; 


import * as mongoose from "mongoose"; 
import {Document, Schema }from 'mongoose'; 
import {IUserModel }from './User'; 
/**
 * Schema for Authentication document of mongoDb
 */
export const authenticationSchema = new Schema( {
  userId: {type:mongoose.Schema.Types.String, ref:ModelsDB.USER}, 
  deviceId: {type:mongoose.Schema.Types.String }, 
  uniqueId: {type:mongoose.Schema.Types.String}, 
  deviceType: {type:mongoose.Schema.Types.String}, 
  deviceVersion: {type:mongoose.Schema.Types.String}, 
  accessToken: {type:mongoose.Schema.Types.String}, 
  loggedInOn:{type:Date, default:Date.now},
},  {versionKey:false }); 
authenticationSchema.set('toJSON',  {virtuals:true }); 

authenticationSchema.virtual(References.USERS_USERDATA,  {
        ref:ModelsDB.USER, 
        localField:References.USERS_USERID, 
        foreignField:References.USERS_OBJECTID
    }); 
/**
 * Schema structure for UserDetail document of mongoDb
 */
export interface IAuthenticationSchema {
    userId:String, 
    deviceId:String, 
    uniqueId:String, 
    deviceType:String, 
    deviceVersion:String, 
    accessToken:String, 
    refreshToken:String,
    isOfferEmpty?:Boolean, 
    userData:IUserModel[],
    loggedInOn:Date
}
/**
 * Model for UserDetail document of mongoDb
 */
export interface IAuthenticationModel extends IAuthenticationSchema, Document {
}