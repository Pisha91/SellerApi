var winston = require('winston');
var config = require('../config');

function getLogger(module){
	var path = module.filename.split('/').slice(-2).join('/');
	
	var logger = new winston.Logger({
		transports:[
			new (winston.transports.Console)({
				name: 'console-log',
				colorize: true,
				level: 'info',
				label: path
			}),
			new (winston.transports.File)({
				name: 'file-log',
				filename:'log.txt',
				level: 'debug',
				label: path
			})
		]
	});
	
	logger.level = config.get('loglevel');
	
	return logger;
}

module.exports = getLogger;