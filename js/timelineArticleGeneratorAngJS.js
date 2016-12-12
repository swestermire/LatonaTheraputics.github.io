// this will control  generation of timeline articles using AngJS

console.log("timelineArticleGeneratorAngJS initiated...");

(function(){
	var app = angular.module("timelineArticleGenerator", [])

	app.controller("articleGenerator" , articleGeneratorCtrl);

	// this is what dynamically serves up information displayed on article blocks
	articleGeneratorCtrl.$inject = ['$scope'];
	function articleGeneratorCtrl($scope){

	(function(){
		console.log("iffe working!")
		/// this is using jquery's ajax request to get locally stored JSON file. There's also an angJS way
		$.getJSON("../public/timelineEvents.json" , function(data){
			console.log("blahblahblah")
			var items = []

			//year iteration
			$.each(data, function(key, value){
				console.log("key/value = " + key + "/" + value);
			})

			$scope.date = data["2016"]["1"]["date"]
			$scope.title = data["2016"]["1"]["date"]
			$scope.articleContent = data["2016"]["1"]["date"]

		})

	})();

		// This could be a way as well???
		
	}

})();