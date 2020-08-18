import React, { ChangeEvent, useRef } from 'react'
import { Typography, Row } from 'antd'

interface Props {
    handleUpload: (e: React.DragEvent<HTMLDivElement>) => void
    fileUrl: string | ArrayBuffer
}

const FileUpload = (props: Props) => {

    const prevent = (e: any) => {
        e.preventDefault(e)
        e.stopPropagation(e);
    }
    return (
        <>
            <Row className='upload'
                align='middle'
                onDragOver={prevent}
                onDrop={(e) => props.handleUpload(e)}
                onDragEnter={prevent}
                onDragLeave={prevent}
                style={{ backgroundImage: `url(${props.fileUrl})` }}
            >
                {!props.fileUrl ? <Typography.Text>Drop image here</Typography.Text> : null}
            </Row>
        </>
    )
}

export default FileUpload
