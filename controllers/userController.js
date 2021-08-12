// here is where the user controller will go
const express = require('express');
const router = express.Router();

const db = require('../models/index.js');

//Index Route
router.get ('/', (req, res) => {
    res.send("you found me")
})
//New Route
router.get('/new', (req, res) => {
    res.send("you made it to create")
})
//Create route

//Show Route
router.get('/:userId', (req, res) => {
    res.send("See a single one of me")
})

//Edit Route
router.get('/:userId/edit', (req, res) => {
    res.send("edit me")
})

//Update Route

//Delete Route

module.exports = router;