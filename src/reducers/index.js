import { combineReducers } from 'redux'
import createBoardReducer from 'reducers/board'

const gameSettings = {
    mines: 99,
    rows: 16,
    cols: 30
}

const game = (state = { ...gameSettings, gameOver: false }, action) => {
    switch (action.type) {
        case 'GAME_OVER':
            return {
                ...state,
                gameOver: true
            }
        case 'NEW_GAME':
            const { mines, rows, cols } = action
            return {
                mines,
                rows,
                cols,
                gameOver: false
            }
        default:
            return state
    }
}

export default combineReducers({
    game,
    board: createBoardReducer(gameSettings)
})
