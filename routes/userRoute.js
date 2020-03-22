'use strict';
const express = require('express');

const userController = require('../controllers/userController');
const router = express.Router();

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.addUser);

router
    .route('/:userId')
    .get(userController.getUserById)
    .delete(userController.deleteUser)
    .patch(userController.updateUser);

module.exports = router;
