const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrxnDetails = new Schema({
    reqId: String,      // Request ID
    bId: String,    //Borrowers ID
    lId: String,    // Lenders ID
    amount: String,     //amount paid
    time: String,   //timeStamp of payment
})
module.exports = Transaction = mongoose.model('Trxn', TrxnDetails)