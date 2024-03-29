import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from "formik"
import * as Yup from 'yup'; //For Form Validation
import CustomInput from '../components/CustomInput';
import { createColor, resetState, getColor, updateColor } from '../features/color/ColorSlice';

let colorSchema = Yup.object({
    title: Yup.string().required('Color name is required'),
});

const AddColor = () => {
    const [selectedColor, setSelectedColor] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getColorId = location.pathname.split('/')[3];

    const newColor = useSelector((state) => state.color)
    const { isSuccess, isError, isLoading, createdColor, colorName, updatedColor } = newColor;

    useEffect(() => {
        if (getColorId !== undefined) {
            dispatch(getColor(getColorId))
        } else {
            dispatch(resetState())
        }
    }, [getColorId])

    useEffect(() => {
        if (isSuccess && createdColor) {
            toast.success('Color added successfully!');
        }
        if (updatedColor && isSuccess) {
            toast.success("Color updated successfully")
            navigate('/admin/color-list')
        }
        if (isError) {
            toast.error('Something went wrong!');
        }
    }, [isSuccess, isError, isLoading])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: '',
        },
        validationSchema: colorSchema,
        onSubmit: values => {
            if (getColorId !== undefined) {
                const data = { id: getColorId, colorData: values }
                dispatch(updateColor(data))
                dispatch(resetState())
            } else {
                dispatch(createColor(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState())
                    navigate('/admin/color-list')
                }, 300)
            }
        }
    })

    return (
        <div className='container-fluid my-5 w-md-75'>
            <h3 className='mb-4'>{getColorId !== undefined ? "Edit" : "Add"} Color</h3>
            <div className="">
                <form action="" onSubmit={formik.handleSubmit}>
                    <label htmlFor="exampleColorInput" className="form-label mb-4 text-secondary">(Cick dark box to open color picker)</label>
                    <CustomInput
                        type="color"
                        className="form-control form-control-color mb-0 p-0 border-0 shadow-none h-100"
                        label="Enter Color Name"
                        id="color"
                        name="title"
                        val={formik.values.title}
                        onCh={formik.handleChange("title")}
                        onBl={formik.handleBlur("title")}
                    />
                    <input className='form-control w-auto' id='selectedColor' disabled value={formik.values.title}></input>
                    <div className="error">
                        {formik.touched.title && formik.errors.title ? (
                            <div>{formik.errors.title}</div>
                        ) : null}
                    </div>
                    <button type="submit" className="btn btn-success mt-4 px-5 fs-5">
                    {getColorId !== undefined ? "Update" : "Add"} 
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddColor;
