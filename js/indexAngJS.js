// this will be the ng app for the index page

console.log("indexAngJS.js file initiated...");

(function(){
	
	var app = angular.module("indexApp", ["ngRoute"]);

	app.controller('indexGeneralFunctions' , indexGeneralFunctionsCtrl);
	app.controller('appendHeaderAndFooter' , appendHeaderAndFooterCtrl);
	app.controller('aboutUsPortraits' , aboutUsPortraitCtrl);

	app.config(function($routeProvider){
		console.log("Route Function Hit... ");
		$routeProvider
		
		.when("/", {
			templateUrl : "../index.html"
		})

		.when("/LatonaHome", {
			templateUrl : "../static/views/latonaTheraputicsHome.html"
		})

	});

	indexGeneralFunctionsCtrl.$inject = ["$scope"];
	function indexGeneralFunctionsCtrl($scope){
		var fullDate = new Date();
		$scope.date = fullDate.getMonth() + '-' + fullDate.getDate() + '-' + fullDate.getFullYear();

		$scope.projectList = {
			LatonaTheraputics : {
				title : "Latona Theraputics Website",
				version : "1.515v",
				href : "static/views/latonaTheraputicsHome.html"
			}
		};

	};

	appendHeaderAndFooterCtrl.$inject = ["$scope"];
	function appendHeaderAndFooterCtrl($scope){

		$scope.title = "Scope name provided by AngularJS";

		// this isn't good that I'm mixing jquery with angularJS
		(function(){
			console.log("function is working...")
			
			// adds the header
			$.get("../../layouts/header.html", function(data){
				console.log('invoked function in appendHeaderAndFooter');
				$(".header").append(data);
			})

			// adds the footer
			$.get("../../layouts/footer.html" , function(data){
				$(".footer").append(data);
			})

		})();

		};

	aboutUsPortraitCtrl.$inject = ['$scope'];
	function aboutUsPortraitCtrl($scope){
		var $bioPortraits = $('.bio-portrait');
		var $bioCollection = $('.portrait-collection');
		var $latonaTeamTitle = $('#latona-team-title');
		var $biography = $('.biography');

		// click event function that brings up portrait when portrait is clicked
		$scope.portraitFocus = function(event){
			console.log("Click logged");
			console.log("clicked portrait is = " + event.target.id);

			var targetedID = event.target.id;

			resetPortrait();
			expandPortrait(targetedID);
			deExpandedPortrait();
			screenLoad();
		};

		/// expands portrait
		function expandPortrait(targetedID){
			$('#' + targetedID).removeClass('bio-portrait').addClass('expanded-portrait');
		};

		/// de-expands portraits
		function deExpandedPortrait(){
			$('.bio-portrait').each(function(){
				$(this).addClass('.de-expanded-portrait');
			})
		};

		/// resets the status of the portraits
		function resetPortrait(){
			$('.bio-portrait').each(function(){
				$(this).removeClass('de-expanded-portrait');
			})

			$('.expanded-portrait').removeClass('expanded-portrait').addClass('bio-portrait');
		};


		/// this function creates a separate portrait.  Right now it will not be implemented
		function createFocusedPortrait(targettedID){
			console.log("createFocusedPortrait initiated...")
			$portraitUnfocused = $(".portrait-unfocused");
			$portraitFocused = $(".portrait-focused");

			// will need to input the targettedID to update the biography
			if ($portraitUnfocused.length >= 1){
				$($portraitUnfocused).removeClass("portrait-unfocused").addClass("portrait-focused");
				var $portraitFocused = $('.portrait-focused');

				var parentWidth = pareseFloat($($portraitFocused).parent().width());
				var portraitFocusedWidth = parseFloat($($portraitFocused).outerWidth(true));

				var portraitPositionLeft = (parentWidth - portraitFocusedWidth)/2;

				// might want to create another function to position the focused portrait
				$($portraitFocused).css({"left" : portraitPositionLeft, 
										 "top" : 600 , 
										 "position" : "absolute"});

			} else {

			}

		};

		/// function to reposition bio-portraits so they are in the center of the screen
		function centerAlignPortraits(){

			var parentWidth = $($bioPortraits).parent().width();
			var portraitMarginRight = parseFloat($($bioPortraits).css('margin-right'));
			var numPortraits = $($bioPortraits).length;
			var portraitWidth = $($bioPortraits).width();
			var portraitBorder = parseFloat($($bioPortraits).css("border-right"));
			
			var portraitCollectionWidth = portraitMarginRight *(numPortraits-1) + numPortraits * portraitWidth + numPortraits*2*portraitBorder;
			var marginLeftPortraitCollection = (parentWidth - portraitCollectionWidth)/2;

			$('.bio-portrait:first-child').css({'margin-left' : marginLeftPortraitCollection});
		}
		
		function adjustBiographyPlacement(){
			var bioPortraitHeight = $($bioPortraits).outerHeight(true);
			var bioTitleHeight = $($latonaTeamTitle).outerHeight(true);
			var bioCollectionHeight = $($bioCollection).outerHeight(true);
			
			var biographyHeight = function(){
				var $portraitFocused = $(".portrait-focused");

				console.log("$portraitFocused  = " + $portraitFocused )
				if ($portraitFocused != undefined){
					return $($portraitFocused).height();
				} else {
					return 0;
				}
			}();

			var biographyTop = bioPortraitHeight + bioTitleHeight + bioCollectionHeight;

			console.log("biographyHeight = " + biographyHeight);

			var parentWidth = $($biography).parent().width();
			var biographyWidth = $($biography).outerWidth(true);
			var biographyLeft = (parentWidth - biographyWidth)/2;

			$($biography).css({'left' : biographyLeft,"top": biographyTop ,"position" : "absolute"});
		}


		/// Master list of functions that are carried out when screen elements are loaded/adjusted
		function screenLoad(){
			centerAlignPortraits();
			adjustBiographyPlacement();
		}

		/// adjusts elements when window is adjusted
		// $( window ).resize(screenLoad());
		$( window ).resize(function(){
			screenLoad();
		});

		/// !!! Not sure if this really works...
		/// setups screen elements when window is first loaded
		$( window ).ready(function(){
			screenLoad();
		});
	};

})();




















