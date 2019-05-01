var express = require('express');
var router = express.Router();
var childModel = db.models.child;
var classModel = db.models.class;
var weekModel = db.models.week;

router.get('/get-list', function(req, res, next) {
	var {grade, year} = req.query;
	weekModel.scope("child", "latest-count")
		.findAll( {
			include: [ {model: classModel, as: "class", where: {grade, year} } ]
		})
		.then( list => res.send(list) );
});

router.post('/edit', function(req, res, next) {
	var {grade, year, date, child} = req.body;

	var pWeek = classModel.findOne({where: {grade, year}})
		.then( clas => {
			var info = {date, classId: clas.id};
			return weekModel.findOne({where: info})
				.then( week => week ? Promise.resolve(week) : weekModel.create(info) );
		});

	var pChild = childModel.findAll({
		where: { uuid: JSON.parse(child) }
	});

	Promise.all([pWeek, pChild])
		.then( ([week, childList]) => week.setChildweek(childList) )
		.then( () => res.end() );
});

module.exports = router;
