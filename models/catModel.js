'use strict';
const mongoose = require('mongoose');

const catSchema = mongoose.Schema({
    name: String,
    age: {
        type: Number,
        min: [0, 'Age must be above 0']
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: 'Gender is either: male or female'
        }
    },
    color: String,
    weight: {
        type: Number,
        min: [0, 'Weight must be above 0']
    }
});

const Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;

// const cats = [
//     {
//         id: '1',
//         name: 'Frank',
//         age: '6',
//         weight: '5',
//         owner: '1',
//         filename: 'http://placekitten.com/400/300'
//     },
//     {
//         id: '2',
//         name: 'James',
//         age: '4',
//         weight: '11',
//         owner: '2',
//         filename: 'http://placekitten.com/400/302'
//     }
// ];

// module.exports = {
//     cats
// };
