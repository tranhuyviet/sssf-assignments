const Category = require('../../models/categoryModel');

module.exports = {
    // get all categories
    categories: async () => {
        try {
            const categories = await Category.find();

            return categories;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    // create new category
    createCategory: async args => {
        try {
            const category = await Category.create({ categoryName: args.categoryName });

            return category;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};
