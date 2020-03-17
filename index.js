'use strict';
const express = require('express');
const path = require('path');

const app = express();

//set the pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// serving static
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/catinfo', (req, res) => {
    const cat = {
        name: 'Frank',
        age: 6,
        weight: 5
    };
    res.json(cat);
});

app.get('/', (req, res) => {
    res.status(200).render('index', cat);
});
// start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is starting at port: ${port}`);
});
