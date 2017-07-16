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

export const newGame = () => {
    console.log('new game')
    return {
        type: 'NEW_GAME'
    }
}

export const endGame = id => (dispatch, getState) => {
    const { game } = getState()
    if (game.gameOver) return
    console.log('game over')
    dispatch({
        type: 'GAME_OVER',
        id
    })
}
