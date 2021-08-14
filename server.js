/////////////////// Require Statements /////////////////
require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const rowdy = require('rowdy-logger');
const session = require('express-session');


//DB and Models
const entryController = require('./controllers/entryController.js');
const userController = require('./controllers/userController.js');
const db = require('./models/index.js');

/////////////////// Configuration //////////////////////
const app = express();
const PORT = 3001;
const rowdyResults = rowdy.begin(app)
app.set('view engine', 'ejs');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
const $ = require("jquery")(window);

/////////////////// Middleware /////////////////////////
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))
app.use(session({ secret: process.env.SESSION_SECRET }));

///////////////////////Controllers//////////////////////
app.use('/user', userController);
app.use('/entry', entryController);


/////////////////////////Routes/////////////////////////
// Signup Route - Shows a Signup Form
app.get('/signup', (req, res) => {
  res.render('signup.ejs');
});

// Listening for when the signup form is submitted
// Sign Up a New User
app.post('/signup', (req, res) => {
  // 1. ✅ take in the username and password from the form
  console.log(req.body);
  // 2. ✅ Make a query to create a new User
  db.User.create(req.body, (err, createdUser) => {
    if (err) console.log(err);
    console.log(createdUser);
    // 3. ✅ Redirect to /login
    res.redirect('/');
  });
})

//Login Page --> will need to route user to welcome page
//adjust login form accordingly
app.get('/', (req,res) => {
    res.render('login.ejs')
})

// Listen for when the login form is submitted
// Log the user in - track the user in a cookie on their browser
app.post('/', (req, res) => {
  console.log(req.body);
  // 1. ✅ Check if the user passed in exists
  db.User.findOne({ userName: req.body.userName }, (err, foundUser) => {
    if (err) return console.log(err);
    // If the username is not correct, send them to the /login page
    if (!foundUser) {
      return res.redirect('/');
    }
    // 2. ✅ Check if the password passed in matches the one on file,
    // if not send them to the /login page
    if (req.body.password !== foundUser.password) {
      return res.redirect('/');
    }
    // 3. ✅ Track the user in a cookie on their browser
    //- Adding a new property into our session object
    //- The session object will be accessible from any of my routes
    req.session.currentUser = foundUser;
    console.log(req.session);
    // After successfully logging in go the fruits index page
    res.redirect(`/user/${req.session.currentUser._id}`);
  })
})

///Logout Route
app.get('/logout', (req, res) => {
  req.session.destroy();
  console.log("you're logged out")
  res.redirect('/');
})

/////////////////// Start the Server ///////////////////
// Start our Server
app.listen(PORT, () => {
    console.log(`Our cool ass journal is running on localhost:${PORT} 🚀`);
    rowdyResults.print()
  })

