var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
	   console.log(111)
	   
	});
	var userSchema = mongoose.Schema({
		name: String,
		_id: Number,
		score: Number,
		lifes: Number,
		prigress: Number,
		coins: Number,
		stars: Number
	});
	userSchema.methods.speak = function () {
	  var greeting = this.name
		? "Meow name is " + this.name
		: "I don't have a name";
	  console.log(greeting);
	}

	var User = mongoose.model('User', userSchema);
	
	var silence = new User({ 
		name: 'Silence', 
		_id: 333,
		score: 111,
		lifes: 1,
		prigress: 22,
		coins: 33,
		stars: 44		
	});
	console.log(silence.name); // 'Silence'
		// NOTE: methods must be added to the schema before compiling it with mongoose.model()
	
	
	var fluffy = new User({ 
		name: 'Silence', 
		_id: 444,
		score: 222,
		lifes: 2,
		prigress: 99,
		coins: 88,
		stars: 77		
	});
	fluffy.speak(); // "Meow name is fluffy"
	
	mongoose.connection.collections['users'].drop( function(err) {
			console.log('collection dropped');
	});
	
	fluffy.save(function (err, fluffy) {
	  if (err) return console.error(err);
	  fluffy.speak();
	});
	
	silence.save(function (err, silence) {
	  if (err) return console.error(err);
	  silence.speak();
	});
	
	User.find(function (err, users) {
	  if (err) return console.error(err);
	  console.log(users);
	   
	})
	
module.exports = User;