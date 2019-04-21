var fs = require("fs");
var path = require("path");

var Sequelize = require('sequelize');
if (process.env.DATABASE_URL) {
	var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);

    var sequelize = new Sequelize(match[5], match[1], match[2], {
      dialect: 'postgres',
      protocol: 'postgres',
      port: match[4],
      host: match[3],
      logging: false
    });
}
else{
	var sequelize = new Sequelize('database', 'username', 'password', {
		host: 'localhost',
		dialect: 'sqlite',
		storage: 'gsm.db',
		logging: false
	});
}

var models = {};
fs.readdirSync("./server/models").forEach( fileName => {
	var basename =  fileName.replace(path.extname(fileName), "");
	var modelPath = path.join("./models", basename);
	models[basename] = sequelize.import(modelPath);
});

for(var name in models){
	if(typeof models[name].associate === "function"){
		models[name].associate(models);
	}
}

sequelize.sync()
	.then( () => sequelize.authenticate())
	// .then( () => {
	// 	var {models} = db;
	// 	var murids;
	// 	models.murid.findAll()
	// 		.then( list => {
	// 			murids = list
	// 			return models.kelas.findAll()
	// 		})
	// 		.then( list => {
	// 			list[1].addMurid(murids);
	// 			return list[1].getMurid()
	// 		})
	// 		.then(a=> console.log(a))
	// })
	.then( () => console.log('Database connection has been established successfully.') );



module.exports = {
	Sequelize, sequelize, models
}