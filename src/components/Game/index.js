import React, { Component } from 'react'
import { connect } from 'react-redux'
import { newGame } from 'actions'

const levels = {
    beginner: {
        rows: 9,
        cols: 9,
        mines: 10
    },
    intermediate: {
        rows: 16,
        cols: 16,
        mines: 40
    },
    expert: {
        rows: 16,
        cols: 30,
        mines: 99
    }
}

const getLevel = name => {
    return levels[name]
}

const getLevelNameByMineNum = mines => {
    return Object.keys(levels).filter(l => levels[l].mines === mines)[0]
}

class Game extends Component {
    constructor(props) {
        super(props)
        const { rows, cols, mines } = props
        this.state = { rows, cols, mines }
    }
    componentWillReceiveProps(nextProps) {
        const { rows, cols, mines } = nextProps
        this.setState({ rows, cols, mines })
    }
    handleChange = e => {
        const { rows, cols, mines } = getLevel(e.target.value)
        this.setState({ rows, cols, mines })
    }
    handleNewGame = () => {
        this.props.newGame({ ...this.state })
    }
    render() {
        const { mines } = this.state
        return (
            <div
                style={{
                    display: 'inline-block',
                    border: '5px solid darkgray',
                    padding: 1
                }}
            >
                <header>
                    <select
                        value={getLevelNameByMineNum(mines)}
                        onChange={this.handleChange}
                    >
                        {Object.keys(levels).map(key =>
                            <option key={key} value={key}>
                                {key}
                            </option>
                        )}
                    </select>
                    <button onClick={this.handleNewGame}>New Game</button>
                </header>
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state.game
}

export default connect(mapStateToProps, { newGame })(Game)
