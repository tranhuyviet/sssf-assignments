const Animal = require('../../models/animalModel');

module.exports = {
    // get all animals
    animals: async () => {
        try {
            const animals = await Animal.find();

            if (!animals) {
                throw new Error('Something went wrong');
            }

            return animals;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    // get animal by ID
    animal: async args => {
        try {
            const animalID = args.animalID;
            // console.log(animalID);
            const animal = await Animal.findById(animalID);

            if (!animal) {
                throw new Error('Something went wrong');
            }

            return animal;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    // create new animal
    createAnimal: async args => {
        try {
            const { animalName, speciesID } = args.animalInput;
            const animal = await Animal.create({
                animalName,
                species: speciesID
            });

            if (!animal) {
                throw new Error('Something went wrong');
            }

            return animal;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    // modify animal
    modifyAnimal: async args => {
        try {
            const { animalID, animalName, speciesID } = args.animalModifyInput;

            const animal = await Animal.findByIdAndUpdate(
                animalID,
                {
                    animalName,
                    species: speciesID
                },
                {
                    new: true
                }
            );

            if (!animal) {
                throw new Error('Something went wrong');
            }
            console.log(animal);
            return animal;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};
