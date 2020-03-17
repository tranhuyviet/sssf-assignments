'use strict';
const express = require('express');

const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');

const app = express();

// Middlewares
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Home');
});

// Routes
app.use('/cat', catRoute);
app.use('/user', userRoute);

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
