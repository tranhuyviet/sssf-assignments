'use strict';
const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const connectionSchema = mongoose.Schema({
    ConnectionTypeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ConnectionType',
        autopopulate: true
    },
    LevelID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Level',
        autopopulate: true
    },
    CurrentTypeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CurrentType',
        autopopulate: true
    },
    Quantity: Number
});

connectionSchema.plugin(autopopulate);

const Connection = mongoose.model('Connection', connectionSchema);

module.exports = Connection;
