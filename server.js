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

router.get('/', function(req, res) {
    res.sendfile(__dirname + '/views/ideas.html');
});

router.get('/ideas', function(req, res) {
    res.sendfile(__dirname + '/views/ideas.html');
});

router.get('/projects', function(req, res) {
    res.sendfile(__dirname + '/views/projects.html');
});

router.get('/create', function(req, res) {
    res.sendfile(__dirname + '/views/create.html');
});

router.get('/signup', function(req, res) {
	console.log("in signup");
    res.sendfile(__dirname + '/views/signup.html');
});

router.get('/idea/:idea_id', function(req, res, next) {	

  var url;
  var id = req.param('idea_id');
  // lookup the user in the db so we can get their profile url
  Idea.findById(id , function(err, idea) {
    if (idea == null) {;
    	res.sendfile(__dirname + '/views/error.html');
    }
    else {
	    res.sendfile(__dirname + '/views/idea.html');
    }
 	
  });
});

router.get('/project/:idea_id', function(req, res, next) {	

  var url;
  var id = req.param('idea_id');
  // lookup the user in the db so we can get their profile url
  Project.findById(id , function(err, idea) {
    if (idea == null) {;
    	res.sendfile(__dirname + '/views/error.html');
    }
    else {
	    res.sendfile(__dirname + '/views/project.html');
    }
 	
  });
});

router.get('/:anythingelse', function(req, res, next) {	
    res.sendfile(__dirname + '/views/error.html');
});


// router.get('/:username', function(req, res, next) {
//   // gets the value for the named parameter user_id from the url

//   var url;
//   var user = req.param('username');

//   User.find({username: user}, function(err, comic) {
//     if (err) res.send(err);
//     if (comic[0] == null) {
//     	console.log("not found!");
//     	res.sendfile(__dirname + '/views/error.html');
//     }
//     else {
//     	console.log(comic);
// 	    res.sendfile(__dirname + '/views/comic.html');
//     }
 	
//   });
// });


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

router.route('/api/getallideaswithuser')
	.get(function(req, res) {
		var results = [];
		var singleResult;
		Idea.find( function(err, idea) {
			if (err)
				res.send(err);
			var total = idea.length;
			idea.forEach(function(i) {
    			innerLoop(i)
			});
			//res.json(results);			

			function innerLoop(idea) {
				User.findOne({ideas: String(idea._id)}, function(e, user) {
					if (e)
						res.send(e);
					singleResult = new Object();
					singleResult.platform = idea.platform;
					singleResult.description = idea.description;
					singleResult.category = idea.category;
					singleResult.tags = idea.tags;
					singleResult.projects = idea.projects;
					singleResult.likes = idea.likes;
					singleResult.name = idea.name;
					singleResult._id = idea._id;
					if (user != null) {
					singleResult.username = user.username;
					singleResult.profilepic = user.profilepic;
					}
					else {
						singleResult.username = 'anonymous';
						singleResult.profilepic = 'luminos.me/public/img/octocat.png'
					}
					results.push(singleResult);
					if (results.length == total) {
						res.json(results);
					}
		   		});
			}

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


router.route('/api/getallprojectswithuser')
	.get(function(req, res) {
		var results = [];
		var singleResult;
		Project.find( function(err, project) {
			if (err)
				res.send(err);
			var total = project.length;
			project.forEach(function(i) {
    			innerLoop(i)
			});
			//res.json(results);			

			function innerLoop(project) {
				Idea.findOne({projects: String(project._id)}, function(e, idea) {
					if (e)
						res.send(e);
					singleResult = new Object();
					singleResult.platform = project.platform;
					singleResult.link = project.link;
					singleResult.description = project.description;
					singleResult.completed = project.completed;
					singleResult.users = project.users;
					singleResult.likes = project.likes;
					singleResult.name = project.name;
					singleResult._id = project._id;
					singleResult.ideaID = idea._id;
					singleResult.ideaName = idea.name;
					results.push(singleResult);
					console.log(singleResult);
					if (results.length == total) {
						res.json(results);
					}
		   		});
			}

	});
});



// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);
app.use('/public', express.static(__dirname+'/public'));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);