$(function(){
	console.log("LatonaTheraputicsGeneral.js initiated...")
	var $navbarButtons = (".collapsed-header-btns");
	var $logoImage = (".logo-img");
	
	var scrollPosition = $(window).scrollTop();

	// Functions... 
	function scrollAdjustments(scrollPosition){
		// if user's viewscreen position is at this pixel height, 
		// then these actions are executed
		adjustHeader($logoImage, $navbarButtons, scrollPosition);
	}
	
	function adjustHeader($logoImage, 
						  $navbarButtons,
						  scrollPosition){
		if (scrollPosition >= 500){
			console.log("screen size hit, header should be adjusted")
			$($navbarButtons).addClass("deExpanded-collapsed-header-btns");
			$($logoImage).addClass("deExpanded-logo-img");

		} else {

			$($navbarButtons).removeClass("deExpanded-collapsed-header-btns");
			$($logoImage).removeClass("deExpanded-logo-img");

		}
	}

	// scroll event handler
	$(window).scroll(function(){
		scrollPosition = $(window).scrollTop();
		console.log("scrollPosition = " + scrollPosition);
		scrollAdjustments(scrollPosition)
	});

	// initial screen load
	$(window).ready(function(){
		scrollAdjustments(scrollPosition);
	})

	console.log("scrollPosition = " + scrollPosition);

})();