import React, { Component } from 'react'
import { connect } from 'react-redux'

import Cell from './Cell'

class App extends Component {
    render() {
        const { board, cells, toggleFlag, open } = this.props
        return (
            <div
                className="App"
                style={{
                    display: 'flex',
                    flexFlow: 'row wrap',
                    // width: ROWS * 20
                    width: 480
                }}
            >
                {board.map(id =>
                    <Cell key={id} onRightClick={toggleFlag} onClick={open} {...cells[id]} />
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { ...state }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleFlag: id => {
            dispatch({ type: 'CELL_TOGGLE_FLAG', id })
        },
        open: id => {
            dispatch({ type: 'CELL_OPEN', id })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
