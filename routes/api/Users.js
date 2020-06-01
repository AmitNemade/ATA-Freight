const express = require('express');
const router = express.Router();

// User Model
const User = require("../../models/User");

//  {
//     "_id":"5ec148e29b94c6113082c093",
//     "fname":"Amit",
//     "lname":"Nemade",
//     "email":"amitnemade34@gmail.com",
//     "phone":"7972852145",
//     "uidai":"788945623252",
//     "__v":0
// }

// GET All users
router.get("/", (req,res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => {
            res.json(err)
            console.log(err)
        })
})

// GET USER By id
router.get("/id/:id", (req,res) => {
    User.findById(req.params.id)
        .then(users => res.json(users))
})

// GET USER By Login Details
router.post("/login/", (req,res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
          status: 'error',
          error: 'req body cannot be empty',
        });
    }
    console.log(req.body)
    User.find({ $and: [ { email: { $eq: req.body.email }}, { password: { $eq: req.body.password } } ] })
        .then(users => {
            console.log(res.json(users))
            res.json(users)
        })
        .catch(err => res.json(err))
})

// CREATE USER SignUp
router.post("/new/", (req, res) => {
    console.log('Reached /new/ with body as: ',req.body, req.params)
//     // email: ""
// fname: ""
// lname: ""
// password: ""
// phone: ""
// uidai: ""
    const newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        uidai: req.body.uidai,
    });

    newUser.save().then(user => {
        console.log(res.json(user))
        res.json(user)
    });
})

module.exports = router





