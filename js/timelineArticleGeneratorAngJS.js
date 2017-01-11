// timelineArticleGeneratorAngJS.js is a port of timelineFunctionality.js from jquery to 
// angularJS.

'use strict'

console.log("timelineArticleGeneratorAngJS initiated...");

(function(){
	var app = angular.module("timelineArticleGenerator", [])

	app.controller("articleGenerator" , articleGeneratorCtrl);
	app.controller("appendHeaderAndFooter" , appendHeaderAndFooterCtrl);

	// this is what dynamically serves up information displayed on article blocks
	articleGeneratorCtrl.$inject = ['$scope' , '$http'];
	function articleGeneratorCtrl($scope, $http){

		$scope.titleAlt = "Alternate Title Block";

		// !! AngJS implementation of JSON get request
		$http.get('../../public/timelineEvents.json').success(function(response){
			$scope.timelineEventsData = response;
		})

		$http.get('../../layouts/timelineArticleBlock.html').success(function(response){
			$scope.articleBlockLeftTemplate = $(response).filter("#article-block-left").html();
			$scope.articleBlockRightTemplate = $(response).filter("#article-block-right").html();
		})

		};

	// controller to fetch header and footer template
	appendHeaderAndFooterCtrl.$inject = ["$scope" , "$templateRequest", "$compile"];
	function appendHeaderAndFooterCtrl($scope, $templateRequest, $compile){
		console.log("appendHeaderAndFooterCtrlHit!")

		//manual way of injectign header and footer template into DOM. Using directives is more elegant solution
		$templateRequest("../../layouts/header").then(function(template){
			$scope.headerTemplate = template;
			$compile($("#header").html(template).contents());
		})

		$templateRequest("../../layouts/footer").then(function(template){
			$scope.footerTemplate = template
			$compile($("#footer").html(template).contents());
		})

		//using angularJS directives to perform the same operation above
		//!!!! NEED TO FINISH IMPLEMENTING THE ABOVE FUNCTION USING DIRECTIVES!!!!//
	};

})();