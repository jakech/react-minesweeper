import React from 'react'

export default ({
    id,
    hasMine,
    isFlagged,
    value,
    isOpen,
    onClick,
    onRightClick
}) => {
    const flag = '\uD83D\uDEA9'
    const bomb = '\uD83D\uDCA3'
    return (
        <div
            style={{
                flex: '1 1 auto',
                width: 20,
                height: 20,
                lineHeight: '20px',
                background: isOpen ? 'lightgray' : 'darkgray',
                textAlign: 'center',
                border: '1px white solid',
                boxSizing: 'border-box'
            }}
            onClick={() => onClick(id)}
            onContextMenu={e => {
                e.preventDefault()
                onRightClick(id)
            }}
        >
            {isFlagged && flag}
            {isOpen && (hasMine ? bomb : !!value && value)}
        </div>
    )
}
