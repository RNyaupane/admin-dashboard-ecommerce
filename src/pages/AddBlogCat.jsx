import React, { useState, useRef, useEffect } from 'react';
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from "formik"
import * as Yup from 'yup'; //For Form Validation
import { createBlogCategory, resetState } from '../features/blogCategory/bcategorySlice';


let blogCategorySchema = Yup.object({
    title: Yup.string().required('Blog category name is required'),
});

const AddBlogCat = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newBrand = useSelector((state) => state.blogCategory)
    const { isSuccess, isError, isLoading, createdBlogCategory } = newBrand;


    useEffect(() => {
        if (isSuccess && createdBlogCategory) {
            toast.success('Blog Category added successfully!');
        }
        if (isError) {
            toast.error('Something went wrong!');
        }
    }, [isSuccess, isError, isLoading])

    const formik = useFormik({
        initialValues: {
            title: '',
        },
        validationSchema: blogCategorySchema,
        onSubmit: values => {
            dispatch(createBlogCategory(values))
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState())
                navigate('/admin/blog-category-list')
            }, 3000)
        }
    })

    return (
        <div className='container-fluid my-5 w-md-75'>
            <h3 className='mb-4'>Add Blog Category</h3>
            <div className="">
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        className="form-control custom-input"
                        type="text"
                        label="Enter blog category name"
                        id="blog"
                        name="title"
                        val={formik.values.title}
                        onCh={formik.handleChange("title")}
                        onBl={formik.handleBlur("title")}
                    />
                    <button type="submit" className="btn btn-success mt-4 px-5 fs-5">
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddBlogCat;
