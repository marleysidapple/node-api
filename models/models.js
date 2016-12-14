var mongoose = require('mongoose');

//creating task schema

var taskSchema = new mongoose.Schema({
	title: String,
	isDone: Boolean,
	user: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}]
});



var userSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	created_at: {type: Date, default: Date.now}
});

//declaring models
mongoose.model('Task', taskSchema);
mongoose.model('User', userSchema);