export interface ISignUpResponse {

  //  accessToken: String,
    otp:String,
    userId: String

};

export const signUpResponse = ( otp: String ,userId:String): ISignUpResponse => {
    return {

      //  accessToken: accessToken,
        otp: otp,
        userId:userId
    };
};





export interface IPhoneVerificationResponse {
    success : Boolean
};

export const phoneVerificationResponse = (success: Boolean): IPhoneVerificationResponse => {
    return {
        success: success
    };
};

export interface IForgotPasswordResponse {
    otp: String
};

export const forgotPasswordResponse = (otp: String): IForgotPasswordResponse => {
    return {
        otp: otp
    };
};


