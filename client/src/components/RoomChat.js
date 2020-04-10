import React, { useRef, useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@material-ui/core';
import openSocket from 'socket.io-client';
import ChatContent from './ChatContent';
import CloseIcon from '@material-ui/icons/Close';

const RoomChat = ({ isRoomOpen, setIsRoomOpen, user }) => {
    const roomText = useRef();
    const [chats, setChats] = useState([]);
    const socket = openSocket('http://localhost:5000');

    useEffect(() => {
        socket.on('room', (chat) => {
            setChats(chat);
        });
    }, [chats, setChats]);

    const chatSubmit = () => {
        const chatData = {
            user: user,
            chat: roomText.current.value,
        };
        socket.emit('room', chatData);
        roomText.current.value = '';
    };
    return (
        <div>
            <Dialog open={isRoomOpen}>
                <DialogTitle>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <p style={{ margin: 0 }}>Room Chat 1</p>
                        <IconButton onClick={() => setIsRoomOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent
                    dividers
                    style={{
                        width: '400px',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '20px',
                    }}
                >
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
                            ref={roomText}
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
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default RoomChat;
