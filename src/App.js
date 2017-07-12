import React, { Component } from 'react';
import Cell from './Cell';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function createBoard() {
    const MINES = 99;
    const ROWS = 24;
    const COLS = 24;

    let board = new Array(ROWS).fill('');
    board = board.map(row => {
        const cols = [];
        for (let i = 0; i < COLS; i++) {
            const cell = createCell();
            cols.push(cell);
        }
        return cols;
    });

    let mineRemain = MINES;

    while (mineRemain > 0) {
        let row = getRandomInt(0, ROWS);
        let col = getRandomInt(0, COLS);
        let cell = board[row][col];
        if (!cell.hasMine) {
            cell.hasMine = true;
            mineRemain--;
        }
    }

    return board;
}

function createCell() {
    return {
        hasMine: false,
        isOpen: false,
        isFlagged: false,
        value: null
    };
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: createBoard()
        };
    }
    render() {
        return (
            <div
                className="App"
                style={{
                    display: 'flex',
                    flexFlow: 'row wrap',
                    width: this.state.board.length * 20
                }}
            >
                {this.state.board.map(row => {
                    return row.map(cell => <Cell {...cell} />);
                })}
            </div>
        );
    }
}

export default App;
