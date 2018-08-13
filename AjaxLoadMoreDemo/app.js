var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

http.createServer(function(req,res){
	var urlObj = url.parse(req.url, true);

	switch(urlObj.pathname) {
		case '/loadmore' :
		var currentIndex = parseInt(urlObj.query.index);
		console.log(currentIndex)
		var newsLength = parseInt(urlObj.query.length);
		console.log(newsLength)
		var data = [];
		for(var i = 0; i < newsLength; i++) {
			data.push('News' + (currentIndex+i+1));
		};

		res.end(JSON.stringify(data))
		/*setTimeout(function(){
			res.end(JSON.stringify(data));
		},1500)
		模拟服务器响应延迟

		*/
		break;


		default: 
		if(urlObj.pathname === '/') {
			urlObj.pathname += 'index.html';
		}
		var filePath = path.join(__dirname, urlObj.pathname);

		fs.readFile(filePath, 'binary',function(err,fileContent){
			if(err){
				res.statusCode = 404;
				res.end('Not Found')
			}else {
				res.write(fileContent, 'binary')
				res.end()
			}
		})
	}
}).listen(8080)