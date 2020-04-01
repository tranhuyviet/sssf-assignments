'use strict';
const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

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
            required: true,
            autopopulate: true
        }
    ],
    Location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // first is longitude, second is latitude
            required: true
        }
    }
});

stationSchema.plugin(autopopulate);

const Station = mongoose.model('Station', stationSchema);

module.exports = Station;
