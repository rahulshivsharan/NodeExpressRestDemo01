var express = require("express");
var app = express();
var request = require("request");
var applicationName = "MalawiEMU";
var cookieObject = {
	"Cookie" : "JSESSIONID=298E1D94443D288018CBDFD4B3DCD9EE"	
};

var BACKEND_ENDPOINT = "http://41.87.6.124/dhis"; //http://dhis2.health.gov.mw
//Credentials : Nath / Change2017

// cors headers set
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/loadOrganisationUnit', function (req, res) {
	var url = BACKEND_ENDPOINT +"/api/me?fields=dataViewOrganisationUnits";

	console.log(url);

	console.log(applicationName);

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


	var url = BACKEND_ENDPOINT + "/api/25/analytics.json?dimension=dx:IgrJPkQheG3&dimension=pe:"+selectedYears+"&filter=ou:"+ouParam+"&displayProperty=NAME&skipData=false";

	//console.log(url);
	console.log(applicationName);
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
		url = BACKEND_ENDPOINT + "/api/25/analytics.json?dimension=dx:T9dsTHOL2cO;PlBcttPGqvj;IFPYARV8ZkT;F6iOqCMiaqF;KEVDD65MCAl;R6lkzZOb5OL;SrWfqhptcqK;Ylale2Jx2kI;ZUZ4VsCyMyh;cQ6ErPzMMJo;f3GhhXjMcjq&dimension=pe:"+selectedYears+"&filter=ou:lZsCb6y0KDX&displayProperty=NAME&skipMeta=false";
	
	console.log(applicationName);

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
		url = BACKEND_ENDPOINT + "/api/25/analytics.json?dimension=dx:R6lkzZOb5OL;KEVDD65MCAl;ZUZ4VsCyMyh;cQ6ErPzMMJo;f3GhhXjMcjq;T9dsTHOL2cO;Ylale2Jx2kI;SrWfqhptcqK;F6iOqCMiaqF;IFPYARV8ZkT;PlBcttPGqvj&dimension=pe:"+selectedYears+"&filter=ou:"+selectedZoneIds+"&displayProperty=NAME&skipData=false";
	
	console.log(url); 
	console.log(applicationName);
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
		url = BACKEND_ENDPOINT + "/api/25/analytics.json?dimension=dx:R6lkzZOb5OL;KEVDD65MCAl;ZUZ4VsCyMyh;cQ6ErPzMMJo;f3GhhXjMcjq;T9dsTHOL2cO;Ylale2Jx2kI;SrWfqhptcqK;F6iOqCMiaqF;IFPYARV8ZkT;PlBcttPGqvj&dimension=pe:"+selectedYears+"&filter=ou:"+selectedDistrictIds+"&displayProperty=NAME&skipData=false";
	 
	console.log(applicationName);
	 
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
		url = BACKEND_ENDPOINT + "/api/25/analytics.json?dimension=dx:R6lkzZOb5OL;KEVDD65MCAl;ZUZ4VsCyMyh;cQ6ErPzMMJo;f3GhhXjMcjq;T9dsTHOL2cO;Ylale2Jx2kI;SrWfqhptcqK;F6iOqCMiaqF;IFPYARV8ZkT;PlBcttPGqvj&dimension=pe:"+selectedYears+"&filter=ou:"+selectedHealthCenterIds+"&displayProperty=NAME&skipData=false";
	
	console.log(applicationName);

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
		url = BACKEND_ENDPOINT + "/api/25/analytics.json?dimension=dx:T9dsTHOL2cO;PlBcttPGqvj;IFPYARV8ZkT;F6iOqCMiaqF;KEVDD65MCAl;R6lkzZOb5OL;SrWfqhptcqK;Ylale2Jx2kI;ZUZ4VsCyMyh;cQ6ErPzMMJo;f3GhhXjMcjq&dimension=pe:"+selectedYears+"&filter=ou:lZsCb6y0KDX&displayProperty=NAME&skipMeta=false";

	console.log(applicationName);

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
	var url = BACKEND_ENDPOINT + "/api/25/organisationUnits.json?userDataViewFallback=true&fields=id,displayName|rename(name),children[id,displayName|rename(name)]&paging=false";
	
	console.log(applicationName);

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
	var url = BACKEND_ENDPOINT + "/api/25/organisationUnits/"+selectedDistrictId+".json?node="+selectedDistrictId+"&fields=children[id,displayName|rename(name),children::isNotEmpty|rename(hasChildren)&paging=false";
	
	console.log(applicationName);

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
	var url = BACKEND_ENDPOINT + "/api/25/organisationUnits/"+selectedZone+".json?node=iQx6Edf0Xib&fields=children[id,displayName|rename(name),children::isNotEmpty|rename(hasChildren)&paging=false";

	console.log(applicationName);

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