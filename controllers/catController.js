'use strict';
const Cat = require('../models/catModel');

exports.getAllCats = async (req, res, next) => {
    try {
        const cats = await Cat;
        res.json({ status: 'success', data: cats });
    } catch (error) {
        console.log(error);
    }
};

exports.getCatById = async (req, res, next) => {
    try {
        const id = req.params.catId;
        const cat = await Cat.cats.find(cat => cat.id === id);
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
        // console.log(req.body);
        // console.log(req.file);
        const newCat = {
            id: new Date().getTime(),
            filename: req.file.filename,
            ...req.body
        };
        await Cat.cats.push(newCat);

        res.status(201).json({ status: 'success', data: newCat });
    } catch (error) {
        console.log(error);
    }
};

exports.deleteCat = async (req, res, next) => {
    try {
        const id = req.params.catId;
        const filteredCat = await Cat.cats.filter(cat => cat.id !== id);
        Cat.cats = filteredCat;
        res.json({ status: 'success', data: null });
    } catch (error) {
        console.log(error);
    }
};

exports.updateCat = async (req, res, next) => {
    try {
        const id = req.params.catId;

        // way 1: update cat using findIndex
        const finedIndex = await Cat.cats.findIndex(cat => cat.id === id);
        if (finedIndex === -1) {
            res.status(404).json({ status: 'failed', message: 'Cat not found on provided id' });
        } else {
            Cat.cats[finedIndex] = { ...Cat.cats[finedIndex], ...req.body };
            res.json({ status: 'success', data: Cat.cats[finedIndex] });
        }
    } catch (error) {
        console.log(error);
    }
};
