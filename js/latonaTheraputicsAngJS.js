'use strict'

console.log("latonaTheraputicsAngJS initiated...");

(function(){
	var app = angular.module("latonaTheraputicsAngJS", [])

	app.controller("articleGenerator" , articleGeneratorCtrl);
	app.controller("appendHeaderAndFooter" , appendHeaderAndFooterCtrl);
	// app.controller("appendTimelineInfo" , appendTimelineInfoCtrl);

	// appendTimelineInfoCtrl.$inject = ['$scope'];
	// function appendTimelineInfoCtrl($scope){
	// 	/// $scoped.entry was here before. but this controller doesn't work
	// };


	// Strange... when I inject articleBlock templates to the DOM, the scoped entry data
	// cannot display.  I've tried using alternative controllers, declaring the controller
	// in the template.  It doesn't really make any sense.  What I will do instead is, after 
	// the article blocks have been rendered on the screen, I can go back an inject timeline
	// article data.   This feels a bit dirty

	// this is what dynamically serves up information displayed on article blocks
	articleGeneratorCtrl.$inject = ['$scope' , '$http', '$compile', '$templateRequest'];
	function articleGeneratorCtrl($scope, $http, $compile, $templateRequest){

		  /// after DOM is loaded, these functions are executed.
		  angular.element(document).ready(function(){
		  	console.log("post-DOM load check");

		  	/// calls function to populate article info into article blocks
		  	populateArticleBlocksInfo();

		  });

		console.log("pre-DOM load check")

		function populateArticleBlocksInfo(){

	  	/// inject timeline articles with article content

	  	/// dummy content for now.
	  // 		$scope.entry = {
			// 	"title" : "suck it",
			// 	"date" : "LONG!",
			// 	"article content" : "ASDLASDKASLDSD",
			// 	"article type" : "asdsadsa"
			// };

	  	//get all left article blocks
	  		var allArticleBlockLeft = angular.element(document.getElementsByClassName('articleLeft'));
	  		for (var idx = 0; idx < allArticleBlockLeft.length; idx++){
	  			console.log('writing found article block lefts')
	  			console.log(allArticleBlockLeft[idx]);
	  		}

	  	//get all right article blocks
	  		var allArticleBlockRight = angular.element(document.getElementsByClassName('articleRight'));

	  	//get all article content data
	  	// Need to fill in this data.  This can be hardcoded for now... then we can transition to JSON file... then to 
	  	// an actual server

	  	//inject artcile data into article blocks
	  		
	  		$scope.entry = {
				"title" : "suck it",
				"date" : "LONG!",
				"article content" : "ASDLASDKASLDSD",
				"article type" : "asdsadsa"
			};


	  		var content = $scope.entry;

	  		/// populating left article blocks
	  		for (var idx = 0; idx < allArticleBlockLeft.length; idx++){
	  			populateArticleBlockInfo(allArticleBlockLeft[idx], content);
	  		}

	  		/// populating right article blocks
	  		for (var idx = 0; idx < allArticleBlockRight.length; idx++){
	  			populateArticleBlockInfo(allArticleBlockRight[idx], content);
	  		}

	  	/// populates an article based on DOM element input and content input
		function populateArticleBlockInfo(DOM, content){

			// var title = angular.element(DOM.getElementById('title'));
			// console.log("title element = " + title.innerHTML);
			// title.innerHTML = "Updated Title " + $scope.entry["title"];
			// console.log("updated title?");
		};

		};

		$scope.titleAlt = "Alternate Title Block";

		/// Test scoped entry value that does not work... 
		// $scope.entry = {
		// 	"title" : "suck it",
		// 	"date" : "LONG!",
		// 	"article content" : "ASDLASDKASLDSD",
		// 	"article type" : "asdsadsa"
		// };

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