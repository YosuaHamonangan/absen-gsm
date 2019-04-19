global.IS_DEV = process.argv[2] === "dev";


global.Sequelize = require('sequelize');
if (process.env.DATABASE_URL) {
	var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);

    sequelize = new Sequelize(match[5], match[1], match[2], {
      dialect: 'postgres',
      protocol: 'postgres',
      port: match[4],
      host: match[3],
      logging: false
    });
}
else{
	global.sequelize = new Sequelize('database', 'username', 'password', {
		host: 'localhost',
		dialect: 'sqlite',
		storage: 'gsm.db',
		logging: false
	});
}

sequelize
	.authenticate()
	.then(() => {
		console.log('Database connection has been established successfully.');
	})


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', require('./server/routes/index'));
app.use('/murid', require('./server/routes/murid'));
app.use('/kelas', require('./server/routes/kelas'));


if(IS_DEV){	
	var webpack = require('webpack');
	var config = require('./webpack.config.dev.js');
	var compiler = webpack(config);

	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath
	}));

	app.use(require('webpack-hot-middleware')(compiler));

	app.get('*', (req, res, next) => {
		compiler.outputFileSystem.readFile(path.join(__dirname, 'dist', 'index.html'), (err, result) => {
			if (err) {
				return next(err)
			}
			res.set('content-type', 'text/html')
			res.send(result)
			res.end()
		})
	});
}
else{
	app.use(express.static(path.join(__dirname, 'dist')))
	app.get('*', function(req, res) {
		res.sendFile(path.join(__dirname, 'dist', 'index.html'));
	});
}

module.exports = app;
