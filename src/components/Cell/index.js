import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tile from 'components/Tile'

import { toggleCellFlag, openCell, touchNeighbours, endGame } from 'actions'

const cellMapState = (state, ownProps) => {
    return {
        tile: state.board.byId[ownProps.id],
        isGameOver: state.game.gameOver
    }
}

const cellMapDispatch = (dispatch, ownProps) => ({
    getClickFunc(tile) {
        if (tile.isFlagged || tile.isOpen) return
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
    dispatchToggleCellFlag(e) {
        e.preventDefault()
        dispatch(toggleCellFlag(ownProps.id))
    },
    dispatchTouchNeighbours(e) {
        e.preventDefault()
        dispatch(touchNeighbours(ownProps.id))
    }
})

class Cell extends Component {
    render() {
        const {
            tile,
            isGameOver,
            getClickFunc,
            dispatchToggleCellFlag,
            dispatchTouchNeighbours
        } = this.props

        return (
            <Tile
                {...tile}
                isOpen={
                    (isGameOver && (!tile.isFlagged && tile.hasMine)) ||
                    tile.isOpen
                }
                disabled={isGameOver}
                onClick={!isGameOver && getClickFunc(tile)}
                onRightClick={
                    !isGameOver &&
                    (tile.isOpen
                        ? dispatchTouchNeighbours
                        : dispatchToggleCellFlag)
                }
            />
        )
    }
}

export default connect(cellMapState, cellMapDispatch)(Cell)
