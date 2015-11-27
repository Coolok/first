var express = require('express');
//var users = require('../models');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	res.render('index', { title: 'Express' , users:'users'});
		
 
});

module.exports = router;
