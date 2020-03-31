'use strict';
require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const passport = require('passport');
require('./passport/passport');

const rootSchema = require('./graphql/schema');
const rootResolver = require('./graphql/resolvers');
const authRoute = require('./routes/authRoute');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const checkAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            req.isAuth = false;
        } else {
            req.isAuth = true;
        }
        next();
    })(req, res);
};

// Routes
app.use('/auth', authRoute);

app.use(
    '/graphql',
    checkAuth,
    graphqlHTTP({
        schema: rootSchema,
        rootValue: rootResolver,
        graphiql: true
    })
);

// server
const PORT = process.env.PORT || 5000;
(async () => {
    try {
        await mongoose.connect(process.env.DATABASE_LOCAL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log('Database connected successfully');
        app.listen(PORT, () => {
            console.log('Server stated at port:', PORT);
        });
    } catch (error) {
        console.error('Database connection failed', error);
    }
})();
