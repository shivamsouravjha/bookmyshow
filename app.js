import express from 'express';
import mongoose from 'mongoose';
import Routes from './routes/routes'
require('dotenv').config();
const app = express();
var cors = require('cors')

app.use(express.json());

// // removing the CORS error
app.use(cors())
app.use('/api/movies', Routes.SlotSetterRoute); ///for user commands
app.use('/api/booking', Routes.BookingRoute);  ///for group commands

app.use((req, res, next) => {
    const error = new Error('Could not find this route.', 404);       ///Incase of not having a route
    throw error;
});

app.use((error, req, res, next) => {          //special 4 term function that lets know error to consider it as error
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({ message: error.message || 'An unknown error occurred!', success: error.success || false });
});

mongoose
    .connect(
        `mongodb+srv://${process.env.name}:${process.env.password}@cluster0.kzetf.mongodb.net/?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true }

    )
    .then(() => {
        console.log('listening at port', process.env.PORT || 5001)
        app.listen(process.env.PORT || 5001);
    })
    .catch(err => {
        console.log(err);
    });