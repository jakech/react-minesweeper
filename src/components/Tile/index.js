import React from 'react'
import styled from 'styled-components'

const FLAG = '\uD83D\uDEA9'
const BOMB = '\uD83D\uDCA3'

const Button = styled.button`
    box-sizing: border-box;
    flex: 1 1 auto;
    width: 20px;
    height: 20px;
    padding: 0;
    margin: 0;
    line-height: 20px;
    text-align: center;
    border: 1px white solid;
    background: ${props =>
        props.highlight ? 'red' : props.isOpen ? 'lightgray' : 'darkgray'};
`

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
    return (
        <Button
            highlight={highlight}
            isOpen={isOpen}
            disabled={disabled}
            onClick={onClick}
            onContextMenu={onRightClick}
        >
            {isFlagged && FLAG}
            {isOpen && (hasMine ? BOMB : !!value && value)}
        </Button>
    )
}
