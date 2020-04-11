const stationResolver = require('./stationResolver');
const userResolver = require('./userResolver');

const rootResolver = {
    ...stationResolver,
    ...userResolver,
};

module.exports = rootResolver;
