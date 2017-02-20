angular.module('marsRover', ['ui.router', 'ngMaterial', 'infinite-scroll'])
	.config(['$mdThemingProvider',
			function($mdThemingProvider) {
				$mdThemingProvider.theme('default')
			    .primaryPalette('blue')
			    .accentPalette('red');
	}]);
