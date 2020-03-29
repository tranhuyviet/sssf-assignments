'use strict';
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const stationRoute = require('./routes/stationRoute');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/station', stationRoute);

// connect to db and create the server
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.DATABASE_LOCAL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => {
        require('./models/levelModel');
        require('./models/currentTypeModel');
        require('./models/connectionTypeModel');
        require('./models/connectionModel');
        require('./models/stationModel');
        console.log('Connected to database');
        app.listen(PORT, () => {
            console.log('Server is started at port:', PORT);
        });
    })
    .catch(error => console.log(error));
