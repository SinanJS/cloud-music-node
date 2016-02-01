var express = require('express');
var search = require('./lib/controllers/search')

var app = express();
app.get('/search', function (req, res) {
    console.log(req.query);
    search.createRequest(req.query, function (data) {
        res.write(data);
    });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
