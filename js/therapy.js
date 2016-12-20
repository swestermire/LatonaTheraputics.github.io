// Therapy Page JS/Jquery

$(function(){
	console.log("therapy.js initiated... ");

	var $howTechWorks = $(".how-tech-works");
	var $howTechWorksImg = $(".how-tech-works-img");
	var $howTechWorksContent = $(".how-tech-works-content");
	var $therapyParticle = $('.therapy-particle');
	var $therapyParticleContent = $(".therapy-particle-content");
	var $therapyParticleImg = $('.therapy-particle-img');
	var $therapyFlowContent = $('.therapy-flow-content');
	var $therapyFlowImg = $(".therapy-flow-img");

	var userParams = {
		"widthTransition" : 1050
	}

	// SCREEN FUNCTIONS SECTION
	function initialScreenLoad(){
		console.log("initialScreenLoad function initiated...")

		// elements needing to be adjusted.
		var elementsHeightCenterAdjust = [$howTechWorksContent,
										  $therapyParticleContent,
										  $therapyFlowContent,
										  $howTechWorksImg,
										  $therapyParticleImg,
										  $therapyFlowImg]

		var elementsWidthCenterAdjust = [$howTechWorksImg,
										 $therapyParticleImg,
										 $therapyFlowImg ]

		// iterates through elements needing adjustments for centering height
		for (element in elementsHeightCenterAdjust){
			adjustHeightToCenter(elementsHeightCenterAdjust[element]);
		};

		// iterates through elements needing adjustments for centering width
		for (element in elementsWidthCenterAdjust){
			adjustWidthToCenter(elementsWidthCenterAdjust[element]);
		};

	};

	function screenAdjust(){
		console.log("windowWidth = " + $(window).outerWidth());
		var elementsHeightCenterAdjust = [$howTechWorksContent,
										  $therapyParticleContent,
										  $therapyFlowContent,
										  $howTechWorksImg,
										  $therapyParticleImg,
										  $therapyFlowImg]

		var elementsWidthCenterAdjust = [$howTechWorksImg,
										 $therapyParticleImg,
										 $therapyFlowImg ]

		// iterates through elements needing adjustments for centering height
		for (element in elementsHeightCenterAdjust){
			adjustHeightToCenter(elementsHeightCenterAdjust[element]);
		};

		// iterates through elements needing adjustments for centering width
		for (element in elementsWidthCenterAdjust){
			adjustWidthToCenter(elementsWidthCenterAdjust[element]);
		};
	}	

	function adjustHeightToCenter(element){
		if ($(window).outerWidth() <= userParams["widthTransition"]){
			$(element).css({"margin-top" : 0});
			return
		}

		var elementHeight = $(element).outerHeight();
		var parentElementHeight = $(element).parent().outerHeight();

		// Eqn Below: heightDiff/2 to get top offset
		var topOffset = (parentElementHeight - elementHeight)/2;
		$(element).css({"margin-top" : topOffset});
		
	};

	function adjustWidthToCenter(element){

		var $parentElement = $(element).parent();
		var $parentElementChildren = $($parentElement).children();
		var $parentElementWidth = $($parentElement).outerWidth();

		// iterates through children of parent to determine overall content width
		var overallContentWidth = 0;
		var transitionState = false;
		$($parentElementChildren).each(function(){
			if ($(window).outerWidth() <= userParams["widthTransition"]){
				var leftOffset = ($parentElementWidth - $(this).outerWidth())/2;
				$(this).css({"margin-left" : leftOffset});
				transitionState = true;
			} else {
				overallContentWidth += $(this).outerWidth();
				$(this).css({"margin-left" : 0});
			}
		})

		// Eqn Below: Calc leftOffset by taking (parent element width - content width)/2
		if (transitionState == false){
			var leftOffset = ($parentElementWidth - overallContentWidth)/2
			$($parentElementChildren[0]).css({"margin-left" : leftOffset});
		} 
	}

	// function that manages website behavior when page is first loaded
	$(window).ready(function(){
		initialScreenLoad();
	});

	// function that manages website behavior when page is adjusted
	$(window).resize(function(){
		console.log("resize function initiated...")
		screenAdjust();
	});

})();
//END OF CODE