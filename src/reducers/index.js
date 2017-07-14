import { combineReducers } from 'redux'

const cell = (
    state = {
        hasMine: false,
        isOpen: false,
        isFlagged: false,
        value: 0
    },
    action
) => {
    switch (action.type) {
        case 'CELL_TOGGLE_FLAG':
            return {
                ...state,
                isFlagged: !state.isFlagged
            }
            break
        case 'CELL_OPEN':
            return {
                ...state,
                isOpen: true
            }
            break
        default:
            return state
    }
}

const cells = (state = {}, action) => {
    switch (action.type) {
        case 'CELL_TOGGLE_FLAG':
            if (state[action.id].isOpen) {
                return state
            }
            return {
                ...state,
                [action.id]: cell(state[action.id], action)
            }
            break
        case 'CELL_OPEN':
            if (state[action.id].isFlagged) {
                return state
            }
            return {
                ...state,
                [action.id]: cell(state[action.id], action)
            }
        default:
            return state
    }
}

const options = (
    state = {
        mines: 0,
        rows: 0,
        cols: 0
    }
) => state

const board = combineReducers({
    allIds: (state = []) => state,
    byId: cells
})

export default combineReducers({
    options,
    board
})
