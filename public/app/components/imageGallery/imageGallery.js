function imageGalleryController (imageService) {
	let vm = this;
	let page = 1;
	vm.images = [];

	// getImages(vm.sol, page);

	vm.$onInit = getImages(1,1);

	function getImages(sol, page) {
    imageService.getImages(sol, page)
      .success(function(data) {
        console.log('data', data)

        // NASA API removed pagination so paginating here
        let start = 25 * (page - 1)
        let end = start + 25

        for (let i = start; i < end; i++) {
            vm.images.push(data[i]);
        } 

      })
      .error(function(err){
        console.log('err', err);
      })
	}
} 

angular.module('marsRover', [])
	.component('imageGallery', {
		bindings: {
			data: '='
		},
		templateUrl: '/app/components/imageGallery/imageGallery.html',
		controller: ['imageService', imageGalleryController]
		
	})
