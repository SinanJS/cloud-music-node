    var http = require('http');  
      
    var qs = require('querystring');  
      
    var post_data = {  
        a: 123,  
        time: new Date().getTime()};//这是需要提交的数据  
      
      
    var content = qs.stringify(post_data);  
      
    var options = {  
        hostname: '127.0.0.1',  
        port: 10086,  
        path: '/pay/pay_callback',  
        method: 'POST',  
        headers: {  
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'  
        }  
    };  
      
    var req = http.request(options, function (res) {  
        console.log('STATUS: ' + res.statusCode);  
        console.log('HEADERS: ' + JSON.stringify(res.headers));  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            console.log('BODY: ' + chunk);  
        });  
    });  
      
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
    });  
      
    // write data to request body  
    req.write(content);  

    req.end();
    //http://localhost:3000/search?s=%25E7%25AA%2597%25E5%25A4%2596&type=1&limit=10&offset=0
    //http://localhost:3000/search?s=%E7%AA%97%E5%A4%96&limit=10&type=1&offset=0