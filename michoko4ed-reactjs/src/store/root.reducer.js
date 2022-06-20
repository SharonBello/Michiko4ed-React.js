import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
// import { applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import { questionsReducer } from './reducers/question.reducer.js'
import { userReducer } from './reducers/user.reducer.js'
import { setReducer } from './reducers/set.reducer.js'
import { configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    userModule: userReducer,
    questionModule: questionsReducer,
    setModule: setReducer
})

// Lets wire up thunk and also redux-dev-tools:
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// export const store = configureStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))