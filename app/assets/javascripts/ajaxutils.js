(function(global){

console.log("global ajaxUtils working");

var ajaxUtils = {};

//Returns an HTTP request object
function getRequestObject() {
	if (window.XMLHttpRequest) {
		return (new XMLHttpRequest());
	}
	else {
		global.alert("Ajax is not supported!");
		return(null);
	}
}
	
ajaxUtils.sendGetRequest = 
function(requestURL, responseHandler, isJsonResponse){
	var request = getRequestObject();
	request.onreadystatechange = 
	
	function() {
		handleResponse(request,
					   responseHandler,
					   isJsonResponse);
	};
	
	request.open("GET", requestURL, true);
	request.send(null); // for POST only
	
	};

function handleResponse(request,
						responseHandler,
						isJsonResponse) { 
	if ((request.readyState == 4) && (request.status == 200)){
		
		if (isJsonResponse == undefined) {
			isJsonResponse = true;
		}
		
		if (isJsonResponse) {
			console.log('Parsing JSON File');
			responseHandler(JSON.parse(request.responseText));
		}
		
		else {
			responseHandler(request.responseText);
		};
	};
};

global.$ajaxUtils = ajaxUtils;

})(window);


