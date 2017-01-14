'use strict'

console.log("AngularJSFile.js initiated...");

(function(){

	var app = angular.module("angularJSPlayApp", []);

	app.controller("commonBehavior", commonBehaviorCtrl)
	.directive("sectionSeparator" , sectionSeparatorDirective);

	// example of customer directives (DDO = directive definition object)
	app.controller("wordBank",wordBankCtrl)
	.directive("listItemDescription",listItemDescriptionDirective)
	.directive("getTemplate", getTemplateDirective);

	app.controller("windowResizeFunctionality" , windowResizeFunctionalityCtrl)
	.directive("resizeWindowFunctionality" , resizeWindowFunctionalityDirective);

	app.controller("dynamicElements" , dynamicElementsCtrl)
	.directive("windowResizeBehavior" , windowResizeBehaviorDirective);

	//instance of an angularJS controller
	wordBankCtrl.$inject = ["$scope"];
	function wordBankCtrl($scope){
		$scope.title = "Playing with custom directives in angJS"
		$scope.items = {
			0 : {
				"name" : "broccoli",
				"quantity" : "10"
			},

			1 : {
				"name" : "cheddar",
				"quantity" : "2"
			},

			2 : {
				"name" : "water",
				"quantity" : "100"
			}
		}
	};

	//instance of a custom angJS directive
	//directives allow custom tags to be placed in the DOM that have programmable behavior
	function listItemDescriptionDirective(){
		console.log("listItemDescriptionDirective fired!")
		var ddo = {
			template: "{{ item.quantity }} of {{ item.name }}"
		};
		return ddo;
	};

	//instance of a custom angJS directive
	//this directive allows use of an html template
	function getTemplateDirective(){
		console.log("getTemplateDirective fired!")
		var ddo = {
			templateURL: "views/static/listItem.html"
		};
		return ddo;
	};

	// AngJS ctrl with a custom directive to have certain behavior bound to window resize
	windowResizeFunctionalityCtrl.$inject = ["$scope"];
	function windowResizeFunctionalityCtrl($scope){
		$scope.title = "Custom Directive through AngJS with behavior bound to $window resize";
		
	};

	//AngJS custom directive to have certain behavior bound to window resize
	function resizeWindowFunctionalityDirective($window){

		/// factory function
		var ddo = {
			link : func,
			restrict : "E",
			template : "<div> AngJS output for window width = {{width}} </div>"
		}
		return ddo;

		function func(scope,element){
			scope.width = $window.innerWidth;
			angular.element($window).bind("resize" , function(){
				scope.width = $window.innerWidth;
				scope.$digest();
			})
		}

		//CLEAN UP ACTIVE LISTENERS TO PREVENT ZOMBIE LISTENERS!!!
		function cleanUp(){
			angular.element($window).off('resize', func);
		}

		angular.element($window).on('resize', func);
		scope.$on("$destroy", cleanUp)
	};

	commonBehaviorCtrl.$inject = [];
	function commonBehaviorCtrl(){
		return
	};

	function sectionSeparatorDirective(){
		var ddo = {
			// link : link,
			restrict : "E", //restricts to elements only, could be attributes as well
			template : "<br><br> <h1 class = 'section-break'>         ====End of Section====            </h1> <br><br>"
		}
		return ddo;
	};

	dynamicElementsCtrl.$inject = ["$scope"]
	function dynamicElementsCtrl($scope){
		$scope.title = "Dynamic DOM Element Blocks"
		
		$scope.blockElements = {
			0 : {
				"content" : "blahblahblah"
			},

			1 : {
				"content" : "moreblahblahblah"
			},

			2 : {
				"content" : "blahblahbalhoversdasd aadadasdsad asd asd ad ad a das das das da sdwhelming blahblahbalhoversdasd aadadasdsad asd asd ad ad a das das das da sdwhelmingblahblahbalhoversdasd aadadasdsad asd asd ad ad a das das das da sdwhelmingblahblahbalhoversdasdblahblahbalhoversdasd aadadasdsad asd asd ad ad a das das das da sdwhelmingblahblahbalhoversdasd aadadasdsad asd asd ad ad a das das das da sdwhelmingblahblahbalhoversdasd aadadasdsad asd asd ad ad a das das das da sdwhelmingblahblahbalhoversdasd aadadasdsad asd asd ad ad a das das das da sdwhelmingblahblahbalhoversdasd aadadasdsad asd asd ad ad a das das das da sdwhelmingblahblahbalhoversdasd aadadasdsad asd asd ad ad a das das das da sdwhelmingblahblahbalhoversdasd aadadasdsad asd asd ad ad a das das das da sdwhelmingblahblahbalhoversdasd aadadasdsad asd asd ad ad a das das das da sdwhelming"
			},

			3 : {
				"content" : "blahblahblah"
			},

			4 : {
				"content" : "moreblahblahblaasd"
			},

			5 : {
				"content" : "blahblahbalhoverwhelming"
			}
		}
	};

	function windowResizeBehaviorDirective($window){
		var ddo = {
			link : {
				post : link,
				pre : prelink
			},
			restrict : "E",
		}
		return ddo;

		//!!! what is scope , element, and attrs as function link input values. I'm guessing they from AngJS
		function link(scope , element, attrs){
			console.log("post-link function fired!")
			var rect = element[0].querySelector('.article-block').getBoundingClientRect();
			console.log(element[0].querySelector('.article-block').attr)
			console.log(rect.top);
		}

		function prelink(scope, element, attrs){
			console.log("pre-link function fired!")
		}

		// cleanUp function to prevent zombie listeners
		function cleanUp(){
		}
	}

})();