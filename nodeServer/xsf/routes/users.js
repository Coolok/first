var express = require('express');
var router = express.Router();
var util = require('util');
/* GET users listing. */
var User = require('../models');


router.get('/', function(req, res, next) {
	User.find(function (err, users) {
	  if (err) return console.error(err);
	  console.log(users);
	   res.render('index', { title: 'Express' , users:users});//util.inspect(req)
	})
	
});

router.get('/user/', function(req, res, next) {
	if(req.query.id){
		User.findOne({ _id: req.query.id },function (err, user) { 
				res.send(user);
		})
	}
});

router.get('/user_save/', function(req, res, next) {
	if(req.query.id){
		var user = new User({ 
			name: 'NEW', 
			_id: req.query.id,
			score: 555,
			lifes: 555,
			prigress: 555,
			coins: 555,
			stars: 555		
		});
		user.save(function (err, user) {
		  if (err) return console.error(err);
		  console.log('user NEW saved');
		  User.find(function (err, users) {
			  if (err) return console.error(err);
			  console.log(users);
			   res.json(users);//util.inspect(req)
			})
		});
	}
});

router.post('/post', function(req, res, next) {
  res.json({"success":req.body});//res.send('post');//util.inspect(req)
  console.log('___')
});

module.exports = router;
