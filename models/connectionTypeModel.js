'use strict';
const mongoose = require('mongoose');

const connectionTypeSchema = mongoose.Schema({
    FormalName: String,
    Title: String
});

const ConnectionType = mongoose.model('ConnectionType', connectionTypeSchema);
module.exports = ConnectionType;
