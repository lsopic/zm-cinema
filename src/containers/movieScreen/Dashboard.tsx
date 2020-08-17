import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch, Action } from 'redux'
import { reduxConstants } from '../../constants/reduxConstants'
import { history } from '../../reducers/store'
import EmptyList from './movieList/EmptyList'
import { getMovies } from '../../services/movies'
import MovieList from './movieList/MovieList'

interface Props {
    user: any
    storeUserData: (payload: any) => Action
    storeMovieList: (movies: any) => Action
    movieList: Array<any>
}

const Dashboard = (props: Props) => {
    const redirect = () => {
        history.replace('/')
    }

    if (!props.user.jwt) {
        const user = JSON.parse(localStorage.getItem('user'))
        console.log(user)
        if (user !== null) {
            props.storeUserData(user)
        } else {
            redirect()
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const movieList = await getMovies()
            props.storeMovieList(movieList)
        }
        fetchData()
    }, [])



    return (
        <>
            {props.movieList.length > 0 ? <MovieList movieList={props.movieList}/> : <EmptyList />}
        </>

    )
}

const mapStateToProps = (state: { user: any, movieList: Array<any> }) => {
    return {
        user: state.user,
        movieList: state.movieList
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        storeUserData: (payload: any) => dispatch({ type: reduxConstants.STORE_USER_DATA, payload }),
        storeMovieList: (payload: any) => dispatch({ type: reduxConstants.STORE_MOVIES, payload })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
