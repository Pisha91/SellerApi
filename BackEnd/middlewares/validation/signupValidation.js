"use strict";

var RequestState = require('../../libs/requestState');

module.exports = function(req, res, next){
	var firstName = 'firstName',
	lastName = 'lastName',
	phone = 'phone',
	email = 'email',
	password = 'password',
	isSeller = 'isSeller';
	
	var requestState = new RequestState();
	
	var firstNameValue = req.body.firstName;
	var lastNameValue = req.body.lastName;
	var emailValue = req.body.email;
	var phoneValue = req.body.phone;
	var passwordValue = req.body.password;
	var isSellerValue = req.body.isSeller;
	
	requestState.isNull(firstNameValue, firstName);
	requestState.isNull(lastNameValue, lastName);
	requestState.isNull(phoneValue, phone);
	requestState.isNull(passwordValue, password);
	requestState.isNull(isSellerValue, isSeller);
	
	requestState.isValidEmail(emailValue, email);
	
	if(requestState.isValid()){
		next();
	}else{
		res.status(400).send(requestState.getErrors());
	}
};