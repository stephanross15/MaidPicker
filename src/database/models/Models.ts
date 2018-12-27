import { userSchema, IUserModel } from '../schemas/User';
import { Model } from 'mongoose';

import ModelsDB from './ModelDB'; 
import { mongooseIntializer } from "../schemas/mongoose/MongooseInitializer";
import { IAuthenticationModel , authenticationSchema} from '../schemas/Authentication';


class Models {
    UserModel: Model<IUserModel>;
    AuthenticationModel:Model<IAuthenticationModel>
    

    constructor() {
        const mongoose = mongooseIntializer.mongoose;
        this.UserModel = mongoose.model(ModelsDB.USER, userSchema);
        this.AuthenticationModel = mongoose.model(ModelsDB.AUTHENTICATION, authenticationSchema);
       
    }
};

export const models = new Models();
