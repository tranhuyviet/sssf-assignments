'use strict';
const mongoose = require('mongoose');

const stationSchema = mongoose.Schema({
    Title: String,
    AddressLine1: String,
    Town: String,
    StateOrProvince: String,
    Postcode: String,
    Connections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Connection',
            required: true
        }
    ],
    Location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number], // first is longitude, second is latitude
            required: true
        }
    }
});

const Station = mongoose.model('Station', stationSchema);

module.exports = Station;
