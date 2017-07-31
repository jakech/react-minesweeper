import { getNeighbourCells } from 'utils'

export const touchNeighbours = id => (dispatch, getState) => {
    const neighbours = getNeighbourCells(getState().board.byId, id)
    neighbours.forEach(cell => {
        if (!cell.isFlagged) {
            if (cell.hasMine) {
                dispatch({ type: 'GAME_OVER', id: cell.id })
            } else {
                dispatch({ type: 'CELL_OPEN', id: cell.id })
            }
        }
    })
}

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

export const newGame = options => {
    console.log('new game', options)
    return {
        type: 'NEW_GAME',
        ...options
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
