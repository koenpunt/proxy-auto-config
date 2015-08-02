var http = require('http');
var fs = require('fs');
var path = require('path');

var HOME = process.env.HOME || process.env.USERPROFILE;

var server = http.createServer(function(req, res){
  fs.readFile(path.join(HOME, '.proxy.pac'), function(err, file){
	if(err){
	  res.statusCode = 500;
	  return res.end(err.toString());
	}
	res.setHeader('Content-Type', 'application/x-ns-proxy-autoconfig');
	res.end(file);
  });
});

server.listen(7799);

