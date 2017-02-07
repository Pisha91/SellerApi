'use strict';

module.exports = function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
};