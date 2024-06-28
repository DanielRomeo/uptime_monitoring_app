// create a http server and make it listen on port 5000:
const http = require("http");
const https = require("https");
const url = require("url");
const stringDecoder = require("string_decoder").StringDecoder;
var config = require('./config');
var fs = require('fs');

import {Request, Response} from 'express'

// Instatiate the HTTP SERVER:
const httpServer = http.createServer((request: any, response: any) => {
    unifiedServer(request, response)
});

// Start the HTTP SERVER:
httpServer.listen(config.httpPort, () => {
    console.log(`Server is listening on post ${config.httpPort}, in config: ${config.envName} mode.`);
});

// Instatiate the HTTPS SERVER:
var httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem')
}
const httpsServer = https.createServer(httpsServerOptions, (request: any, response: any) => {
    unifiedServer(request, response)
});

// Start the HTTPS SERVER:
httpsServer.listen(config.httpsPort, () => {
    console.log(`Server is listening on post ${config.httpsPort}, in config: ${config.envName} mode.`);
});


// All the logic for the http and https server:
var unifiedServer = function(request: any, response: any){

    response.setHeader("Access-Control-Allow-Origin", "*");
    
    /*we're passing ture in order to tell it to call the "query string" module itself*/
    const parsedUrl = url.parse(request.url, true);

    let path: string = parsedUrl.pathname;

    // trims away all slashes in the url, according  to my observation, this removed the leading slash:
    let trimmedPath: string = path.replace(/^\/+|\/+$/g, ""); 

    // console.log("trimmed path is : " +trimmedPath); 


    // get the Http method(get, post, put, delete)
    let method: string = request.method.toLowerCase();

    // get the headers as an object
    console.log(request.headers)
    const headers: {} = request.headers;

    console.log(parsedUrl.query);
    let querystringObject = parsedUrl.query;

    // headers:
    // console.log("headers are : "+ headers)
    // console.log(headers)

    /*how a stream is dealt with*/
    // get the payload if any and decode it to utf8 and append it to the openBuffer( we do this becuase we get the data bits by bit)

    let decoder = new stringDecoder("utf-8");
    let buffer = "";
    request.on("data", (data: string) => {
        buffer += decoder.write(data); // decoding it to utf-8
    });

    request.on("end", () => {
        buffer += decoder.end();


        // Choose the handler, the request should go to :
        var chooseHandler: any | string | undefined = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        // Construct the data object to send to the handler:
        const data : any = {
            'trimmedPath': trimmedPath,
            'queryStringObject': querystringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        }

        // Route the request, as specified:
        chooseHandler(data, (statusCode: number, payload: any)=>{
            // Use the status code called back by the handler, or the default to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            // Use the payload called back by the handler or default to an empty object
            payload = typeof(payload) == 'object' ?  payload : {};

            // we need to send back a string, convert the payload to a string:
            var payloadString: string = JSON.stringify(payload);

            // return the response:
            response.setHeader('Content-Type', 'application/json');
            response.writeHead(statusCode);
            response.end(payloadString);
            console.log(`Returning this repsonse: `, statusCode, payloadString);

        });

    });
}


// Define handlers:
let handlers : any = {};
// Sample handlers:
handlers.sample = function(data: any, callback: (value: number, {})=>{}){
    callback(406, {"name": "sample handler"});
}
// Not found handler:
handlers.notFound = function(data: any, callback: any){
    callback(404);
}
// Define request router:
const router: any  = {
    'sample': handlers.sample
}
