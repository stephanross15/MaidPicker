import { Mongoose } from 'mongoose';
import * as Promise from 'bluebird';

/**
 * This provide helper method to create a mongodb connection.
 */

class MongooseInitializer {

    mongoose: Mongoose;

    constructor() {
        this.mongoose = new Mongoose();
        this.mongoose.Promise = Promise;
    }

    createConnection(dbName: String, port: Number) 
    {

        this.mongoose.connect(`mongodb://localhost:${port}/${dbName}`, {
           // useMongoClient: true
           
        });
        const db = this.mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', () => console.log("Mongoose connected."));
    }

    checkIfCollectionExist() : any
    {
        const db = this.mongoose.connection;
        let isSubjectMasterExist: any = db.collection('m_subject').find({});
        return isSubjectMasterExist;
    }
}

const mongooseIntializer = new MongooseInitializer;
export { mongooseIntializer };