import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tile from '../Tile'

import { toggleCellFlag, openCell, endGame } from '../../actions'

const cellMapState = (state, ownProps) => {
    return {
        tile: state.board.byId[ownProps.id],
        isGameOver: state.game.gameOver
    }
}

const cellMapDispatch = (dispatch, ownProps) => ({
    getClickFunc(tile) {
        if (tile.isFlagged) return
        if (tile.hasMine) {
            return () => {
                dispatch(endGame(ownProps.id))
            }
        } else {
            return () => {
                dispatch(openCell(ownProps.id))
            }
        }
    },
    handleRightClick(e) {
        e.preventDefault()
        dispatch(toggleCellFlag(ownProps.id))
    }
})

class Cell extends Component {
    render() {
        const { tile, isGameOver, getClickFunc, handleRightClick } = this.props

        return (
            <Tile
                {...tile}
                isOpen={(isGameOver && tile.hasMine) || tile.isOpen}
                disabled={isGameOver || tile.isOpen}
                onClick={!isGameOver && getClickFunc(tile)}
                onRightClick={!isGameOver && handleRightClick}
            />
        )
    }
}

export default connect(cellMapState, cellMapDispatch)(Cell)
