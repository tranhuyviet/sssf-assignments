'use strict';
require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const rootSchema = require('./graphql/schema');
const rootResolver = require('./graphql/resolvers');

const app = express();

app.use(
    '/graphql',
    graphqlHTTP({
        schema: rootSchema,
        rootValue: rootResolver,
        graphiql: true
    })
);

// server
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.DATABASE_LOCAL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected database');
        app.listen(PORT, () => {
            console.log('Server stated at port:', PORT);
        });
    })
    .catch(err => console.log(err));
