const toggleCellFlag = id => {
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

export const endGame = () => (dispatch, getState) => {
    const { game } = getState()
    if (game.gameOver) return
    console.log('game over')
    dispatch({
        type: 'GAME_OVER'
    })
}