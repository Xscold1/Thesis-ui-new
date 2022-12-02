
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { userReducer } from './reducers/userReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export const store = createStore(
    combineReducers({
        userReducer
    }),
    applyMiddleware(
        thunk
    ));