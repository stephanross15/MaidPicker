

export interface ILogoutRequest {
    accessToken:String
 
}


export interface ILoginCASERequest {
    fbAccessToken:String, 
    emailId:String, 
    password:String, 
    deviceId:String, 
    uniqueId:String, 
    deviceType:String, 
    deviceVersion:String, 
    isFaceBookSignup:Boolean
}