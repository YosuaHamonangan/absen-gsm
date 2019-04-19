var express = require('express');
var router = express.Router();
var muridModel = require("../models/murid");
var kelasModel = require("../models/kelas");
var absenModel = require("../models/absen");
var Op = Sequelize.Op;

router.post('/register', function(req, res, next) {
	var info = req.body;
	kelasModel.create(info)
	.then( () => res.redirect("/kelas") )
});

router.get('/getList', function(req, res, next) {
	kelasModel.findAll({
		attributes: {
			exclude: ["murid", "createdAt", "updatedAt"]
		}
	})
	.then( list => res.send(list) )
});

router.get('/getMuridList', function(req, res, next) {
	var id = req.query.kelas;

	kelasModel.findOne({where:{id}})
	.then( kelas => {
		var murid = JSON.parse(kelas.murid);

		return muridModel.findAll({
			where: {
				id: {
					[Op.or]: murid
				}
			},
			order: [
				["nama", "ASC"],
				["marga", "ASC"]
			]
		})
	})
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
