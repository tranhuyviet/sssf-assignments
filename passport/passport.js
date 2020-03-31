'use strict';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const User = require('../models/userModel');

// serialize: store user id in session
passport.serializeUser((id, done) => {
    done(null, id);
});

// deserialize: get user id from session and get all user data
passport.deserializeUser(async (id, done) => {
    // const user = User.getUser('id', id);
    const user = User.findById(id);

    if (user) {
        done(null, user);
    }
});

// LOCAL STRATEGY
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email'
        },
        async (email, password, done) => {
            try {
                // find the user by email
                // const user = await User.getUser('email', email);

                const user = await User.findOne({ email });

                // if not found the user
                if (!user) {
                    return done(null, false);
                }

                // if found the user, check password is correct to login
                const isCorrectPassword = await user.isValidPassword(password);

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

// JSON WEB TOKEN STRATEGY
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        },
        async (payload, done) => {
            try {
                // payload is in authController
                // {
                //     iss: 'VietTran',
                //     sub: user.id,
                //     iat: new Date().getTime(), // current time
                //     exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
                // }

                const user = await User.findById(payload.sub);

                // if user does not exists
                if (!user) {
                    return done(null, false);
                }

                // everything ok
                done(null, user);
            } catch (error) {
                done(error, false);
            }
        }
    )
);
