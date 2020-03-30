const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const animalSchema = mongoose.Schema({
    animalName: {
        type: String,
        required: true
    },
    species: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Species',
        autopopulate: true
    }
});

animalSchema.plugin(autopopulate);

module.exports = mongoose.model('Animal', animalSchema);
