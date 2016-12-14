// this will control  generation of timeline articles using AngJS

console.log("timelineArticleGeneratorAngJS initiated...");

(function(){
	var app = angular.module("timelineArticleGenerator", [])

	app.controller("articleGenerator" , articleGeneratorCtrl);

	// this is what dynamically serves up information displayed on article blocks
	articleGeneratorCtrl.$inject = ['$scope' , '$http'];
	function articleGeneratorCtrl($scope, $http){

		// !! AngJS implementation of JSON get request
		$http.get('../public/timelineEvents.json').success(function(data){
			console.log(data)
		})

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
		
	}

})();