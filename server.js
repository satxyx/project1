/////////////////// Require Statements /////////////////
const express = require('express');
const methodOverride = require('method-override');
const rowdy = require('rowdy-logger')
const authorsController = require('./controllers/authorsController.js');
const articlesController = require('./controllers/articlesController.js')

/////////////////// Configuration //////////////////////
const app = express();
const PORT = 4000;
const rowdyResults = rowdy.begin(app)
app.set('view engine', 'ejs');

/////////////////// Start the Server ///////////////////
// Start our Server
app.listen(PORT, () => {
    console.log(`Your server is running on localhost:${PORT} 🚀`);
    rowdyResults.print()
  })