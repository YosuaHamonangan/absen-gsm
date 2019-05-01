var express = require('express');
var router = express.Router();
var googleUtils = require("../utils/google");
var childModel = db.models.child;

router.get('/get-list', function(req, res, next) {
	childModel.findAll({
		attributes: {
			exclude: ["createdAt", "updatedAt"]
		}
	})
	.then( list => res.send(list) )
});

router.post('/register', function(req, res, next) {
	var data = req.body;
	childModel.create(data);
	res.end();
});

router.post('/edit', function(req, res, next) {
	var data = req.body;
	var foto = req.files ? req.files.foto : null;

	childModel.findOne({where: {id: data.uuid} })
		.then( child => {
			if(!child) throw Error("child not found");

			if(foto) {
				googleUtils.saveFile("foto", foto.data)
					.then( res => {
						data.foto = res.data.uuid;
						child.update(data);
						res.end();
					});
			}
			else{
				child.update(data);
				res.end();
			}
		})
});

module.exports = router;
