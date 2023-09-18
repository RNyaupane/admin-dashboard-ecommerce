import React, { useState, useRef, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from "formik"
import * as Yup from 'yup'; //For Form Validation
import CustomInput from '../components/CustomInput';
import { createCategory, resetState } from '../features/productCategory/pcategorySlice'

let productCatSchema = Yup.object({
    title: Yup.string().required('Category name is required'),
});

const AddProductCat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newCategory = useSelector((state) => state.productCategory)
    const { isSuccess, isError, isLoading, createdCategory } = newCategory;


    useEffect(() => {
        if (isSuccess && createdCategory) {
            toast.success('Category added successfully!');
        }
        if (isError) {
            toast.error('Something went wrong!');
        }
    }, [isSuccess, isError, isLoading])

    const formik = useFormik({
        initialValues: {
            title: '',
        },
        validationSchema: productCatSchema,
        onSubmit: values => {
            dispatch(createCategory(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState())
                navigate('/admin/product-category-list')
            }, 3000)
        }
    })

    return (
        <div className='container-fluid my-5 w-md-75'>
            <h3 className='mb-4'>Add Product Category</h3>
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
                        label="Enter Product Category"
                        id="category"
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

export default AddProductCat;
