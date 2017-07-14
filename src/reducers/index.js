import { combineReducers } from 'redux'
import board from './board'

const options = (
    state = {
        mines: 0,
        rows: 0,
        cols: 0
    }
) => state

export default combineReducers({
    options,
    board
})
