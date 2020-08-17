import React from 'react'
import { Row, Col, Typography } from 'antd'
import Movie from './Movie'

interface Props {
    movieList: Array<any>
}

const MovieList = (props: Props) => {
    return (
        <Row style={{height: '100vh', width:'100vw'}}>
            <Col style={{width: '100%', padding: '4em'}}>
                <Row>
                    <Typography.Title>Movies</Typography.Title>
                </Row>
                <Row justify='space-between'>
                    <Col>Cover image</Col>
                    <Col>Title</Col>
                    <Col>Publication year</Col>
                    <Col>Options</Col>
                </Row>
                <>
                    {props.movieList.map((movie) => {
                        return <Movie key={movie.id}
                            id={movie.id}
                            year={movie.year}
                            title={movie.title}
                            poster={movie.poster} />
                    })}
                </>
            </Col>
        </Row>
    )
}

export default MovieList
