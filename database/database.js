'use strict';
const mongoose = require('mongoose');

// Connect to database
(async () => {
    try {
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Connection to database failed', error);
    }
})();

module.exports = mongoose.connection;
