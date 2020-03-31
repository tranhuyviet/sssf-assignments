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

    type User {
        _id: ID!
        email: String!
        password: String
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

    input UserInput {
        email: String!
        password: String!
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
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
