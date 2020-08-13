import { reduxConstants } from "../constants/reduxConstants"

const initialState = {

}

export const user = (state = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {

        case reduxConstants.STORE_USER_DATA:
            return { ...state, ...action.payload }

        default:
            return state
    }
}
