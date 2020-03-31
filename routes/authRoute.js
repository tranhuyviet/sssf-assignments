const express = require('express');
const passport = require('passport');

const authController = require('../controllers/authController');

const router = express.Router();

router
    .route('/login')
    .post(passport.authenticate('local', { session: false }), authController.login);

module.exports = router;
