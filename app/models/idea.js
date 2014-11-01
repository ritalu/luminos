var mongoose     = require('mongoose');

var db = mongoose.connection;

var Schema       = mongoose.Schema;
var IdeaSchema   = new Schema({
	platform: String,
	description: String,
	category: String,
	tags: String,
	projects: Array,
	likes: Array,
	name: String,
	creationdate: Date
});

module.exports = mongoose.model('Idea', IdeaSchema);