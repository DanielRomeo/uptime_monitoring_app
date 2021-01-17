// create a http server and make it listen on port 5000:
const http = require("http");
const url = require('url');

const server = http.createServer((request: Request, response: any) => {
  

  /*we're passing ture in order to tell it to call the "query string" module itself*/
  const parsedUrl = url.parse(request.url, true);
  let path = parsedUrl.pathname;
  let trimmedPath = path.replace(/^\/+|\/+$/g, ''); // trims away all slashes in the url
  

  let method = request.method.toLowerCase();

  let querystringObject = parsedUrl.query;
  response.end("Hello world \n");
  console.log(`Recieved the path: ${trimmedPath} with the method: ${method}`);
  // console.log('with these query string parameters: ', querystringObject);
  console.dir(querystringObject);

});

// start the server and tell it on which port it should listen on:
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is listening on post ${PORT}`);
});
