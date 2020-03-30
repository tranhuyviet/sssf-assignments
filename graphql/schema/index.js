const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    type Animal {
        _id: ID!
        animalName: String!
        species: Species!
    }

    type Species {
        _id: ID!
        speciesName: String!
        category: Category!
    }

    type Category {
        _id: ID!
        categoryName: String!
    }

    input SpeciesInput {
        speciesName: String!
        categoryID: ID!
    }

    input AnimalInput {
        animalName: String!
        speciesID: ID!
    }

    input AnimalModifyInput {
        animalID: ID!
        animalName: String
        speciesID: ID
    }

    type RootQuery {
        animals: [Animal!]
        animal(animalID: ID!): Animal!
        categories: [Category!]
        species: [Species!]
    }

    type RootMutation {
        createCategory(categoryName: String!): Category
        createSpecies(speciesInput: SpeciesInput): Species
        createAnimal(animalInput: AnimalInput): Animal
        modifyAnimal(animalModifyInput: AnimalModifyInput): Animal
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
