const express = require('express');
const router = express.Router();

// User Model
const LoanReq = require("../../models/LoanRequest");

//  {
    // bId: String,    //borrowers ID
    // amount: String,
    // time: String,   //Timestamp of generation of request
    // duration: String,
    // eRate: String,  //expected Rate
    // status: String
// }

// GET All Request By particular Borrower
router.get('/id/:id', (req,res) => {
    LoanReq.find({ bId: { $eq:req.params.id}})
        .then((loanreqs) => res.json(loanreqs))
        .catch(err => res.status(404).json({success:false}))
})

// GET All Request
router.get('/all/', (req,res) => {
    LoanReq.find()
        .then((loanreqs) => res.json(loanreqs))
        .catch(err => res.status(404).json({success:false}))
})

// CREATE Request 
router.post('/new/', (req, res) => {
    const newReq = new LoanReq({
        bId: req.body.bid,    //borrowers ID
        lId: req.body.lid,    //lenders ID
        amount: req.body.amount,
        time: req.body.time,   //Timestamp of generation of request
        duration: req.body.duration,
        eRate: req.body.eRate,  //expected Rate
        status: req.body.status
    });

    newReq.save().then(user => res.json(user));
})

// UPDATE Request 
router.post('/update', (req, res) => {
    LoanReq.findById(req.body.reqId, function(err, loanreq) {
        if(!loanreq)
            res.status(404).send("data is not found");
        else{
            loanreq.bId = req.body.bid,    //borrowers ID
            loanreq.lId = req.body.lid,    //lenders ID
            loanreq.amount = req.body.amount,
            loanreq.time = req.body.time,   //Timestamp of generation of request
            loanreq.duration = req.body.duration,
            loanreq.eRate = req.body.eRate,  //expected Rate
            loanreq.status = req.body.status   

            loanreq.save().then(user => {
                res.json(user);
            })
            .catch(err => {
                res.status(400).send("unable to update the database");
            });
        }
    });
})

// DELETE Particular Request
router.delete('/:id', (req, res) => {
    LoanReq.findById(req.params.id)
        .then(loanreq => loanreq.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success:false}))
})

module.exports = router





