'use strict';
const mongoose = require('mongoose');

const currentTypeSchema = mongoose.Schema({
    Description: String,
    Title: String
});

const CurrentType = mongoose.model('CurrentType', currentTypeSchema);
module.exports = CurrentType;
