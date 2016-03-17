var http = require('http');
var qs = require('querystring');
var express = require('express');

var Search = {
    createRequest: function (data, callback) {
        console.log('hahah', qs.stringify(data));
        var options = {
            hostname: 'search.dongting.com',
            path: 'http://search.dongting.com/song/search/old?' + qs.stringify(data),
            method: 'GET'
        };
        var req = http.request(options, function (sres) {
            // console.log(res);
            // res.setEncoding('utf8');
            // res.on('end', function (chunk) {
            //     console.log(res.header);
            // });
            callback(sres);
        });

        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });

        req.end();
    }

}
module.exports = Search;
