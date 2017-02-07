'use strict';

var logger = require('../libs/logger')(module);
var User = require('../database/models/user');
var jwt = require('jwt-simple');
var config = require('../config');

function AuthenticaationController() { }

AuthenticaationController.prototype.signIn = function (req, res, next) {
	var email = req.body.email;
	var password = req.body.password;

	User.findOne({ email: email }, function (error, user) {
		if (error) {
			logger.error(error);
			next(error);
		} else {
			if (!user) {
				logger.info('User with email = "' + email + '" not found.')
				res.status(401).send();
			} else {
				if (user.checkPassword(password)) {
					logger.info('User with email = "' + email + '" signed in.')
					var payload = {
						id: user.id,
						email: user.email,
						isSeller: user.isSeller,
						userAgent: req.headers["user-agent"]
					};

					var token = jwt.encode(payload, config.get('securityKey'), config.get('encodeAlgorithm'));
					res.status(200).send({ token: token });
				} else {
					res.status(401).send();
				}
			}
		}
	});
}

AuthenticaationController.prototype.signUp = function (req, res, next) {
	var body = req.body

    if (logger.level == 'debug') {
		logger.debug('Body "' + JSON.stringify(body));
    }

    var user = new User({
		firstName: body.firstName,
		lastName: body.lastName,
		email: body.email,
		phone: body.phone,
		password: body.password,
		isSeller: body.isSeller
    });

    user.save(function (error, user) {
        if (error) {
            logger.error(error);
            next(error);
        } else {
			logger.info('Account "' + user.email + '" created.');
			res.status(200).send(user.toUserObject());
        }
    });
};

module.exports = new AuthenticaationController();