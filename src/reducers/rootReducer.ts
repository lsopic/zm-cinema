import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { user } from './userReducer'
import { movieList, movie, initialStateMovie } from './movieReducer'

const createAppReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    user,
    movieList,
    movie
})

const initialState = {
    user: {},
    movieList: new Array,
    movie: initialStateMovie
}

const createRootReducer = (history: any) => (state: any, action: any) => {
    if (action.type == 'RESET') {
        state = initialState
    }
    return createAppReducer(history)(state, action);
};

export default createRootReducer;