import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleCellFlag, openCell } from './actions'

import Cell from './Cell'

class App extends Component {
    render() {
        const { boardWidth, board, cells, toggleFlag, open } = this.props
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
                        onRightClick={toggleFlag}
                        onClick={open}
                        {...cells[id]}
                    />
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { allIds, byId } = state.board
    return { board: allIds, cells: byId, boardWidth: state.options.rows * 20 }
}

export default connect(mapStateToProps, {
    toggleFlag: toggleCellFlag,
    open: openCell
})(App)
