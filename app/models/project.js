var mongoose     = require('mongoose');

var db = mongoose.connection;

var Schema       = mongoose.Schema;
var ProjectSchema   = new Schema({
	link: String,
	technologies: Array,
	platform: String,
	completed: Boolean,
	name: String,
	description: String,
	likes: Array,
	users: Array,
	creationdate: Date
});

module.exports = mongoose.model('Project', ProjectSchema);