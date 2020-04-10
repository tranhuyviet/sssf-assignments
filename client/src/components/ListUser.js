import React from 'react';
import { Avatar } from '@material-ui/core';

const ListUser = ({ users }) => {
    return (
        <ul style={{ listStyle: 'none' }}>
            {users &&
                users.map((user) => {
                    return (
                        <li
                            key={user.name + new Date().getTime()}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '15px',
                                // paddingBottom: '5px',
                                // borderBottom: '1px solid grey',
                                // borderTop: '1px solid grey',
                                cursor: 'pointer',
                            }}
                        >
                            <Avatar style={{ marginRight: '10px' }}>
                                {user.name.substr(0, 1)}
                            </Avatar>
                            <span>{user.name}</span>
                        </li>
                    );
                })}
        </ul>
    );
};

export default ListUser;
