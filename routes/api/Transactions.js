const express = require('express');
const router = express.Router();

// User Model
const Trxn = require("../../models/Transaction");

//  {
//     "_id":"5ec148e29b94c6113082c093",
//     "fname":"Amit",
//     "lname":"Nemade",
//     "email":"amitnemade34@gmail.com",
//     "phone":"7972852145",
//     "uidai":"788945623252",
//     "__v":0
// }

// GET All Transaction By lenderUser
router.get("/lender/:id", (req,res) => {
    Trxn.find({ lId: { $eq:req.params.id}})
        .then(trxns => res.json(trxns))
        .catch(err => res.status(404).json(err))
})

// GET All Transaction By Borrower User
router.get("/borrower/:id", (req,res) => {
    Trxn.find({ bId: { $eq:req.params.id}})
        .then(trxns => res.json(trxns))
        .catch(err => res.status(404).json(err))
})
// GET All Transaction By All User
router.get("/", (req,res) => {
    Trxn.find()
        .then(trxns => res.json(trxns))
        .catch(err => res.status(404).json(err))
})

// GET All Transaction By and To particular User
router.get("/all/:id", (req,res) => {
    Trxn.find({ $or:[{lId: {$eq : req.params.id}}, {bId: { $eq: req.params.id}}]})
        .then(trxns => res.json(trxns))
        .catch(err => res.status(404).json(err))
})

// CREATE New Transaction 
router.post('/new/', (req, res) => {
    const newTrxn = new Trxn({
        reqId: req.body.reqId,      // Request ID
        bId: req.body.bId,    //Borrowers ID
        lId: req.body.lId,    // Lenders ID
        amount: req.body.amount,     //amount paid
        time: req.body.time, 
    });

    newTrxn.save().then(trxn => res.json(trxn));
})

module.exports = router





