// server.js

// BASE SETUP
// =============================================================================

// add references to models
var User     = require('./app/models/user');
var Idea     = require('./app/models/idea');
var Project     = require('./app/models/project');

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8000; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

router.route('/api/users')

	// create users
	.post(function(req, res) {
		console.dir(req);	
		var user = new User(); 		
		user.username = req.body.username;  
		user.password = req.body.password;
		user.email = req.body.email;

		//save and check for errors
		user.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'User created!' });
		})
		
	 })

	// get all users
	.get(function(req, res) {
		User.find(function(err, users) {
			if (err)
				res.send(err);
			res.json(users);
	});
});

router.route('/api/users/:username')
	.get(function(req, res) {
		User.find( { username: req.params.username }, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
	});
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);