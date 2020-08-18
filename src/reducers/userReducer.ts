import { reduxConstants } from "../constants/reduxConstants"

interface Iuser{
    jwt?: string
    user?: any
}

export const user = (state: Iuser = {}, action: { type: string, payload: any }) => {
    switch (action.type) {

        case reduxConstants.STORE_USER_DATA:
            return { ...state, ...action.payload }

        default:
            return state
    }
}
