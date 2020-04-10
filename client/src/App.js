import React, { useState, useEffect, useRef } from 'react';

import './App.css';
import { Grid, Avatar } from '@material-ui/core';

import Login from './components/Login';
import ListUser from './components/ListUser';
import ChatContent from './components/ChatContent';
import RoomChat from './components/RoomChat';
import openSocket from 'socket.io-client';

// const users = [
//     { name: 'Viet' },
//     { name: 'Kit' },
//     { name: 'Kat' },
//     { name: 'Ong' },
//     { name: 'Huyen' },
// ];

const App = () => {
    const [user, setUser] = useState('');
    const [isLoginOpen, setIsLoginOpen] = useState(true);
    const chatTextRef = useRef();
    const [users, setUsers] = useState([]);
    const [chats, setChats] = useState([]);
    const [isRoomOpen, setIsRoomOpen] = useState(false);

    const socket = openSocket('http://localhost:5000');
    useEffect(() => {
        socket.on('login', (users) => {
            setUsers(users);
        });

        socket.on('chat', (chat) => {
            setChats(chat);
        });
    }, [chats, setChats]);

    const chatSubmit = () => {
        const chatData = {
            user: user,
            chat: chatTextRef.current.value,
        };
        socket.emit('chat', chatData);
        chatTextRef.current.value = '';
    };

    return (
        <div className="App">
            <Login isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} setUser={setUser} />
            <RoomChat isRoomOpen={isRoomOpen} setIsRoomOpen={setIsRoomOpen} user={user} />
            <div
                style={{
                    height: '50px',
                    background: 'orange',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <p
                        style={{
                            margin: 0,
                            paddingLeft: 20,
                            color: 'white',
                            fontSize: '18px',
                            fontWeight: 'bold',
                        }}
                    >
                        Week 4 - socket io - chat app
                    </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', paddingRight: '20px' }}>
                    {user && (
                        <React.Fragment>
                            <Avatar style={{ marginRight: '10px' }}>{user.substr(0, 1)}</Avatar>
                            <span style={{ color: 'white', fontWeight: 'bold' }}>{user}</span>
                        </React.Fragment>
                    )}
                </div>
            </div>
            <div className="container">
                <Grid container spacing={3}>
                    <Grid item xs={4} style={{ border: '1px solid grey' }}>
                        <h3>List of User</h3>
                        <ListUser users={users} />
                        <button
                            style={{
                                height: '29px',
                                border: '1px solid orange',
                                background: 'orange',
                                borderRadius: '5px',
                                color: 'white',
                                outline: 'none',
                                cursor: 'pointer',
                                marginLeft: '10px',
                            }}
                            onClick={() => setIsRoomOpen(true)}
                        >
                            Join room 1
                        </button>
                    </Grid>
                    <Grid item xs={8} style={{ border: '1px solid grey' }}>
                        <h3>Chat content</h3>
                        <div style={{ minHeight: '400px' }}>
                            <ChatContent chats={chats} />
                        </div>
                        <div
                            style={{
                                width: '100%',
                                margin: 0,
                                padding: 0,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <input
                                style={{
                                    height: '25px',
                                    outline: 'none',
                                    borderRadius: '50px',
                                    border: '1px solid orange',
                                    paddingLeft: '8px',
                                    width: '100%',
                                }}
                                ref={chatTextRef}
                            />
                            <button
                                style={{
                                    height: '29px',
                                    border: '1px solid orange',
                                    background: 'orange',
                                    borderRadius: '5px',
                                    color: 'white',
                                    outline: 'none',
                                    cursor: 'pointer',
                                    marginLeft: '10px',
                                }}
                                onClick={() => chatSubmit()}
                            >
                                Send
                            </button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default App;
