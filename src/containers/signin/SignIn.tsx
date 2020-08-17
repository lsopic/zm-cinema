import React from 'react'
import SignInForm from './SignInForm'
import { Row, Col } from 'antd'

interface Props {

}

const SignIn = (props: Props) => {
    return (
        <Row style={{ display: 'flex' }} justify='start' className='bg-img-signin'>
            <SignInForm />
        </Row>
    )
}

export default SignIn
