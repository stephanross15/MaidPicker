import * as mongoose from "mongoose"; 
import {Document, Schema }from 'mongoose';

import ModelsDB from '../models/ModelDB';  
import References from '../models/References'; 
import { IAuthenticationModel } from "./Authentication";
/**
 * Schema for UserDetail document of mongoDb
 */
export const userSchema = new Schema( {
  firstName: {type:mongoose.Schema.Types.String, default : null}, 
  lastName:{type:mongoose.Schema.Types.String, default : null}, 
  emailId: {type:mongoose.Schema.Types.String, default : null}, 
  password: {type:mongoose.Schema.Types.String , default : null}, 
  phoneNumber: {type:mongoose.Schema.Types.String, default : null}, 
  isAccountVerified: {type:mongoose.Schema.Types.Boolean, default : false}, 
  accountVerificationOTP : {type:mongoose.Schema.Types.Number} ,
   isFacebookSignup:{type:mongoose.Schema.Types.Boolean  , default : false},
  createdOn: {type:Date, default:Date.now}, 
  modifiedOn: {type:Date, default:Date.now},
  isFacebookUrl:{type:mongoose.Schema.Types.Boolean ,default : false} 
},  {versionKey:false }); 
userSchema.set('toJSON',  {virtuals:true });
userSchema.virtual(References.USERS_AUTHENTICATIONDATA,  {
  ref:ModelsDB.AUTHENTICATION, 
  localField:References.USERS_OBJECTID, 
  foreignField:References.AUTHENTICATION_USERID
}); 
/**
 * Schema structure for UserDetail document of mongoDb
 */
export interface IUserSchema {
  firstName:String, 
  lastName:String,
  emailId:String, 
  password:String, 
  phoneNumber:String, 
  accountVerificationOTP: Number,
  isAccountVerified:Boolean, 
  isFacebookSignup:Boolean,
  isFacebookUrl:Boolean,
  adminNotes:String,
  createdOn:Date, 
  modifiedOn:Date,
  authenticationData?:IAuthenticationModel[]
 }
/**
 * Model for UserDetail document of mongoDb
 */
export interface IUserModel extends IUserSchema, Document {
}