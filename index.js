var http = require('http');
var fs = require('fs');
var path = require('path');

var HOME = process.env.HOME || process.env.USERPROFILE;

function hostnameForRequest(req){
  return req.headers['host'].split(':')[0];
}

var server = http.createServer(function(req, res){
  fs.readFile(path.join(HOME, '.proxy.pac'), function(err, file){
    if(err){
      res.statusCode = 500;
      return res.end(err.toString());
    }
    var contents = file.toString();
    if(contents.indexOf('{hostname}')){
      contents = contents.replace(/\{hostname\}/g, hostnameForRequest(req));
    }
    res.setHeader('Content-Type', 'application/x-ns-proxy-autoconfig');
    res.end(contents);
  });
});

server.listen(7799);

