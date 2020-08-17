import React, { ChangeEvent, useRef } from 'react'
import { Typography } from 'antd'

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
            <div className='upload'
                onDragOver={prevent}
                onDrop={(e) => props.handleUpload(e)}
                onDragEnter={prevent}
                onDragLeave={prevent}
                style={{ backgroundImage: `url(${props.fileUrl})` }}
            >
                <Typography.Text>Drop image here</Typography.Text>
            </div>
        </>
    )
}

export default FileUpload
