'use strict';
require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const passport = require('passport');
require('./passport/passport');

const rootSchema = require('./graphql/schema');
const rootResolver = require('./graphql/resolvers');
const authRoute = require('./routes/authRoute');

const helmet = require('helmet');
const cors = require('cors');

const app = express();

// Middlewares

app.use(helmet());
app.use(cors());
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
app.get('/', (req, res) => {
    let message;
    if (req.secure) {
        console.log('Someone visit with secure https');
        message = 'Welcome to secure https';
    } else {
        console.log('Someone visit with nomal http');
        message = 'Welcome to nomal http';
    }
    res.send(message);
});

app.use('/auth', authRoute);

app.use(
    '/graphql',
    checkAuth,
    graphqlHTTP({
        schema: rootSchema,
        rootValue: rootResolver,
        graphiql: true,
    })
);

// connect to db and create the server
const PORT_HTTP = process.env.PORT_HTTP || 5000;
const PORT_HTTPS = process.env.PORT_HTTPS || 8000;
(async () => {
    try {
        await mongoose.connect(process.env.DATABASE_LOCAL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        require('./models/connectionModel');
        require('./models/connectionTypeModel');
        require('./models/currentTypeModel');
        require('./models/levelModel');
        require('./models/stationModel');
        console.log('Database connected successfully');
        /*
        // http
        http.createServer((req, res) => {
            res.writeHead(301, { Location: `https://localhost:${PORT_HTTPS}${req.url}` });
            res.end();
        }).listen(PORT, () => {
            console.log('Server started at port:', PORT);
        });

        // https
        https.createServer(options, app).listen(PORT_HTTPS, () => {
            console.log('Secure server started at port:', PORT_HTTPS);
        });
        */
        process.env.NODE_ENV = process.env.NODE_ENV || 'development';
        if (process.env.NODE_ENV === 'production') {
            require('./production')(app, process.env.PORT);
        } else {
            require('./localhost')(app, PORT_HTTPS, PORT_HTTP);
        }
    } catch (error) {
        console.error('Database connection failed', error);
    }
})();
