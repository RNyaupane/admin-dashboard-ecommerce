import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import BrandService from "./BrandService";

export const getBrands = createAsyncThunk(
    'brand/get-brands',
    async (thunkAPI) => {
        try {
            return await BrandService.getBrands();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const createBrand = createAsyncThunk(
    'brand/create-brand',
    async (brandData, thunkAPI) => {
        try {
            return await BrandService.createBrand(brandData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const resetState = createAction('Reset_all')

const initialState = {
    brands: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}


export const BrandSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBrands.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBrands.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.brands = action.payload;
            })
            .addCase(getBrands.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdBrand = action.payload;
            })
            .addCase(createBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState)
    },
})

export default BrandSlice.reducer;