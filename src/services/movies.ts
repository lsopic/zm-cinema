import { store } from "../reducers/store"

export const getMovies = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${store.getState().user.jwt}`);
    try {
        const fetchResponse = await fetch('https://zm-job-application.herokuapp.com/movies', {
            headers: myHeaders
        })
        const response: any = fetchResponse.json()
        if (!response.statusCode) {
            return response
        } else {
            throw new Error
        }
    } catch (error) {
        throw error
    }
}

export const getOneMovie = async (id: number) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${store.getState().user.jwt}`);
        const fetchResponse = await fetch(`https://zm-job-application.herokuapp.com/movies/${id}`, {
            headers: myHeaders
        })
        const response: any = fetchResponse.json()
        if (!response.statusCode) {
            return response
        } else {
            throw new Error
        }
    } catch (error) {
        throw error
    }
}

export const createMovie = async (data: { title: string, year: number }, file: File) => {
    var formdata = new FormData();
    formdata.append("data", JSON.stringify(data));
    formdata.append("files.poster", file, "file");
    try {
        const fetchResponse = await fetch('https://zm-job-application.herokuapp.com/movies', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${store.getState().user.jwt}`
            },
            body: formdata
        })
        const response = await fetchResponse.json()
        if (!response.statusCode) {
            return response
        } else {
            throw new Error
        }
    } catch (error) {
        throw error
    }
}

export const updateMovie = async (id: number, movie: { title: string, year: number, poster: File }) => {
    var formdata = new FormData();
    formdata.append("data", JSON.stringify({title: movie.title, year: movie.year}));
    formdata.append("files.poster", movie.poster, "file");
    try {
        const fetchResponse = await fetch(`https://zm-job-application.herokuapp.com/movies/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${store.getState().user.jwt}`
            },
            body: formdata
        })
        const response = await fetchResponse.json()
        Promise.resolve(response)
    } catch (error) {
        throw error
    }
}

export const deleteMovie = async (id: number) => {
    try {
        const fetchResponse = await fetch(`https://zm-job-application.herokuapp.com/movies/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${store.getState().user.jwt}`
            }
        })
        const response = await fetchResponse.json()
        Promise.resolve(response)
    } catch (error) {
        throw error
    }
}
