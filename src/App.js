import React, { Component } from 'react'
import { connect } from 'react-redux'
import { tryToggleCellFlag, tryOpenCell, endGame } from './actions'

import Cell from './Cell'

class App extends Component {
    render() {
        const {
            gameOver,
            boardWidth,
            board,
            cells,
            tryToggleFlag,
            tryOpen,
            endGame
        } = this.props
        return (
            <div
                className="App"
                style={{
                    display: 'flex',
                    flexFlow: 'row wrap',
                    width: boardWidth
                }}
            >
                {board.map(id =>
                    <Cell
                        key={id}
                        onRightClick={tryToggleFlag}
                        onClick={tryOpen}
                        onHitMine={endGame}
                        {...cells[id]}
                    />
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { allIds, byId } = state.board
    return {
        board: allIds,
        cells: byId,
        boardWidth: state.game.rows * 20, // 20 is the cell width
        gameOver: state.game.gameOver
    }
}

export default connect(mapStateToProps, {
    tryToggleFlag: tryToggleCellFlag,
    tryOpen: tryOpenCell,
    endGame
})(App)
