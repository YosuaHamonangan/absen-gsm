var express = require('express');
var router = express.Router();
var childModel = db.models.child;
var classModel = db.models.class;
var weekModel = db.models.week;

router.post('/register', function(req, res, next) {
	var info = req.body;
	classModel.create(info);
	res.end();
});

router.get('/get-list', function(req, res, next) {
	classModel.findAll({
		group: ['class.id'],
		attributes: {
			exclude: [ "weekId", "createdAt", "updatedAt"],
			include: [ [db.sequelize.fn('COUNT', db.sequelize.col('childclass.id')), 'childCount'] ]
		},
		include: [ {model: childModel, as: 'childclass', through: db.models.childClass, attributes: [] } ]
	})
	.then( list => res.send(list) );
});

router.post('/edit', function(req, res, next) {
	var {grade, year, child} = req.body;

	var pClass = classModel.findOne({where: {grade, year} });
	var pChild = childModel.findAll({where: {uuid: JSON.parse(child)} });

	Promise.all([pClass, pChild])
		.then( ([clas, childList]) => clas.setChildclass(childList) )
		.then( () => res.end() );
});

router.get('/get-child-list', function(req, res, next) {
	var {grade, year} = req.query;

	classModel.findOne({where:{grade, year}})
		.then( clas => clas.getChildclass() )
		.then( list => res.send(list) )
});

module.exports = router;
