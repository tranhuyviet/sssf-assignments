const express = require('express');
const passport = require('passport');
require('../utils/pass');

const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').post(passport.authenticate('local', { session: false }), authController.login);

module.exports = router;
