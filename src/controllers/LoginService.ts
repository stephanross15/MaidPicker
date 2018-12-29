import ResponseController from './ResponseService';
import { Request, Response } from 'express-serve-static-core';
import { ResponseMessages } from '../util/Contants';
import { UtilityMethods } from '../util/UtilityMethods';
import { ErrorCodes } from '../util/Contants';
import { authenticationDao } from '../database/core/AuthenticationCore';
import {  ILogoutRequest, ILoginCASERequest } from '../requests/LoginRequest';
import { loginResponse } from '../responses/LoginResponse';
import { userDao } from '../database/core/UserCore';
import { IUserModel } from './../database/schemas/User';
const request = require('request-promise');
import { isNullOrUndefined } from 'util';
import * as fs from 'fs';

export default class Login {

    public static Logout(req: Request, res: Response) {
        const json: ILogoutRequest = req.body;
        authenticationDao.getUserByAccessToken(json.accessToken)
            .then(
                loggedin => {
                    if (!loggedin) throw ResponseMessages.BAD_TOKEN_REQUEST;
               
                    return authenticationDao.logout(json.accessToken);
                }).then(() => {     
                    ResponseController.sendResponse(req, res, {}, ErrorCodes.OK, ResponseMessages.LOGOUT_SUCCESSFULLY);

                }).catch(err => {
                    ResponseController.catchError(req, res, err);
                });
    }
    public static LoginCases(req: Request, res: Response) {
        const json: ILoginCASERequest = req.body;

        if (json.isFaceBookSignup == false) // APP login
        {
            let loginDetails: any = {};
            userDao.getUserByEmail(json.emailId)
                .then(user => {
                    if (user == null || !(user)) { //User Not Registered .... allow him/her to register ...
                        throw ResponseMessages.NO_USER_FOUND;
                    }
                   
                    else { 
                        // User already registered...

                        // var encryptedjsonPassword : String =  UtilityMethods.AesEncrypt(json.password.toString());
                        //user.password already encrypted..
                        if (!user.isAccountVerified) {
                            throw ResponseMessages.PHONE_NUMBER_NOT_VERIFY;
                          }
                        if (user.password == json.password) 
                        {
                            const accessToken = UtilityMethods.generateNewAuthToken();

                            return authenticationDao.saveUserData(user._id, accessToken, json.deviceId, json.uniqueId, json.deviceType, json.deviceVersion)
                                .then(savedLogin => {
                                    if (!savedLogin) throw ResponseMessages.SOMETHING_WENT_WRONG;
                                    ResponseController.sendResponse(req, res, loginResponse(savedLogin.accessToken), ErrorCodes.OK, ResponseMessages.LOGIN_SUCCESSFULLY);
                                }).catch(err => ResponseController.catchError(req, res, err));

                        }
                        else {
                            throw ResponseMessages.LOGIN_INCORRECT_PASSWORD;
                        }
                    }
                }).catch(err => ResponseController.catchError(req, res, err));

        }
        else {

            const fbAccessToken = req.body.fbAccessToken;
            const userFieldSet = 'id,name,email,picture.type(large)';
            const url = `https://graph.facebook.com/v3.1/me?access_token=${fbAccessToken}&fields=${userFieldSet}`;


            const options = {
                method: 'GET',
                uri: url,
            };
            request(options)
                .then((facebookRes: any, err: any) => {
                    if (err) throw err;
                    facebookRes = JSON.parse(facebookRes);

                    let fbDetails: any = {};
                    fbDetails.userName = facebookRes.name;
                    fbDetails.emailId = facebookRes.email;
                    fbDetails.imageHeight = facebookRes.picture.data.height;
                    fbDetails.imageWidth = facebookRes.picture.data.width;
                    fbDetails.imageurl = facebookRes.picture.data.url;
                    fbDetails.id = facebookRes.id;
                    if (!facebookRes.email) {
                        throw ResponseMessages.FACEBOOK_SITE_ERROR;
                    }
                    else {
                      //  res.send(facebookRes);
                      Login.CheckOnFBData(req, res, fbDetails, json);
                    }
                }).catch((err: any) => {
                    ResponseController.catchError(req, res, err);
                });
        }
    }
    private static CheckOnFBData(req: Request, res: Response, fbres: any, json: ILoginCASERequest)
     {
        userDao.getDataForFaceBook(fbres.emailId)
            .then(data => {

                if (!data) {

                    Login.FBDBCaseNo(req, res, fbres, json, data)
                }
                else {
                    if (data.isFacebookSignup == false) {

                        throw ResponseMessages.FACEBOOK_LOGIN_ERROR;
                    }
                    else {

                        Login.FBDBCaseYes(req, res, fbres, json, data);
                    }
                }
            }

           ).catch(err => ResponseController.catchError(req, res, err));
    }
    private static FBDBCaseNo(req: Request, res: Response, fbres: any, json: ILoginCASERequest, data: IUserModel) {

        userDao.addFacebookData(fbres)
            .then(datas => {
                if (!datas) { throw ResponseMessages.SOMETHING_WENT_WRONG; }
                const accessToken = UtilityMethods.generateNewAuthToken();
             
                return authenticationDao.saveFacebookData(datas._id,accessToken, json.deviceId, json.uniqueId, json.deviceType, json.deviceVersion)
            }).then(userData => {
                if (!userData) {
                    throw ResponseMessages.SOMETHING_WENT_WRONG;
                }
                ResponseController.sendResponse(req, res, loginResponse(userData.accessToken), ErrorCodes.OK, ResponseMessages.LOGIN_SUCCESSFULLY);
            }).catch(err => ResponseController.catchError(req, res, err));


    }
    private static FBDBCaseYes(req: Request, res: Response, fbres: any, json: ILoginCASERequest, data: IUserModel) {
        // userDao.UpdateFacebookData(json.lat, json.lng, data._id)
        //     .then(datas => {
        //         if (!datas) { throw ResponseMessages.SOMETHING_WENT_WRONG; }
                const accessToken = UtilityMethods.generateNewAuthToken();
             //   const refreshToken = UtilityMethods.generateNewAuthToken();
                authenticationDao.saveFacebookData(data._id,accessToken, json.deviceId, json.uniqueId, json.deviceType, json.deviceVersion)
         //   })
            .then(userData => {
                if (!userData) {
                    throw ResponseMessages.SOMETHING_WENT_WRONG;
                }
                ResponseController.sendResponse(req, res, loginResponse(userData.accessToken), ErrorCodes.OK, ResponseMessages.LOGIN_SUCCESSFULLY);
            }).catch(err => ResponseController.catchError(req, res, err));
    }
    
}
