// this will be the ng app for the index page

console.log("indexAngJS.js file initiated...");

(function(){
	
	var app = angular.module("indexApp", ["ngRoute"]);

	app.controller('indexGeneralFunctions' , indexGeneralFunctionsCtrl);
	app.controller('appendHeaderAndFooter' , appendHeaderAndFooterCtrl);
	app.controller('aboutUsPortraits' , aboutUsPortraitCtrl);


	// angularJS router function does not work currently...
	// app.config(function($routeProvider){
	// 	console.log("Route Function Hit... ");
	// 	$routeProvider
		
	// 	.when("/", {
	// 		templateUrl : "../index.html"
	// 	})

	// 	.when("/LatonaHome", {
	// 		templateUrl : "../static/views/latonaTheraputicsHome.html"
	// 	})

	// });

	indexGeneralFunctionsCtrl.$inject = ["$scope"];
	function indexGeneralFunctionsCtrl($scope){
		var fullDate = new Date();
		$scope.date = (fullDate.getMonth()+1) + '-' + fullDate.getDate() + '-' + fullDate.getFullYear();

		$scope.projectList = {
			LatonaTheraputics : {
				title : "Latona Theraputics Website",
				version : "1.521v",
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
				"image": "MengCropped.png",
				"biography" : "Meng has product marketing and systems engineering expertise from new product development programs in medical devices (in vitro diagnostics and peritoneal dialysis). He is attending the University of Chicago for his MBA, where he serves as a co-chair of the Healthcare Club and performs strategy consulting for a medical hospitality non-profit. He has a BS in Biomedical and Electrical/Computer Engineering from Duke. In his spare time, Meng enjoys playing piano, rock climbing, and watching as much Blue Devils basketball as possible."

			},

			p2 : {
				"first name" : "Dylan",
				"last name" : "Nichols",
				"nick name" : "" ,
				"role" : "Engineering",
				"image": "Dylan.png",
				"biography" : "Dylan has extensive experience in medical device development and manufacturing support for devices in various stages of their evolution. He also has experience with process development and scale up in a bio-pharmaceutical setting. Dylan earned his degree in Chemical Engineering from Northeastern University and is currently working towards a graduate degree in Biomedical Engineering at Illinois Institute of Technology. His ideal day off includes a game of pond hockey followed by ice fishing."
			},

			p3 : {
				"first name" : "Yusheng" ,
				"last name" : "He",
				"nick name" : "",
				"role" : "Research",
				"image":"YushengCropped.jpg",
				"biography" : "Yusheng He is a Ph.D. candidate in Biomedical Engineering at Illinois Institute of Technology. He has 4 years of research experience in synthetic biomaterials for tissue engineering and 2 years of experience in breast cancer research. In addition, Yusheng is also a co-inventor of a surgery training simulator device, and serves as science advisor role in that startup company. And his dog’s name is Uni."
			},

			p4 : {
				"first name" : "Daniel",
				"last name" : "Young",
				"nick name" : "",
				"role" : "Research",
				"image": "DanielCropped.jpg",
				"biography" : "Daniel Young is a graduate student with 8 years of experience in biomaterials and tissue engineering research. His dissertation includes synthesis and characterization of nanoparticles for bioactive factor delivery. Daniel enjoys the challenges and discovery of experimental design and applies it to his favorite hobby, cooking."
			},

			p5 : {
				"first name" : "Aakanksha",
				"last name" : "Rangnekar",
				"nick name" : "",
				"role" : "Engineering",
				"image": "AakankshaCropped.jpg",
				"biography" :  "Aakanksha holds a Masters degree in Biomedical Engineering from Illinois Institute of Technology. Her expertise lies in medical device engineering, biomarker discovery, imaging, cancer research and bioinformatics applications. Her take on Latona’s platform is ‘An intelligent use of photoactivatable nanoparticle to kill cancer’s abode’. She is determined to cure cancer and control aging while being a full-time ninja."
			},

			p6 : {
				"first name" : "Antonio" ,
				"middle name" : "",
				"middle initial" : "M.",
				"last name" : "Olivio",
				"nick name" : "",
				"role" : "Regulatory Affairs",
				"image": "Antonio.jpg",
				"biography" : "Antonio has over 12 years of experience in quality assurance, regulatory affairs and clinical research in the medical device industry.  He holds a Master’s Degree in Bioengineering (Cell and Tissue engineering) from the University of Illinois at Chicago and is currently completing his EMBA at the Booth School of Business with focus on general management and operations. In his time off Antonio enjoys traveling, reading and spending time with his family."
			},

			p7 : {
				"first name" : "Han" ,
				"middle name" : "",
				"middle initial" : "",
				"last name" : "Li",
				"nick name" : "",
				"role" : "Accounting/Finance",
				"image": "Han.jpg",
				"biography" : "Han has 5 years of corporate finance experience in the healthcare industry and public accounting experience. He is attending the MBA program at University of Chicago with concentrations in Finance and Healthcare. He has a double B.S. degree in Accounting and Finance from the University of Texas at Dallas and was the Valedictorian. Han also enjoys reading, playing sports, and traveling."			
			}												
		}

		var $bioPortraits = $('.bio-portrait');
		var $bioCollection = $('.portrait-collection');
		var $latonaTeamTitle = $('#latona-team-title');
		var $biography = $('.biography');

		// click event function that brings up portrait when portrait is clicked
		$scope.portraitClick = function(event){
			var targetedID = event.target.id;

			resetPortrait();
			expandPortrait(targetedID);
			updateBio(targetedID);

			screenLoad();
		};

		function updateLatonaTeamRowHeight(){
			var $aboutUsContainer = ("#about-us-container");
			var $biography = (".biography");

			$($aboutUsContainer).css({"height" : ""});

			var $aboutUsContainerHeight = $($aboutUsContainer).outerHeight();
			var $biographyHeight = $($biography).outerHeight();

			var newHeight = $aboutUsContainerHeight + $biographyHeight + 75;

			$($aboutUsContainer).css({"height" : newHeight +'px'});
		}

		function updateBio(targetedID){
			var targetedPerson = $("#"+targetedID);

			biographyContent = biographyContentGenerator(targetedID);
			$(".biography").text("");
			$(".biography").append(biographyContent);
		};

		function biographyContentGenerator(targetedID){
			var person = latonaTeamBios[targetedID];
			
			biographyReturn = "<h3 class = biography-content>" + person["first name"] + ' ' + person["last name"] + "</h3><br>";
			biographyReturn += "<h4 class = biography-content> Role: " + person["role"] + "</h4><br>";
			biographyReturn += person["biography"];

			return biographyReturn
		};

		$scope.portraitHoverOn = function(event){
			var targetedID = event.target.id;
			$($('#' + targetedID)).css({"border-color" : "orange"})
		};

		$scope.portraitHoverOff = function(event){
			var targetedID = event.target.id;
			$($('#' + targetedID)).css({"border-color" : "lightgrey"})
		};

		/// expands portrait
		function expandPortrait(targetedID){
			var $targetedElement = $('#' + targetedID);

			// $('#' + targetedID).removeClass('bio-portrait').addClass('expanded-portrait');

			if ($($targetedElement).attr('class') === 'expanded-portrait'){
				$($targetedElement).removeClass('expanded-portrait').addClass('bio-portrait');

				$($bioPortraits).each(function(){
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

		function loadPictures(){
			$($bioPortraits).each(function(){
				var $id = $(this).attr("id");
				var imageUrl = "../../css/images/"+latonaTeamBios[$id]["image"];

				$(this).css({'background': 'url(' + imageUrl + ') no-repeat center center',
							 'background-size' : "cover" });

			})
		};

		/// function to reposition bio-portraits so they are in the center of the screen
		function centerAlignPortraits(){

			var parentWidth = $($bioPortraits).parent().width();
			var portraitMarginRight = parseFloat($($bioPortraits).css('margin-right'));
			var numPortraits = $($bioPortraits).length;
			var portraitWidth = $($bioPortraits).width();
			var portraitBorder = parseFloat($($bioPortraits).css("border-right"));
			var portraitCollectionWidth = portraitMarginRight *(numPortraits-1) + numPortraits * portraitWidth + numPortraits*2*portraitBorder;
			
			if ($(".expanded-portrait").attr('id') != undefined){
				// !!!! becareful with this 45... it's hard coded in and should be looked at.
				portraitCollectionWidth += $("#" + $(".expanded-portrait").attr('id')).width()-45;
				console.log("portraitCollectionWidth =" + portraitCollectionWidth)
				console.log("parentWidth =" + parentWidth)	
			}			
			
			var marginLeftPortraitCollection = (parentWidth - portraitCollectionWidth)/2;

			$('.bio-portrait:first-child').css({'margin-left' : marginLeftPortraitCollection});
		}
		
		function adjustBiographyPlacement(){
			var bioPortraitHeight = $($bioPortraits).outerHeight(true);
			var bioTitleHeight = $($latonaTeamTitle).outerHeight(true);
			var bioCollectionHeight = $($bioCollection).outerHeight(true);
			
			var biographyHeight = function(){
				var $portraitFocused = $(".expanded-portrait");

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
			updateLatonaTeamRowHeight();
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
			loadPictures();
		});
	};

})();




















