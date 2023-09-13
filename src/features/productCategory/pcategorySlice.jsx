import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductCategoryService from "./pcategoryService";

export const getProductCategories = createAsyncThunk(
    'productCategory/get-categories',
    async (thunkAPI) => {
        try {
            return await ProductCategoryService.getProductCategories();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const initialState = {
    productCategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}


export const productCategorySlice = createSlice({
    name: "productCategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.productCategories = action.payload;
            })
            .addCase(getProductCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
    },
})

export default productCategorySlice.reducer;