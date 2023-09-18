import React, { useState, useRef, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from "formik"
import * as Yup from 'yup'; //For Form Validation
import CustomInput from '../components/CustomInput';
import { createCategory, getProductCategory, resetState, updateProductCategory } from '../features/productCategory/pcategorySlice'

let productCatSchema = Yup.object({
    title: Yup.string().required('Category name is required'),
});

const AddProductCat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getPCatID = location.pathname.split("/")[3];

    const newCategory = useSelector((state) => state.productCategory)
    const { isSuccess, isError, isLoading, createdCategory, categoryName, updatedCategory } = newCategory;

    useEffect(() => {
        if (getPCatID !== undefined) {
            dispatch(getProductCategory(getPCatID))
        } else {
            dispatch(resetState())
        }
    }, [getPCatID])

    useEffect(() => {
        if (isSuccess && createdCategory) {
            toast.success('Category added successfully!');
        }
        if (updatedCategory && isSuccess) {
            toast.success("Category updated successfully")
            navigate('/admin/product-category-list')
        }
        if (isError) {
            toast.error('Something went wrong!');
        }
    }, [isSuccess, isError, isLoading])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: categoryName || '',
        },
        validationSchema: productCatSchema,
        onSubmit: values => {
            if (getPCatID !== undefined) {
                const data = { id: getPCatID, pCategoryData: values }
                dispatch(updateProductCategory(data))
                dispatch(resetState())
            } else {
                dispatch(createCategory(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState())
                    navigate('/admin/product-category-list')
                }, 300)
            }
        }
    })

    return (
        <div className='container-fluid my-5 w-md-75'>
            <h3 className='mb-4'>{getPCatID !== undefined ? "Edit" : "Add"} Product Category</h3>
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
                        {getPCatID !== undefined ? "Update" : "Add"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddProductCat;
