// here is where the user controller will go
const express = require('express');
const router = express.Router();

const db = require('../models/index.js');

//Index Route --> DONEish **needs work
//will we actually have to find by id to make it user specific??
//will eventually get rid of

// router.get ('/', (req, res) => {
//     res.send("Idk man")
//     // db.User.find({}, (err, userInfo) => {
//     //     if (err) return console.log(err)
//     //     res.render('users/userIndex.ejs', {
//         //         userInfo: userInfo
//         //     })
//         // })
//     })

// //New Route --> DONE ...for now?
//     router.get('/new', (req, res) => {
//         res.render('users/userNew.ejs')
//     })
    
// //Create route --> DONEish --> where does this get sent to? 
//     router.post("/", (req, res) => {
//         // console.log(req.body)
//         db.User.create(req.body, (err, createdUser) => {
//             if (err) return console.log(err)
//         })
//         res.redirect('/')
//     })

//Show Route --> DONEish
    router.get('/:userId', (req, res) => {
        console.log(req.session.currentUser.userName)
        let userId = req.params.userId
        db.User.findById(userId, (err, singleUser) => {
            if (err) return console.log(err)
            res.render('users/userShow.ejs', {
                singleUser: singleUser,
                username: req.session.currentUser._id
            })
        })
    })

//takes you to the user profile
    router.get('/profile/:userId', (req, res) => {
        let userId = req.params.userId
        db.User.findById(userId, (err, singleUser) => {
            if (err) return console.log(err)
            res.render('users/userProfile.ejs', {
                singleUser: singleUser
            })
        })
    })

//Edit Route
router.get('/:userId/edit', (req, res) => {
    db.User.findById(req.params.userId, (err, editUser) => {
        if (err) return console.log(err)
        res.render('users/userEdit.ejs', {
            singleUser: editUser
        })
    })
})

//Update Route
router.put('/:userId', (req, res) => {
    db.User.findByIdAndUpdate(req.params.userId, req.body, (err, updatedUser) => {
        // console.log(updatedUser)
        if (err) console.log(err)
        res.redirect(`/user/${req.params.userId}`)
    })
})




//Delete Route

module.exports = router;