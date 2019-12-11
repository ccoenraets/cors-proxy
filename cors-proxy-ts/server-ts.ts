
import * as express from 'express';
import * as request from 'request';
import * as bodyParser from 'body-parser';

export class Server {
  public static bootstrap(bodyLimit: string): Server {
    return new Server(bodyLimit);
  }

  public app: express.Application;

  private constructor(bodyLimit: string) {
    // create expressjs application
    this.app = express();

    // configure application
    this.config(bodyLimit);
    this.enableCors();
  }
  private config(bodyLimit: string) {
    // add body parser
    this.app.use(bodyParser.json({ limit: bodyLimit }));

    // mount query string parser
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      }),
    );
  }
  private enableCors() {
    //console.log("inside cors")
    this.app.use(function (req, res, next) {
      // Set CORS headers: allow all origins, methods, and headers: you may want to lock this down in a production environment
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
      res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));

      if (req.method === 'OPTIONS') {
        // CORS Preflight
        res.send();
      } else {
        const targetURL = req.header('Target-URL');
        if (!targetURL) {
          res.status(500).send({ error: 'There is no Target-Endpoint header in the request' });
          return;
        }
        request({ url: targetURL + req.url, method: req.method, json: req.body, headers: { 'Authorization': req.header('Authorization') } },
          function (error, response, body) {
            if (error) {
              console.error('error: ' + response.statusCode)
            }
            //                console.log(body);
          }).pipe(res);

      }
    });
  }
}

