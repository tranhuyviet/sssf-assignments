'use strict';
const Cat = require('../models/catModel');

exports.getAllCats = async (req, res, next) => {
    try {
        console.log(req.query);
        // GET /cats?gender=male&weight=10&age=11
        // will return
        // gender: 'male'
        // weight: {$gt: 10}
        // age: {$lt: 11}
        const gender = req.query.gender ? { gender: req.query.gender } : null;
        const weight = req.query.weight ? { weight: { $gt: req.query.weight * 1 } } : null;
        const age = req.query.age ? { age: { $lt: req.query.age * 1 } } : null;

        const query = { ...gender, ...weight, ...age };

        // console.log(query);

        const cats = await Cat.find(query);
        res.json({ status: 'success', data: cats });
    } catch (error) {
        console.log(error);
    }
};

exports.getCatById = async (req, res, next) => {
    try {
        const id = req.params.catId;
        const cat = await Cat.findById(id);
        if (cat) {
            res.json({ status: 'success', data: cat });
        } else {
            res.status(404).json({ status: 'failed', message: 'Cat not found on provided id' });
        }
    } catch (error) {
        console.log(error);
    }
};

exports.addCat = async (req, res, next) => {
    try {
        const cat = await Cat.create(req.body);

        res.status(201).json({ status: 'success', data: cat });
    } catch (error) {
        console.log(error);
    }
};

exports.deleteCat = async (req, res, next) => {
    try {
        const id = req.params.catId;
        await Cat.findByIdAndDelete(id);

        res.json({ status: 'deleted success' });
    } catch (error) {
        console.log(error);
    }
};

exports.updateCat = async (req, res, next) => {
    try {
        const id = req.params.catId;

        const updatedCat = await Cat.findByIdAndUpdate(id, req.body, { new: true });

        res.json({
            status: 'updated success',
            updatedCat
        });
    } catch (error) {
        console.log(error);
    }
};
