// create a http server and make it listen on port 5000:
const http = require("http");
const url = require("url");
const stringDecoder = require("string_decoder").StringDecoder;

const server = http.createServer((request: any, response: any) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    
    console.clear();
    // console.log(typeof request)
    
    // print out the keys of the object:
    // for(let key in request){
    //     console.log("key is : "+ key)
    // }

    // console.log(request.url)


    /*we're passing ture in order to tell it to call the "query string" module itself*/
    const parsedUrl = url.parse(request.url, true);

    console.log(parsedUrl)


    let path: string = parsedUrl.pathname;

    // trims away all slashes in the url, according  to my observation, this removed the leading slash:
    let trimmedPath: string = path.replace(/^\/+|\/+$/g, ""); 

    console.log("trimmed path is : " +trimmedPath); 


    // get the Http method(get, post, put, delete)
    let method: string = request.method.toLowerCase();

    // get the headers as an object
    console.log(request.headers)
    const headers: {} = request.headers;

    console.log(parsedUrl.query);
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
        // cant write again after the response.end()
    });

    console.log(`Recieved these headers : `, buffer);
});

// start the server and tell it on which port it should listen on:
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is listening on post ${PORT}`);
});


