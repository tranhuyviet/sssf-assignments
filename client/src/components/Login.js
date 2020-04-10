import React, { useRef } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import openSocket from 'socket.io-client';

const Login = ({ isLoginOpen, setIsLoginOpen, setUser }) => {
    const nameRef = useRef();

    const onSubmitHandler = () => {
        setIsLoginOpen(false);
        const socket = openSocket('http://localhost:5000');
        socket.emit('login', nameRef.current.value);
        setUser(nameRef.current.value);
    };

    return (
        <div>
            <Dialog open={isLoginOpen}>
                <DialogTitle>Welcome to Chat</DialogTitle>
                <DialogContent
                    dividers
                    style={{
                        width: '400px',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '20px',
                    }}
                >
                    <input
                        type="text"
                        placeholder="Enter your name"
                        style={{
                            marginBottom: '20px',
                            height: '25px',
                            outline: 'none',
                            borderRadius: '5px',
                            border: '1px solid grey',
                            paddingLeft: '5px',
                        }}
                        ref={nameRef}
                    />

                    <button
                        style={{
                            height: '30px',
                            border: '1px solid orange',
                            background: 'orange',
                            borderRadius: '5px',
                            color: 'white',
                            outline: 'none',
                            cursor: 'pointer',
                        }}
                        onClick={() => onSubmitHandler()}
                    >
                        Go to Chat
                    </button>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Login;
