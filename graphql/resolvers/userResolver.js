const bcrypt = require('bcryptjs');
const User = require('../../models/userModel');
const Jwt = require('jsonwebtoken');

module.exports = {
    createUser: async args => {
        const { email, password } = args.userInput;
        try {
            // check user is existed
            const isExistUser = await User.findOne({ email });

            if (isExistUser) {
                throw new Error('User already exists');
            }

            // if user not exist, create new user

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = await User.create({ email, password: hashedPassword });

            if (!user) {
                throw new Error('Something went wrong');
            }

            // remove password before return
            user.password = null;

            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};
