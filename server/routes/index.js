var express = require('express');
var router = express.Router();
var googleUtils = require("../utils/google");

router.get('/login', function(req, res, next) {
	res.send("login")
});

router.get('/get-image', function(req, res, next) {
	var {id} = req.query;
	googleUtils.getFile(id)
		.then( google_res => res.send(google_res.data) );
});

router.get('/*', function(req, res, next) {
	var isLoggedIn = true;
	if(isLoggedIn) next();
	else res.redirect('/login');
});

module.exports = router;
