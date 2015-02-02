var http = require('http'),
	httpProxy = require('http-proxy'),
	fs = require('fs'),
	_ = require('lodash');

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});
var config = require("./config.json");

console.log("Starting dev-proxy , Config=",config);

var server = http.createServer(function(req, res) {
  	console.log("Request for: " + req.url);

 	var configured_route = _.find(config.routes, function(route){return req.url.indexOf(route.route) >-1;});
	if(configured_route ){
		console.log("Serving local file: ",configured_route.path );
		var fileStream = fs.createReadStream(configured_route.path);
		fileStream.pipe(res);
	}
	else{
		req.headers["X-FORWARDED-FOR"] = req.connection.remoteAddress; 
		proxy.web(req, res, { target: config.origin_server});
	}
});

console.log("Proxy listening on port: %s, origin server is: %s" , config.proxy_port, config.origin_server);
server.listen(config.proxy_port);



/*
// A dummy origin server (to assist dev-proxy development)
http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.write('origin server url: ' + req.url+ '\n' + JSON.stringify(req.headers, true, 2))
	res.end();
}).listen(9000);
*/