var express = require('express');
var search = require('./lib/controllers/search')

var app = express();
app.all('*',function (req, res, next) {
  res.header('Content-Type','application/json;charset=UTF-8');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); //让options请求快速返回
  }
  else {
    next();
  }
});
app.get('/search', function (req, res) {
    console.log(req.query);
    search.createRequest(req.query, function (sres) {
            sres.pipe(res);
            sres.on('end', function () {
                console.log(sres.header);
            });
    });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
