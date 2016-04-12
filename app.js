var express = require('express');
var search = require('./lib/controllers/search');
var Login=require('./lib/controllers/identity');
var app = express();
var mysql = require('mysql');


//创建连接
var client = mysql.createConnection({
    host:'localhost',
    port:3306,
    user: 'root',
    password: '123456'
});
client.connect();

app.all('*',function (req, res, next) {
  res.header('Content-Type','application/json;charset=UTF-8');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('Cookie', 'appver=1.5.0.75771');
  res.header('Referer', 'http://music.163.com/');

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

var identity=new Login(client);
app.get('/login',function(req,res){
    try {
        identity.login(req.query,res);
    }catch (e){
        throw e;
    }

});

app.get('/logout',function(req,res){
    identity.logout(req.query.user_id,res);
});
app.get('/sign_in',function(req,res){
    identity.signIn(req.query,res);
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});


/*client.query("use " + TEST_DATABASE);
 client.query(
 'SELECT * FROM '+TEST_TABLE,
 function selectCb(err, results, fields) {
 if (err) {
 throw err;
 }
 if(results)
 {
 //console.log(results[0].user_id);
 for(var i = 0; i < results.length; i++)
 {
 console.log("%d\t%s\t%s", results[i].user_id, results[i].nick_name, results[i].phone);
 }
 }
 client.end();
 }
 );*/