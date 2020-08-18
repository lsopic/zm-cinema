import React from 'react'
import SignInForm from './SignInForm'
import { Row } from 'antd'

const SignIn = () => {
    return (
        <Row style={{ display: 'flex' }} justify='start' className='bg-img-signin'>
            <SignInForm />
        </Row>
    )
}

export default SignIn
