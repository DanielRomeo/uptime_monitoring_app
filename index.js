// create a http server and make it listen on port 5000:
const http = require("http");
const url = require("url");
const stringDecoder = require("string_decoder").StringDecoder;

const server = http.createServer((request: any, response: any) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    
    console.clear();
    /*we're passing ture in order to tell it to call the "query string" module itself*/
    const parsedUrl = url.parse(request.url, true);
    let path = parsedUrl.pathname;
    let trimmedPath = path.replace(/^\/+|\/+$/g, ""); // trims away all slashes in the url

    // get the Http method(get, post, put, delete)
    let method: string = request.method.toLowerCase();

    // get the headers as an object
    const headers = request.headers;

    let querystringObject = parsedUrl.query;

    /*how a stream is dealt with*/
    // get the payload if any and decode it to utf8 and append it to the openBuffer(
    //-> we do this becuase we get the data bits by bit)
    let decoder = new stringDecoder("utf-8");
    let buffer = "";
    request.on("data", (data: string) => {
        buffer += decoder.write(data);
    });

    request.on("end", () => {
        buffer += decoder.end();
        response.end("Hello world\n");
    });

    console.log(`Reacieved these headers : `, buffer);
});

// start the server and tell it on which port it should listen on:
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is listening on post ${PORT}`);
});
