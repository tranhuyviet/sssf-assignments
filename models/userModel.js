'use strict';
const users = [
    {
        id: '1',
        name: 'Foo Bar',
        email: 'foo@bar.fi',
        password: 'foobar'
    },
    {
        id: '2',
        name: 'Bar Foo',
        email: 'bar@foo.fi',
        password: 'barfoo'
    }
];

// get user: type='email' or 'id'
const getUser = async (type, value) => {
    let user;
    if (type === 'email') {
        user = await users.find(user => user.email === value);
    } else {
        user = await users.find(user => user.id === value);
    }
    if (!user) {
        console.log(`Can not find user with provided by ${type}`);
        return undefined;
    }
    return user;
};

// check password
// user parameter is user have just checked by email
// password parameter is password user input
const isValidPassword = (user, password) => {
    if (user.password === password) {
        return true;
    } else {
        return false;
    }
};

module.exports = {
    users,
    getUser,
    isValidPassword
};
