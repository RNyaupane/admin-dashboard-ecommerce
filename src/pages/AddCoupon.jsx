import React, { useState, useRef, useEffect } from 'react';
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from "formik"
import * as Yup from 'yup'; //For Form Validation
import { createCoupon, getCoupon, resetState, updateCoupon } from '../features/coupon/CouponSlice';


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
    const [coupon, setCoupon] = useState();
    const { isSuccess, isError, isLoading, createdCoupon, couponName, couponExpiry, couponDiscount, updatedCoupon } = newCoupon;

    const changeDateFormat = (date) => {
        const inputDate = new Date(date);

        if (isNaN(inputDate.getTime())) {
            return 'Invalid Date';
        }

        const year = inputDate.getFullYear();
        const month = String(inputDate.getMonth() + 1).padStart(2, '0');
        const day = String(inputDate.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        if (getCouponId !== undefined) {
            dispatch(getCoupon(getCouponId))
        } else {
            dispatch(resetState())
        }
    }, [getCouponId])

    useEffect(() => {
        if (isSuccess && createdCoupon) {
            toast.success('Coupon added Successfully!');
        }
        if (isSuccess && updatedCoupon) {
            toast.success('Coupon Updated Successfully !');
        }
        if (isError) {
            toast.error('Something went wrong!');
        }
    }, [isSuccess, isError, isLoading])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: couponName || '',
            expiry: changeDateFormat(couponExpiry) || '',
            discount: couponDiscount || '',
        },
        validationSchema: couponSchema,
        onSubmit: values => {
            if (getCouponId !== undefined) {
                const data = { id: getCouponId, couponData: values, }
                dispatch(updateCoupon(data))
                setTimeout(() => {
                    dispatch(resetState())
                    navigate('/admin/coupon-list')
                }, 2000)
            } else {
                dispatch(createCoupon(values))
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState())
                    navigate('/admin/coupon-list')
                }, 2000)
            }
        }
    })
    return (
        <div className='container-fluid my-5 w-md-75'>
            <h3 className='mb-4'>{getCouponId !== undefined ? "Edit" : "Add"} Coupon</h3>
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
                        {getCouponId !== undefined ? "Edit" : "Add"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddCoupon;
