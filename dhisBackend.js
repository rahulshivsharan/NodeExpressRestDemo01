var express = require("express");
var app = express();
var request = require("request");

var END_POINT = "http://localhost:8082";
var SERVER_PORT = 8187;

var headerObject = {
	"Cookie" : "io=vp00bxehm5odCRQXAAAq; JSESSIONID=2kvev1arp5dm1es8eotpu63hg",
	"Content-Type" : "application/json",
	"Accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
	"GET" : "/api/organisationUnits.json HTTP/1.1",
	"Host" : "localhost:8082"
}

// cors headers set
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var server = app.listen(SERVER_PORT, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port);

});

// get Organisation Units
app.get("/organisationUnits",function(req,res){
	var url = END_POINT + "/api/organisationUnits.json";

	request({
		url : url,
		method : "GET",
		headers : headerObject
	},function(error,response){
		
		if(error){

			res.status(400);
			res.send(error);
		}else{
			res.status(200);
			res.set("Content-Type","application/json");

			res.send(response);			
		}
		
		res.end();	
	});

});


// get Users
app.get("/api/users.json",function(req,res){
	var url = END_POINT + "/api/users.json";

	request({
		url : url,
		method : "GET",
		headers : headerObject
	},function(error,response){
		
		if(error){

			res.status(400);
			res.send(error);
		}else{
			res.status(200);
			res.set("Content-Type","application/json");

			res.send(response);			
		}
		
		res.end();	
	});

});