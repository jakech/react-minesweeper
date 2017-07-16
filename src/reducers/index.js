import { combineReducers } from 'redux'
import board from './board'

const game = (
    state = {
        mines: 99,
        rows: 24,
        cols: 24,
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
            return {
                mines: 99,
                rows: 24,
                cols: 24,
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
