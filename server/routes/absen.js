var express = require('express');
var router = express.Router();
var muridModel = db.models.murid;
var kelasModel = db.models.kelas;
var absenModel = db.models.absen;

router.get('/get-list', function(req, res, next) {
	var {kelasId} = req.query;
	absenModel.scope("defaultScope", "latest-count")
		.findAll({ where: { kelasId } })
		.then( list => res.send(list) );
});

router.post('/edit', function(req, res, next) {
	var {kelasId, tanggal, murid} = req.body;

	var pAbsen = absenModel.findOne({
		where: {kelasId, tanggal}
	}).then( absen => 
		absen ? Promise.resolve(absen) : absenModel.create({kelasId, tanggal})
	);

	var pMurid = muridModel.findAll({
		where: { id: JSON.parse(murid) }
	});

	Promise.all([pAbsen, pMurid])
		.then( ([absen, muridList]) => absen.setMuridabsen(muridList) )
		.then( () => res.end() );
});

module.exports = router;
