// Provides endpoints for user signup and login

module.exports = function(){
	var express = require('express');
	var app = express();

	// Render the login page
	app.get('/login', function(req, res) {
		console.log('GET LOGIN');
		res.render('user/login',{});
	});

	// Logs in the user
	app.post('/login', function(req, res) {
		console.log('POST LOGIN');
		Parse.User.logIn(req.body.username, req.body.password).then(function(user) {
			res.redirect('/');
		}, function(error) {
			// Show the error message and let the user try again
			console.log('LogIn error: ' + error.message);
			res.render('user/login', { flash: error.message });
		});
	});

	// Logs out the user
	app.get('/logout', function(req, res) {
		Parse.User.logOut();
		res.redirect('/');
	});

	// Logs out the user
	app.get('/list', function(req, res) {
        console.log('try to get user list');

        var query = new Parse.Query(Parse.User);
        query.find({
            success: function (results)
            {
                var users = [];
                results.forEach(function (iteratedProject)
                {
                    users.push(toJSON(iteratedProject));
                });
                console.log(users);
                res.json(users);
            },
            error: error
        });
	});
    function toJSON(user)
    {
        return {
            id: user.id,
            username: user.get('username'),
        };
    }

    function error(object, error)
    {
        console.error(error);
        error.status = 'ko';
        res.json(error);
    }
	return app;
}();