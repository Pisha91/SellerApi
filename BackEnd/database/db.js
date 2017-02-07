var mongoose = require('mongoose');
var config = require('../config');
var logger = require('../libs/logger')(module);
mongoose.connect(config.get('connectionString'));
var db = mongoose.connection;

db.on('error', function(err){
	logger.error(err);
});

db.on('open', function(callback){
	logger.info('DB connection open');
});

module.exprorts = db;