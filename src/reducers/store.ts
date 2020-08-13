import { createStore, applyMiddleware, compose } from 'redux'
import { createBrowserHistory } from 'history'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './rootReducer'

const LoggerMiddleware = createLogger()

export const history = createBrowserHistory()

export const store = createStore(
    createRootReducer(history),
    compose(
        applyMiddleware(
            routerMiddleware(history),
            thunkMiddleware,
            LoggerMiddleware,
        )
    )
)