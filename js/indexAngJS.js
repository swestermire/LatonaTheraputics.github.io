// this will be the ng app for the index page

console.log("indexAngJS.js file initiated...");

(function(){
	
	var app = angular.module("indexApp", ["ngRoute"]);

	app.config(function($routeProvider){
		$routeProvider
		
		.when("/", {
			templateUrl : "index.html"
		})

		.when("/LatonaHome", {
			templateUrl : "latonaTheraputicsHome.html"
		})

	});

})();