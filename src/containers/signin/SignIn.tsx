import React from 'react'
import SignInForm from './SignInForm'
import SignInImage from './SignInImage'
import { Row, Col } from 'antd'

interface Props {

}

const SignIn = (props: Props) => {
    return (
        <Row style={{ display: 'flex' }} justify='space-between'>
            <SignInForm />

            <SignInImage />
        </Row>
    )
}

export default SignIn
