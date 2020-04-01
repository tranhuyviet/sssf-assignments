const Station = require('../../models/stationModel');
const rectangleBounds = require('../../utils/rectangleBounds');

const refactorLocationAndConnections = args => {
    const Location = {
        type: 'Point',
        coordinates: [args.Location.lng, args.Location.lat]
    };

    let Connections = [];
    if (args.Connections._id.length > 0) {
        Connections = args.Connections._id.map(con => {
            return {
                _id: con
            };
        });
    }

    return { ...args, Connections, Location };
};

module.exports = {
    // get all stations
    stations: async args => {
        try {
            const limit = args.limit ? args.limit * 1 : 10;
            const topRight = args.topRight;
            const bottomLeft = args.bottomLeft;

            let query = {};
            // console.log(topRight, bottomLeft);
            if (topRight && bottomLeft) {
                const mapBounds = rectangleBounds(topRight, bottomLeft);

                query = {
                    Location: {
                        $geoWithin: {
                            $geometry: mapBounds
                        }
                    }
                };
            }
            const stations = await Station.find(query).limit(limit);

            if (!stations) {
                throw new Error('Something went wrong');
            }

            return stations;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    // get one station by id
    station: async args => {
        try {
            const station = await Station.findById(args.stationId);

            if (!station) {
                throw new Error('Something went wrong');
            }

            return station;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    // add new station
    createStation: async args => {
        try {
            const station = await Station.create(refactorLocationAndConnections(args));

            if (!station) {
                throw new Error('Something went wrong');
            }

            return station;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    // modify station
    modifyStation: async args => {
        try {
            const station = await Station.findByIdAndUpdate(
                args.stationId,
                refactorLocationAndConnections(args),
                { new: true }
            );

            if (!station) {
                throw new Error('Something went wrong');
            }

            return station;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    // delete station
    deleteStation: async args => {
        try {
            const station = await Station.findByIdAndDelete(args.stationId);
            // console.log(station);
            if (!station) {
                throw new Error('Something went wrong');
            }

            return `Delete station id: ${station._id} success`;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};
