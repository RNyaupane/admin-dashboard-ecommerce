import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import CustomerReducer from "../features/customers/CustomerSlice";
const store = configureStore({
    reducer: {auth: authReducer, customer: CustomerReducer},
})

export default store;