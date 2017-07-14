const toggleCellFlag = id => {
    return {
        type: 'CELL_TOGGLE_FLAG',
        id
    }
}

const openCell = id => {
    return {
        type: 'CELL_OPEN',
        id
    }
}

export const tryToggleCellFlag = id => (dispatch, getState) => {
    const { game } = getState()
    if (game.gameOver) return
    dispatch(toggleCellFlag(id))
}

export const tryOpenCell = id => (dispatch, getState) => {
    const { game } = getState()
    if (game.gameOver) return
    dispatch(openCell(id))
}

export const endGame = () => {
    console.log('game over')
    return {
        type: 'GAME_OVER'
    }
}
