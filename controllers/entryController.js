//calling express
const express = require('express');
const router = express.Router();

//stimulates mongodb database
const db = require('../models/index.js');

//Index Route --> needs ejs
router.get('/', (req, res) => {
    res.render('entries/entryIndex.ejs')
})

//New Route --> needs ejs, form, and send form to create route
router.get('/new', (req, res) => {
    res.render('entries/entryNew.ejs')
})

//Show Route --> needs ejs
router.get('/:entryId', (req, res) => {
    res.render('entries/entryShow.ejs')
})

//Create Route

//Edit Route --> needs ejs, form, and sends form to update route
router.get('/:entryId/edit', (req, res) => {
    res.render('entries/entryEdit.ejs')
})

//Update Route --> updated the db data
//DeleteRoute --> deletes data

module.exports = router;