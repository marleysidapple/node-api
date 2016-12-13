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


router.post('/tasks', function(req, res){
	var task = new Task();
	if (!req.body.title || !req.body.isDone){
		res.status(400).send({error: "Bad Data"});
	} else {
		task.title = req.body.title;
		task.isDone = req.body.isDone;
		task.save(function(err, task){
			if(err){
				res.send(err, 500);
			}
			return res.status(200).send(task);
		});
	}
});

module.exports = router;