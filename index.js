const express = require('express');

const app = express();

app.get('/catinfo', (req, res) => {
    const cat = {
        name: 'Frank',
        age: 6,
        weight: 5
    };
    res.json(cat);
});

// start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is starting at port: ${port}`);
});
