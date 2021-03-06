var express = require('express');
var router = express.Router();
var util = require('util');
var debug = require('debug')('http');
/* GET users listing. */
var User = require('../models');
var fs = require('fs');

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


/* 
$.get('users/get_level/?level=8', function(data, resp) {
debugger
})
 */
router.get('/get_level/', function(req, res, next) {
	if(req.query.level){
		fs.readFile('levels/l_'+req.query.level+'.json', function (err,data) {
		  if (err) {
			return console.log(err);
		  }
		  res.send(data);
		});
	}
});
/* 
$.post('users/save_level/?level=8', function(data, resp) {
debugger
})
 */
router.post('/save_level/', function(req, res, next) {
	if(req.query.level && req.body){
		fs.writeFile('levels/l_'+req.query.level+'.json', JSON.stringify(req.body), function (err) {
		  if (err) return console.log(err);
		  console.log('l_'+req.query.level+'.json saved');
		});

	}
});

/* 
$.get('users/user_save/?id=8', function(data, resp) {
debugger
})
 */
router.get('/user_save/', function(req, res, next) {
	if(req.query.id){
	debug('doing some work');
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

/* 
$.get('users/user_profile/?id=8', function(data, resp) {
debugger
})

$.get('users/user_profile/?q_range=1&q_name=prigress&q_gt=1&q_lt=22 ', function(data, resp) {
debugger
})

$.get('users/user_profile/?q_param=1&q_name=name&q_val=Silence', function(data, resp) {
debugger
})
 */
 
router.get('/user_profile/', function(req, res, next) {
	debugger
	if(
		req.query.q_range &&
		req.query.q_name && 
		req.query.q_gt && 
		req.query.q_lt 
		){
		User.where(req.query.q_name).gte(req.query.q_gt).lte(req.query.q_lt).exec(function (err, user) {
			debugger
			if (err) return console.error(err);
			res.send(user);
		});
	}
	if(
		req.query.q_param &&
		req.query.q_name && 
		req.query.q_val
		){
		var name = req.query.q_name;
		var _query = {};
		_query[name] = req.query.q_val;
		User.findOne(_query, function (err, user) {
			debugger
			if (err) return console.error(err);
			res.send(user);
		});
	}
	if(req.query.id){
		User.findOne({ _id: req.query.id },function (err, user) { 
				res.send(user);
		})
	}
});


/* 
$.get('users/user_save_settings/?id=333&settings=old', function(data, resp) {
debugger
})
 */
router.get('/user_save_settings/', function(req, res, next) {
	if(req.query.id && req.query.settings){
		var query = { _id: req.query.id };
		User.findOneAndUpdate(query, {name:req.query.settings}, function(err,model){
			User.findOne({ _id: req.query.id },function (err, user) { 
					res.send(user);
			})
		})
	}
});

/* 
$.get('users/user_save_attr/?id=333&settings=old&progress=555', function(data, resp) {
debugger
})
 */
router.get('/user_save_attr/', function(req, res, next) {
	if(req.query.id && req.query.settings){
		var query = { _id: req.query.id };
		User.findOneAndUpdate(query, {name:req.query.settings}, function(err,model){
			User.findOne({ _id: req.query.id },function (err, user) { 
					res.send(user);
			})
		})
	}
});

router.post('/post', function(req, res, next) {
  res.json({"success":req.body});//res.send('post');//util.inspect(req)
  console.log('___')
});

module.exports = router;
