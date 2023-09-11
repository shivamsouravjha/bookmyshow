import express, { response } from 'express';
import mongoose from 'mongoose';
import Routes from './routes/routes'
require('dotenv').config();
const app = express();
var cors = require('cors')
const axios = require('axios');
const { Pool } = require('pg');
const pool = new Pool({
    database: 'postgres',
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5438, // This should match the port you mapped in docker-compose
  });
app.use(express.json());

// // removing the CORS error
app.use(cors())
app.use('/api/movies', Routes.SlotSetterRoute); ///for user commands
app.use('/api/booking', Routes.BookingRoute);  ///for group commands
app.get('/getData', function (req, res) {
    axios.get('https://reqres.in/api/users/2', {
        httpsAgent: new (require('https').Agent)({
          rejectUnauthorized: false
        })
      })
      .then(response => {
        res.send(response.data)
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
});


app.get('/createData', async function (req, res) {
    try {
      const response = await axios.get('https://reqres.in/api/users/2', {
        httpsAgent: new (require('https').Agent)({
          rejectUnauthorized: false
        })
      });
  
      const data = response.data.data;
  
      let query = 'CREATE TABLE IF NOT EXISTS your_table_name (first_name VARCHAR(50), last_name VARCHAR(50) )';
  
      try {
        await pool.query(query);
      } catch (error) {
        console.error('Error creating table:', error);
        return res.status(500).send('Error creating table');
      }
  
    query = 'INSERT INTO your_table_name(first_name, last_name) VALUES($1, $2)';
      const values = [data.first_name, data.last_name];
  
      try {
        await pool.query(query, values);
      } catch (error) {
        console.error('Error inserting data:', error);
        return res.status(500).send('Error inserting data');
      }
  
      res.send('Data Created');
    } catch (error) {
      console.error('Unexpected error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
    
function handleException(error, res) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred' });
}


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

// const base64Data = "BgAAAABdCn0pOwoAACEAAAAAAAAAUF+TBgAAAAAAACS8mRQAAD9VI8f//wAAMQAAAAAAAAAAPJ8GAAAAANQrvAAAAAAAcHirBgA=";
// const binaryData = Buffer.from(base64Data, 'base64');
// const yamlData = jsyaml.safeLoad(binaryData.toString('utf-8'));
// console.log(binaryData.toString('utf-8'));
mongoose.connect('mongodb://localhost:27017/keploy', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000  // timeout after 5 seconds
})
.then(() => {
    console.log('MongoDB Connected');
})
.catch(err => {
    console.log(err);
    mongoose.connection.close(() => {
        console.log('Mongoose connection disconnected due to application termination');
        process.exit(0);
    });
});

app.listen(process.env.PORT || 5002);

module.exports = app;