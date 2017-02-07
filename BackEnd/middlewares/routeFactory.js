'use strict';

var express = require('express');
var cors = require('./cors');
var authentication = require('./authorization/authentication');
var sellerAuthorization = require('./authorization/sellerAuthorization');
var userAuthorization = require('./authorization/userAuthorization');

var signupValidationMiddleware = require('./validation/signUpValidation');
var signinValidationMiddleware = require('./validation/signInValidation');
var sellerValidationMiddleware = require('./validation/sellerValidation');

var authenticationController = require('../controllers/authenticationController');
var usersController = require('../controllers/usersController');

var sellersController = require('../controllers/sellersController');

var router = express.Router();

// Enable CORS
router.use(cors);

// setup authentication routes
router.post('/signup', signupValidationMiddleware);
router.post('/signup', authenticationController.signUp);

router.post('/signin', signinValidationMiddleware);
router.post('/signin', authenticationController.signIn);

// setup users routes
router.use('/users', authentication);

router.get('/users', usersController.get);
router.get('/users/me', usersController.getCurrent);
router.get('/users/count', usersController.getCount);

// setup sellers routes
router.use('/sellers', authentication);

router.post('/sellers', sellerAuthorization);
router.post('/sellers', sellerValidationMiddleware);
router.post('/sellers', sellersController.add);

router.get('/sellers', userAuthorization);
router.get('/sellers', sellersController.get);

router.get('/sellers/count', userAuthorization);
router.get('/sellers/count', sellersController.getCount);

router.get('/users/me/sellers', sellerAuthorization);
router.get('/users/me/sellers', sellersController.getByCurrentUser);

module.exports = router;