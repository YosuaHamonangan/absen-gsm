var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
	res.send("login")
});

router.get('/*', function(req, res, next) {
	var isLoggedIn = true;
	if(isLoggedIn) next();
	else res.redirect('/login');
});

module.exports = router;
