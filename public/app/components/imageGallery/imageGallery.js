angular.module('marsRover')
	.component('imageGallery', {
		bindings: {
			data: '='
		},
		templateUrl: '/app/components/imageGallery/imageGallery.html',
		controller: ['$scope', 'imageService', imageGalleryController]	
	})

function imageGalleryController ($scope, imageService) {
	let vm = this;

	vm.page = 1;
	vm.images = [];
	vm.allImages = [];

	vm.cameras = ['ALL', 'FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'];
	vm.selectedCamera = 'ALL';

	vm.$onInit = getImages(vm.selectedCamera);

	vm.getImages = (camera) => {
		vm.images = [];
		getImages(camera);
	}

	vm.getMoreImages = (page, camera) => {
		getMoreImages(page, camera);
	};

	vm.getCamerasImages = (page, camera) => {
		getCamerasImages(page, camera);
	}

	function getImages(page, camera) {
		imageService.getImages(page, camera)
	    .success((data) =>{
	      vm.allImages = data;

      	// Since NASA API removed pagination, show only the first 25 images
	    	for (let i = 0; i < 25; i++) {
	    		vm.images.push(vm.allImages[i]);
	    	}
	    })
	    .error((err) => {
	      console.log('err', err);
	    })
	}

	function getMoreImages(page, camera) {
		vm.page++;

		if (vm.page <= Math.ceil(vm.allImages.length / 25)) {
			let start = 25 * (vm.page - 1);
      let end = (start + 25) < vm.allImages.length ? start + 25 : vm.allImages.length;

      for (let i = start; i < end; i++) {
          vm.images.push(vm.allImages[i]);
      }
		}
	}

	function getCamerasImages(page, camera) {
		vm.page = 1;
		vm.images = [];

		let cameraImages = vm.allImages;

		if (camera !== 'ALL') {
			cameraImages = vm.allImages.filter(function(image) {
				return image.camera.name == camera
			})
		}

		if (vm.page < cameraImages.length / 25) {
			let start = 25 * (vm.page - 1);
      let end = (start + 25) < cameraImages.length ? start + 25 : cameraImages.length;

      for (let i = start; i < end; i++) {
          vm.images.push(cameraImages[i]);
      } 
		} else {
			vm.images = cameraImages;
		}
	}
} 
