export interface ILoginResponse {
 
    accessToken: String
  
};
export const loginResponse = ( accessToken: String ): ILoginResponse => {
    return {
    
        accessToken: accessToken
          };
};

export interface ILogoutResponse {

    message: String
};

export const logoutResponse = (message: String): ILogoutResponse => {
    return {

        message: message
    };
};

export interface IDeleteAccountResponse {

  userId:String,
  sucess:Boolean
};

export const deleteAccountResponse = (userId:String , sucess: Boolean): IDeleteAccountResponse => {
    return {
        userId: userId,
        sucess: sucess
    };
};

