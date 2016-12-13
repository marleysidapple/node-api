var mongoose = require('mongoose');   
var User = mongoose.model('User');
var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        //console.log('serializing user:',user.username);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            //console.log('deserializing user:',user.username);
            done(err, user);
        });
    });


	passport.use('login', new LocalStrategy({usernameField: 'email', passwordField: 'password'},
		function(username, password, done) {
			User.findOne({'email': username}, function(err, user){
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