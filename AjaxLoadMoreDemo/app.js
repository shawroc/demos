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
		setTimeout(function(){
			res.end(JSON.stringify(data));
		},1500)
		
		break;


		default: 
		if(urlObj.pathname === '/') {
			urlObj.pathname += 'index.html';
		}
		fs.readFile(path.join(__dirname, urlObj.pathname), function(err,data){
			if(err){
				res.statusCode = 404;
				res.end('Not Found')
			}else {
				res.end(data)
			}
		})
	}
}).listen(8080)