const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Station {
        _id: ID!
        Title: String
        AddressLine1: String
        Town: String
        StateOrProvince: String
        Postcode: String
        Connections: [Connection]
        Location: Location
    }

    type Location {
        type: String
        coordinates: [Float]
    }

    type Connection {
        _id: ID!
        ConnectionTypeID: ConnectionType,
        LevelID: Level,
        CurrentTypeID: CurrentType
        Quantity: Int
    }

    type ConnectionType {
        _id: ID!
        FormalName: String,
        Title: String
    }

    type Level {
        _id: ID!
        Comments: String,
        IsFastChargeCapable: Boolean
        Title: String
    }

    type CurrentType {
        _id: ID!
        Description: String
        Title: String
    }

    input TopRight {
        lat: Float,
        lng: Float
    }

    input BottomLeft {
        lat: Float,
        lng: Float
    }

    input ConnectionsInput {
        _id: [ID!]
    }

    input CoordinatesInput {
        lng: Float
        lat: Float
    }

    input LocationInput {
        type: String
        lng: Float
        lat: Float
    }

    
    type RootQuery {
        stations(limit: Int, topRight: TopRight, bottomLeft: BottomLeft): [Station]
        station(stationId: ID!): Station
    }

    type RootMutation {
        createStation(Title: String, AddressLine1: String, Town: String, StateOrProvince: String, Postcode: String, Connections: ConnectionsInput, Location: LocationInput): Station
        
        modifyStation(stationId: ID!, Title: String, AddressLine1: String, Town: String, StateOrProvince: String, Postcode: String, Connections: ConnectionsInput, Location: LocationInput): Station

        deleteStation(stationId: ID!): String
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

// type Locations {
//         type: LocationType = Point,
//         coordinates: [Float]
//     }

//     enum LocationType {
//         Point
//     }
