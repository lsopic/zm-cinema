import React from 'react'
import { Row, Col, Button, Typography } from 'antd'
import { history } from '../../../reducers/store'

interface Props {

}

const EmptyList = (props: Props) => {

    const redirectToCreateMovie = () => {
        history.push('/createMovie')
    }

    return (
        <Row align='middle' justify='center' className='empty-list'>
            <Col>
                <Row>
                    <Col>
                        <Typography.Title level={2}>
                            Your movie list is empty
                </Typography.Title>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={redirectToCreateMovie}>
                            Create a new movie
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default EmptyList
