// here is where the user controller will go
const express = require('express');
const router = express.Router();

const db = require('../models/index.js');

//Index Route --> DONEish **needs work
router.get ('/', (req, res) => {
    db.User.find({}, (err, userInfo) => {
        if (err) return console.log(err)
        res.render('users/userIndex.ejs', {
            userInfo: userInfo
        })
    })
})

//New Route --> DONE
router.get('/new', (req, res) => {
    res.render('users/userNew.ejs')
})

//Create route --> DONEish --> where does this get sent to? 
router.post("/", (req, res) => {
    console.log(req.body)
    db.User.create(req.body, (err, createdUser) => {
        if (err) return console.log(err)
        res.redirect('/')
    })
})

//Show Route
router.get('/:userId', (req, res) => {
    let userId = req.params.userId
    db.User.findById(userId, (err, singleUser) => {
        if (err) return console.log(err)
        res.render('users/userShow.ejs', {
            singleUser: singleUser
        })
    })
})

//Edit Route
router.get('/:userId/edit', (req, res) => {
    res.send("edit me")
})

//Update Route

//Delete Route

module.exports = router;