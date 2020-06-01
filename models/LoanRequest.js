const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReqDetails = new Schema({
    bId: String,    //borrowers ID
    lId: String,     //Lenders ID
    amount: String,
    time: String,   //Timestamp of generation of request
    duration: String,
    eRate: String,  //expected Rate
    status: String
})

module.exports = LoanRequest = mongoose.model('LoanReq', ReqDetails)