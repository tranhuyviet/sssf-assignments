const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const speciesSchema = mongoose.Schema({
    speciesName: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        autopopulate: true
    }
});

speciesSchema.plugin(autopopulate);

module.exports = mongoose.model('Species', speciesSchema);
