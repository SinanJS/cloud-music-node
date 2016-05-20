var jwt = require('jwt-simple');
var mysql = require('mysql');

var DATABASE = 'cloud_music_db';

var SongList=function(sqlConnect){
    this.client=sqlConnect;
};
SongList.prototype.getList=function(user_id,response){
    var sql_client=this.client;
    var selectStr="";
    selectStr=selectStr.concat("SELECT * FROM song_list WHERE song_list.user_id ='",user_id,"'");
    sql_client.query('use '+DATABASE);
    sql_client.query(
        selectStr,
        function selectCb(err, results, fields) {
            response.send({
                "song_lists":results
            });
        }
    );
};
SongList.prototype.getSong=function(sl_id,response){
    var sql_client=this.client;
    var selectStr="";
    selectStr=selectStr.concat("SELECT * FROM song WHERE sl_id ='",sl_id,"'");
    sql_client.query('use '+DATABASE);
    sql_client.query(
        selectStr,
        function selectCb(err, results, fields) {
            response.send({
                "songs":results
            });
        }
    );
};
SongList.prototype.getSLDetail=function(sl_id,response){
    var sql_client=this.client;
    var selectStr="";
    selectStr=selectStr.concat("SELECT * FROM song_list WHERE sl_id ='",sl_id,"'");
    sql_client.query('use '+DATABASE);
    sql_client.query(
        selectStr,
        function selectCb(err, results, fields) {
            response.send({
                "sl":results['0']
            });
        }
    );
};
SongList.prototype.deleteData=function(opt,response){
    var sql_client=this.client;
    var deleteStr="DELETE FROM song where song_id="+opt.song_id+" and sl_id="+opt.sl_id;
    console.log(deleteStr);
    sql_client.query('use '+DATABASE);
    try{
        sql_client.query(deleteStr,function(err,results){
            if(err) {
                console.log(err);
                //已经添加过了，主键冲突
                if(err.errno==1062){
                    response.send({
                        "code":2,
                        "msg":"没有找到该歌曲"
                    });
                }
                return false;
            }
            if(results && results.affectedRows===1){
                response.send({
                    "code":1,
                    "msg":"删除成功！"
                });
            }else{
                response.send({
                    "code":0,
                    "msg":"删除失败"
                });
            }
        });
    }catch (e){
        console.log(e);
    }
};
SongList.prototype.insertData=function(opt,response){
    var sql_client=this.client;
    var insertStr="INSERT INTO song VALUES('"+opt.song_id+"','"+opt.sl_id+"',"+opt.playtime+",'"+opt.song_name+"','"+opt.artist_id+"','"+opt.artist_pic+"','"+opt.artist_name+"','"+opt.mp3Url+"','"+opt.album_name+"','"+opt.album_id+"',NOW(),0);"
    sql_client.query('use '+DATABASE);
    try{
        sql_client.query(insertStr,function(err,results){
            if(err) {
                console.log(err);
                //已经添加过了，主键冲突
                if(err.errno==1062){
                    response.send({
                        "code":2,
                        "msg":"已经添加过了"
                    });
                }
                return false;
            }
            if(results && results.affectedRows===1){
                response.send({
                    "code":1,
                    "msg":"添加成功！"
                });
            }else{
                response.send({
                    "code":0,
                    "msg":"添加失败"
                });
            }
        });
    }catch (e){
        console.log(e);
    }

};
SongList.prototype.newList=function(opt,response){
    var sql_client=this.client;
    var sl_id=new Date().getTime();
    var insertStr="INSERT INTO song_list VALUES("+sl_id+",'"+opt.nick_name+"',"+opt.user_id+",'"+opt.sl_name+"','"+opt.description+"',NOW(),1,0,'');"
    sql_client.query('use '+DATABASE);
    try{
        sql_client.query(insertStr,function(err,results){
            if(err) {
                console.log(err);
                //已经添加过了，主键冲突
                if(err.errno==1062){
                    response.send({
                        "code":2,
                        "msg":"已经添加过了"
                    });
                }
                return false;
            }
            if(results && results.affectedRows===1){
                response.send({
                    "code":1,
                    "msg":"添加成功！"
                });
            }else{
                response.send({
                    "code":0,
                    "msg":"添加失败"
                });
            }
        });
    }catch (e){
        console.log(e);
    }
};


module.exports = SongList;