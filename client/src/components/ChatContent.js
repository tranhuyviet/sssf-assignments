import React from 'react';
import { Avatar } from '@material-ui/core';

const ChatContent = ({ chats }) => {
    return (
        <ul style={{ listStyle: 'none', textAlign: 'left', paddingLeft: 0 }}>
            {chats &&
                chats.map((chat) => {
                    return (
                        <li
                            key={chat.user + Math.floor(Math.random() * new Date())}
                            style={{ padding: 0, margin: 0 }}
                        >
                            {/* {`${chat.user} say: ${chat.chat}`} */}
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar>{chat.user.substr(0, 1)}</Avatar>
                                <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>
                                    {chat.user}
                                </span>
                                <p
                                    style={{
                                        marginLeft: '20px',
                                        border: '1px solid grey',
                                        padding: '5px',
                                        width: '100%',
                                        borderRadius: '10px',
                                        background: 'grey',
                                        color: 'white',
                                    }}
                                >
                                    {chat.chat}
                                </p>
                            </div>
                        </li>
                    );
                })}
        </ul>
    );
};

export default ChatContent;
