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
import { Select } from 'antd';
import Dropzone from 'react-dropzone'
import { delImg, uploadImg } from '../features/upload/uploadSlice';
import { createProducts, resetState } from '../features/product/ProductSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';




let userSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required'),
    brand: Yup.string().required('Brand is required'),
    category: Yup.string().required('Category is required'),
    tags: Yup.string().required('Tag is required'),
    color: Yup.array().min(1, 'Pick at least one color').required('Colors are required'),
    quantity: Yup.number().required('Quantity is required'),
});

const AddProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [color, setColor] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {
        dispatch(getBrands())
        dispatch(getProductCategories())
        dispatch(getColors())
    }, [])

    const brandState = useSelector((state) => state.brand.brands);
    const catState = useSelector((state) => state.productCategory.productCategories);
    const colorState = useSelector((state) => state.color.colors);
    const imgState = useSelector((state) => state.upload.images);
    const newProduct = useSelector((state) => state.product);
    const { isSuccess, isError, isLoading, createdProduct } = newProduct;

    useEffect(() => {
        if (isSuccess && createdProduct) {
            toast.success('Product added successfully!');
        }
        if (isError) {
            toast.error('Something went wrong!');
        }
    }, [isSuccess, isError, isLoading])

    const coloropt = [];
    colorState.forEach((i) => {
        coloropt.push({
            label: i.title,
            value: i._id,
        })
    })
    const img = [];
    imgState.forEach((i) => {
        img.push({
            public_id: i.publi_url,
            url: i.url
        })
    })

    useEffect(() => {
        formik.values.color = color ? color : "";
        formik.values.images = img;
    }, [color, img])

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: '',
            brand: '',
            category: '',
            tags: '',
            color: '',
            quantity: '',
            images: ''
        },
        validationSchema: userSchema,
        onSubmit: values => {
            dispatch(createProducts(values))
            formik.resetForm();
            setColor(null);
            setTimeout(() => {
                dispatch(resetState())
                navigate('/admin/products')
            }, 3000)
        }
    })

    const handleColors = (e) => {
        setColor(e);
    }

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
                            className="form-control custom-input"
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
                            className="form-control custom-input"
                            type="number"
                            label="Enter Product Price"
                            name="price"
                            val={formik.values.price}
                            onBl={formik.handleBlur("price")}
                            onCh={formik.handleChange("price")}
                        />

                        <div className="error">
                            {formik.touched.brand && formik.errors.brand ? (
                                <div>{formik.errors.brand}</div>
                            ) : null}
                        </div>
                        <select
                            className="form-select form-select-md custom-input mb-3"
                            aria-label=".form-select-lg example"
                            name="brand"
                            onChange={formik.handleChange("brand")}
                            onBlur={formik.handleBlur("brand")}
                            value={formik.values.brand}
                        >
                            <option value='0'>Select Brand</option>
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

                        <div className="error">
                            {formik.touched.category && formik.errors.category ? (
                                <div>{formik.errors.category}</div>
                            ) : null}
                        </div>
                        <select
                            className="form-select form-select-md custom-input mb-3"
                            aria-label=".form-select-lg example"
                            name="category"
                            onChange={formik.handleChange("category")}
                            onBlur={formik.handleBlur("category")}
                            value={formik.values.category}
                        >
                            <option value='defaultCategory'>Select Category</option>

                            {
                                catState.map((i, j) => {
                                    return (
                                        <option value={i.title} key={j} >{i.title}</option>

                                    )
                                })
                            }
                        </select>


                        <div className="error">
                            {formik.touched.tags && formik.errors.tags ? (
                                <div>{formik.errors.tags}</div>
                            ) : null}
                        </div>
                        <select
                            className="form-select form-select-md custom-input mb-3"
                            aria-label=".form-select-lg example"
                            name="tags"
                            onChange={formik.handleChange("tags")}
                            onBlur={formik.handleBlur("tags")}
                            value={formik.values.tags}
                        >
                            <option value='' disabled>Select Tags</option>
                            <option value='featured' >Featured</option>
                            <option value='popular'>Popular</option>
                            <option value='special'>Special</option>
                        </select>


                        <div className="error">
                            {formik.touched.color && formik.errors.color ? (
                                <div>{formik.errors.color}</div>
                            ) : null}
                        </div>

                        <Select
                            mode='multiple'
                            allowClear
                            name='colors'
                            className='w-100 mb-4'
                            placeholder='Select Colors'
                            defaultValue={color}
                            onChange={(i) => handleColors(i)}
                            options={coloropt}
                        />


                        <div className="error">
                            {formik.touched.quantity && formik.errors.quantity ? (
                                <div>{formik.errors.quantity}</div>
                            ) : null}
                        </div>
                        <CustomInput
                            className="form-control custom-input"
                            type="number"
                            label="Enter Quantity"
                            name="quantity"
                            val={formik.values.quantity}
                            onBl={formik.handleBlur("quantity")}
                            onCh={formik.handleChange("quantity")}

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
        </>
    )
}

export default AddProduct