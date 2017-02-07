'use strict';

var validator = require('validator');

function RequestState() {
	this.errors = [];
};

RequestState.prototype.isNull = function (value, fieldName) {
	if (validator.isNull(value)) {
		this.errors.push({
			fieldName: fieldName,
			message: fieldName + ' is required!'
		});
		
		return true;
	}
	
	return false;
};

RequestState.prototype.isValidEmail = function (value, fieldName) {
	var message = '';
	if (validator.isNull(value)) {
		message = fieldName + ' is required!'
	} else {
		if (!validator.isEmail(value)) {
			message = fieldName + ' is not in a valid format!';
		}
	}

	if (message != '') {
		this.errors.push({
			fieldName: fieldName,
			message: message
		});
		
		return false;
	}
	
	return true;
}

RequestState.prototype.isValid = function () {
	return this.errors.length <= 0;
};

RequestState.prototype.getErrors = function () {
	return this.errors;
}

module.exports = RequestState;