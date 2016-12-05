// this will be the ng app for the index page

console.log("indexAngJS.js file initiated...");

(function(){
	
	var app = angular.module("indexApp", ["ngRoute"]);

	app.controller('indexGeneralFunctions' , indexGeneralFunctionsCtrl)
	app.controller('appendHeaderAndFooter' , appendHeaderAndFooterCtrl);

	app.config(function($routeProvider){
		console.log("Route Function Hit... ");
		$routeProvider
		
		.when("/", {
			templateUrl : "../index.html"
		})

		.when("/LatonaHome", {
			templateUrl : "../static/views/latonaTheraputicsHome.html"
		})

	});

	indexGeneralFunctionsCtrl.$inject = ["$scope"];
	function indexGeneralFunctionsCtrl($scope){
		var fullDate = new Date();
		$scope.date = fullDate.getMonth() + '-' + fullDate.getDate() + '-' + fullDate.getFullYear();

		$scope.projectList = {
			LatonaTheraputics : {
				title : "Latona Theraputics Website",
				version : "1.514v",
				href : "static/views/latonaTheraputicsHome.html"
			}
		};

	};

	appendHeaderAndFooterCtrl.$inject = ["$scope"];
	function appendHeaderAndFooterCtrl($scope){

		$scope.title = "Scope name provided by AngularJS";

		// this isn't good that I'm mixing jquery with angularJS
		(function(){
			console.log("function is working...")
			
			// adds the header
			$.get("../../layouts/header.html", function(data){
				console.log('invoked function in appendHeaderAndFooter');
				$(".header").append(data);
			})

			// adds the footer
			$.get("../../layouts/footer.html" , function(data){
				$(".footer").append(data);
			})

		})();

		};

})();