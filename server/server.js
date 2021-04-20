const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const User = require('./models/UserModel')

dotenv.config();

const app = express();

mongoose.connect(process.env.DATABASE,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
    if ( err ) console.log (err)
    else console.log ('connected to the database')
})

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// retrieve data from the server
app.get('/', (req, res) => {
    res.json('Hello !');
})


// send data from frontend to backend
app.post('/', (req, res) => {
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save((err) => {
        if (err) res.json (err)
        else res.json('successfully saved')
    })
})


app.listen(process.env.PORT, (err) => {
    if ( err ) console.log (err);
    else console.log (`
You're working at port ${process.env.PORT}
http://localhost:3000/
`)
})
