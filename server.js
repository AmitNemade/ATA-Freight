const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
const bodyParser = require('body-parser');

const app = express();

const users = require('./routes/api/Users')
const trxn = require('./routes/api/Transactions')
const loanreq = require('./routes/api/LoanRequests')

// BodyParser Middleware
app.use(bodyParser.json());
app.use(cors());
// DB Config
const db = require('./config/keys.js').mongoURI;

// Connect to MOngo
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex',   true);
mongoose.set('useUnifiedTopology', true);

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

app.use('/api/users', users);
app.use('/api/trxns', trxn);
app.use('/api/req', loanreq);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));