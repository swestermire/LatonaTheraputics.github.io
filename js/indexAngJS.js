// this will be the ng app for the index page

console.log("indexAngJS.js file initiated...");

(function(){
	
	var app = angular.module("indexApp", ["ngRoute"]);

	app.controller('appendHeaderAndFooter' , appendHeaderAndFooterCtrl);

	app.config(function($routeProvider){
		console.log("Route Function Hit... ");
		$routeProvider
		
		.when("/", {
			templateUrl : "index.html"
		})

		.when("/LatonaHome", {
			templateUrl : "latonaTheraputicsHome.html"
		})

	});

	appendHeaderAndFooterCtrl.$inject = ["$scope"];
	function appendHeaderAndFooterCtrl($scope){

		$scope.title = "This is the scope";

		// this isn't good that I'm mixing jquery with angularJS
		(function(){
			console.log("function is working...")
			
<<<<<<< HEAD
			// adds the header
=======
>>>>>>> 4e221fd2f5a6e14e1d6bb840c2f558c664c14726
			$.get("layouts/header.html", function(data){
				console.log('invoked function in appendHeaderAndFooter');
				$(".header").append(data);
			})

<<<<<<< HEAD
			// adds the footer
			$.get("layouts/footer.html" , function(data){
				$(".footer").append(data);
			})

=======
>>>>>>> 4e221fd2f5a6e14e1d6bb840c2f558c664c14726
		})();

		};

})();