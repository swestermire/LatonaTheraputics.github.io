// timelineArticleGeneratorAngJS.js is a port of timelineFunctionality.js from jquery to 
// angularJS.

'use strict'

console.log("timelineArticleGeneratorAngJS initiated...");

(function(){
	var app = angular.module("timelineArticleGenerator", [])

	app.controller("articleGenerator" , articleGeneratorCtrl);

	// this is what dynamically serves up information displayed on article blocks
	articleGeneratorCtrl.$inject = ['$scope' , '$http'];
	function articleGeneratorCtrl($scope, $http){

		// !! AngJS implementation of JSON get request
		$http.get('../../public/timelineEvents.json').success(function(data){
			$scope.articleDataYear = data["2016"];
			console.log(data["2016"])
		})

		// html partial for the article block layout
		$scope.articleTemplate = {
			url : "../../layouts/timelineArticleBlock.html",
			test : $http.get("../../layouts/timelineArticleBlock.html").success(function(data){
				return data
			})
		};

		// (function(){
		// 	console.log("function is working...")
			
		// 	// adds the header
		// 	$.get("../../layouts/header.html", function(data){
		// 		console.log('invoked function in appendHeaderAndFooter');
		// 		$(".header").append(data);
		// 	})

		// 	// adds the footer
		// 	$.get("../../layouts/footer.html" , function(data){
		// 		$(".footer").append(data);
		// 	})

		// })();

		};

	// !!! This is the jquery implementation but does not have the callback function also bad
	// practice to use jquery with angJS... i know...
	// (function(){
	// 	console.log("iffe working!")
	// 	/// this is using jquery's ajax request to get locally stored JSON file. There's also an angJS way
	// 	$.getJSON("../public/timelineEvents.json" , function(data){
	// 		console.log("blahblahblah")
	// 		var items = []

	// 		//year iteration
	// 		$.each(data, function(key, value){
	// 			console.log("key/value = " + key + "/" + value);
	// 		})


	// 		// this will be updated to store all article data which will be used accessed using ng-repeat. 
	// 		// i think that makes the most sense... right now just tring to get the base case to work.
	// 		$scope.date = data["2016"]["1"]["date"]
	// 		$scope.title = data["2016"]["1"]["title"]
	// 		$scope.articleContent = data["2016"]["1"]["article content"]

	// 	})

	// })();

		// This could be a way as well???
		
	// }

})();