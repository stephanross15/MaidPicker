import * as express from 'express';
import { json } from "body-parser";
import { ApiNames } from '../util/Contants';
var cors = require('cors');

var bodyParser = require('body-parser');
import Log from '../controllers/UserLogService';
import Home from '../controllers/HomeService';
import Signup from '../controllers/SignUpService';
import Login from '../controllers/LoginService';

class ApiRouter {

  public router: express.Router;

  constructor() {
    this.router = express();
    this.router.use(cors());
    this.addMiddlewares();
    this.addRoutes();
  }

  // Add all middlewares here that will get request before routes.
  addMiddlewares(): void {
    //  Used to parse req.body into json object
    // this.router.use(bodyParser.urlencoded({ extended: true}));
    this.router.use(json());
    this.router.use(bodyParser.urlencoded({ extended: false }));
    this.router.use(Log.logRequest);
   
  }


  addRoutes(): void {

    this.router.get(ApiNames.HOME, Home.Init);
    this.router.post(ApiNames.SIGNUP, Signup.signUp);
    this.router.post(ApiNames.VERIFY, Signup.phoneVerification);
    this.router.post(ApiNames.LOGIN, Login.LoginCases);
    this.router.post(ApiNames.LOGOUT, Login.Logout);
    this.router.post(ApiNames.FORGOTPASSWORD, Signup.ForgotPassword);
   // this.router.post(ApiNames.RESETPASSWORD, Signup.ResetPassword);
   
  }
}
export default new ApiRouter().router;