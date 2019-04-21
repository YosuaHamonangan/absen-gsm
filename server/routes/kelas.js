var express = require('express');
var router = express.Router();
var muridModel = db.models.murid;
var kelasModel = db.models.kelas;
var absenModel = db.models.absen;

router.post('/register', function(req, res, next) {
	var info = req.body;
	kelasModel.create(info);
	res.end();
});

router.get('/get-list', function(req, res, next) {
	kelasModel.findAll({
		attributes: {
			exclude: ["absenId", "createdAt", "updatedAt"],
		},
		include: [kelasModel.murid]
	})
	.then( list => res.send(list) )
});

router.post('/edit', function(req, res, next) {
	var data = req.body;

	var kelas;
	kelasModel.findOne({where: {id: data.id} })
		.then( k => {
			kelas = k;
			if(!kelas) throw Error("Kelas not found");

			return muridModel.findAll({
				where: { id: JSON.parse(data.murid) }
			})
		})
		.then( muridList => {
			kelas.setMurid(muridList);
			res.end();
		});
});

router.get('/getMuridList', function(req, res, next) {
	var id = req.query.kelas;

	kelasModel.findOne({where:{id}})
		.then( kelas => kelas.getMurid() )
		.then( list => res.send(list) )
});

router.post('/absen', function(req, res, next) {
	var info = req.body;

	absenModel.findOne({
		where: {
			tanggal: info.tanggal, 
			kelas: info.kelas
		}
	})
	.then( minggu => {
		if(minggu){
			return minggu.update(info);
		}
		return absenModel.create(info);
	})
	.then( () => res.end() )
});

module.exports = router;
