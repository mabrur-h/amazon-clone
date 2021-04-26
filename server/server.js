const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const User = require('./models/UserModel');

dotenv.config();

const app = express();

mongoose.connect(process.env.DATABASE,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
    if ( err ) console.log (err)
    else console.log ('connected to the database')
})

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const productRoutes = require('./routes/ProductRoute');
const categoryRoutes = require('./routes/CategoryRoute');
const ownerRoutes = require('./routes/OwnerRoute');
const authRoutes = require('./routes/AuthRoute');
const reviewRoutes = require('./routes/ReviewRoute');


app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", ownerRoutes);
app.use("/api", authRoutes);
app.use("/api", reviewRoutes);



app.listen(process.env.PORT, (err) => {
    if ( err ) console.log (err);
    else console.log (`
You're working at port ${process.env.PORT}
http://localhost:${process.env.PORT}/
`)
})
