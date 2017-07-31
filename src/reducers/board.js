import { combineReducers } from 'redux'
import { createCells, generateBoard } from 'gameCreator'
import { getNeighbourCells } from 'utils'

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

export default function createBoardReducer(gameSettings) {
    const { mines, rows, cols } = gameSettings

    const cells = (state = createCells(mines, rows, cols, cell), action) => {
        switch (action.type) {
            case 'CELL_TOGGLE_FLAG':
                return {
                    ...state,
                    [action.id]: cell(state[action.id], action)
                }
            case 'CELL_OPEN':
                const newState = { ...state }
                const stack = []

                stack.push(newState[action.id])

                while (stack.length > 0) {
                    let curCell = stack.pop()

                    let tiles = getNeighbourCells(newState, curCell.id)

                    let mineNum = 0
                    for (let i = 0; i < tiles.length; i++) {
                        if (tiles[i].hasMine) mineNum += 1
                    }

                    if (mineNum > 0) {
                        curCell = { ...curCell, value: mineNum }
                    } else {
                        tiles.forEach(tile => {
                            if (!tile.isOpen && !tile.isFlagged) {
                                stack.push(tile)
                            }
                        })
                    }

                    newState[curCell.id] = cell(curCell, {
                        ...action,
                        id: curCell.id
                    })
                }

                return newState
            case 'GAME_OVER':
                return {
                    ...state,
                    [action.id]: cell(state[action.id], action)
                }
            case 'NEW_GAME':
                const { mines, rows, cols } = action
                return createCells(mines, rows, cols, cell)
            default:
                return state
        }
    }

    return combineReducers({
        allIds: (state = generateBoard(rows, cols), action) => {
            switch (action.type) {
                case 'NEW_GAME':
                    const { rows, cols } = action
                    return generateBoard(rows, cols)
                default:
                    return state
            }
        },
        byId: cells
    })
}
