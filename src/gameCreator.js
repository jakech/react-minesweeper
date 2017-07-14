const SEP = 'x'

export const createBoard = options => {
    const newBoard = generateBoard(options.rows, options.cols)
    return {
        allIds: newBoard,
        byId: createCells(newBoard, options.mines, options.rows, options.cols)
    }
}

export const loadGame = options => ({
    game: options,
    board: createBoard(options)
})

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
    //The maximum is exclusive and the minimum is inclusive
}

function generateBoard(rows, cols) {
    let board = []
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            board.push(`${i}${SEP}${j}`)
        }
    }

    return board
}

function createCells(cellIDs, mines, rows, cols) {
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

    let mineRemain = mines

    while (mineRemain > 0) {
        let row = getRandomInt(0, rows)
        let col = getRandomInt(0, cols)
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
            if (row - 1 >= 0 && col + 1 < cols) {
                // ne
                cells[row - 1 + SEP + (col + 1)].value++
            }
            if (col - 1 > 0) {
                // w
                cells[row + SEP + (col - 1)].value++
            }
            if (col + 1 < cols) {
                // east
                cells[row + SEP + (col + 1)].value++
            }
            if (row + 1 < rows && col - 1 > 0) {
                // sw
                cells[row + 1 + SEP + (col - 1)].value++
            }
            if (row + 1 < rows) {
                // s
                cells[row + 1 + SEP + col].value++
            }
            if (row + 1 < rows && col + 1 < cols) {
                // se
                cells[row + 1 + SEP + (col + 1)].value++
            }
        }
    }

    return cells
}
