var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Task = mongoose.model('Task');

router.get('/tasks', function(req, res, next){
	Task.find(function(err, data){
		if(err){
			res.send(err, 500);
		}
		res.status(200).send(data);
	});
});


router.get('/tasks/:id', function(req, res, next){
	Task.findById(req.params.id, function(err, data){
		if(err){
			res.send("cannot find tasks with id " + req.params.id , 500);
		}
		res.status(200).send(data);
	});
});

module.exports = router;