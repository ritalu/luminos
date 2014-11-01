var mongoose     = require('mongoose');

var db = mongoose.connection;

mongoose.connect('mongodb://104.236.63.166:27017/master');

var Schema       = mongoose.Schema;
var UserSchema   = new Schema({
	username: String,
	password: String,
	email: String,
	description: String
});

module.exports = mongoose.model('User', UserSchema);



