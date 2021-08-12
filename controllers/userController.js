// here is where the user controller will go
const express = require('express');
const router = express.Router();

const db = require('../models/index.js');

//Index Route
router.get ('/', (req, res) => {
    db.User.find({}, (err, userInfo) => {
        if (err) return console.log(err)
        res.render('users/userIndex-WelcomePage.ejs', {
            userInfo: userInfo
        })
    })
})
//New Route
router.get('/new', (req, res) => {
    res.render('users/userNew-SignUpPage.ejs')
})
//Create route
router.post("/", (req, res) => {
    console.log(req.body)
    db.User.create(req.body, (err, createdUser) => {
        if (err) return console.log(err)
        res.redirect('/')
    })
})


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