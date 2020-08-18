import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { user } from './userReducer'
import { movieList, movie } from './movieReducer'
import { History } from 'history'

const createRootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    user,
    movieList,
    movie
})

export default createRootReducer;