var express = require("express");
var app = express();
var request = require("request");

var cookieObject = {
	"Cookie" : "_ga=GA1.2.520023289.1502177223; _gid=GA1.2.1471442791.1502177223; __utma=158042915.520023289.1502177223.1502177227.1502177227.1; __utmc=158042915; __utmz=158042915.1502177227.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); JSESSIONID=AA4A9B535AF845F328874208BDA3CF5D",
	"Host" : "hiskenya.org",
	"If-None-Match" : "\"059f30aba0cb4fcec96f569a86d329a23\""
}


// cors headers set
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/loadOrganisationUnit', function (req, res) {
	var url = "https://hiskenya.org/kenya/api/me?fields=dataViewOrganisationUnits";
	// hellensidha / H12345678 
	// https://hiskenya.org/
	console.log(url); 
	request({
		url : url,
		method : "GET",
		headers : cookieObject
	},function(error,response){
		
		if(error){
			
			res.status(400);
			res.send(error);
		}else{
			
			res.status(200);
			
			res.set("Content-Type","application/xml;charset=UTF-8");

			res.send(response.body);			
		}
		
		res.end();	
	});
   	
});

/*
	Load Population Data according to 
	National  , Zones (Counties)  , Districts (Sub counties)
*/
app.get('/loadPopulation', function (req, res) {
	var selectedYears = req.query.yearNos,
		ouParam = req.query.ou;


	var url = "http://41.87.6.124/dhis/api/25/analytics.json?dimension=dx:IgrJPkQheG3&dimension=pe:"+selectedYears+"&filter=ou:"+ouParam+"&displayProperty=NAME&skipData=false";

	//console.log(url);

	request({
		url : url,
		method : "GET",
		headers : cookieObject
	},function(error,response){
		
		if(error){
			
			res.status(400);
			res.send(error);
		}else{
			res.status(200);
			res.set("Content-Type","application/json");			
			res.send(response.body);			
		}
		
		res.end();	
	});
   	
});




/*
	Load Chart data for National
*/
app.get('/loadChartForNational', function (req, res) {
	var selectedYears = req.query.yearNos,
		url = "http://41.87.6.124/dhis/api/25/analytics.json?dimension=dx:T9dsTHOL2cO;PlBcttPGqvj;IFPYARV8ZkT;F6iOqCMiaqF;KEVDD65MCAl;R6lkzZOb5OL;SrWfqhptcqK;Ylale2Jx2kI;ZUZ4VsCyMyh;cQ6ErPzMMJo;f3GhhXjMcjq&dimension=pe:"+selectedYears+"&filter=ou:lZsCb6y0KDX&displayProperty=NAME&skipMeta=false";
	 
	request({
		url : url,
		method : "GET",
		headers : cookieObject
	},function(error,response){
		
		if(error){
			
			res.status(400);
			res.send(error);
		}else{
			res.status(200);
			res.set("Content-Type","application/json");			
			res.send(response.body);			
		}
		
		res.end();	
	});
   	
});




/*
	Load Chart data for Only Selection of Zones
	multiple Zone ID's can be ; separated
*/
app.get('/loadChartForZone', function (req, res) {
	var selectedZoneIds = req.query.zoneIds,
		selectedYears = req.query.yearNos,
		url = "http://41.87.6.124/dhis/api/25/analytics.json?dimension=dx:R6lkzZOb5OL;KEVDD65MCAl;ZUZ4VsCyMyh;cQ6ErPzMMJo;f3GhhXjMcjq;T9dsTHOL2cO;Ylale2Jx2kI;SrWfqhptcqK;F6iOqCMiaqF;IFPYARV8ZkT;PlBcttPGqvj&dimension=pe:"+selectedYears+"&filter=ou:"+selectedZoneIds+"&displayProperty=NAME&skipData=false";
	
	console.log(url); 
	request({
		url : url,
		method : "GET",
		headers : cookieObject
	},function(error,response){
		
		if(error){
			
			res.status(400);
			res.send(error);
		}else{
			res.status(200);
			res.set("Content-Type","application/json");			
			res.send(response.body);			
		}
		
		res.end();	
	});
   	
});

/*
	Load Chart data for Only Selection of Districts
	multiple District ID's can be ; separated
*/
app.get('/loadChartForDistricts', function (req, res) {
	var selectedDistrictIds = req.query.districtIds,
		selectedYears = req.query.yearNos,
		url = "http://41.87.6.124/dhis/api/25/analytics.json?dimension=dx:R6lkzZOb5OL;KEVDD65MCAl;ZUZ4VsCyMyh;cQ6ErPzMMJo;f3GhhXjMcjq;T9dsTHOL2cO;Ylale2Jx2kI;SrWfqhptcqK;F6iOqCMiaqF;IFPYARV8ZkT;PlBcttPGqvj&dimension=pe:"+selectedYears+"&filter=ou:"+selectedDistrictIds+"&displayProperty=NAME&skipData=false";
	 
	request({
		url : url,
		method : "GET",
		headers : cookieObject
	},function(error,response){
		
		if(error){
			
			res.status(400);
			res.send(error);
		}else{
			res.status(200);
			res.set("Content-Type","application/json");			
			res.send(response.body);			
		}
		
		res.end();	
	});
   	
});

/*
	Load Chart data for Only Selection of Health Centers
	multiple Health Center ID's can be ; separated
*/
app.get('/loadChartForHealthCenters', function (req, res) {
	var selectedHealthCenterIds = req.query.hcIds,
		selectedYears = req.query.yearNos,
		url = "http://41.87.6.124/dhis/api/25/analytics.json?dimension=dx:R6lkzZOb5OL;KEVDD65MCAl;ZUZ4VsCyMyh;cQ6ErPzMMJo;f3GhhXjMcjq;T9dsTHOL2cO;Ylale2Jx2kI;SrWfqhptcqK;F6iOqCMiaqF;IFPYARV8ZkT;PlBcttPGqvj&dimension=pe:"+selectedYears+"&filter=ou:"+selectedHealthCenterIds+"&displayProperty=NAME&skipData=false";
	 
	request({
		url : url,
		method : "GET",
		headers : cookieObject
	},function(error,response){
		
		if(error){
			
			res.status(400);
			res.send(error);
		}else{
			res.status(200);
			res.set("Content-Type","application/json");			
			res.send(response.body);			
		}
		
		res.end();	
	});
   	
});

/*
	Load National level data
*/
app.get('/loadNational', function (req, res) {
	var selectedYears = req.query.yearNos,
		url = "http://41.87.6.124/dhis/api/25/analytics.json?dimension=dx:T9dsTHOL2cO;PlBcttPGqvj;IFPYARV8ZkT;F6iOqCMiaqF;KEVDD65MCAl;R6lkzZOb5OL;SrWfqhptcqK;Ylale2Jx2kI;ZUZ4VsCyMyh;cQ6ErPzMMJo;f3GhhXjMcjq&dimension=pe:"+selectedYears+"&filter=ou:lZsCb6y0KDX&displayProperty=NAME&skipMeta=false";
	request({
		url : url,
		method : "GET",
		headers : cookieObject
	},function(error,response){
		
		if(error){
			
			res.status(400);
			res.send(error);
		}else{
			res.status(200);
			res.set("Content-Type","application/json");			
			res.send(response.body);			
		}
		
		res.end();	
	});
   	
});

/*
	Load Zones
*/
app.get('/loadZones', function (req, res) {
	var url = "http://41.87.6.124/dhis/api/25/organisationUnits.json?userDataViewFallback=true&fields=id,displayName|rename(name),children[id,displayName|rename(name)]&paging=false";
	request({
		url : url,
		method : "GET",
		headers : cookieObject
	},function(error,response){
		
		if(error){
			
			res.status(400);
			res.send(error);
		}else{
			res.status(200);
			res.set("Content-Type","application/json");			
			res.send(response.body);			
		}
		
		res.end();	
	});
   	
});

// load health Centers
app.get("/loadHealthCenters",function(req,res){
	var selectedDistrictId = req.query.districtId;
	var url = "http://41.87.6.124/dhis/api/25/organisationUnits/"+selectedDistrictId+".json?node="+selectedDistrictId+"&fields=children[id,displayName|rename(name),children::isNotEmpty|rename(hasChildren)&paging=false";
	request({
		url : url,
		method : "GET",
		headers : cookieObject
	},function(error,response){
		
		if(error){

			res.status(400);
			res.send(error);
		}else{
			res.status(200);
			res.set("Content-Type","application/json");			
			res.send(response.body);			
		}
		
		res.end();	
	});

});


// load district
app.get("/loadDistricts",function(req,res){
	var selectedZone = req.query.zoneId;
	var url = "http://41.87.6.124/dhis/api/25/organisationUnits/"+selectedZone+".json?node=iQx6Edf0Xib&fields=children[id,displayName|rename(name),children::isNotEmpty|rename(hasChildren)&paging=false";

	request({
		url : url,
		method : "GET",
		headers : cookieObject
	},function(error,response){
		
		if(error){

			res.status(400);
			res.send(error);
		}else{
			res.status(200);
			res.set("Content-Type","application/json");			
			res.send(response.body);			
		}
		
		res.end();	
	});

});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port);

});