'use strict';

var logger = require('../libs/logger')(module);
var Seller = require('../database/models/seller');

function SellersController() { };

SellersController.prototype.add = function (req, res, next) {
	var body = req.body;

	if (logger.level == 'debug') {
		logger.debug('Body "' + JSON.stringify(body));
	}

	var seller = new Seller({
		title: body.title,
		userId: req.currentUser.id,
		location: body.location,
		address: body.address
	});

	seller.save(function (error, seller) {
		if (error) {
			logger.error(error);
			next(error);
		} else {
			logger.info('Seller "' + seller.title + '" created.');
			res.status(200).send(seller.toSellerObject());
		}
	});
};

SellersController.prototype.get = function(req, res, next){
	var query = Seller.find({});
	var skip = req.query.skip;
	var limit = req.query.limit;
	
	query.skip(skip).limit(limit);
	logger.info('Request sellers with { skip: ' + skip + ', limit: ' + limit + ' }');
	
	query.exec(function(error, sellers){
		if(error){
			logger.error(error);
			next(error);
		}else{
			logger.info(sellers.length + ' selers loaded.');
			var sellerObjects = sellers.map(function(currentItem){ return currentItem.toSellerObject(); });
			res.status(200).send(sellerObjects);
		}
	});	
};

SellersController.prototype.getCount = function(req, res, next){
	Seller.count({}, function(error, count){
		if (error) {
			logger.error(error);
			next(error);
		} else {
			logger.info("Sellers count: " + count);
			res.status(200).send({ count: count });
		}
	});	
};

SellersController.prototype.getByCurrentUser = function (req, res, next) {
	Seller.find({ userId: req.currentUser.id}, function(error, sellers){
		if(error){
			logger.error(error);
			next(error);
		}else{
			logger.info('Selers loaded.')
			var sellerObjects = sellers.map(function(currentItem){ return currentItem.toSellerObject(); });
			res.status(200).send(sellerObjects);
		}
	});
};

module.exports = new SellersController();