var http = require('http');
var qs = require('querystring');
var express = require('express');

var Search = {
    createRequest: function (data, callback) {
        console.log('hahah', qs.stringify(data));
        var options = {
            hostname: 's.music.163.com',
            path: 'http://s.music.163.com/search/get/?' + qs.stringify(data),
            method: 'GET'
        };
        var req = http.request(options, function (res) {
            // console.log(res);
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
                callback(chunk);
            });
        });

        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });

        req.end();
    }

}
module.exports = Search;
