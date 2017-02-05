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

		  	//get all left article blocks
		  		var allArticleBlocks = angular.element(document.getElementsByClassName('article-block-container'));

		  	//get all article content data and renders content
		  	$http.get("../../public/timelineEvents.json").then(function(response){

		  		var timelineArticles = response.data;

		  		/// populating article blocks with content
		  		console.log("allArticleBlocks length = " + allArticleBlocks.length)
		  		for (var idx = 0; idx < allArticleBlocks.length; idx++){
		  			var timelineArticle = timelineArticles[String(idx)];
		  			populateArticleBlockInfo(allArticleBlocks[idx], timelineArticle, idx, "article-block-container");
		  		}

		  	});

		  	/// populates an article based on DOM element input and content input
			function populateArticleBlockInfo(DOM, content, idx, className){
				/// don't know why I can't pass DOM element and do a child element search.
				/// instead, I'm having the DOM element be reId'ed and then the child element is found
				/// This is unfortunately not performance optimized... 

				/// identifies all the content locations within the article element
				var articleBlock = document.getElementsByClassName(className)[idx];
				var title = angular.element(articleBlock.getElementsByClassName('title')); //getElementsByClassName ALWAYS RETURNS AN ARRAY!
				var date = angular.element(articleBlock.getElementsByClassName('header-date'));
				var articleType = angular.element(articleBlock.getElementsByClassName('article-type'));
				var articleContent = angular.element(articleBlock.getElementsByClassName('article-content'));

				// changes DOM element info
				title[0].innerHTML = content["title"];
				date[0].innerHTML = content["date"];
				articleType[0].innerHTML = content["article type"];
				articleContent[0].innerHTML = content["article content"];
			};
		};

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