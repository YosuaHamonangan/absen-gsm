var express = require('express');
var router = express.Router();
var muridModel = require("../models/murid")

router.post('/register', function(req, res, next) {
	var info = req.body;
	muridModel.create(info);

	res.redirect("/murid");
});

router.get('/getList', function(req, res, next) {
	muridModel.findAll({
		attributes: {
			exclude: ["createdAt", "updatedAt"]
		}
	})
	.then( list => res.send(list) )
});

module.exports = router;
