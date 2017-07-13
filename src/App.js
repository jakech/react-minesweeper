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

            // set value
            //  nw | n | ne
            // -------------
            //  w  | c | e
            // -------------
            //  sw | s | se

            if (row - 1 >= 0 && col - 1 >= 0) {
                // nw
                board[row - 1][col - 1].value++;
            }
            if (row - 1 >= 0) {
                // north
                board[row - 1][col].value++;
            }
            if (row - 1 >= 0 && col + 1 < board[row].length) {
                // ne
                board[row - 1][col + 1].value++;
            }
            if (col - 1 > 0) {
                // w
                board[row][col - 1].value++;
            }
            if (col + 1 < board[row].length) {
                // east
                board[row][col + 1].value++;
            }
            if (row + 1 < board.length && col - 1 > 0) {
                // sw
                board[row + 1][col - 1].value++;
            }
            if (row + 1 < board.length) {
                // s
                board[row + 1][col].value++;
            }
            if (row + 1 < board.length && col + 1 < board[row].length) {
                // se
                board[row + 1][col + 1].value++;
            }
        }
    }

    return board;
}

function createCell() {
    return {
        hasMine: false,
        isOpen: false,
        isFlagged: false,
        value: 0
    };
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: createBoard()
        };
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

export default App;
