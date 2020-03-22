'use strict';
const express = require('express');

const catController = require('../controllers/catController');
const fileUpload = require('../middlewares/file-upload');
const router = express.Router();

router
    .route('/')
    .get(catController.getAllCats)
    .post(fileUpload.single('image'), catController.addCat);

router
    .route('/:catId')
    .get(catController.getCatById)
    .delete(catController.deleteCat)
    .patch(catController.updateCat);

module.exports = router;
