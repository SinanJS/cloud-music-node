var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);



var users = {};
var usocket = {};

app.get('/', function (req, res) {
    res.send('<h1>Welcome Realtime Server</h1>');
});

//在线用户
var onlineUsers = {};
//当前在线人数
var onlineCount = 0;

var CHAT={
  init:function(){
      io.on('connection', function (socket) {
          console.log('a user connected');

          //监听新用户加入
          socket.on('login', function (obj) {
              //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
              //socket.name = obj.userid;
              users[obj.user_id] = obj.user_id;
              usocket[obj.user_id] = socket;

              console.log(obj.username + '加入了聊天室');
          });

          //监听用户退出
          socket.on('disconnect', function () {
              //将退出的用户从在线列表中删除
              if (usocket.hasOwnProperty(socket.name)) {
                  //退出用户的信息
                  var obj = {
                      userid: socket.name,
                      username: usocket[socket.name]
                  };

                  //删除
                  delete usocket[socket.name];
                  //在线人数-1
                  onlineCount--;

                  //向所有客户端广播用户退出
                  io.emit('logout', {
                      onlineUsers: onlineUsers,
                      onlineCount: onlineCount,
                      user: obj
                  });
                  console.log(obj.username + '退出了聊天室');
              }
          });

          //监听用户发布聊天内容
          socket.on('message', function (obj) {
              //向所有客户端广播发布的消息
              console.log(users);
              if (obj.to_id in users) {
                  console.log(obj);
                  usocket[obj.to_id].emit('message', obj);
                  usocket[obj.user_id].emit('message', obj);
              }
              //		io.emit('message', obj);
              console.log(obj.username + '说：' + obj.content);
          });

      });

      http.listen(3001, function () {
          console.log('listening on *:3000');
      });

  }
};
module.exports = CHAT;