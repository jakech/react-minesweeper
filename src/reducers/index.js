import { combineReducers } from 'redux'
import board from './board'

const game = (
    state = {
        mines: 0,
        rows: 0,
        cols: 0,
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
            break
        default:
            return state
    }
}

export default combineReducers({
    game,
    board
})
