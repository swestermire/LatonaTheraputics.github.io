'use strict'

console.log("latonaTheraputicsAngJS initiated...");

(function(){
	var app = angular.module("latonaTheraputicsAngJS", []);

	app.controller("articleGenerator" , articleGeneratorCtrl);
	// .directive("timelineCenterBlock", timelineCenterBlockDirective);

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
		  	repositionTimelineArticles();
		  });

		console.log("pre-DOM load check")

		function populateArticleBlocksInfo(){

		  	//get all left article blocks
		  		var allArticleBlocks = angular.element(document.getElementsByClassName('article-block-container'));

		  	//get all article content data and renders content
		  	$http.get("../../public/timelineEvents.json").then(function(response){

		  		var timelineArticles = response.data;

		  		/// populating article blocks with content
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

		function repositionTimelineArticles(){
			/// identify all article elements
			var allArticleBlocks = angular.element(document.getElementsByClassName('article-block-container'));
			var timelineWindow = angular.element(document.getElementsByClassName('timeline-window'))[0];

			/// Everything is relative to timeline-window
			
			/// variable to adjust timeline-window height.  Needed for content placement below timeline (e.g. footer)
			var totHeight = 0;

			/// adjust timeline-window placement to be centered relative to screen
			elementCenter(window, timelineWindow);

			/// adjust articles to be centered within timeline-window

			console.log('timelineWindow.style.width = ' + timelineWindow.offsetWidth);

			// for (var idx = 0; idx < allArticleBlocks.length; idx++){
			// 	var article = allArticleBlocks[idx];
			// 	var prevArticle = allArticleBlocks[idx-1];
			// 	if (idx % 2 == 0){
			// 		article.style.left = 10 + 'px';
			// 		article.style.top = 10 + 'px';

			// 		console.log("article.style.bot = " + article.style.bottom);
			// 		totHeight += article.offsetHeight;

			// 	} else {
			// 		article.style.left = '50vw';
			// 		article.style.top = 10 + 'px';
			// 	}

			// 	/// adjusting timelineWindow height.
			// 	timelineWindow.style.height = totHeight;
			// 	console.log("timelineWindow.style.height = " + timelineWindow.style.height)
				
			// };

			/// calculate overall article height

			/// identify all timeline balls
				/// we can probably just add the timeline balls at the end when articles are positioned correctly
		};

		/// centers element relative to a referened element
		function elementCenter(reference, element){
			var refWidth = reference.innerWidth;
			var elementWidth = element.offsetWidth;

			var margin = Math.floor((refWidth - elementWidth)/2);
			element.style.marginLeft = margin + 'px';
		}

		$scope.titleAlt = "Alternate Title Block";

		// !! AngJS implementation of JSON getjjjhuuuu request
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

		$templateRequest("../../layouts/timelineCenterBlock.html").then(function(template){
			$compile($(".timelineCenterBlock").html(template).contents());
		});

		};


/// Custom Directive

	/// timeline bar generating directive
	/// this doesn't work...
	// function timelineCenterBlockDirective(){

	// 	/// factory function, ddo = directive definition object
	// 	var ddo = {
	// 		/// link : ???? Adding additional behavior before and after directive i presume.
	// 		// restrict : "E",
	// 		templateURL: '../../layouts/timelineCenterBlock.html'
	// 	};

	// 	console.log("templateURL = " + ddo["templateURL"])
	// 	return ddo;
	// };



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