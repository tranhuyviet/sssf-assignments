'use strict';
const mongoose = require('mongoose');

const levelSchema = mongoose.Schema({
    Comments: String,
    IsFastChargeCapable: Boolean,
    Title: String
});

const Level = mongoose.model('Level', levelSchema);
module.exports = Level;
