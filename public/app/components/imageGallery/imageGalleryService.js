angular.module('marsRover')
	.service('imageService', ['$http', function($http) {
	  this.getImages = function(sol, page) {
	    return $http.get('/images?sol=' + sol + '&page=' + page, {cache: true});
	  }
	}])
