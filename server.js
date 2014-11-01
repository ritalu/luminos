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

var port = process.env.PORT || 80; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	next(); // make sure we go to the next routes and don't stop here
});

// USERS
router.route('/api/users')

	.post(function(req, res) {
		console.dir(req);	
		var user = new User(); 		
		user.username = req.body.username;  
		user.password = req.body.password;
		user.email = req.body.email;
		user.ideas = req.body.idea;
		user.skills = req.body.skills;
		user.website = req.body.website;
		user.github = req.body.github;

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




// IDEAS
router.route('/api/ideas')

	.post(function(req, res) {
		console.dir(req);	
		var idea = new Idea(); 		
		idea.platform = req.body.platform; 
		idea.description = req.body.description;
		idea.category = req.body.category;
		idea.tags = req.body.tags;
		idea.projects = req.body.projects;
		idea.likes = req.body.likes;
		idea.name = req.body.name; 

		idea.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'Idea created!' });
		})		
	 })

	// get all users
	.get(function(req, res) {
		Idea.find(function(err, users) {
			if (err)
				res.send(err);
			res.json(users);
	});
});

router.route('/api/ideas/:idea_id')
	.get(function(req, res) {
		Idea.findById(req.params.idea_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
	});
});

router.route('/api/likeidea')
	.get(function(req, res) {
		Idea.findById(req.query.idea_id, function(err, idea) {
			if (err)
				res.send(err);
			idea.likes.push(req.query.username);
			idea.save(function (err) {
				if (err)
					res.send(err);
				res.json({ message: 'Idea updated!' });
			});
	});
});

router.route('/api/unlikeidea')
	.get(function(req, res) {
		Idea.findById(req.query.idea_id, function(err, idea) {
			if (err)
				res.send(err);
			for (i = 0; i < idea.likes.length; i++) {
				if (idea.likes[i] == req.query.username) {
					console.log(idea.likes[i]);
					idea.likes.splice(i, 1);					
				}
			}
			idea.save(function (err) {
				if (err)
					res.send(err);
				res.json({ message: 'Idea updated!' });
			});
	});
});

// PROJECTS

router.route('/api/projects')

	.post(function(req, res) {
		console.dir(req);	
		var project = new Project(); 		
		project.platform = req.body.platform; 
		project.link = req.body.link;
		project.technologies = req.body.technologies;
		project.completed = req.body.completed;
		project.name = req.body.name;
		project.description = req.body.description;
		project.likes = req.body.likes;
		project.users = req.body.users;

		project.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'Project created!' });
		})		
	 })

	// get all users
	.get(function(req, res) {
		Project.find(function(err, users) {
			if (err)
				res.send(err);
			res.json(users);
	});
});

router.route('/api/project/:project_id')
	.get(function(req, res) {
		Project.findById(req.params.project_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
	});
});



// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);