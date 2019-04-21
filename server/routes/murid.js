var express = require('express');
var router = express.Router();
var googleUtils = require("../utils/google");
var muridModel = db.models.murid;

router.get('/get-list', function(req, res, next) {
	muridModel.findAll({
		attributes: {
			exclude: ["createdAt", "updatedAt"]
		}
	})
	.then( list => res.send(list) )
});

router.post('/register', function(req, res, next) {
	var data = req.body;
	muridModel.create(data);
	res.end();
});

router.post('/edit', function(req, res, next) {
	var data = req.body;
	var foto = req.files ? req.files.foto : null;

	muridModel.findOne({where: {id: data.id} })
		.then( murid => {
			if(!murid) throw Error("Murid not found");

			if(foto) {
				googleUtils.saveFile("foto", foto.data)
					.then( res => {
						data.foto = res.data.id;
						murid.update(data);
						res.end();
					});
			}
			else{
				murid.update(data);
				res.end();
			}
		})
});

module.exports = router;
