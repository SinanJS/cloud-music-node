    var http = require('http');  
      
    var qs = require('querystring');  
      
    var data = {  
       page:1,
	   q:"周杰伦",
       size:10
     };//这是需要提交的数据  
      
      
    var content = qs.stringify(data);  
      
    var options = {  
        hostname: 'search.dongting.com',    
        path: 'http://search.dongting.com/song/search/old?' + content,  
        method: 'GET'  
    };  

    var req = http.request(options, function (res) {  
       // console.log('STATUS: ' + res.statusCode);  
       // console.log('HEADERS: ' + JSON.stringify(res.headers));  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            console.log('BODY: ' + chunk);  
        });  
    });  
      
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
    });  
      
    req.end();  