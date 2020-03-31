const categoryResolver = require('./categoryResolver');
const speciesResolver = require('./speciesResolver');
const animalResolver = require('./animalResolver');
const userResolver = require('./userResolver');

const rootResolver = {
    ...categoryResolver,
    ...speciesResolver,
    ...animalResolver,
    ...userResolver
};

module.exports = rootResolver;
