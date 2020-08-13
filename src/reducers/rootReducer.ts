import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { user } from './userReducer'

const createAppReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    user
})

const initialState = {
    user: {}
}

const createRootReducer = (history: any) => (state: any, action: any) => {
    if (action.type == 'RESET') {
        state = initialState
    }
    return createAppReducer(history)(state, action);
};

export default createRootReducer;