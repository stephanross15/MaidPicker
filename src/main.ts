import * as express from 'express';
import * as path from 'path';
import { mongooseIntializer } from "./database/schemas/mongoose/MongooseInitializer";
import router from './router/Router';
import { ProjectConstants } from './util/Contants';
class Main {
  app: express.Express;

  constructor() {
    this.initApp();
  }

  // It will initiate express and provide router that will handle all routes.
  initApp() {
    this.app = express();
    this.app.use(router);
   // this.app.use(express.static(path.join(__dirname, '../images')));
    this.app.set("templates", path.join(__dirname, "../templates"));
    this.app.set("view engine", "ejs");


   }

  // This is the core point from where server starts.
  startServer(port: Number) {
   var server = this.app.listen(port, () =>
      console.log(`Connected successfully`));
    server.timeout = 1000 * 60 * 300;
  }

   // This will connect to mongoDb database.
  connectToDatabase(dbName: String, port: Number) {
    mongooseIntializer.createConnection(dbName, port);
  }

}

const isQARelease = false;
const isStagingRelease = false;
const isProdRelease = false;

const serverPort =   isQARelease ? ProjectConstants.QAPORT : isStagingRelease ? ProjectConstants.STAGINGPORT : isProdRelease ? ProjectConstants.PRODPORT : ProjectConstants.LOCALPORT;
const databaseName = isQARelease ? ProjectConstants.QADATABASENAME : isStagingRelease ? ProjectConstants.STAGINGDATABASENAME : isProdRelease ? ProjectConstants.PRODDATABASENAME : ProjectConstants.LOCALDATABASENAME;
const databasePort = isQARelease ? ProjectConstants.QADATABASEPORT : isStagingRelease ? ProjectConstants.STAGINGDATABASEPORT : isProdRelease ? ProjectConstants.PRODDATABASEPORT : ProjectConstants.LOCALDATABASEPORT;

const main = new Main();
main.startServer(serverPort);
main.connectToDatabase(databaseName, databasePort);