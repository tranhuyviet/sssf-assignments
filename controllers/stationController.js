'use strict';
const Station = require('../models/stationModel');
const Connection = require('../models/connectionModel');
const rectangleBounds = require('../utils/rectangleBounds');

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
        const topRight = req.query.topRight;
        const bottomLeft = req.query.bottomLeft;

        let query = {};

        if (topRight && bottomLeft) {
            const mapBounds = rectangleBounds(JSON.parse(topRight), JSON.parse(bottomLeft));

            query = {
                Location: {
                    $geoWithin: {
                        $geometry: mapBounds
                    }
                }
            };
        }

        const stations = await Station.find(query)
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
