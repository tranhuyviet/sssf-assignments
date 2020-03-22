'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./utils/pass');
const passportJWT = passport.authenticate('jwt', { session: false });
// const dotenv = require('dotenv');
// dotenv.config();

const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('Home');
});

app.use('/cat', passportJWT, catRoute);
app.use('/user', passportJWT, userRoute);
app.use('/auth', authRoute);

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
