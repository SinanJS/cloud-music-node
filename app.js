var express = require('express');
var search = require('./lib/controllers/search');
var Login=require('./lib/controllers/identity');
var chat=require('./lib/controllers/chat');
var app = express();
var mysql = require('mysql');
var Comment=require('./lib/controllers/comment');
var songList=require('./lib/controllers/songlist');


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
    search.createRequest(req.query, function (sres) {
            sres.pipe(res);
            sres.on('end', function () {
                //console.log(sres.header);
            });
    });
});
app.get('/song',function(req,res){
    search.getSong(req.query, function (sres) {
        sres.pipe(res);
    });
});
app.get('/lyric',function(req,res){
    search.getLyric(req.query,function(sres){
        sres.pipe(res);
    })
});
app.get('/artist',function(req,res){
    search.getArtist(req.query,function(sres){
        sres.pipe(res);
    });
});
app.get('/album',function(req,res){
    search.getAlbum(req.query,function(sres){
        sres.pipe(res);
    });
});
app.use('/intro',function(req,res){
    search.getIntro(req.query,function(sres){
        sres.pipe(res);
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

app.use('/chat',function(req,res){
    chat.init();
});

var songList=new songList(client);
app.use('/get_song_list',function(req,res){
    songList.getList(req.query.user_id,res);
});
app.use('/sl_song',function(req,res){
    songList.getSong(req.query.id,res);
});
app.use('/sl_detail',function(req,res){
    songList.getSLDetail(req.query.id,res);
});
app.use('/add_song_list',function(req,res){
    songList.insertData(req.query,res);
});
app.use('/delete_song',function(req,res){
    songList.deleteData(req.query,res);
});

var comment=new Comment(client);
app.use('/get_comment',function(req,res){
    comment.getComments(req.query.song_id,res);
});
app.use('/set_comment',function(req,res){
    comment.setComments(req.query,res);
});
var server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});