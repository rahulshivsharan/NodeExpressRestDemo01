var express = require("express");
var app = express();
var request = require("request");

//var BACKEND_URL = "http://test.hiskenya.org"; // test
var BACKEND_URL = "https://hiskenya.org"; // production

var headerObject = {
	"Cookie" : "_ga=GA1.2.1815890372.1503902426; __utma=158042915.1815890372.1503902426.1503902429.1503902429.1; __utmc=158042915; __utmz=158042915.1503902429.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); JSESSIONID=6B10FFE9F457F2275A604174A8D47742"
};

// cors headers set
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port);

});

app.get('/api/me', function (req, res) {
	var urlParam = req.query.fields;
	console.log(BACKEND_URL + "/api/me?fields="+urlParam);
	var url = BACKEND_URL + "/api/me?fields="+urlParam;
	console.log(url);
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

// avenirGetUserProfile
app.get('/api/organisationUnits/:userProfileId', function (req, res) {
	var urlParam = req.params.userProfileId;
	console.log(urlParam);
	var url = BACKEND_URL + "/api/organisationUnits/"+urlParam;
	console.log(url);
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


// avenirGetSubNationalList
app.get('/api/organisationUnits/:userProfileId/children.json', function (req, res) {
	var urlParam = req.params.userProfileId;
	console.log("Children ",urlParam);
	var url = BACKEND_URL + "/api/organisationUnits/"+urlParam+"/children.json";
	console.log(url);
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

//loadPopulation
app.get('/api/25/analytics.json', function (req, res) {
	var url = BACKEND_URL + "/api/25/analytics.json";

	var dimensions = req.query.dimension;
	var displayProperty = req.query.displayProperty;
	var skipMeta = req.query.skipMeta;	
	
	if(dimensions.constructor.name === "Array"){
		for(var index = 0; index < dimensions.length; index++){
			if(index === 0){
				url += "?dimension=" + dimensions[index];
			}else{
				url += "&dimension=" + dimensions[index];	
			}
			
		}
	}

	url += "&displayProperty=" + displayProperty;
	url += "&skipMeta" + skipMeta;
	
	console.log(url);

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

