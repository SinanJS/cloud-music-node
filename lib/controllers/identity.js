var jwt = require('jwt-simple');
var mysql = require('mysql');

var DATABASE = 'cloud_music_db';


var Identity=function(sqlConnect){
    this.user_id=0;
    this.token="";
    this.client=sqlConnect;
};
//登录
Identity.prototype.login=function(opt,response){
    var email=opt.email?opt.email:"";
    var phone=opt.phone?opt.phone:"";
    var sql_client=this.client;
    var selectStr="";
    selectStr=selectStr.concat("SELECT * FROM user_tb WHERE user_tb.email ='",email,"' OR user_tb.phone='",phone,"'");
    sql_client.query('use '+DATABASE);
    sql_client.query(
        selectStr,
        function selectCb(err, results, fields) {
            if(results)
            {

                if(results[0].pwd==opt.pwd){
                    //生成Token,并且加入到数据库和客户端
                    var user_info=results[0];
                    var payload={
                        email:opt.email,
                        phone:opt.phone
                    };
                    var sc=sql_client;
                    var token = jwt.encode(payload, opt.pwd);

                   /* var decoded = jwt.decode(token, secret);
                    console.log(decoded); //=> { foo: 'bar' }*/

                    //添加token到数据库中
                    var update_token="";
                    update_token=update_token.concat("UPDATE user_tb SET token = '",token,"' WHERE user_id ='",user_info.user_id,"' ");
                    sc.query('use '+DATABASE);
                    sc.query(
                        update_token,function(err,result){
                            if(err)throw err;
                            console.log("受影响行数",result.affectedRows);
                            if(result.affectedRows>0){
                                //将token反馈给客户端
                                response.send({
                                    "user_id":user_info.user_id,
                                    "nick_name":user_info.nick_name,
                                    "phone":user_info.phone,
                                    "email":user_info.email,
                                    "token":token
                                });
                                return true;
                            }
                        }
                    );

                }
            }
        }
    );
    sql_client.on('error',function(err){
        console.log(err);
    });
};

//注销
Identity.prototype.logout=function(user_id,response){
    var sql_client=this.client;
    var sqlStr="UPDATE user_tb SET token='' WHERE user_id="+user_id;
    console.log(sqlStr);
    sql_client.query('use '+DATABASE);
    sql_client.query(sqlStr,function(err,result){
        if(err) throw  err;
        if(!!result && result.changedRows>0){
            response.send({
                status:"success"
            });
        }else {
            response.send({
                status:"err"
            });
        }
    });
};

Identity.prototype.signIn=function(opt,response){
    var sql_client=this.client;
    var login=this.login;
    if(!!this.veriySignIn(opt)){
        //创建user_id
        var user_id=new Date().getTime().toString().substr(8);
        var insertStr='INSERT INTO USER_TB VALUES("'+user_id+'","'+opt.nick_name+'","'+opt.phone+'","'+opt.email+'","'+opt.pwd+'","")';
        var selectStr="SELECT COUNT(user_tb.user_id) AS count FROM user_tb WHERE phone='"+opt.phone+"' OR email='"+opt.email+"'";
        console.log(selectStr);

        sql_client.query("use "+DATABASE);
        sql_client.query(selectStr,function(err,results){
            if(err) throw err;

            if(!!results && results[0].count==0){

                sql_client.query("use "+DATABASE);
                sql_client.query(insertStr,function(err,results){
                    if(err) throw err;
                    if(results && results.affectedRows===1){
                        response.send(opt);
                    }
                });
            }else {
                response.send({"status":"该手机/邮箱已经被注册过"});
            }
        });


    }else {
        response.send({"status":"注册失败"});
    }
};

//验明正身
Identity.prototype.verifyID=function(opt,callback){
    var sql_client=this.client;
    var selectStr="SELECT token from user_tb WHERE user_id='"+opt.user_id+"'";
    sql_client.query("use "+DATABASE);
    sql_client.query(selectStr,function(err,results){
        if(err) throw err;
        if(!!results && results[0].token===opt.token){
            callback(opt.token);
        }
    });
};


Identity.prototype.veriySignIn=function(opt){
    //手机正则
    var regPhone=/^1[34578]\d{9}$/;
    var regEmail=/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

    if(!regPhone.test(opt.phone)){
        return false;
    }else if(!regEmail.test(opt.email)){
        return false;
    }else if(!opt.pwd || opt.pwd.length>50){
        return false;
    }else if(!opt.nick_name){
        opt.nick_name="用户"+new Date.getTime().toString().substr(9);
        return true;
    }else {
        return true;
    }
};

module.exports = Identity;

