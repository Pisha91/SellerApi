"use strict";

var RequestState = require('../../libs/requestState');

module.exports = function(req, res, next){
	var email = 'email',
		password = 'password';	
	var requestState = new RequestState();
	
	var emailValue = req.body.email;
	var passwordValue = req.body.password;
	
	requestState.isNull(passwordValue, password);
	requestState.isValidEmail(emailValue, email);
	
	if(requestState.isValid()){
		next();
	}else{
		res.status(400).send(requestState.getErrors());
	}
};