var mongoose     = require('mongoose');

var db = mongoose.connection;

mongoose.connect('mongodb://107.170.28.199:27017/luminos');

var Schema       = mongoose.Schema;
var UserSchema   = new Schema({
	username: String,
	password: String,
	email: String,
	ideas: Array,
	skills: Array,
	website: Array,
	github: String,
	profilepic: String
});

module.exports = mongoose.model('User', UserSchema);



