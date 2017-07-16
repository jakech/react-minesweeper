import React, { Component } from 'react'
import { connect } from 'react-redux'
import { newGame } from '../../actions'

class Game extends Component {
    render() {
        const { newGame } = this.props
        return (
            <div
                style={{
                    display: 'inline-block',
                    border: '5px solid darkgray',
                    padding: 1
                }}
            >
                <header>
                    <button onClick={newGame}>New Game</button>
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

const mapDispatchToProps = dispatch => {
    return {
        newGame: () => {
            dispatch(newGame())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
