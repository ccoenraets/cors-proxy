
 import express from 'express';
 import request from 'request';
 import bodyParser from 'body-parser';
  

export class Server {
  public static bootstrap(): Server {
    return new Server();
  }

  public app: express.Application;

  constructor() {
    // create expressjs application
    this.app = express();

    // configure application
     this.config();
  } 
  public config() {
    // add body parser
    this.app.use(bodyParser.json({ limit: '50mb' }));
    // mount query string parser
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      }),
    );
    public enableCors() {
    
     this.app.use (function (req, res, next) {

    // Set CORS headers: allow all origins, methods, and headers: you may want to lock this down in a production environment
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));

    if (req.method === 'OPTIONS') {
        // CORS Preflight
        res.send();
    } else {
        var targetURL = req.header('Target-URL');
        if (!targetURL) {
            res.send(500, { error: 'There is no Target-Endpoint header in the request' });
            return;
        }
        request({ url: targetURL + req.url, method: req.method, json: req.body, headers: {'Authorization': req.header('Authorization')} },
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
}
