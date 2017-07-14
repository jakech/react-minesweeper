import React from 'react'

export default ({
    isOpen,
    isFlagged,
    hasMine,
    value,
    disabled,
    highlight,
    onClick,
    onRightClick
}) => {
    const flag = '\uD83D\uDEA9'
    const bomb = '\uD83D\uDCA3'
    return (
        <button
            style={{
                flex: '1 1 auto',
                width: 20,
                height: 20,
                lineHeight: '20px',
                background: highlight
                    ? 'red'
                    : isOpen ? 'lightgray' : 'darkgray',
                textAlign: 'center',
                border: '1px white solid',
                boxSizing: 'border-box',
                padding: 0,
                margin: 0
            }}
            disabled={disabled}
            onClick={onClick}
            onContextMenu={onRightClick}
        >
            {isFlagged && flag}
            {isOpen && (hasMine ? bomb : !!value && value)}
        </button>
    )
}
