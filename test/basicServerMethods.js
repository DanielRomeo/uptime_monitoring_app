const http = require('http');
const https = require('https');
const url = require('url');

// https.get("https://serve.macbase.co.za/getstudents", (res)=>{
// 	data = '';

// 	// chunks of data are being recieved:
// 	res.on('data', (chunk)=>{
// 		data+= chunk;
// 		console.log("chinkling")
// 	});

// 	// the entire data has been recienved:
// 	res.on('end', (chunk)=>{
// 		console.log(JSON.parse(data).explanation);
// 		console.log(JSON.parse(data));
// 	})
// })



// create the server
const server = http.createServer((req, res)=>{
	let method = req.method.toLowerCase();
	let parsedUrl = url.parse(req.url, true);

	// let {host, accept} = req.headers;
	console.log(parsedUrl)
	res.write("hello world\n");
	res.end(JSON.stringify(parsedUrl))
});

// start the server
server.listen(5000, ()=>{
	console.log('server started on 5k');	
})