/////////////////// Require Statements /////////////////
const express = require('express');
const methodOverride = require('method-override');
const rowdy = require('rowdy-logger')

//DB and Models
const entryController = require('./controllers/entryController.js');

/////////////////// Configuration //////////////////////
const app = express();
const PORT = 3000;
const rowdyResults = rowdy.begin(app)
app.set('view engine', 'ejs');

/////////////////// Middleware /////////////////////////
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))
app.use('/entry', entryController);


/////////////////////////Routes/////////////////////////
//Login Page --> will need to route user to welcome page
app.get('/', (req,res) => {
  res.render('login.ejs')
})

//Welcome Page --> NEED to code form from login that redirects user to welcome
app.get('/welcome', (req, res) => {
  res.send("you've reached me")
})

/////////////////// Start the Server ///////////////////
// Start our Server
app.listen(PORT, () => {
    console.log(`Our cool ass journal is running on localhost:${PORT} 🚀`);
    rowdyResults.print()
  })


//   const db = require('./models/index.js')