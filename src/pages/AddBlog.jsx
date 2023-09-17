import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Stepper } from 'react-form-stepper';
import { FaArrowRight } from 'react-icons/fa';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import CustomInput from '../components/CustomInput';
const { Dragger } = Upload;

const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const AddBlog = () => {
    const [desc, setDesc] = useState("");
    const editorRef = useRef(null);

    const handleDesc = (newEditorState) => {
        setDesc(newEditorState);
    };

    return (
        <div className='container-fluid my-5 w-md-75'>
            <h3 className='mb-4'>Add Blog</h3>

            {/* <Stepper
                steps={[{ label: 'Blog Details' }, { label: 'Upload Images' }, { label: 'Finish' }]}
                activeStep={0}
            /> */}
            <div className="">
                <form action="">
                    <CustomInput
className="form-control custom-input" type="text" label="Enter Blog Title"/>
                    <select className="form-select form-select-md custom-input mb-3" aria-label=".form-select-lg example" defaultValue='0'>
                        <option value='0' disabled>Select Category</option>
                        <option value="1">One</option>
                    </select>

                    <ReactQuill theme="snow" value={desc} onChange={handleDesc} className='bg-white' />
                    <div className="mt-4">
                        <Dragger {...props} className='bg-white'>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined className='text-dark'/>
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                                banned files.
                            </p>
                        </Dragger>
                    </div>
                    <button type="button" className="btn btn-success mt-5 px-5 fs-5">
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddBlog;
