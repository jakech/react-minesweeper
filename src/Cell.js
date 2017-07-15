import React, { Component } from 'react'
import Tile from './components/Tile'

export default class Cell extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.handleRightClick = this.handleRightClick.bind(this)
    }
    handleClick() {
        const { cell, onClick, onHitMine } = this.props
        if (cell.isFlagged) return
        if (cell.hasMine) {
            onHitMine(cell.id)
        } else {
            onClick(cell.id)
        }
    }
    handleRightClick(e) {
        const { cell, onRightClick } = this.props
        e.preventDefault()
        onRightClick(cell.id)
    }
    render() {
        const { cell } = this.props
        return (
            <Tile
                {...cell}
                disabled={cell.isOpen}
                onClick={this.handleClick}
                onRightClick={this.handleRightClick}
            />
        )
    }
}
