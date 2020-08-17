import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { user } from './userReducer'
import { movieList, movie } from './movieReducer'

const createRootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    user,
    movieList,
    movie
})

export default createRootReducer;