import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductService from "./ProductService";

export const getProducts = createAsyncThunk(
    'product/get-products',
    async (thunkAPI) => {
        try {
            return await ProductService.getProducts();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const initialState = {
    products: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}


export const ProductSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
    },
})

export default ProductSlice.reducer;