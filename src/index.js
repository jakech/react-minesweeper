import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'

import './index.css'
import App from './App'
import AppReducers from './reducers'

import {loadGame} from './gameCreator'

import registerServiceWorker from './registerServiceWorker'

const boardOptions = {
    mines: 99,
    rows: 24,
    cols: 24
}

const store = createStore(AppReducers, loadGame(boardOptions), applyMiddleware(createLogger()))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()
