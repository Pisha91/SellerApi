'use strict';

var RequestState = require('../../libs/requestState');

module.exports = function(req, res, next){
	var title = 'title',
	location = 'location',
	longtitude = 'location.longtitude',
	latitude = 'location.latitude',
	address = 'address',
	country = 'address.country',
	city = 'address.city',
	street = 'address.street';
	
	var requestState = new RequestState();	
	
	var titleValue = req.body.title;
	var locationValue = req.body.location;
	var addressValue = req.body.address;
	
	requestState.isNull(titleValue, title);
	
	if(!requestState.isNull(locationValue, location)){
		requestState.isNull(locationValue.longtitude, longtitude);
		requestState.isNull(locationValue.latitude, latitude);
	}
	
	if(!requestState.isNull(addressValue, address)){
		requestState.isNull(addressValue.country, country);
		requestState.isNull(addressValue.city, city);
		requestState.isNull(addressValue.street, street);
	}
	
	if(requestState.isValid()){
		next();
	}else{
		res.status(400).send(requestState.getErrors());
	}
}