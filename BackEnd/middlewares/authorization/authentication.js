'use strict';

var jwt = require('jwt-simple');
var config = require('../../config');

module.exports = function (req, res, next) {
	var authorizationHeader = req.headers['authorization'];
	if (authorizationHeader) {
		var headerValues = authorizationHeader.split(' ');
		if (headerValues[0] == 'Bearer' && headerValues[1]) {
			var payload = jwt.decode(headerValues[1], config.get('securityKey'), true, config.get('encodeAlgorithm'));
			if (payload 
				&& payload.id 
				&& payload.email 
				&& payload.userAgent == req.headers["user-agent"]) {
				req.currentUser = { id: payload.id, email: payload.email, isSeller: payload.isSeller };					
				next();
			} else {
				res.status(401).send();
			}
		} else {
			res.status(401).send();
		}
	} else {
		res.status(401).send();
	}
}