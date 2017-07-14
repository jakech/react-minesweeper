export const toggleCellFlag = id => {
    return {
        type: 'CELL_TOGGLE_FLAG',
        id
    }
}

export const openCell = id => {
    return {
        type: 'CELL_OPEN',
        id
    }
}
