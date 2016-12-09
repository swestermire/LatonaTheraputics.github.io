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

		var latonaTeamBios = {
			p1 : {
				"first name" : "Meng-Yang",
				"nick name" : "Meng",
				"last name" : "Chen",
				"role" : "Strategy",
				"biography" : "Meng has product marketing and systems engineering expertise from new product development programs in medical devices (in vitro diagnostics and peritoneal dialysis). He is attending the University of Chicago for his MBA, where he serves as a co-chair of the Healthcare Club and performs strategy consulting for a medical hospitality non-profit. He has a BS in Biomedical and Electrical/Computer Engineering from Duke. In his spare time, Meng enjoys playing piano, rock climbing, and watching as much Blue Devils basketball as possible."
			}
		}

		var $bioPortraits = $('.bio-portrait');
		var $bioCollection = $('.portrait-collection');
		var $latonaTeamTitle = $('#latona-team-title');
		var $biography = $('.biography');

		// click event function that brings up portrait when portrait is clicked
		$scope.portraitClick = function(event){
			console.log("Click logged");
			console.log("clicked portrait is = " + event.target.id);

			var targetedID = event.target.id;

			resetPortrait();
			expandPortrait(targetedID);
			screenLoad();

			updateBio(targetedID);
		};

		function updateBio(targetedID){
			var targetedPerson = $("#"+targetedID);

			biographyContent = biographyContentGenerator(targetedID);
			$(".biography").text("");
			$(".biography").append(biographyContent);
		};

		function biographyContentGenerator(targetedID){
			var person = latonaTeamBios[targetedID];
			
			biographyReturn = "<h1>" + person["first name"] + ' ' + person["last name"] + "</h1><br>";
			biographyReturn += "Role: " + person["role"] + "<br>";
			biographyReturn += person["biography"];

			console.log(biographyReturn);

			return biographyReturn
		};

		$scope.portraitHoverOn = function(event){
			var targetedID = event.target.id;
			console.log("portraitHoverOn initiated!")
			$($('#' + targetedID)).css({"border-color" : "green"})
		};

		$scope.portraitHoverOff = function(event){
			var targetedID = event.target.id;
			$($('#' + targetedID)).css({"border-color" : "red"})
		};

		/// expands portrait
		function expandPortrait(targetedID){
			var $targetedElement = $('#' + targetedID);

			// $('#' + targetedID).removeClass('bio-portrait').addClass('expanded-portrait');

			if ($($targetedElement).attr('class') === 'expanded-portrait'){
				$($targetedElement).removeClass('expanded-portrait').addClass('bio-portrait');

				$($bioPortraits).each(function(){
					console.log("de-expanding portrait function is working")
					$(this).removeClass('de-expanded-portrait')
				})

			} else if ($($targetedElement).attr('class') != 'expanded-portrait') {
				$('.expanded-portrait').removeClass("expanded-portrait").addClass('bio-portrait')
				$targetedElement.removeClass('bio-portrait').addClass('expanded-portrait');
				deExpandedPortrait();
			};
		};

		/// de-expands portraits
		function deExpandedPortrait(){
			$('.bio-portrait').each(function(){
				$(this).addClass('de-expanded-portrait');
			})
		};

		/// resets the status of the portraits
		function resetPortrait(){

			$('.bio-portrait').each(function(){
				$(this).removeClass('de-expanded-portrait');
			})

			// $('.expanded-portrait').removeClass('expanded-portrait').addClass('bio-portrait');
		};


		/// this function creates a separate portrait.  Right now it is not implemented
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
				var $portraitFocused = $(".expanded-portrait");

				console.log("$portraitFocused  = " + $($portraitFocused).attr('class') )
				if ($($portraitFocused).attr('class') != undefined){
					return Math.abs($($bioPortraits).height() - $($portraitFocused).height());
				} else {
					return 0;
				}
			}();

			var biographyTop = bioPortraitHeight + bioTitleHeight + bioCollectionHeight + biographyHeight;

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




















