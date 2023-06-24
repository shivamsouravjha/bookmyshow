import express from 'express';
import mongoose from 'mongoose';
require('dotenv').config();
const app = express();
var cors = require('cors')

app.use(express.json());


// // removing the CORS error
app.use(cors())

mongoose
    .connect(
        `mongodb+srv://${process.env.name}:${process.env.password}@cluster0.kzetf.mongodb.net/?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true}

    )
    .then(() => {
        console.log('listening at port', process.env.PORT || 5001)
        app.listen(process.env.PORT || 5001);
    })
    .catch(err => {
        console.log(err);
    });