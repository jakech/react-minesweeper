import React from 'react'

export default ({
    id,
    hasMine,
    isFlagged,
    value,
    isOpen,
    onClick,
    onHitMine,
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
                background: isOpen ? 'lightgray' : 'darkgray',
                textAlign: 'center',
                border: '1px white solid',
                boxSizing: 'border-box',
                padding: 0,
                margin: 0
            }}
            disabled={isOpen}
            onClick={() => {
                onClick(id)
                if (hasMine) {
                    onHitMine()
                }
            }}
            onContextMenu={e => {
                e.preventDefault()
                onRightClick(id)
            }}
        >
            {isFlagged && flag}
            {isOpen && (hasMine ? bomb : !!value && value)}
        </button>
    )
}
