//calling express
const express = require('express');
const router = express.Router();

//stimulates mongodb database
const db = require('../models/index.js');

//Index Route --> needs ejs
router.get('/', (req, res) => {
    db.Entry.find({}, (err, allEntry) => {
        if (err) return console.log(err);
        console.log(allEntry)
        res.render('entries/entryIndex.ejs', {
            allEntry: allEntry
        })
    })
})

//New Route --> DONE // needs ejs, form, and send form to create route
router.get('/new', (req, res) => {
    res.render('entries/entryNew.ejs')
})

//Create Route --> DONE
router.post('/', (req, res) => {
  db.Entry.create(req.body, (err, createdEntry) => {
      if (err) return console.log(err)
    //   console.log(createdEntry) --> checking ourselves
      res.redirect('/entry')
  })
})

//Show Route --> needs ejs
router.get('/:entryId', (req, res) => {
    res.render('entries/entryShow.ejs')
})

//Edit Route --> needs ejs, form, and sends form to update route
router.get('/:entryId/edit', (req, res) => {
    res.render('entries/entryEdit.ejs')
})

//Update Route --> updated the db data
//DeleteRoute --> deletes data

module.exports = router;