var dotenv = require("dotenv");
dotenv.config();

global.IS_DEV = process.argv[2] === "dev";

global.db = require("./db");

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var fileUpload = require('express-fileupload');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());

app.use('/', require('./routes/index'));
app.use('/murid', require('./routes/murid'));
app.use('/kelas', require('./routes/kelas'));


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
			if(err) return next(err);
			res.set('content-type', 'text/html');
			res.send(result);
			res.end();
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
