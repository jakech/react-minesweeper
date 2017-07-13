import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';

import './index.css';
import App from './App';
import AppReducers from './reducers';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(AppReducers, applyMiddleware(createLogger()));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
