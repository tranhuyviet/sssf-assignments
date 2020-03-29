'use strict';
const Station = require('../models/stationModel');
const Connection = require('../models/connectionModel');
// const ConnectionType = require('../models/connectionTypeModel');

exports.getStationById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const station = await Station.findById(id).populate({
            path: 'Connections',
            model: 'Connection',
            populate: [
                {
                    path: 'ConnectionTypeID',
                    model: 'ConnectionType'
                },
                {
                    path: 'LevelID',
                    model: 'Level'
                },
                {
                    path: 'CurrentTypeID',
                    model: 'CurrentType'
                }
            ]
        });

        if (!station) {
            throw new Error('Can not find the station for provided ID');
        }

        res.status(200).json({
            status: 'success',
            data: station
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

exports.getAllStations = async (req, res, next) => {
    try {
        const limit = req.query.limit ? req.query.limit * 1 : 10;
        const start = req.query.start ? req.query.start * 1 : 0;
        let topRight = req.query.topRight ? req.query.topRight : null;
        let bottomLeft = req.query.bottomLeft ? req.query.bottomLeft : null;

        let coordinates = [];
        if (topRight || bottomLeft) {
            topRight = JSON.parse(topRight);
            bottomLeft = JSON.parse(bottomLeft);
            console.log(topRight, bottomLeft);

            coordinates = [
                [topRight.lng, topRight.lat],
                [bottomLeft.lng, bottomLeft.lat]
            ];
        }

        console.log(coordinates); // [ [ 25.036108, 60.2821946 ], [ 24.7816538, 60.1552076 ] ]

        const stations = await Station.find()
            .populate({
                path: 'Connections',
                model: 'Connection',
                populate: [
                    {
                        path: 'ConnectionTypeID',
                        model: 'ConnectionType'
                    },
                    {
                        path: 'LevelID',
                        model: 'Level'
                    },
                    {
                        path: 'CurrentTypeID',
                        model: 'CurrentType'
                    }
                ]
            })
            .skip(start)
            .limit(limit);

        if (!stations) {
            throw new Error('Get all stations failed');
        }

        res.status(200).json({
            status: 'success',
            results: stations.length,
            data: stations
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

exports.addNewStation = async (req, res, next) => {
    try {
        const station = await Station.create(req.body);

        res.status(201).json({
            status: 'success',
            data: station
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

exports.updateStation = async (req, res, next) => {
    try {
        const station = await Station.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });

        if (!station) {
            throw new Error('Update station failed for provided ID');
        }

        res.status(200).json({
            status: 'success',
            data: station
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

exports.deleteStation = async (req, res, next) => {
    try {
        const station = await Station.findByIdAndDelete(req.params.id);

        if (!station) {
            throw new Error('Delete station failed for provided ID');
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};
