import { combineReducers } from 'redux'

const MINES = 99
const ROWS = 24
const COLS = 24
const SEP = 'x'

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}

function createBoard(rows, cols) {
    let board = []
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            board.push(`${i}${SEP}${j}`)
        }
    }

    return board
}

function createCells(cellIDs) {
    const cells = cellIDs.reduce((obj, id) => {
        obj[id] = {
            id,
            hasMine: false,
            isOpen: false,
            isFlagged: false,
            value: 0
        }
        return obj
    }, {})

    let mineRemain = MINES

    while (mineRemain > 0) {
        let row = getRandomInt(0, ROWS)
        let col = getRandomInt(0, COLS)
        let cell = cells[row + SEP + col]

        if (!cell.hasMine) {
            cell.hasMine = true
            mineRemain--

            // set value
            //  nw | n | ne
            // -------------
            //  w  | c | e
            // -------------
            //  sw | s | se

            if (row - 1 >= 0 && col - 1 >= 0) {
                // nw
                cells[row - 1 + SEP + (col - 1)].value++
            }
            if (row - 1 >= 0) {
                // north
                cells[row - 1 + SEP + col].value++
            }
            if (row - 1 >= 0 && col + 1 < COLS) {
                // ne
                cells[row - 1 + SEP + (col + 1)].value++
            }
            if (col - 1 > 0) {
                // w
                cells[row + SEP + (col - 1)].value++
            }
            if (col + 1 < COLS) {
                // east
                cells[row + SEP + (col + 1)].value++
            }
            if (row + 1 < ROWS && col - 1 > 0) {
                // sw
                cells[row + 1 + SEP + (col - 1)].value++
            }
            if (row + 1 < ROWS) {
                // s
                cells[row + 1 + SEP + col].value++
            }
            if (row + 1 < ROWS && col + 1 < COLS) {
                // se
                cells[row + 1 + SEP + (col + 1)].value++
            }
        }
    }

    return cells
}

const newBoard = createBoard(ROWS, COLS)

const cells = (state = createCells(newBoard), action) => {
    switch (action.type) {
        case 'CELL_TOGGLE_FLAG':
            if (state[action.id].isOpen) {
                return state
            }
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    isFlagged: !state[action.id].isFlagged
                }
            }
            break
        case 'CELL_OPEN':
            if (state[action.id].isFlagged) {
                return state
            }
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    isOpen: true
                }
            }
        default:
            return state
    }
}

const board = (state = newBoard, action) => {
    return state
}

export default combineReducers({
    board,
    cells
})
