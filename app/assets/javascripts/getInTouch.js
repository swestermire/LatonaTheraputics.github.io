console.log("This is getInTouch.js file");

$(function(){
	$('#msg-snd-btn').click(function(){
		console.log("Send email button is registering a click");

		var link = "mailto: swestermire@gmail.com" +
		"&subject=COOL BEANS!" +
		"&body=IT WORKS!";

		window.location.href = link;
	});
});