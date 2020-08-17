import React, { useState } from 'react'
import { Form, Row, Button, Input, Typography, Col } from 'antd'
import { signIn } from '../../services/signin'
import { connect } from 'react-redux'
import { Dispatch, Action } from 'redux'
import { reduxConstants } from '../../constants/reduxConstants'
import { history } from '../../reducers/store'
import { Redirect } from 'react-router'

interface Props {
    user: any
    storeUserData: (payload: any) => Action
}

const SignInForm = (props: Props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async () => {
        const user = await signIn(email, password)
        props.storeUserData(user)
        history.replace('/movies')
        localStorage.setItem('user', JSON.stringify(user))
    }
    return (
        <Row align='middle' justify='center' className='signin-form-wrapper'>
            <Col>
                <Row>
                    <Typography.Title className='title' level={1}>Login</Typography.Title>
                </Row>
                <Form layout='vertical'>
                    <Row>
                        <Form.Item label='Email:*' className='full-width'>
                            <Input onChange={(e) => setEmail(e.target.value)} />
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item label='Password:*' className='full-width'>
                            <Input.Password onChange={(e) => setPassword(e.target.value)} />
                        </Form.Item>
                    </Row>
                    <Button className='red-button full-width' onClick={handleSubmit}>
                        Sign in
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state: { user: any }) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        storeUserData: (payload: any) => dispatch({ type: reduxConstants.STORE_USER_DATA, payload })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm)
