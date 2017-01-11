'use strict'

console.log("latonaTheraputicsAngJS initiated...");

(function(){
	var app = angular.module("latonaTheraputicsAngJS", [])

	app.controller("articleGenerator" , articleGeneratorCtrl);
	app.controller("appendHeaderAndFooter" , appendHeaderAndFooterCtrl);

	// this is what dynamically serves up information displayed on article blocks
	articleGeneratorCtrl.$inject = ['$scope' , '$http', '$compile', '$templateRequest'];
	function articleGeneratorCtrl($scope, $http, $compile, $templateRequest){

		$scope.titleAlt = "Alternate Title Block";

		// !! AngJS implementation of JSON get request
		// a filter could be added to look for a date range, article types, etc... Will add later
		$http.get('../../public/timelineEvents.json').success(function(response, searchParams){
			
			// calculates number of entries
			$scope.totEntries = Object.keys(response).length
			
			$scope.timelineEventsData = response;

			$scope.fromJSONTest = angular.fromJson(response)
		})

		$templateRequest('../../layouts/timelineArticleBlockLeft.html').then(function(template){
			$compile($(".articleLeft").html(template).contents());
		})

		$templateRequest("../../layouts/timelineArticleBlockRight.html").then(function(template){
			$compile($(".articleRight").html(template).contents());
		});

		};

	// controller to fetch header and footer template
	appendHeaderAndFooterCtrl.$inject = ["$templateRequest", "$compile"];
	function appendHeaderAndFooterCtrl($templateRequest, $compile){

		//manual way of injectign header and footer template into DOM. Using directives is more elegant solution
		$templateRequest("../../layouts/header").then(function(template){
			$compile($("#header").html(template).contents());
		})

		$templateRequest("../../layouts/footer").then(function(template){
			$compile($("#footer").html(template).contents());
		})

		//using angularJS directives to perform the same operation above
		//!!!! NEED TO FINISH IMPLEMENTING THE ABOVE FUNCTION USING DIRECTIVES!!!!//
	};

})();