var nodemailer = require('nodemailer');
import * as ejs from "ejs";

import { Promise } from 'mongoose';
import NewResponseController from './ResponseService';
import { Request, Response } from 'express-serve-static-core';
import { ResponseMessages, EmailConstants, ProjectConstants } from '../util/Contants';
import { UtilityMethods } from '../util/UtilityMethods';
import { twilioHelper } from '../twilio/TwilioHelper';
import { ISignUpRequest, IForgotPasswordRequest, IPhoneVerificationRequest } from '../requests/SignUpRequest';
import { signUpResponse, phoneVerificationResponse } from '../responses/SignUpResponse';
import { userDao } from '../database/core/UserCore';
import { ErrorCodes } from '../util/Contants';
import { isNullOrUndefined } from "util";
export default class SignUp {
    public static signUp(req: Request, res: Response) {
        const json: ISignUpRequest = req.body;
        let userDetailObject: any = {};
        json.emailId = json.emailId.toLowerCase();
        const response = signUpResponse(undefined, undefined);

        //  Check if user is already registered or not, if not then sign up the user
        userDao.getUserDetailByEmail(json.emailId)
            .then(userDetail => {
                if (userDetail) {
                    throw ResponseMessages.SIGNUP_EMAIL_ALREADY_REGISTERED;
                }
                return userDao.getUserDetailByPhoneNumber(json.phoneNumber);
            })
            .then(user => {
                if (user) {
                    throw ResponseMessages.SIGNUP_PHONE_NUMBER_ALREADY_REGISTERED;
                }
             let otp = UtilityMethods.generateOtp();
             response.otp = otp;
                return userDao.saveUserDetail(json.phoneNumber, 
                    json.emailId, json.password, json.firstName,json.lastName, otp);
            })
            .then(userDetailObj => {
                if (!userDetailObj) { throw ResponseMessages.SOMETHING_WENT_WRONG; }
                userDetailObject.userId = userDetailObj._id;
                userDetailObject.firstName=userDetailObj.firstName;
                userDetailObject.lastName=userDetailObj.lastName;
                return twilioHelper.sendOtp(userDetailObject.firstName ,  response.otp , userDetailObj.phoneNumber  )
            }).then(msg =>{
                if(!msg) {
                    
                }
                let emailTemplate = "templates/AccountRegistration.ejs";
                ejs.renderFile(emailTemplate, { userName: userDetailObject.firstName+""+userDetailObject.lastName, otp: response.otp },
                    function (error, data) {
                        if (error) {
                            throw ResponseMessages.SOMETHING_WENT_WRONG;
                            //  res.send()
                        }
                        else {
                            return SignUp.SendEmailTemplate(data, json.emailId, EmailConstants.ACCOUNT_REGISTRATION_EMAIL_SUBJECT);
                        }
                    })
                NewResponseController.sendResponse(req, res, signUpResponse(response.otp, userDetailObject.userId), ErrorCodes.OK, ResponseMessages.SIGNUP_SUCCESSFULLY);
             } ).catch(err => NewResponseController.catchError(req, res, err));
    }
    public static phoneVerification(req: Request, res: Response) {

        const json: IPhoneVerificationRequest = req.body;
        userDao.getUserDetailByUserId(json.userId)
            .then(userDetail => {
                console.log(userDetail);
                if (!userDetail || isNullOrUndefined(userDetail)) {
                    throw ResponseMessages.YOU_ARE_UNAUTHORIZED_TO_VERIFY;
                }
                if(userDetail.isAccountVerified == true )
                {
                    throw ResponseMessages.USER_ALREADY_VERIFIED;
                }
                if(userDetail.accountVerificationOTP != Number(json.otp) ||userDetail.accountVerificationOTP ==null)
                {
                    
                        throw ResponseMessages.YOU_ARE_UNAUTHORIZED_TO_VERIFY;
                    
                }
                else{
                    return userDao.updatePhoneVerificationByUserId(json.userId)
                }
            
            })
            .then(
                userDetailObj => {
                    if (!userDetailObj || isNullOrUndefined(userDetailObj))
                     { throw ResponseMessages.SOMETHING_WENT_WRONG; }
                    // NewResponseController.sendResponse(req, res, phoneVerificationResponse(true) , ErrorCodes.OK, ResponseMessages.VERIFICATION_SUCCESSFULLY);}
                    NewResponseController.sendResponse(req, res, phoneVerificationResponse(true), ErrorCodes.OK, ResponseMessages.VERIFICATION_SUCCESSFULLY);
                }
            ).catch(err => NewResponseController.catchError(req, res, err));
    }
    public static ForgotPassword(req: Request, res: Response) {
        const json: IForgotPasswordRequest = req.body;

        userDao.getUserByEmail(json.emailId)
            .then(user => {
                if (!user|| isNullOrUndefined(user)) throw ResponseMessages.NO_USER_FOUND;
                let emailTemplate = "templates/ForgetPassword.ejs";
              //let userName : String=   user.firstName + user.lastName;
                let otp = UtilityMethods.generateOtp();
                ejs.renderFile(emailTemplate, { userName: user.firstName+" "+user.lastName  , otp: otp },
                    function (error, data) {
                        if (error) {
                            throw ResponseMessages.SOMETHING_WENT_WRONG;
                        }
                        else {
                            return SignUp.SendEmailTemplate(data, json.emailId, EmailConstants.FORGOT_PASSWORD_EMAIL_SUBJECT);
                        }

                    })
                NewResponseController.sendResponse(req, res, {}, ErrorCodes.OK, ResponseMessages.EMAIL_SENT_SUCESSFULLY);
            })
            // .then(msg => {
            //  if (!msg) { }
            //  NewResponseController.sendResponse(req, res, {}, ErrorCodes.OK, ResponseMessages.EMAIL_SENT_SUCESSFULLY);
            //  })
            .catch(err => NewResponseController.catchError(req, res, err));
    }
    private static SendEmailTemplate(emaliTemplate: any, email: String, title: String) {
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: EmailConstants.SENDER_EMAIL_ID,
                pass: EmailConstants.SENDER_EMAIL_PASSWORD
            },
            tls: { rejectUnauthorized: false }
        });

        //   console.log(emaliTemplate);
        var mailOptions = {
            from: EmailConstants.SENDER_EMAIL_ID, // sender address
            to: email, // list of receivers
            subject: title, // Subject line
            html: emaliTemplate // You can choose to send an HTML body instead
        };
        transporter.sendMail(mailOptions,
            function (error: any, info: any) {
                if (error) {
                    console.log(error);
                    //   return error;
                } else {
                    console.log('Message sent: ' + info.response);
                    // return info;
                };
            });
    }

}

