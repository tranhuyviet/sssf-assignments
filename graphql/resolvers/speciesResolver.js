const Species = require('../../models/speciesModel');

module.exports = {
    // select all species
    species: async () => {
        try {
            const species = await Species.find();
            return species;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    // create new species
    createSpecies: async args => {
        const { speciesName, categoryID } = args.speciesInput;
        try {
            const species = await Species.create({
                speciesName,
                category: categoryID
            });

            return species;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};
