'use strict';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/userModel');

// serialize: store user id in session
passport.serializeUser((id, done) => {
    done(null, id);
});

// deserialize: get user id from session and get all user data
passport.deserializeUser(async (id, done) => {
    const user = User.getUser('id', id);

    if (user) {
        done(null, user);
    }
});

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email'
        },
        async (email, password, done) => {
            try {
                // find the user by email
                const user = await User.getUser('email', email);

                // if not found the user
                if (!user) {
                    return done(null, false);
                }

                // if found the user, check password is correct to login
                const isCorrectPassword = await User.isValidPassword(user, password);

                // if password is not correct
                if (!isCorrectPassword) {
                    return done(null, false);
                }

                // if everything ok (email and password are correct)
                done(null, user);
            } catch (error) {
                done(error, false);
            }
        }
    )
);
