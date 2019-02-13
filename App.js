const express = require('express');
const app = express();
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');
const routes = require('./routes');
const mongoose = require('mongoose');
const { uri } = require('./config/db');

//Development process environment config
require('dotenv').config();

//Database connection
mongoose.connect(uri, { useNewUrlParser: true });
const conn = mongoose.connection;
conn.on('err', (err) => {
    console.error(`There was some error ${err}`);
});
conn.once('open', () => {
    console.log(`Database connected successfully`); 
});

//Get request data
app.use(bodyParser.json());

//Error handler
app.use(errorHandler());

//Handle all the api routes
app.use('/api', routes);

//Handle 404 pages
app.all('*', (req, res) => {
    return res.status(400).send({
        Success: false,
        Message: 'Error route not found'
    });
});

//Start the app
app.listen(process.env.PORT, () => {
    console.log(`Instagram clone is running on port http://localhost:${process.env.PORT}`);
});