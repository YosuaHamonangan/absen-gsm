var express = require('express');
var router = express.Router();
var muridModel = db.models.murid;
var kelasModel = db.models.kelas;
var absenModel = db.models.absen;

router.get('/get-list', function(req, res, next) {
	var {kelasId} = req.query;
	absenModel.findAll({
		where: {"kelasId": kelasId},
		include: [absenModel.kelas],
		order: [
            ['tanggal', 'DESC'],
        ],
        limit: 10
	}).then( list => res.send(list) );
});

router.post('/edit', function(req, res, next) {
	var {kelasId, tanggal, murid} = req.body;

	var pAbsen = absenModel.findOne({
		where: {kelasId, tanggal},
		include: [absenModel.kelas]
	}).then( absen => {
		if(!absen) return absenModel.create({kelasId, tanggal});
		else return Promise.resolve(absen);
	});

	var pMurid = muridModel.findAll({
		where: { id: JSON.parse(murid) }
	})

	Promise.all([pAbsen, pMurid]).then( (absen, muridList) => {
		absen.setMuridabsen(muridList);
		res.end();
	});
});

module.exports = router;
