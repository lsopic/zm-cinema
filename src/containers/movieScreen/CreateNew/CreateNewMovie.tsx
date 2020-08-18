import React, { useState, useEffect } from 'react'
import { Row, Col, Typography, Form, Input, InputNumber, Button, notification } from 'antd'
import FileUpload from './FileUpload'
import { connect } from 'react-redux'
import { Dispatch, Action } from 'redux'
import { reduxConstants } from '../../../constants/reduxConstants'
import { history } from '../../../reducers/store'
import { createMovie, updateMovie } from '../../../services/movies'
import { IMovieState } from '../../../reducers/movieReducer'
import { useForm } from 'antd/lib/form/Form'

interface Props {
    user: any
    handleChange: (name: string, value: any) => Action
    storeInputFile: (file: File, fileUrl: ArrayBuffer | string) => Action
    title: string
    year: number
    poster: File | any
    fileUrl: string | ArrayBuffer
    isEditing: boolean
    cancelMovieCreation: () => Action
    id: number
    storeUserData: (payload: any) => Action
}

const CreateNewMovie = (props: Props) => {

    //refresh:
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

    const [form] = Form.useForm();
    const [oldImagePreview, setOldImagePreview] = useState(null)

    useEffect(() => {
        if (props.isEditing && props.poster !== null) {
            console.log(props.poster)
            setOldImagePreview(props.poster.url)
        }
        form.setFieldsValue({ 'title': props.title, 'year': props.year })
    }, [])

    const handleImages = (e: React.DragEvent<HTMLDivElement>) => {
        console.log(e.target, 'drop')

        e.preventDefault()
        e.stopPropagation();

        const supportedFileTypes = ['image/jpeg', 'image/jpg', 'image/png']
        const image = e.dataTransfer.files[0]
        const type = image.type
        if (supportedFileTypes.indexOf(type) > -1) {
            const reader = new FileReader()
            reader.onloadend = () => {
                props.storeInputFile(image, reader.result)
            }
            reader.readAsDataURL(image)
        };
    }

    const handleChange = (e: any, name: string) => {
        console.log(e.target)
        props.handleChange(name, e.target.value)
    }

    const handleSubmit = async () => {
        if (!props.poster) {
            notification.error({ message: 'Please add movie poster!' })
            return
        }

        form.validateFields()
        const validationErrors = Object.values(form.getFieldsValue(['title']))
        console.log(validationErrors)
        if (!validationErrors.some(e => e === undefined)) {

            if (props.isEditing) {
               await updateMovie(props.id, { title: props.title, year: props.year, poster: props.poster })
            } else {
                await createMovie({ title: props.title, year: props.year }, props.poster)
            }
            history.push('/movies')
        }
    }

    const cancel = () => {
        history.push('/movies')
        props.cancelMovieCreation()
    }


    return (
        <Row className={props.isEditing ? 'edit-bg' : 'create-bg'}>
            <Col style={{ display: 'flex', flexDirection: 'column', padding: '6em', width: '40%' }}>
                <Row>
                    <Typography.Title level={1} className='title'>{props.isEditing ? 'Edit' : 'Create a new Movie'}</Typography.Title>
                </Row>
                <Row>
                    <Form form={form} layout='vertical' className='form-movie' hideRequiredMark>
                        <Row>
                            <Form.Item
                                className='full-width'
                                name='title' label='Title*'
                                dependencies={[props.title]}
                                rules={[{ required: true, message: 'Please input your username!' }]}>
                                <Input
                                    className='input'
                                    value={props.title}
                                    onChange={(e) => handleChange(e, 'title')} />
                            </Form.Item>
                        </Row>
                        <Row>
                            <Form.Item
                                className='full-width'
                                name='year'
                                dependencies={[props.year]}
                                label='Publication year'>
                                <InputNumber
                                    className='input'
                                    value={props.year}
                                    onBlur={(e) => handleChange(e, 'year')} />
                            </Form.Item>
                        </Row>
                        <Form.Item label='Cover image*'>
                            {props.isEditing ? <img className='small-preview' src={oldImagePreview} /> : null}
                            <FileUpload fileUrl={props.fileUrl} handleUpload={handleImages} />
                        </Form.Item>
                        <Row justify='space-between'>
                            <Button style={{ width: '40%' }} onClick={cancel} className='white-button'>
                                Cancel
                        </Button>
                            <Button style={{ width: '55%' }} onClick={handleSubmit} className='red-button'>
                                {props.isEditing ? 'Update' : 'Create'}
                            </Button>
                        </Row>
                    </Form>
                </Row>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state: { movie: IMovieState, user: any }) => {
    return {
        title: state.movie.title,
        year: state.movie.year,
        poster: state.movie.poster,
        fileUrl: state.movie.fileUrl,
        isEditing: state.movie.isEditing,
        id: state.movie.id,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        handleChange: (name: string, value: any) => dispatch({ type: reduxConstants.HANDLE_INPUT, name, value }),
        storeInputFile: (file: File, fileUrl: ArrayBuffer | string) => dispatch({ type: reduxConstants.HANDLE_FILE, file, fileUrl }),
        cancelMovieCreation: () => dispatch({ type: reduxConstants.CANCEL_MOVIE_CREATION }),
        storeUserData: (payload: any) => dispatch({ type: reduxConstants.STORE_USER_DATA, payload }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewMovie)
