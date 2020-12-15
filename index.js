// create a http server and make it listen on port 5000:
const http = require('http');
const server = http.createServer((request, response)=>{
	response.end('Hello world \n');
});

// start the server and tell it on which port it should listen on:
const PORT = 5000;
server.listen(PORT, ()=>{
	console.log(`Server is listening on post ${PORT}`);
});