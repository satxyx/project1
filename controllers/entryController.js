const express = require('express');
const router = express.Router();

//stimulates mongodb database
const db = require('../models/index.js');

//Index Route --> DONE
router.get('/', (req, res) => {
    db.Entry.find({ user: req.session.currentUser._id }, (err, allEntry) => {
        if (err) return console.log(err);
        // console.log(allEntry)
        res.render('entries/entryIndex.ejs', {
            allEntry: allEntry,
            singleUser: req.session.currentUser._id
        })
    })
})

//New Route --> DONE 
router.get('/new', (req, res) => {
    res.render('entries/entryNew.ejs')
})

//Create Route --> DONE
router.post('/', (req, res) => {
    console.log(req.session);
    req.body.user = req.session.currentUser._id;
    db.Entry.create(req.body, (err, createdEntry) => {
        if (err) return console.log(err);
        res.redirect('/entry')
  })
})

//Show Route --> DONE 
router.get('/:entryId', (req, res) => {
    db.Entry.findById(req.params.entryId, (err, singleEntry) => {
        if (err) return console.log(err);
        res.render('entries/entryShow.ejs', {
            singleEntry: singleEntry
        })
    })
})

//Edit Route --> DONE 
router.get('/:entryId/edit', (req, res) => {
    entryId = req.params.entryId
    db.Entry.findById(entryId, (err, foundEntry) => {
        if (err) return console.log(err);
        res.render('entries/entryEdit.ejs', {
            oneEntry: foundEntry
        })
    })
})

//Update Route --> DONE 
router.put('/:entryId', (req,res) => {
   db.Entry.findByIdAndUpdate(req.params.entryId, req.body, (err, foundEntry) => {
       if (err) return console.log(err)
       res.redirect(`/entry/${req.params.entryId}`)
   })
})


//DeleteRoute --> DONE 
router.delete('/:entryId', (req, res) => {
    const entryId = req.params.entryId;
    db.Entry.findByIdAndDelete(entryId, (err) => {
        if (err) return console.log(err)
        res.redirect('/entry');
    })
})

module.exports = router;