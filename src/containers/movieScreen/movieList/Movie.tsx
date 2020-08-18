import React from 'react'
import { Row, Col, Button } from 'antd'
import { getOneMovie, deleteMovie } from '../../../services/movies'
import { connect } from 'react-redux'
import { Dispatch, Action } from 'redux'
import { reduxConstants } from '../../../constants/reduxConstants'
import { history } from '../../../reducers/store'

interface Props {
    id: number
    title: string
    poster: any
    year: number
    editMovie: (payload: any) => Action
    deleteMovie: (id: number) => Action
}

const Movie = (props: Props) => {

    const editMovie = async() => {
        const res = await getOneMovie(props.id)
        props.editMovie(res)
        history.push('/createMovie')
    }

    const deleteMovieFromList = async() => {
        const res = await deleteMovie(props.id)
        props.deleteMovie(props.id)
    }

    return (
        <Row justify='space-between' align='middle' className='movie'>
            <Col span={4}><img className='movie-list-img' src={props.poster?.url} /></Col>
            <Col className='align-center' span={7}>{props.title}</Col>
            <Col className='align-center' span={7}>{props.year}</Col>
            <Col className='align-center list-item-buttons-container' span={4}>
                <Row>
                    <Button className='edit-button small-margin' onClick={editMovie}>Edit</Button>
                </Row>
                <Row>
                    <Button className='delete-button' onClick={deleteMovieFromList}>Delete</Button>
                </Row>
            </Col>
        </Row>
    )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        editMovie: (payload: any) => dispatch({type: reduxConstants.EDIT_MOVIE, payload}),
        deleteMovie: (id: number) => dispatch({type: reduxConstants.DELETE_MOVIE, id})
    }
}


export default connect(null, mapDispatchToProps)(Movie) 
