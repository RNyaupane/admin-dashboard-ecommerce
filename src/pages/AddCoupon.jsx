import React, { useState, useRef, useEffect } from 'react';
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from "formik"
import * as Yup from 'yup'; //For Form Validation
import { createCoupon, resetState } from '../features/coupon/CouponSlice';


let couponSchema = Yup.object({
    name: Yup.string().required('Coupon name is required'),
    expiry: Yup.date().required('Enter expiry date'),
    discount: Yup.number().required('Enter discount percentage'),
});


const AddCoupon = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getCouponId = location.pathname.split('/')[3];

    const newCoupon = useSelector((state) => state.coupon)
    const { isSuccess, isError, isLoading, createdCoupon } = newCoupon;


    useEffect(() => {
        if (isSuccess && createdCoupon) {
            toast.success('Coupon added successfully!');
        }
        if (isError) {
            toast.error('Something went wrong!');
        }
    }, [isSuccess, isError, isLoading])

    const formik = useFormik({
        initialValues: {
            name: '',
            expiry: '',
            discount: '',
        },
        validationSchema: couponSchema,
        onSubmit: values => {
            dispatch(createCoupon(values))
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState())
                navigate('/admin/coupon-list')
            }, 3000)
        }
    })
    return (
        <div className='container-fluid my-5 w-md-75'>
            <h3 className='mb-4'>Add Coupon</h3>
            <div className="">
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className="error">
                        {formik.touched.name && formik.errors.name ? (
                            <div>{formik.errors.name}</div>
                        ) : null}
                    </div>
                    <CustomInput
                        className="form-control custom-input"
                        type="text"
                        label="Enter Coupon Name"
                        id="coupon"
                        name="name"
                        val={formik.values.name}
                        onCh={formik.handleChange("name")}
                        onBl={formik.handleBlur("name")}
                    />


                    <div className="error">
                        {formik.touched.expiry && formik.errors.expiry ? (
                            <div>{formik.errors.expiry}</div>
                        ) : null}
                    </div>
                    <CustomInput
                        className="form-control custom-input"
                        type="date"
                        label="Enter expiry date"
                        id="expiry"
                        name="expiry"
                        val={formik.values.expiry}
                        onCh={formik.handleChange("expiry")}
                        onBl={formik.handleBlur("expiry")}
                    />

                    <div className="error">
                        {formik.touched.discount && formik.errors.discount ? (
                            <div>{formik.errors.discount}</div>
                        ) : null}
                    </div>
                    <CustomInput
                        className="form-control custom-input"
                        type="number"
                        label="Enter discount percentage"
                        id="discount"
                        name="discount"
                        val={formik.values.discount}
                        onCh={formik.handleChange("discount")}
                        onBl={formik.handleBlur("discount")}
                    />

                    <button type="submit" className="btn btn-success mt-4 px-5 fs-5">
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddCoupon;
