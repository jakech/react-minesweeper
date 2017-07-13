import React, { Component } from 'react';
import { connect } from 'react-redux';

import Cell from './Cell';

// @connect()
class App extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        switch (e.type) {
            case 'contextmenu':
                e.preventDefault();
                // e.target.isFlagged = !e.target.isFlagged;
                break;
            case 'click':
            // e.target.isOpen = true;
            default:
        }
        console.log('click', e.type);
    }
    render() {
        const { board } = this.props;
        return (
            <div
                className="App"
                style={{
                    display: 'flex',
                    flexFlow: 'row wrap',
                    width: board.length * 20
                }}
            >
                {board.map(row => {
                    return row.map(cell =>
                        <Cell
                            onContextMenu={this.handleClick}
                            onClick={this.handleClick}
                            {...cell}
                        />
                    );
                })}
            </div>
        );
    }
}

export default connect(state => {
    return { board: state.board };
})(App);
