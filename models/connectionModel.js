'use strict';
const mongoose = require('mongoose');

const connectionSchema = mongoose.Schema({
    ConnectionTypeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ConnectionType'
    },
    LevelID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Level'
    },
    CurrentTypeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CurrentType'
    },
    Quantity: Number
});

// connectionSchema.pre(/^find/, function(next) {
//     this.populate({
//         path: 'ConnectionTypeId',
//         select: 'FormalName'
//     });
//     next();
// });

const Connection = mongoose.model('Connection', connectionSchema);

module.exports = Connection;
