import React, { Component } from 'react'
import { connect } from 'react-redux'

import Cell from 'components/Cell'

class Board extends Component {
    render() {
        const { boardWidth, board } = this.props
        return (
            <div
                style={{
                    display: 'flex',
                    flexFlow: 'row wrap',
                    width: boardWidth
                }}
            >
                {board.map(id => <Cell key={id} id={id} />)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { board, game } = state
    return {
        board: board.allIds,
        boardWidth: game.cols * 20 // 20 is the cell width
    }
}

export default connect(mapStateToProps)(Board)
