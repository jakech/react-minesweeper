import React from 'react'
import styled from 'styled-components'

const ICON_FLAG = '\uD83D\uDEA9'
const ICON_BOMB = '\uD83D\uDCA3'

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
    z-index: 99;
    &:focus {
        outline: 1px dodgerblue solid;
        z-index: 100;
    }
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
            {isFlagged && ICON_FLAG}
            {isOpen && (hasMine ? ICON_BOMB : !!value && value)}
        </Button>
    )
}
