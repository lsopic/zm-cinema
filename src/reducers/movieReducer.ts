import { reduxConstants } from "../constants/reduxConstants"

export const movieList = (state: Array<IMovieState> = new Array, action: any) => {
    switch (action.type) {

        case reduxConstants.STORE_MOVIES:
            return [
                ...action.payload
            ]
        case reduxConstants.DELETE_MOVIE:
            state = state.filter((movie) => {
                return movie.id !== action.id;
            });

        default:
            return state
    }
}


export interface IMovieState {
    title: string
    year: number
    poster: File
    fileUrl: ArrayBuffer | string
    isEditing?: boolean
    id?: number
}

export const initialStateMovie: IMovieState = {
    title: null,
    year: null,
    poster: null,
    fileUrl: null,
    isEditing: false
}

export const movie = (state = initialStateMovie, action: any) => {
    switch (action.type) {

        case reduxConstants.HANDLE_INPUT:
            return {
                ...state,
                [action.name]: action.value
            }
        case reduxConstants.HANDLE_FILE:
            return {
                ...state,
                poster: action.file,
                fileUrl: action.fileUrl
            }
        case reduxConstants.EDIT_MOVIE:
            return {
                ...action.payload,
                isEditing: true
            }
        case reduxConstants.CANCEL_MOVIE_CREATION:
            return initialStateMovie

        default:
            return state
    }
}
