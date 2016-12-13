var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var User = mongoose.model('User');

module.exports = function(passport){

	//success login
	router.get('/success', function(req, res){
		rres.send({state: 'success', user: req.user ? req.user : null});
	});


	//getting all users
	router.get('/login', function(req, res) {
	    User.find(function(err, data) {
	        if (err) {
	            res.status(500).send({message: 'Error occured'});
	        }
	        res.status(200).send(data);
	    });
	});

	//authentication user #POST
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/success',
		failureRedirect: '/failure'
	}));



	//failure login
	router.get('/failure', function(req, res){
		res.status(404).send({message: 'Invalid username/password combination'});
	});



	return router;
}



