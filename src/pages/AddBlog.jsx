import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomInput from '../components/CustomInput';
import { useFormik } from "formik"
import * as Yup from 'yup'; //For Form Validation
import { useDispatch, useSelector } from 'react-redux';
import Dropzone from 'react-dropzone'
import { toast } from 'react-toastify';
import { delImg, uploadImg } from '../features/upload/uploadSlice';
import { useNavigate } from 'react-router-dom';
import { getBlogCategories } from '../features/blogCategory/bcategorySlice';
import { createBlogs, resetState } from '../features/blogs/BlogSlice'

let userSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    category: Yup.string().required('Category is required'),
});


const AddBlog = () => {
    const [desc, setDesc] = useState("");
    const [images, setImages] = useState([]);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getBlogCategories())
    }, [])

    const editorRef = useRef(null);
    const imgState = useSelector((state) => state.upload.images);
    const blogCatState = useSelector((state) => state.blogCategory.blogCategories)
    const blogState = useSelector((state) => state.blog)
    const { isSuccess, isError, isLoading, createdBlog } = blogState

    const handleDesc = (newEditorState) => {
        setDesc(newEditorState);
    };

    useEffect(() => {
        if (isSuccess && createdBlog) {
            toast.success('Blog added successfully!');
        }
        if (isError) {
            toast.error('Something went wrong!');
        }
    }, [isSuccess, isError, isLoading])

    const img = [];
    imgState.forEach((i) => {
        img.push({
            public_id: i.publi_url,
            url: i.url
        })
    })
    useEffect(() => {
        formik.values.images = img;
    }, [img])
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            category: '',
            images: ''
        },
        validationSchema: userSchema,
        onSubmit: values => {
            dispatch(createBlogs(values))
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState())
                navigate('/admin/blog-list')
            }, 3000)
        }
    })

    return (
        <div className='container-fluid my-5 w-md-75'>
            <h3 className='mb-4'>Add Blog</h3>

            {/* <Stepper
                steps={[{ label: 'Blog Details' }, { label: 'Upload Images' }, { label: 'Finish' }]}
                activeStep={0}
            /> */}
            <div className="">
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className="error">
                        {formik.touched.title && formik.errors.title ? (
                            <div>{formik.errors.title}</div>
                        ) : null}
                    </div>
                    <CustomInput
                        className="form-control custom-input"
                        type="text"
                        label="Enter Blog Title"
                        name="title"
                        val={formik.values.title}
                        onCh={formik.handleChange("title")}
                        onBl={formik.handleBlur("title")}
                    />

                    <div className="error">
                        {formik.touched.category && formik.errors.category ? (
                            <div>{formik.errors.category}</div>
                        ) : null}
                    </div>
                    <select
                        className="form-select form-select-md custom-input mb-3"
                        aria-label=".form-select-lg example"
                        name="brand"
                        onChange={formik.handleChange("category")}
                        onBlur={formik.handleBlur("category")}
                        value={formik.values.category}
                    >
                        <option value='0'>Select Category</option>
                        {
                            blogCatState.map((i, j) => {
                                return (
                                    <option
                                        key={j}
                                        value={i.title}
                                    >
                                        {i.title}
                                    </option>
                                )
                            })
                        }
                    </select>

                    <div className="error">
                        {formik.touched.description && formik.errors.description ? (
                            <div>{formik.errors.description}</div>
                        ) : null}
                    </div>
                    <ReactQuill
                        theme="snow"
                        className='bg-white '
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange("description")}
                        onBlur={formik.handleBlur("description")}
                    />

                    <div className="mt-4 bg-white border-1 p-5 text-center">
                        <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="showimages mt-4 d-flex flex-wrap gap-3">
                        {imgState?.map((i, j) => {
                            return (
                                <div className="position-relative" key={j}>
                                    <button onClick={() => dispatch(delImg(i.public_id))} type='button' className="btn-close position-absolute" style={{ top: "4px", right: "5px" }}></button>
                                    <img src={i.url} alt="" width={200} height={200} />
                                </div>
                            )
                        })}
                    </div>
                    <button type="submit" className="btn btn-success mt-5 px-5 fs-5">
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddBlog;
