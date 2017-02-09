'use strict'

console.log("latonaTheraputicsAngJS initiated...");

(function(){
	var app = angular.module("latonaTheraputicsAngJS", []);

	app.controller("articleGenerator" , articleGeneratorCtrl)
	.directive('resize' , resizeTimeline);
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
	articleGeneratorCtrl.$inject = ['$scope' , '$http', '$compile', '$templateRequest', "$window"];
	function articleGeneratorCtrl($scope, $http, $compile, $templateRequest, $window){

		  /// after DOM is loaded, these functions are executed.
		  angular.element(document).ready(function(){
		  	console.log("post-DOM load check");

		  	/// calls function to populate article and position info into article blocks
		  	createTimelineArticles($window);

		  });

		console.log("pre-DOM load check")

		function createTimelineArticles($window){

		  	//get all left article blocks
		  		var allArticleBlocks = angular.element(document.getElementsByClassName('article-block-container'));

		  		// checks to see if any article blocks are loaded. If not, then we must re-execute page reload
		  		if (!allArticleBlocks.length){
		  			// need to reload page.  Probably not the most elegant solution.
		  			$window.location.reload();
		  		}


		  		console.log(" length for allArticleBlocks = " + allArticleBlocks.length)

		  	//get all article content data and renders content
		  	$http.get("../../public/timelineEvents.json").then(function(response){

		  		var timelineArticles = response.data;

		  		/// populating article blocks with content
		  		for (var idx = 0; idx < allArticleBlocks.length; idx++){
		  			var timelineArticle = timelineArticles[String(idx)];
		  			populateArticleBlockInfo(allArticleBlocks[idx], timelineArticle, idx, "article-block-container");
		  		}

		  		repositionTimelineArticles();
		  	});
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

		$templateRequest("../../layouts/timelineCenterBlock.html").then(function(template){
			$compile($(".timelineCenterBlock").html(template).contents());
		});

		};
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

	function repositionTimelineArticles(){
		/// identify all article elements
		var articles = angular.element(document.getElementsByClassName('article-block-container'));
		var timelineWindow = angular.element(document.getElementsByClassName('timeline-window'))[0];

		/// Everything is relative to timeline-window
		
		/// variable to adjust timeline-window height.  Needed for content placement below timeline (e.g. footer)
		adjustTimelineWindowHeight(timelineWindow, articles);

		/// adjust timeline-window placement to be centered relative to screen
		elementCenter(window, timelineWindow);

		/// adjust articles to be centered within timeline-window
		adjustArticlePosition(timelineWindow, articles);

		/// change article left or right type based on positioning
		changeArticleLeftRight(timelineWindow, articles);

		/// more of my mess up... rechecks and corrects article placement
		checkArticlePosition(articles);


		// console.log('timelineWindow.style.width = ' + timelineWindow.offsetWidth);

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

	// goes back and rechecks article positioning, becuase I designed my DOM poorly...
	// ideally i'd have all my elements labeled correctly but because this is dynamically rendering
	// the position of the articles... I can't know which side my articles will end up
	// this is leading to element identification issues.
	function checkArticlePosition(articles){	
		var rightArticles = angular.element(document.getElementsByClassName('article-block-right'));
		for (var idx = 1; idx < rightArticles.length; idx++){
			if (rightArticles[idx]){
				// the first right article element is always right.
				rightArticles[idx].style.marginLeft = rightArticles[0].style.marginLeft;
			}
		}
	}

	// adjusts articles so they are center relative to the reference window. 
	// WARNING: ONLY WORKS WITH 2 COLUMN DESIGNS
	function adjustArticlePosition(reference, articles){
		var refWidth = reference.offsetWidth;

		//get article width.  All articles have the same width.
		var articleWidth = document.getElementsByClassName('article-block-gfx')[0].offsetWidth;

		// my mess up... the way i created elements the article bleeds outside of the element width
		// going to create a right margin for article-block-container to compensate.
		var compensateRightMargin =  articleWidth - articles[0].innerWidth;
		console.log("articleWidth, article-block-gfx = " + articleWidth + ' article-block-gfx');
		console.log("articles[0].offsetWidth, article-block-left/rt = " + articles[0].offsetWidth + ' ' + articles[0].className)
		console.log('compensateRightMargin = ' + compensateRightMargin)

		for (var idx = 0; idx < articles.length; idx++){
			articles[idx].style.marginRight = compensateRightMargin + 'px';
		}

		// default article left margin... this applies to left articles only
		var leftArticleMargin = 0.1*refWidth;

		// calculate right article margin
		var rightArticleMargin = refWidth - 2*leftArticleMargin - 2*articleWidth;

		/// get all left articles
		var leftArticles = angular.element(document.getElementsByClassName('article-block-left'));
		for (var idx = 0; idx < leftArticles.length; idx++){
			leftArticles[idx].style.marginLeft = leftArticleMargin + 'px';
		}

		var rightArticles = angular.element(document.getElementsByClassName('article-block-right'));
		for (var idx = 0; idx < leftArticles.length; idx++){
			rightArticles[idx].style.marginLeft = rightArticleMargin + 'px';
		}

	};

	/// adjusts timeline window height relative to article heights
	function adjustTimelineWindowHeight(timelineWindow, articles){

		if (articles[articles.length-1].getBoundingClientRect().bottom > articles[articles.length-2].getBoundingClientRect().bottom){
			timelineWindow.style.height = articles[articles.length-1].getBoundingClientRect().bottom + 'px';
		} else {
			timelineWindow.style.height = articles[articles.length-2].getBoundingClientRect().bottom + 'px';
		}
	};

	/// centers element relative to a referened element
	function elementCenter(reference, element){
		var refWidth = reference.innerWidth;
		var elementWidth = element.offsetWidth;

		var margin = Math.floor((refWidth - elementWidth)/2);
		element.style.marginLeft = margin + 'px';
	};

	function changeArticleLeftRight(reference, articles){
		for (var idx = 0; idx < articles.length; idx++){
			if (articles[idx].getBoundingClientRect().left > articles[0].getBoundingClientRect().left){
				var carrotGfx = articles[idx].getElementsByClassName('article-right-carrot-gfx')[0];
				if (carrotGfx){
					carrotGfx.className = "article-left-carrot-gfx";
					articles[idx].getElementsByClassName('article-block-left')[0].className = 'article-block-right';
				}
			}
		}
	};

/// Custom Directive
	
	// resize and reposition elements when window is resized
	resizeTimeline.$inject = ['$window'];
	function resizeTimeline($window){
		console.log("Fire!")
		// ddo = directive definition object
		var ddo = {
			link: link,
		}
		return ddo;

		// link function
		function link(scope, element, attrs){
			
			angular.element($window).bind('resize', function(){
				
				var articles = angular.element(document.getElementsByClassName('article-block-container'));
				var timelineWindow = angular.element(document.getElementsByClassName('timeline-window'))[0];

				/// adjustsTimelineWindow
				// adjustTimelineWindowHeight(timelineWindow, articles);

				/// adjust timeline-window placement to be centered relative to screen
				elementCenter(window, timelineWindow);

				/// adjust articles to be centered within timeline-window
				adjustArticlePosition(timelineWindow, articles);

				/// more of my mess up... 
				checkArticlePosition(articles);

				scope.$digest();
			});
		}

		// cleans up watcher
		function cleanUp(){
			angular.element(window).off('resize', link)
		}

		angular.element(window).on('resize', link)
		$scope.$on('$destroy', cleanup);
	}

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