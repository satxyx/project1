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
const PORT = process.env.PORT || 3001
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



app.post('/signup', (req, res) => {
  console.log(req.body);
  db.User.create(req.body, (err, createdUser) => {
    if (err) console.log(err);

    console.log(createdUser);
    res.redirect('/');
  });
})


app.get('/', (req,res) => {
    console.log(req.session)
    res.render('login.ejs')
})


app.post('/', (req, res) => {
  console.log(req.body);
  db.User.findOne({ userName: req.body.userName }, (err, foundUser) => {

    if (err) return console.log(err);
    if (!foundUser) {
      return res.redirect('/');
    }
    if (req.body.password !== foundUser.password) {
      return res.redirect('/');
    }
    req.session.currentUser = foundUser;

    console.log(req.session);
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

