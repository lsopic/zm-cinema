import React, { useState } from 'react'
import { Form, Row, Button, Input, Typography, Col } from 'antd'
import { signIn } from '../../services/signin'
import { connect } from 'react-redux'
import { Dispatch, Action } from 'redux'
import { reduxConstants } from '../../constants/reduxConstants'
import { history } from '../../reducers/store'
import { useForm } from 'antd/lib/form/Form'

interface Props {
    user: any
    storeUserData: (payload: any) => Action
}

const SignInForm = (props: Props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        form.validateFields()
        const validationErrors = Object.values(form.getFieldsValue(['email', 'password']))
        console.log(validationErrors)
        if (!validationErrors.some(e => e === undefined)) {
            const user = await signIn(email, password)
            props.storeUserData(user)
            history.replace('/movies')
            localStorage.setItem('user', JSON.stringify(user))
        }
    }
    return (
        <Row align='middle' justify='center' className='signin-form-wrapper'>
            <Col>
                <Row>
                    <Typography.Title className='title' level={1}>Login</Typography.Title>
                </Row>
                <Form layout='vertical' hideRequiredMark form={form}>
                    <Row>
                        <Form.Item
                            rules={[{ required: true, message: 'Email can not be empty' }]}
                            label='Email:*'
                            className='full-width'
                            name='email'>
                            <Input className='input' onChange={(e) => setEmail(e.target.value)} />
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item
                            rules={[{ required: true, message: 'Password can not be empty' }]}
                            name='password'
                            label='Password:*'
                            className='full-width'>
                            <Input.Password className='input' onChange={(e) => setPassword(e.target.value)} />
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
