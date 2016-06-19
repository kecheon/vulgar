/// <reference path="_all.d.ts" />
'use strict';

import * as express from 'express';

// Log requests to the console (Express 4)
import * as morgan from 'morgan';
// Pull information from HTML POST (express 4)
import * as bodyParser from 'body-parser';
// Simulate DELETE and PUT (Express 4)
import * as methodOverride from 'method-override';
// PassportJS
import * as passport from 'passport';

import passportConf from '../../config/passport.conf';
import mongooseConf from '../../config/mongoose.conf';
import routeConf from './routes';

import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

// # Node Env Variables

/**
 * The server.
 *
 * @class Server
 */
class Server {

  public app: express.Application;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.InjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    // Create `Express` application
    this.app = express();
    this.mongooseConf();
    this.passportConf(passport);
    // Configure application
    this.config();
    // Configure routes
    this.routes(this.app, passport);
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   * @return void
   */
  private config() {
    //if (process.env.NODE_ENV === 'development' ||
    //  process.env.NODE_ENV === 'test') {
    // Log every `request` to the console
    this.app.use(morgan('dev'));

    // Get all data/stuff of the body (POST) parameters

    // Parse application/json
    this.app.use(bodyParser.json());
    // Parse application/vnd.api+json as json
    this.app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
    // Parse application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ extended: true }));

    // Override with the X-HTTP-Method-Override header in the request. Simulate DELETE/PUT
    this.app.use(methodOverride('X-HTTP-Method-Override'));
    // Set the static files location /public/img will be /img for users
    this.app.use(express.static(`${__dirname}/dist`));

    // Catch `404` and forward to `error` handler
    this.app.use(function(err: any,
                          req: express.Request,
                          res: express.Response,
                          next: express.NextFunction) {
      let error = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // Passport JS

    // Session secret
    this.app.use(session({
      secret : process.env.SESSION_SECRET,
      resave : true,
      saveUninitialized : true
    }));

    this.app.use(passport.initialize());

    // Persistent login sessions
    this.app.use(passport.session());
  }

  private mongooseConf() {
    mongooseConf();
  }

  private passportConf(passport: any) {
    passportConf(passport);
  }

  private routes(app: express.Application, passport: any) {
    routeConf(this.app, passport);
  }
}

let server = Server.bootstrap();
export = server.app;