var http = require('http');
var qs = require('querystring');
var express = require('express');

var Search = {
    createRequest: function (data, callback) {
        //console.log('hahah', qs.stringify(data));
        //备用：http://so.ard.iyyin.com/s/song_with_out?q={0}&page={1}&size={2}
        //主要：http://search.dongting.com/song/search/old?q={0}&page={1}&size={2}
        /*var options = {
            hostname: 'search.dongting.com',
            path: 'http://search.dongting.com/song/search/old?' + qs.stringify(data),
            method: 'GET'
        };*/
        var options = {
            hostname: 'music.163.com',
            path: 'http://music.163.com/api/search/pc?' + qs.stringify(data),
            method: 'POST',
            headers:{
                Cookie: "appver=1.5.0.75771",
                Referer: "http://music.163.com/"
            }
        };
        var req = http.request(options, function (sres) {
            callback(sres);
        });

        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });

        req.end();
    },
    getSong:function(data,callback){
        var options = {
            hostname: 'music.163.com',
            path: 'http://music.163.com/api/song/detail?' + qs.stringify(data),
            method: 'GET',
            headers:{
                Cookie: "appver=1.5.0.75771",
                Referer: "http://music.163.com/"
            }
        };
        var req = http.request(options, function (sres) {
            callback(sres);
        });

        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });

        req.end();
    },
    getLyric:function(data,callback){
        var options = {
            hostname: 'music.163.com',
            path: 'http://music.163.com/api/song/lyric?' + qs.stringify(data),
            method: 'GET',
            headers:{
                Cookie: "appver=1.5.0.75771",
                Referer: "http://music.163.com/"
            }
        };
        var req = http.request(options, function (sres) {
            callback(sres);
        });

        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });

        req.end();
    },
    getArtist: function (data,callback) {
        //从查询字符串中提取id
        console.log(qs.stringify(data))
        var id=qs.stringify(data).split('&')[0].split('=')[1];
        var options = {
            hostname: 'music.163.com',
            path: 'http://music.163.com/api/artist/albums/'+id+"?"+ qs.stringify(data),
            method: 'GET',
            headers:{
                Cookie: "appver=1.5.0.75771",
                Referer: "http://music.163.com/"
            }
        };
        var req = http.request(options, function (sres) {
            callback(sres);
        });

        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });

        req.end();
    },
    getAlbum:function(data,callback){
        //从查询字符串中提取id
        //示例：http://music.163.com/api/album/37290?ext=true&id=37290&offset=0&total=true&limit=10
        var id=qs.stringify(data).split('&')[0].split('=')[1];
        var options = {
            hostname: 'music.163.com',
            path: 'http://music.163.com/api/album/'+id+"?"+ qs.stringify(data),
            method: 'GET',
            headers:{
                Cookie: "appver=1.5.0.75771",
                Referer: "http://music.163.com/"
            }
        };
        console.log(options.path)
        var req = http.request(options, function (sres) {
            callback(sres);
        });

        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });

        req.end();
    }
};
module.exports = Search;

