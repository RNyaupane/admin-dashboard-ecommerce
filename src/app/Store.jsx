import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import customerReducer from "../features/customers/CustomerSlice";
import productReducer from '../features/product/ProductSlice'
import brandReducer from '../features/brand/BrandSlice'
import productCategoryReducer from '../features/productCategory/pcategorySlice'
import colorReducer from '../features/color/ColorSlice'
import blogReducer from '../features/blogs/BlogSlice'
import blogCategoryReducer from '../features/blogCategory/bcategorySlice'
const store = configureStore({
    reducer: {
        auth: authReducer,
        customer: customerReducer,
        product: productReducer,
        brand: brandReducer,
        productCategories: productCategoryReducer,
        color: colorReducer,
        blog: blogReducer,
        blogCategory: blogCategoryReducer,
    },
})

export default store;