/////////////////// Require Statements /////////////////
const express = require('express');
const methodOverride = require('method-override');
const rowdy = require('rowdy-logger')

//DB and Models
const entryController = require('./controllers/entryController.js');
const userController = require('./controllers/userController.js');
const db = require('./models/index.js');

/////////////////// Configuration //////////////////////
const app = express();
const PORT = 3000;
const rowdyResults = rowdy.begin(app)
app.set('view engine', 'ejs');

/////////////////// Middleware /////////////////////////
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))

///////////////////////Controllers//////////////////////
app.use('/user', userController);
app.use('/entry', entryController);


/////////////////////////Routes/////////////////////////
//Login Page --> will need to route user to welcome page
app.get('/', (req,res) => {
  db.User.find({}, (err, allUsers) => {
    console.log(allUsers)
    if (err) return console.log(err)
    res.render('login.ejs', {
        allUsers: allUsers
    })
  })
})

/////////////////// Start the Server ///////////////////
// Start our Server
app.listen(PORT, () => {
    console.log(`Our cool ass journal is running on localhost:${PORT} 🚀`);
    rowdyResults.print()
  })


// Salty Satya Tears