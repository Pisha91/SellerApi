'use strict';

var logger = require('../libs/logger')(module);
var User = require('../database/models/user');

function UsersController() {};

UsersController.prototype.get = function (req, res, next) {
	var query = User.find({});
	var skip = req.query.skip;
	var limit = req.query.limit;

	query.skip(skip).limit(limit);
	logger.info('Request users with { skip: ' + skip + ', limit: ' + limit + ' }');

	query.exec(function (error, users) {
		if (error) {
			logger.error(error);
			next(error);
		} else {
			logger.info(users.length + ' users loaded.')
			var responseUsers = users.map(function(currentItem){ return currentItem.toUserObject(); });
			res.status(200).send(responseUsers);
		}
	});
};

UsersController.prototype.getCurrent = function(req, res, next){
	User.findById(req.currentUser.id, function(error, user){
		if (error) {
			logger.error(error);
			next(error);
		} else {
			if (logger.level == 'debug') {
				logger.debug('Found user: ' + JSON.stringify(user));
			}
			res.status(200).send(user.toUserObject());
		}
	});	
};

UsersController.prototype.getCount = function (req, res, next) {
	User.count({}, function (error, count) {
		if (error) {
			logger.error(error);
			next(error);
		} else {
			logger.info("Users count: " + count);
			res.status(200).send({ count: count });
		}
	});
};

module.exports = new UsersController();