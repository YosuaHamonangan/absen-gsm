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
	var modelPath = path.join("./models", fileName);
	var model = sequelize.import(modelPath);
	models[model.getTableName()] = model;
});

for(var name in models){
	if(typeof models[name].associate === "function"){
		models[name].associate(models);
	}
}

sequelize.sync()
	.then( () => sequelize.authenticate())
	.then( () => console.log('Database connection has been established successfully.') );



module.exports = {
	Sequelize, sequelize, models
}