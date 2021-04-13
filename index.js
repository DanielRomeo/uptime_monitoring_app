// create a http server and make it listen on port 5000:
const http = require("http");
const https = require("https");
const url = require("url");
const stringDecoder = require("string_decoder").StringDecoder;
const config = require('./config');
const fs = require('fs');

// the HTTP server:
const httpServer = http.createServer((req, res) => {
   unifiedServer(req, res);
});
httpServer.listen(config.httpPort, () => {
    console.log(`Server is listening on post ${config.httpPort}, in ${config.envName}`);
});

// isntatiate the https server:
let httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem')
}

// the HTTPS server:
const httpsServer = https.createServer(httpsServerOptions, (req, res) => {
   unifiedServer(req, res);
});
httpsServer.listen(config.httpsPort, () => {
    console.log(`Server is listening on post ${config.httpsPort}, in ${config.envName}`);
});




// all the server logic for the http and https server:
let unifiedServer = (req, res) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    
   
    /*we're passing ture in order to tell it to call the "query string" module itself*/
    const parsedUrl = url.parse(req.url, true);
    let path = parsedUrl.pathname;
    let trimmedPath = path.replace(/^\/+|\/+$/g, ""); // trims away all slashes in the url

    // get the Http method(get, post, put, delete)
    let method = req.method.toLowerCase();

    // get the headers as an object
    const headers = req.headers;

    let querystringObject = parsedUrl.query;

    /*how a stream is dealt with*/
    // get the payload if any and decode it to utf8 and append it to the openBuffer(
    //-> we do this becuase we get the data bits by bit)
    let decoder = new stringDecoder("utf-8");
    let buffer = "";
    req.on("data", (data) => {
        buffer += decoder.write(data);
    });

    req.on("end", () => {
        buffer += decoder.end();
        
        console.log(`trimmed path : ${trimmedPath}`)
        // choose the handler this request should go to:
        // if one is not found, use the not-found handler
        let chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
        console.log(chosenHandler)
        // construct the data object to send to the handler:
        let data = {
            'trimmedPath': trimmedPath,
            'querystringObject' : querystringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        };

        // with the data above, route the request:
        chosenHandler(data, (statusCode, payload)=>{
            // use status code called by handler...
            // validate the status code:
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            // use payload used by handler, set it to empty if there isint any
            payload = typeof(payload) == 'object' ? payload: {};

            payloadString = JSON.stringify(payload);

            // return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString); 

            // log the request path   
            console.log(`Return the response:`, statusCode, payloadString);
        }); // end of chosenHandler function

    }); // the end of end of the request

}


/* write handlers*/

let handlers = {};

// sample handler:
handlers.sample = (data, callback)=>{
    // callback with http status code and payload object:
    callback(406, {'name': 'sample handler'})
}

// users handler:
handlers.users = (data, callback)=>{
    // callback with http status code and payload object:
    callback(406, {'name': 'users handler'})
}

// not found handler:
handlers.notFound = (data, callback)=>{
    callback(404); // send the status code only
}

// define a request router:
let router = {
    'sample': handlers.sample,
    'users': handlers.users
}
