var http = require('http'),
	httpProxy = require('http-proxy'),
	fs = require('fs'),
	_ = require('lodash'),
	express = require('express'),
	app = express(),
	path = require('path');

var proxy = httpProxy.createProxyServer({});
var config = require("./config.json");

app.use(function(req,res,next){
	console.log("Request: " + req.url);
	next();
});

// register static files with Express statoic middleware. This will also handle sub-directories
_.each(config.static, 
	function(route){
		app.use(route.route, express.static(route.path));
	});

// Serve specific routes wil local files. This is different from 'static' since it can handle query strings and is defined for a single file.
// It is intended to replace some backend server response
app.use(function(req, res, next) {
 	var configured_route = _.find(config.routes, function(route){
 		return req.url.indexOf(route.route) >-1;});
		if(configured_route){
			console.log("*** local override : ", configured_route.path);
			res.sendFile(configured_route.path); 
		}
		else
			next();
});

// Last handler is to proxy all unhandled requests to origin server
app.use(function(req,res,next){
	console.log("* proxying to origin");
	req.headers["X-FORWARDED-FOR"] = req.connection.remoteAddress;
	proxy.web(req, res, { target: config.origin_server, secure:false});
});

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});

console.log("Starting dev-proxy , Config=",config);
console.log("Proxy listening on port: %s, origin server is: %s" , config.port, config.origin_server);
var server = http.createServer(app);
server.listen(config.port);

/*
// A dummy origin server (to assist dev-proxy development)
http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.write('origin server url: ' + req.url+ '\n' + JSON.stringify(req.headers, true, 2))
	res.end();
}).listen(9000);
*/