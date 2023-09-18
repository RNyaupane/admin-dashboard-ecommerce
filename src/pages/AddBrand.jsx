import React, { useState, useRef, useEffect } from 'react';
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from "formik"
import * as Yup from 'yup'; //For Form Validation
import { createBrand, getBrand, resetState, updateBrand } from '../features/brand/BrandSlice';



let brandSchema = Yup.object({
    title: Yup.string().required('Brand name is required'),
});


const AddBrand = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getBrandId = location.pathname.split('/')[3];


    const newBrand = useSelector((state) => state.brand)
    const { isSuccess, isError, isLoading, createdBrand, brandName, updatedBrand } = newBrand;

    useEffect(() => {
        if (getBrandId !== undefined) {
            dispatch(getBrand(getBrandId))
        } else {
            dispatch(resetState())
        }
    }, [getBrandId])


    useEffect(() => {
        if (isSuccess && createdBrand) {
            toast.success('Brand added successfully!');
        }
        if(updatedBrand && isSuccess){
            toast.success("Brand updated successfully")
            navigate('/admin/brands')
        }
        if (isError) {
            toast.error('Something went wrong!');
        }
    }, [isSuccess, isError, isLoading])

    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            title: brandName || '',
        },
        validationSchema: brandSchema,
        onSubmit: values => {
            if (getBrandId !== undefined) {
                const data = { id: getBrandId, brandData: values }
                dispatch(updateBrand(data))
                dispatch(resetState())
            } else {
                dispatch(createBrand(values))
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState())
                    navigate('/admin/brands')
                }, 3000)
            }
        }
    })
    return (
        <div className='container-fluid my-5 w-md-75'>
            <h3 className='mb-4'>{getBrandId !== undefined ? "Edit" : "Add"} brand</h3>
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
                    {getBrandId !== undefined ? "Update" : "Add"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddBrand;
