var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var webpack = require('webpack');
var config = require('./webpack.config.js');
var compiler = webpack(config);

global.Sequelize = require('sequelize');

if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
	global.sequelize = new Sequelize(process.env.DATABASE_URL, {
	  dialect:  'postgres',
	  protocol: 'postgres',
	  port:     match[4],
	  host:     match[3],
	  logging:  false
	})
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

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', require('./routes/index'));
app.use('/murid', require('./routes/murid'));
app.use('/kelas', require('./routes/kelas'));

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
	res.sendFile(path.resolve(__dirname, 'public/index.html'));
});


// app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
