import React from 'react'
import { Row, Col, Typography } from 'antd'
import Movie from './Movie'

interface Props {
    movieList: Array<any>
}

const MovieList = (props: Props) => {
    return (
        <Row style={{ height: '100vh', width: '100vw' }}>
            <Col style={{ width: '100%', padding: '6em' }}>
                <Row>
                    <Typography.Title className='title'>Movies</Typography.Title>
                </Row>
                <Row justify='space-between'>
                    <Col span={4}><Typography.Text className='labels'>Cover image</Typography.Text></Col>
                    <Col span={7} className='align-center' ><Typography.Text className='labels'>Title</Typography.Text></Col>
                    <Col span={7} className='align-center'><Typography.Text className='labels'>Publication year</Typography.Text></Col>
                    <Col span={4} className='align-right'><Typography.Text className='labels small-margin'>Options</Typography.Text></Col>
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
