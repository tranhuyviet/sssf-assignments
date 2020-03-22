'use strict';
const JWT = require('jsonwebtoken');

const signToken = user => {
    return JWT.sign(
        {
            iss: 'VietTran',
            sub: user.id,
            iat: new Date().getTime(), // current time
            exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
        },
        process.env.JWT_SECRET
    );
};

exports.login = async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({
        status: 'login success',
        token
    });
};
