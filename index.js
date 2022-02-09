const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const uppyServer = require('./controller/uppyServer');
const BaseController = require('./controller/base');
const serveStatic = require('serve-static');
const path = require("path");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/public", express.static(__dirname + '/public'));

app.use('/api/file_upload', uppyServer);
app.use(fileUpload());
app.post('/api/check_state', BaseController.checkState)
app.post('/api/upload', BaseController.upload)
app.post('/api/download', BaseController.download)

app.use('/', serveStatic(path.join(__dirname, './frontend/dist')))
app.get(/.*/, function (req, res) {
	res.sendFile(path.join(__dirname, './frontend/dist/index.html'))
})
 
var mysql = require('mysql');
var session = require('express-session');
var nunjucks = require('nunjucks');
var nodemailer = require('nodemailer');
var uuidv1 = require('uuid/v1');
var crypto = require('crypto');
var cookieParser = require('cookie-parser');

var secret_key = 'your secret key';

// Update the below details with your own MySQL connection details
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'kunal',
	password : 'PWAbuilder2021#',
	database : 'pwalogin'
});

// var connection = mysql.createConnection({
// 	host     : 'localhost',
// 	user     : 'root',
// 	password : '',
// 	database : 'pwalogin'
// });

app.use(session({
	secret: secret_key,
	resave: true,
	saveUninitialized: true
}));
app.use(cookieParser());

// Email activation required?
var account_activation_required = false;

// app.get('/', function(request, response) {
// 	response.render('index.html');
// });

app.post('/login', function(request, response) {
	// Create variables with the post data
	var username = request.body.username;
	var password = request.body.password;
	var hashed_password = crypto.createHash('sha1').update(request.body.password).digest('hex');
	// check if the data exists and is not empty
	if (username && password) {
		// Select the account from the accounts table
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, hashed_password], function(error, results, fields) {
			if (results.length > 0) {
				// Account exists (username and password match)
				// Create session variables
				request.session.loggedin = true;
				request.session.username = username;

				if (request.body.rememberme == 'true') {
					console.log("called rememberme");
					// Create cookie hash, will be used to check if user is logged in
					var hash = crypto.createHash('sha1').update(username + password + secret_key).digest('hex');
					// Num days until the cookie expires (user will log out)
					var days = 90;
					response.cookie('rememberme', hash, { maxAge: 1000*60*60*24*days, httpOnly: true });
					connection.query('UPDATE accounts SET rememberme = ? WHERE username = ?', [hash, username]);
					
				}
				// Redirect to home page
				response.send({ state: "success", email :  results[0]['email'], rememberme : request.cookies.rememberme});
				response.end();
			} else {
				response.send('Incorrect Username and/or Password!');
				response.end();
			}
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});	

app.post('/rememberme', function(request, response) {
	// Check if user is logged in
	var rememberme = request.body.rememberme;

	connection.query('SELECT * FROM accounts WHERE rememberme = ?', [rememberme], function(error, results, fields) {
		if (results.length > 0) {
			// remember me cookie matches, keep the user loggedin and update session variables
			request.session.loggedin = true;
			request.session.username = results[0].username;
			response.send({state: "success", 'username' : results[0].username, 'password' : results[0].password, email :  results[0]['email'], rememberme : request.cookies.rememberme});
			response.end();
		} else {
			response.send('failed');
			response.end();
		}
	});
});

app.get('/register', function(request, response) {
	response.render('register.html');
});

app.post('/register', function(request, response) {
	// Create variables and set to the post data
	var username = request.body.username;
	var password = request.body.password;
	var hashed_password = crypto.createHash('sha1').update(request.body.password).digest('hex');
	var email = request.body.email;
	// Check if the post data exists and not empty
	if (username && password && email) {
		// Check if account exists already in the accounts table, checks for username but you could change this to email etc
		connection.query('SELECT * FROM accounts WHERE username = ?', [username], function(error, results, fields) {
			if (results.length > 0) {
				response.send('Account already exists with that username!');
				response.end();
			} else if (!/\S+@\S+\.\S+/.test(email)) {
				// Make sure email is valid
				response.send('Invalid email address!');
				response.end();
			} else if (!/[A-Za-z0-9]+/.test(username)) {
				// Username validation, must be numbers and characters
				response.send('Username must contain only characters and numbers!');
				response.end();
			} else if (account_activation_required) {
				// Change the username and passowrd below to your email and pass, the current mail host is set to gmail but you can change that if you want.
				var transporter = nodemailer.createTransport({
		            host: 'smtp.gmail.com',
		            port: 465,
		            secure: true,
		            auth: {
		                user: 'xxxxxx@xxxxxx.xxx',
		                pass: 'xxxxxx'
		            }
		        });
				// Generate a random unique ID
				var activation_code = uuidv1();
				// Change the below domain to your domain
				var activate_link = 'http://localhost:3000/activate/' + email + '/' + activation_code;
				// Change the below mail options
		        var mailOptions = {
		            from: '"Your Name / Business name" <xxxxxx@gmail.com>',
		            to: email,
		            subject: 'Account Activation Required',
		            text: 'Please click the following link to activate your account: ' + activate_link,
		            html: '<p>Please click the following link to activate your account: <a href="' + activate_link + '">' + activate_link + '</a></p>'
		        };
				// Insert account with activation code
				connection.query('INSERT INTO accounts VALUES (NULL, ?, ?, ?, ?, "")', [username, hashed_password, email, activation_code], function(error, results, fields) {
					transporter.sendMail(mailOptions, function(error, info) {
			            if (error) {
			                return console.log(error);
			            }
			            console.log('Message %s sent: %s', info.messageId, info.response);
			        });
					response.send('You have successfully registered!');
					response.end();
				});
			} else {
				// Insert account with no activation code
				connection.query('INSERT INTO accounts VALUES (NULL, ?, ?, ?, "", "")', [username, hashed_password, email], function(error, results, fields) {
					response.send('You have successfully registered!');
					response.end();
				});
			}
		});
	} else {
		// Form is not complete...
		response.send('Please complete the registration form!');
		response.end();
	}
});

app.get('/activate/:email/:code', function(request, response) {
	// Check if the email and activation code match in the database
	connection.query('SELECT * FROM accounts WHERE email = ? AND activation_code = ?', [request.params.email, request.params.code], function(error, results, fields) {
		if (results.length > 0) {
			// Email and activation exist, update the activation code to "activated"
			connection.query('UPDATE accounts SET activation_code = "activated" WHERE email = ? AND activation_code = ?', [request.params.email, request.params.code], function(error, results, fields) {
				response.send('Your account has been activated!');
				response.end();
			});
		} else {
			response.send('Incorrect email/activation code!');
			response.end();
		}
	});
});

app.get('/profile', function(request, response) {
	// Check if user is logged in
	if (request.session.loggedin) {
		// Get all the users account details so we can display them on the profile page
		connection.query('SELECT * FROM accounts WHERE username = ?', [request.session.username], function(error, results, fields) {
			// Render profile page
			response.render('profile.html', { account: results[0] });
		});
	} else {
		// Redirect to login page
		response.redirect('/');
	}
});

app.get('/edit_profile', function(request, response) {
	// Check if user is logged in
	if (request.session.loggedin) {
		// Get all the users account details so we can display them on the profile page
		connection.query('SELECT * FROM accounts WHERE username = ?', [request.session.username], function(error, results, fields) {
			// Render profile page
			response.render('profile-edit.html', { account: results[0] });
		});
	} else {
		// Redirect to login page
		response.redirect('/');
	}
});

app.post('/edit_profile', function(request, response) {
	// Check if user is logged in
	if (request.session.loggedin) {
		// create variables for easy access
		var username = request.body.username;
		var password = request.body.password;
		var hashed_password = crypto.createHash('sha1').update(request.body.password).digest('hex');
		var email = request.body.email;
		if (username && password && email) {
			// update account with new details
			connection.query('UPDATE accounts SET username = ?, password = ?, email = ? WHERE username = ?', [username, hashed_password, email, request.session.username], function() {
				// update session with new username
				request.session.username = username;
				// get account details from database
				connection.query('SELECT * FROM accounts WHERE username = ?', [username], function(error, results, fields) {
					// Render edit profile page
					response.render('profile-edit.html', { account: results[0], msg: 'Account Updated!' });
				});
			});
		}
	} else {
		// Redirect to login page
		response.redirect('/');
	}
});

app.post('/logout', function(request, response) {
	console.log("logout called");
	// Destroy session data
	request.session.destroy();
	// Clear remember me cookie
	response.clearCookie('rememberme');
	// Redirect to login page
	response.send('Success');
	// response.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, res => {
	console.log(`Server listen ${PORT}`);
});
