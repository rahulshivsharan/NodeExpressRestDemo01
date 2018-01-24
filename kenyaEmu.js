var express = require("express");
var app = express();
var request = require("request");

var applicationName = "KenyaEMU";

var BACKEND_URL = "https://test.hiskenya.org/kenya"; // test
//var BACKEND_URL = "https://hiskenya.org"; // production

var headerObject = {
	"Cookie" : "JSESSIONID=DDCFD8D6FF3D1237D52D212ACA1ED3A6; __utma=236702980.1271857500.1516604883.1516604883.1516604883.1; __utmc=236702980; __utmz=236702980.1516604883.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)"
};

// cors headers set
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

var server = app.listen(8085, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port);

});

app.get('/api/me', function (req, res) {
	var urlParam = req.query.fields;
	console.log(BACKEND_URL + "/api/me?fields="+urlParam);
	var url = BACKEND_URL + "/api/me?fields="+urlParam;
	console.log(url);

	console.log(applicationName);

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
	console.log(applicationName);

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
	console.log(applicationName);	

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
	console.log(applicationName);
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

