import { combineReducers } from 'redux'
import board from 'reducers/board'

const game = (
    state = {
        mines: 99,
        rows: 16,
        cols: 30,
        gameOver: false
    },
    action
) => {
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
    board
})
