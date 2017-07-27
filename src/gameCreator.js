const SEP = 'x'

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
    //The maximum is exclusive and the minimum is inclusive
}

export function generateBoard(rows, cols) {
    let board = []
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            board.push(`${i}${SEP}${j}`)
        }
    }

    return board
}

export function createCells(mines, rows, cols, cellReducer) {
    const cells = generateBoard(rows, cols).reduce((obj, id) => {
        const cell = cellReducer(undefined, { type: undefined }) // get the default state
        obj[id] = { ...cell, id }
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
        }
    }

    return cells
}
