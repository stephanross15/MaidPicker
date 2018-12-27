export interface ISignUpRequest {
    firstName:String, 
    lastName:String, 
    emailId:String, 
    password:String,
   phoneNumber:String ,
    deviceId:String, 
    uniqueId:String, 
    deviceType:String, 
    deviceVersion:String
    
}

export interface IForgotPasswordRequest {
    emailId:String
 
}


export interface IPhoneVerificationRequest {

    userId: String,
  //  isVerify: boolean
  otp:String
}