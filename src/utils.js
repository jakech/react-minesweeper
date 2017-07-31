const getID = (coord, fromId) => {
    const arr = fromId.split('x')
    let row = +arr[0]
    let col = +arr[1]

    //  nw | n | ne
    // -------------
    //  w  | c | e
    // -------------
    //  sw | s | se

    // prettier-ignore
    switch (coord) {
        case 'nw':  row--; col--
            break
        case 'n':   row--
            break
        case 'ne':  row--; col++
            break
        case 'w':   col--
            break
        case 'e':   col++
            break
        case 'sw':  row++; col--
            break
        case 's':   row++
            break
        case 'se':  row++; col++
            break
        default:
    }

    return `${row}x${col}`
}

export function getNeighbourCells(allCells, id) {
    // surrounding cell ids
    const surIds = ['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']
    return surIds
        .map(sid => {
            return allCells[getID(sid, id)]
        })
        .filter(t => t !== undefined)
}
