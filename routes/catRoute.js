'use strict';
const express = require('express');
const catController = require('../controllers/catController');
const router = express.Router();

router
    .route('/')
    .get(catController.getAllCats)
    .post(catController.addCat);

router
    .route('/:catId')
    .get(catController.getCatById)
    .delete(catController.deleteCat)
    .patch(catController.updateCat);

module.exports = router;
