const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/images', (req, res, next) => {
  request({
  	method: 'GET',
  	url: `https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos`,
  	qs: {
  		page: req.query.page,
  		api_key: 'YnVJc28KZxxKGJt6Tw2IUM3d8CMez3YE1L4YiSH4',
  		sol: req.query.sol,
  		camera: 'PANCAM'
  	},
  	json: true
  }, (err, response, body) => {
		if (err) throw err;
		console.log('body', body);

		// Remove unnecessary info about rover
		body.photos.forEach(function(photoObject) {
			delete photoObject.rover;
		})

		res.send(body.photos);
  })
})

module.exports = router;
