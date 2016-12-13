var mongoose = require('mongoose');   
var User = mongoose.model('User');
var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('login', new LocalStrategy(
		function(username, password, done) {
			User.findOne({'username': username}, function(err, user){
				if (err){
					return done(err);
				}

				if (!user){
					console.log('User not found');
					  return done(null, false, { message: 'Incorrect username.' });
				}

				if (!isValidPassword(user, password)){
					console.log('Invalid password');
					 return done(null, false, { message: 'Incorrect password.' });
				}
				return done(null, user);
			});
		}

	));

	//matching password
	var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };
}