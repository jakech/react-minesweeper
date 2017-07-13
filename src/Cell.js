import React from 'react';

export default ({ hasMine, value, isOpen, onClick, onContextMenu }) => {
    return (
        <div
            style={{
                flex: '1 1 auto',
                width: 20,
                height: 20,
                lineHeight: '20px',
                background: isOpen ? 'grey' : 'silver',
                textAlign: 'center',
                border: '1px white solid',
                boxSizing: 'border-box'
            }}
            onClick={onClick}
            onContextMenu={onContextMenu}
        >
            {isOpen && (hasMine ? '\uD83D\uDCA3' : !!value && value)}
        </div>
    );
};
