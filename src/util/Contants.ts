//import { AppConfig } from './../../config/AppConfig';
export class ProjectConstants {
    public static readonly LOCALPORT = 8020;
    public static readonly QAPORT = 8020;
    public static readonly STAGINGPORT = 8021;
    public static readonly PRODPORT = 8021;

    public static readonly LOCALDATABASENAME = "MaidPicker";
    public static readonly QADATABASENAME = "MaidPickerDBQA";
    public static readonly STAGINGDATABASENAME = "MaidPickerDBStag";
    public static readonly PRODDATABASENAME = "MaidPickerDB";

    public static readonly LOCALDATABASEPORT = 27017;
  //  public static readonly QADATABASEPORT = 27030;
    public static readonly QADATABASEPORT = 27017;
    public static readonly STAGINGDATABASEPORT = 27017;
    public static readonly PRODDATABASEPORT = 27017;

    private static readonly BASE_URI = "http://localhost:";
  //  private static readonly QA_URI = "http://khtlab.kaysharbor.com:";
    public static readonly QA_URI = "http://localhost:";
    public static readonly STAG_URI = "http://localhost:";
    public static readonly PROD_URI = "http://localhost:";
    public static readonly LOCALURI = "http://localhost:" + ProjectConstants.LOCALPORT + "/";
    public static readonly QAURI = ProjectConstants.QA_URI + ProjectConstants.QAPORT + "/";
    public static readonly STAGINGURI = ProjectConstants.STAG_URI + ProjectConstants.STAGINGPORT + "/";
    public static readonly PRODURI = ProjectConstants.PROD_URI + "/";
  

    public static readonly isQARelease = false;
    public static readonly isStagingRelease = false;
    public static readonly isProdRelease = false;
    public static readonly EnableAES = true;
}

export class ApiNames {
    public static readonly MAID_PICKER = "/maidPicker/";
    public static readonly HOME = `${ApiNames.MAID_PICKER}`;
    public static readonly SIGNUP = `${ApiNames.MAID_PICKER}signUp`;
    public static readonly VERIFY = `${ApiNames.MAID_PICKER}verify`;
    public static readonly LOGIN = `${ApiNames.MAID_PICKER}login`;
    public static readonly LOGOUT = `${ApiNames.MAID_PICKER}logout`;
    public static readonly FORGOTPASSWORD = `${ApiNames.MAID_PICKER}forgotPassword`;
    public static readonly RESETPASSWORD = `${ApiNames.MAID_PICKER}resetPassword`;
}

export class EmailConstants {
    public static readonly SENDER_SERVICE = "gmail";
    public static readonly SENDER_PORT = 465;

    public static readonly SENDER_EMAIL_ID = "stephanross15@gmail.com";
    public static readonly SENDER_EMAIL_PASSWORD = "missanand123";
    // public static readonly SENDER_SERVICE = "tutorSpace";
    // public static readonly SENDER_PORT = 465;
    // public static readonly SENDER_SMTP = "mail.tutorspace.de";
    // public static readonly SENDER_EMAIL_ID = "emailservice@tutorspace.de";
    // public static readonly SENDER_EMAIL_PASSWORD = "Nadipat1";
    public static readonly ACCOUNT_REGISTRATION_EMAIL_SUBJECT = "New Registration | MaidPicker";
    public static readonly FORGOT_PASSWORD_EMAIL_SUBJECT = "Forgot Password | MaidPicker";
  
}

export class ErrorCodes {
    public static readonly OK = 200;
    public static readonly NO_CONTENT = 204;
    public static readonly BAD_REQUEST = 400;
    public static readonly UNAUTHORIZED = 401;
    public static readonly INVALID_AUTHTOKEN = 403;
    public static readonly PAGE_NOT_FOUND = 404;
    public static readonly NOT_ACCEPTABLE = 406;
    public static readonly REQUEST_TIMEOUT = 408;
    public static readonly CONFLICT = 409;
    public static readonly NO_RESPONSE = 444;
    public static readonly INVALID_TOKEN = 498;
    public static readonly TOKEN_REQUIRED = 499;
}  
export class ResponseMessages {

    public static readonly error = (code: Number, msg: string) => {
        return {
            errorCode: code,
            errorMessage: msg
        }
    }
      //Signup Constants.
      public static readonly SIGNUP_EMAIL_ALREADY_REGISTERED= ResponseMessages.error(ErrorCodes.UNAUTHORIZED, "Email Already registered.");
      public static readonly SIGNUP_PHONE_NUMBER_ALREADY_REGISTERED = ResponseMessages.error(ErrorCodes.UNAUTHORIZED, "PhoneNumber Already registered.");
      public static readonly FACEBOOK_LOGIN_ERROR = ResponseMessages.error(ErrorCodes.PAGE_NOT_FOUND, "No User Found.");

      
  
      //Misc Contants.




      public static readonly NO_USER_FOUND = ResponseMessages.error(ErrorCodes.PAGE_NOT_FOUND, "No User with this Id Exist.");
      public static readonly LOGIN_INCORRECT_PASSWORD = ResponseMessages.error(ErrorCodes.PAGE_NOT_FOUND, "Your Password is Incorrect , Please provide valid password.");
      public static readonly BAD_TOKEN_REQUEST = ResponseMessages.error(ErrorCodes.INVALID_AUTHTOKEN, "Invalid Access Token.");
      public static readonly BAD_REFRESH_TOKEN_REQUEST = ResponseMessages.error(ErrorCodes.INVALID_TOKEN, "Refresh Token Expired.");
      public static readonly SOMETHING_WENT_WRONG = ResponseMessages.error(ErrorCodes.REQUEST_TIMEOUT, "Something went wrong.");
      public static readonly BAD_REQUEST = ResponseMessages.error(ErrorCodes.BAD_REQUEST, "Request parameters missing");
      public static readonly ERROR_WHILE_FETCHING_CITIES = ResponseMessages.error(ErrorCodes.NO_CONTENT, "Error while fetching location.");
      public static readonly ERROR_UNSUPPORTED_MEDIATYPE = ResponseMessages.error(ErrorCodes.BAD_REQUEST, "Unsupported Mediatype.");
  
      public static readonly YOU_ARE_UNAUTHORIZED_TO_VERIFY = ResponseMessages.error(ErrorCodes.UNAUTHORIZED, "You are unauthorized to verify Account");
      public static readonly FACEBOOK_SITE_ERROR = ResponseMessages.error(ErrorCodes.NO_RESPONSE, "Error while connecting facebook error.");
      public static readonly PHONE_NUMBER_NOT_VERIFY = ResponseMessages.error(ErrorCodes.BAD_REQUEST, "Phone number Not verfied.");
      public static readonly INVALID_CREDENTIALS = ResponseMessages.error(ErrorCodes.BAD_REQUEST, "Invalid Credentials.");
      public static readonly INVALID_OTP = ResponseMessages.error(ErrorCodes.BAD_REQUEST, "Invalid OTP.");
      public static readonly ALREADY_VERIFIED = ResponseMessages.error(ErrorCodes.BAD_REQUEST, "Already verified.");

      public static readonly SIGNUP_SUCCESSFULLY = "SignUp sucessfully.";
      public static readonly VERIFICATION_SUCCESSFULLY = "Verification sucessfully.";
      public static readonly LOGOUT_SUCCESSFULLY = "Logout sucessfully.";
      public static readonly EMAIL_SENT_SUCESSFULLY = "Email sent sucessfully.";
      public static readonly LOGIN_SUCCESSFULLY = "Login sucessfully.";
      
      
}