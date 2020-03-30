const categoryResolver = require('./categoryResolver');
const speciesResolver = require('./speciesResolver');
const animalResolver = require('./animalResolver');

const rootResolver = {
    ...categoryResolver,
    ...speciesResolver,
    ...animalResolver
};

module.exports = rootResolver;
