const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/images', (req, res, next) => {
	let qs = {
		api_key: 'aDhqK88n3p3FcbHpL0M0WrbkBo1datDKk5puVrLY',
		sol: 1,
		camera: req.query.camera
	}

	if (req.query.camera == 'ALL') {
		delete qs.camera;
	}

  request({
  	method: 'GET',
  	url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos',
  	qs: qs,
  	json: true
  }, (err, response, body) => {
		if (err) throw err;

		// Remove unnecessary info about rover
		body.photos.forEach((photoObject) => {
			delete photoObject.rover;
		})

		res.send(body.photos);
  })
})

module.exports = router;
