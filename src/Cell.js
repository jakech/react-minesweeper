import React from 'react';

export default ({ hasMine }) => {
    return (
        <div
            style={{
                flex: '1 1 auto',
                width: 20,
                height: 20,
                background: hasMine ? 'red' : 'black'
            }}
        />
    );
};
