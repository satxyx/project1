//calling express
const express = require('express');
const router = express.Router();

//stimulates mongodb database
const db = require('../models/index.js');

//Index Route --> DONE //needs ejs --> think ahead: only for a particular user
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

//Show Route --> DONE  //needs ejs
router.get('/:entryId', (req, res) => {
    db.Entry.findById(req.params.entryId, (err, singleEntry) => {
        if (err) return console.log(err);
        res.render('entries/entryShow.ejs', {
            singleEntry: singleEntry
        })
    })
})

//Edit Route --> DONE //needs ejs, form, and sends form to update route
router.get('/:entryId/edit', (req, res) => {
    entryId = req.params.entryId
    db.Entry.findById(entryId, (err, foundEntry) => {
        if (err) return console.log(err);
        res.render('entries/entryEdit.ejs', {
            oneEntry: foundEntry
        })
    })
})

//Update Route --> DONE //updated the db data
router.put('/:entryId', (req,res) => {
   db.Entry.findByIdAndUpdate(req.params.entryId, req.body, (err, foundEntry) => {
       if (err) return console.log(err)
       res.redirect(`/entry/${req.params.entryId}`)
   })
})


//DeleteRoute --> DONE //deletes data
router.delete('/:entryId', (req, res) => {
    const entryId = req.params.entryId;
    db.Entry.findByIdAndDelete(entryId, (err) => {
        if (err) return console.log(err)
        res.redirect('/entry');
    })
})

module.exports = router;