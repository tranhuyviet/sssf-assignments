const User = require('../models/userModel');

// remove password before sending
const removePassword = users => {
    if (Array.isArray(users)) {
        return users.map(user => {
            return {
                id: user.id,
                name: user.name,
                email: user.email
            };
        });
    } else {
        return {
            id: users.id,
            name: users.name,
            email: users.email
        };
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.users;
        usersRemovedPassword = removePassword(users);
        res.json({ status: 'success', data: usersRemovedPassword });
    } catch (error) {
        console.log(error);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const id = req.params.userId;
        const user = await User.users.find(user => user.id === id);
        if (user) {
            const userRemovedPassword = removePassword(user);
            res.json({ status: 'success', data: userRemovedPassword });
        }
    } catch (error) {
        console.log(error);
    }
};

exports.addUser = async (req, res, next) => {
    try {
        const newUser = {
            id: new Date().getTime(),
            ...req.body
        };
        await User.users.push(newUser);
        newUserRemovedPassword = removePassword(newUser);
        res.status(201).json({ status: 'success', data: newUserRemovedPassword });
    } catch (error) {
        console.log(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const id = req.params.userId;
        const filtedUser = await User.users.filter(user => user.id !== id);
        User.users = filtedUser;
        res.json({ status: 'success', data: null });
    } catch (error) {
        console.log(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const id = req.params.userId;

        const finedIndex = await User.users.findIndex(user => user.id === id);
        if (finedIndex === -1) {
            res.status(404).json({ status: 'failed', message: 'User not found on provided id' });
        } else {
            User.users[finedIndex] = { ...User.users[finedIndex], ...req.body };
            const userRemovedPassword = removePassword(User.users[finedIndex]);
            res.json({ status: 'success', data: userRemovedPassword });
        }
    } catch (error) {
        console.log(error);
    }
};
