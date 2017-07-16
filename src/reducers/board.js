import { combineReducers } from 'redux'
import { createBoard } from '../gameCreator'

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
            if (state.isOpen) {
                return state
            }
            return {
                ...state,
                isFlagged: !state.isFlagged
            }
        case 'CELL_OPEN':
            return {
                ...state,
                isOpen: true
            }
        case 'GAME_OVER':
            if (action.id !== state.id) {
                return state
            }
            return {
                ...state,
                highlight: true
            }
        default:
            return state
    }
}
const getID = (coord, fromId) => {
    const arr = fromId.split('x')
    let row = +arr[0]
    let col = +arr[1]

    switch (coord) {
        case 'nw':
            row--
            col--
            break
        case 'n':
            col--
            break
        case 'ne':
            row++
            col++
            break
        case 'w':
            col--
            break
        case 'e':
            col++
            break
        case 'sw':
            row++
            col--
            break
        case 's':
            row++
            break
        case 'se':
            row++
            col++
            break
        default:
    }

    return `${row}x${col}`
}

const boardOptions = {
    mines: 99,
    rows: 24,
    cols: 24
}
const theBorad = createBoard(boardOptions)

const cells = (state = theBorad.byId, action) => {
    switch (action.type) {
        case 'CELL_TOGGLE_FLAG':
            return {
                ...state,
                [action.id]: cell(state[action.id], action)
            }
        case 'CELL_OPEN':
            const { id } = action
            let newState = { ...state, [id]: cell(state[id], action) }

            if (state[id].value > 0) return newState

            // recursively open other cells

            // surrounding cell ids
            const surIds = ['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']

            surIds.forEach(sid => {
                const sCell = state[getID(sid, id)]
                if (sCell !== undefined) {
                    const { isFlagged, isOpen } = sCell
                    if (!isFlagged && !isOpen) {
                        newState = cells(
                            {
                                ...newState,
                                [sCell.id]: cell(sCell, action)
                            },
                            {
                                ...action,
                                id: sCell.id
                            } // change action id
                        )
                    }
                }
            })

            return newState
        case 'GAME_OVER':
            return {
                ...state,
                [action.id]: cell(state[action.id], action)
            }
        case 'NEW_GAME':
            return createBoard(boardOptions).byId
        default:
            return state
    }
}

export default combineReducers({
    allIds: (state = theBorad.allIds) => state,
    byId: cells
})
