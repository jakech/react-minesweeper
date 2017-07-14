import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleCellFlag, openCell, endGame } from './actions'

import Cell from './Cell'
import Tile from './components/Tile'

class App extends Component {
    render() {
        const {
            gameOver,
            boardWidth,
            board,
            cells,
            toggleFlag,
            open,
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
                {board.map(
                    id =>
                        gameOver
                            ? <Tile
                                  key={id}
                                  {...cells[id]}
                                  disabled={true}
                                  isOpen={cells[id].isOpen || cells[id].hasMine}
                              />
                            : <Cell
                                  key={id}
                                  onRightClick={toggleFlag}
                                  onClick={open}
                                  onHitMine={endGame}
                                  cell={cells[id]}
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
    toggleFlag: toggleCellFlag,
    open: openCell,
    endGame
})(App)
