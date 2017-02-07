'use strict';

var logger = require('../../libs/logger')(module);

module.exports = function (req, res, next) {
	if (req.currentUser) {
		if (!req.currentUser.isSeller) {
			logger.info('User id="' + req.currentUser.id + '" is authorized.')
			next();
		} else {
			logger.info('User id="' + req.currentUser.id + '" is not authorized.')
			res.status(401).send();
		}
	}
	else {
		logger.info('User is not authenticated.')
		res.status(401).send();
	}
};