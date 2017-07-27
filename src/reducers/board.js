import { combineReducers } from 'redux'
import { createCells, generateBoard } from 'gameCreator'

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

    //  nw | n | ne
    // -------------
    //  w  | c | e
    // -------------
    //  sw | s | se

    // prettier-ignore
    switch (coord) {
        case 'nw':  row--; col--
            break
        case 'n':   row--
            break
        case 'ne':  row--; col++
            break
        case 'w':   col--
            break
        case 'e':   col++
            break
        case 'sw':  row++; col--
            break
        case 's':   row++
            break
        case 'se':  row++; col++
            break
        default:
    }

    return `${row}x${col}`
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
                // surrounding cell ids
                const surIds = ['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']
                const stack = []

                stack.push(newState[action.id])

                while (stack.length > 0) {
                    let curCell = stack.pop()

                    let tiles = surIds
                        .map(sid => {
                            return newState[getID(sid, curCell.id)]
                        })
                        .filter(t => t !== undefined)

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
