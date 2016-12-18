// Therapy Page JS/Jquery

$(function(){
	console.log("therapy.js initiated... ");

	var $howTechWorks = $(".how-tech-works");
	var $howTechWorksImg = $(".how-tech-works-img");
	var $howTechWorksContent = $(".how-tech-works-content");
	var $therapyParticle = $('.therapy-particle');
	var $therapyParticleContent = $(".therapy-particle-content");
	var $therapyParticleImg = $('.therapy-particle-img');

	// SCREEN FUNCTIONS SECTION
	function initialScreenLoad(){
		console.log("initialScreenLoad function initiated...")

		// elements needing to be adjusted.
		var elementsHeightCenterAdjust = [$howTechWorksContent,
										  $therapyParticleContent]

		var elementsWidthCenterAdjust = [$howTechWorksImg,
										 $therapyParticleImg]

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
		var elementsHeightCenterAdjust = [$howTechWorksContent,
										  $therapyParticleContent]

		var elementsWidthCenterAdjust = [$howTechWorksImg,
										 $therapyParticleImg]

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
		var elementHeight = $(element).outerHeight();
		var parentElementHeight = $(element).parent().outerHeight();

		// Eqn Below: heightDiff/2 to get top offset
		var topOffset = (parentElementHeight - elementHeight)/2;
		$(element).css({"margin-top" : topOffset});
	};

	function adjustWidthToCenter(element){
		var $parentElement = $(element).parent();
		var $parentElementChildren = $($parentElement).children();

		// iterates through children of parent to determine overall content width
		var overallContentWidth = 0;
		$($parentElementChildren).each(function(){
			overallContentWidth += $(this).outerWidth();
		})

		var $parentElementWidth = $($parentElement).outerWidth();

		// Eqn Below: Calc leftOffset by taking (parent element width - content width)/2
		var leftOffset = ($parentElementWidth - overallContentWidth)/2
	
		$($parentElementChildren[0]).css({"margin-left" : leftOffset}); 
	}

	// function that manages website behavior when page is first loaded
	$(window).ready(function(){
		if ($(window).outerWidth() >= 950){
			initialScreenLoad();
		}
	});

	// function that manages website behavior when page is adjusted
	$(window).resize(function(){
		console.log("resize function initiated...")
		if ($(window).outerWidth() >= 950){
			screenAdjust();
		}
	});

})();
//END OF CODE