'use strict';
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');

const rootSchema = require('./graphql/schema');
const rootResolver = require('./graphql/resolvers');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    '/graphql',
    graphqlHTTP({
        schema: rootSchema,
        rootValue: rootResolver,
        graphiql: true
    })
);

// connect to db and create the server
const PORT = process.env.PORT || 5000;
(async () => {
    try {
        await mongoose.connect(process.env.DATABASE_LOCAL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        require('./models/connectionModel');
        require('./models/connectionTypeModel');
        require('./models/currentTypeModel');
        require('./models/levelModel');
        require('./models/stationModel');
        console.log('Database connected successfully');
        app.listen(PORT, () => {
            console.log('Server stated at port:', PORT);
        });
    } catch (error) {
        console.error('Database connection failed', error);
    }
})();
