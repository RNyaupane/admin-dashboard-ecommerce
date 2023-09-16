import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomInput from '../components/CustomInput'
import { useFormik } from "formik"
import * as Yup from 'yup'; //For Form Validation
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/BrandSlice'
import { getProductCategories } from '../features/productCategory/pcategorySlice';
import { getColors } from '../features/color/ColorSlice'
import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";




let userSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.string().required('Price is required'),
    brand: Yup.string().required('Brand is required'),
    category: Yup.string().required('Category is required'),
    color: Yup.array().required('Colors are required'),
});

const AddProduct = () => {
    const dispatch = useDispatch()
    const [color, setColor] = useState([]);
    useEffect(() => {
        dispatch(getBrands())
        dispatch(getProductCategories())
        dispatch(getColors())
        formik.values.color = color;
    }, [])

    const brandState = useSelector((state) => state.brand.brands);
    const catState = useSelector((state) => state.productCategory.productCategories);
    const colorState = useSelector((state) => state.color.colors);

    const colors = [];
    colorState.forEach(i => {
        colors.push({
            _id: i._id,
            color: i.title
        })
    })

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: ''
        },
        validationSchema: userSchema,
        onSubmit: values => {
            alert(JSON.stringify(values));
        }
    })

    return (
        <>
            <div className='container-fluid my-5 w-md-75'>
                <h3 className='mb-4'>Add Product</h3>
                <div className="">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="error">
                            {formik.touched.title && formik.errors.title ? (
                                <div>{formik.errors.title}</div>
                            ) : null}
                        </div>
                        <CustomInput
                            type="text"
                            label="Enter Product Title"
                            name="title"
                            val={formik.values.title}
                            onCh={formik.handleChange("title")}
                            onBl={formik.handleBlur("title")}
                        />


                        <div className="my-3">
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
                        </div>


                        <div className="error">
                            {formik.touched.price && formik.errors.price ? (
                                <div>{formik.errors.price}</div>
                            ) : null}
                        </div>
                        <CustomInput
                            type="number"
                            label="Enter Product Price"
                            name="price"
                            val={formik.values.price}
                            onBl={formik.handleBlur("price")}
                            onCh={formik.handleChange("price")}
                        />


                        <select
                            className="form-select form-select-md custom-input mb-3"
                            aria-label=".form-select-lg example"
                            name="brand"
                            onChange={formik.handleChange("brand")}
                            onBlur={formik.handleBlur("brand")}
                            value={formik.values.brand}
                            defaultValue='0'
                        >
                            <option value='0' disabled>Select Brand</option>
                            {
                                brandState.map((i, j) => {
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


                        <select
                            className="form-select form-select-md custom-input mb-3"
                            aria-label=".form-select-lg example"
                            name="category"
                            onChange={formik.handleChange("category")}
                            onBlur={formik.handleBlur("category")}
                            value={formik.values.category}
                            defaultValue='0'
                        >
                            <option value='0' disabled>Select Category</option>

                            {
                                catState.map((i, j) => {
                                    return (
                                        <option value={i.title} key={j} >{i.title}</option>

                                    )
                                })
                            }
                        </select>


                        <Multiselect
                            className='mb-3'
                            dataKey="id"
                            name="color"
                            textField="color"
                            placeholder="Select Color"
                            data={colors}
                            onChange={(e) => setColor(e)}
                        />


                        <CustomInput
                            type="number"
                            label="Enter Quantity"

                        />
                        <div className="mt-4">


                        </div>

                        <button type="submit" className="btn btn-success mt-5 px-5 fs-5">
                            Add
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddProduct