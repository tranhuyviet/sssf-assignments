'use strict';
const express = require('express');
const router = express.Router();

const stationController = require('../controllers/stationController');

router
    .route('/:id')
    .get(stationController.getStationById)
    .patch(stationController.updateStation)
    .delete(stationController.deleteStation);
router
    .route('/')
    .get(stationController.getAllStations)
    .post(stationController.addNewStation);

module.exports = router;
