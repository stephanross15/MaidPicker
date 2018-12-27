

export class UtilityMethods {

    /**
     * Generate 36 digit unique authtoken, used for login authentication
     */
    static generateNewAuthToken(): String {

        const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-';
        const ID_LENGTH = 36;

        let authToken = '';
        for (var i = 0; i < ID_LENGTH; i++) {
            authToken += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
        }
        
        return authToken;
    }

    /**
     * Generate 6 digit otp, used for phone verification process.
     */
    static generateOtp(): String {

        let otp = "";
        otp += Math.floor(Math.random() * 10);
        otp += Math.floor(Math.random() * 10);
        otp += Math.floor(Math.random() * 10);
        otp += Math.floor(Math.random() * 10);
        // otp += Math.floor(Math.random() * 10);
        // otp += Math.floor(Math.random() * 10);
        return otp;
    }

    /**
     * Clone all the hasOwnProperty of obj into new object.
     * @param obj object from which hasOwnProperty are copied.
     */
    static clone(obj: any): any {
        let clone: any = {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                clone[key] = obj[key];
            }
        }
        return clone;
    }

    /**
     * Copy available source key-value into destination.
     * @param source From which values are copied.
     * @param destination Into values are copied.
     */
    static copyValuesFrom(source: any, destination: any): void {
        for (var destkey in destination) {
            for (var srcKey in source) {
                if (destkey == srcKey) {
                    destination[srcKey] = source[srcKey];
                }
            }
        }
    }




  
}