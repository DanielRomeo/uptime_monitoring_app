// create a http server and make it listen on port 5000:
const http = require("http");
const url = require("url");
const stringDecoder = require("string_decoder").StringDecoder;

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    
    console.clear();
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

    

}); // end of create server

// start the server and tell it on which port it should listen on:
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is listening on post ${PORT}`);
});

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
