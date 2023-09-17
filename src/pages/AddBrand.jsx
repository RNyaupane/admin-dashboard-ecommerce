import React, { useState, useRef, useEffect } from 'react';
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from "formik"
import * as Yup from 'yup'; //For Form Validation
import { createBrand } from '../features/brand/BrandSlice';



let brandSchema = Yup.object({
    title: Yup.string().required('Brand name is required'),
});


const AddBrand = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newBrand = useSelector((state) => state.brand)
    const { isSuccess, isError, isLoading, createdBrand } = newBrand;


    useEffect(() => {
        if (isSuccess && createdBrand) {
            toast.success('Brand added successfully!');
        }
        if (isError) {
            toast.error('Something went wrong!');
        }
    }, [isSuccess, isError, isLoading])

    const formik = useFormik({
        initialValues: {
            title: '',
        },
        validationSchema: brandSchema,
        onSubmit: values => {
            dispatch(createBrand(values))
            formik.resetForm();
            setTimeout(() => {
                navigate('/admin/brands')
            }, 3000)
        }
    })
    return (
        <div className='container-fluid my-5 w-md-75'>
            <h3 className='mb-4'>Add brand</h3>
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
                        label="Enter Brand"
                        id="brand"
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

export default AddBrand;
