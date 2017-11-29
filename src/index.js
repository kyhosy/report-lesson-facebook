import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { render } from 'react-dom'
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './Reducers';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';

const middleware = [thunk];
const store = createStore(rootReducer,applyMiddleware(...middleware))

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
render(
    <Provider store = {store}>
    <App/>
    </Provider>,
    document.getElementById('root')
)
