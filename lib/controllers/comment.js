'use strict';

var jwt = require('jwt-simple');
var mysql = require('mysql');

var DATABASE = 'cloud_music_db';

var Comment=function(sqlConnect){
    this.user_id=0;
    this.client=sqlConnect;
};

//根据song_id获取这首单曲的所有评论

Comment.prototype.getComments=function(song_id,response){

    var sql_client=this.client;
    var selectStr="SELECT "+
    "a.*, "+
        "GROUP_CONCAT(c.comment_content SEPARATOR '$-$') reply "+
    "FROM "+
    "a_comment a "+
    "LEFT JOIN a_comment c ON a.id = c.parent_id "+
    "WHERE "+
    "a.parent_id = 0 and a.song_id = "+song_id+
    " GROUP BY "+
    "a.id";
    console.log("song_id",selectStr);
    sql_client.query('use '+DATABASE);
    sql_client.query(
        selectStr,
        function (err, results, fields) {
            console.log(results);
            response.send(results);
        }
    );
};

Comment.prototype.setComments=function(opt,response){
    var sql_client=this.client;
    var id=new Date().getTime();
    var insertStr="insert into a_comment values("+id+","+opt.song_id+","+opt.visitor_id+",'"+opt.content+"',NOW(),1,0)";
    console.log(insertStr);
    sql_client.query('use '+DATABASE);
    sql_client.query(
        insertStr,
        function(err,results,fields){
            if(results.affectedRows===1){
                response.send({
                    code:1,
                    msg:"添加评论成功"
                });
            }else {
                response.send({
                    code:2,
                    msg:"添加评论失败"
                });
            }
        }
    );
};
module.exports = Comment;