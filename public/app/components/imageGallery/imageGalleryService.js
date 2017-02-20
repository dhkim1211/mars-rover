angular.module('marsRover')
	.service('imageService', ['$http', function($http) {
	  this.getImages = (camera) => {
	  	let config = {
	  		camera: camera,
	  		cache: true
	  	}

	    return $http.get('/images', {params: config});
	  }
	}])
