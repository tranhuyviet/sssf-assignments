'use strict';

const express = require('express');
const app = express();

const users = [];
const chats = [];
const chatRoom = [];
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('login', (user) => {
        const newUser = { name: user };
        users.push(newUser);
        io.emit('login', users);
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected', socket.id);
    });

    socket.on('chat', (data) => {
        console.log('message: ', data);
        const newChat = {
            user: data.user,
            chat: data.chat,
        };
        chats.push(newChat);
        io.emit('chat', chats);
    });

    socket.on('room', (data) => {
        console.log('from room', data);
        const newChat = {
            user: data.user,
            chat: data.chat,
        };
        chatRoom.push(newChat);
        socket.broadcast.emit('room', chatRoom);
    });
});

http.listen(5000, () => {
    console.log('listening on port 5000');
});

// const server = app.listen(5000);
// const io = require('./socket').init(server);
// io.on('connection', (socket) => {
//     console.log('a user connected', socket.id);
//     console.log(users);
// });
