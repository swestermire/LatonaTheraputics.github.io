'use strict'

console.log("AngularJSFile.js initiated...");

(function(){

	var app = angular.module("angularJSPlayApp", []);

	// example of customer directives (DDO = directive definition object)
	app.controller("wordBank",wordBankCtrl)
	.directive("listItemDescription",listItemDescriptionDirective)
	.directive("getTemplate", getTemplateDirective);

	app.controller("windowResizeFunctionality" , windowResizeFunctionalityCtrl)
	.directive("resizeWindowFunctionality" , resizeWindowFunctionalityDirective);

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

})();