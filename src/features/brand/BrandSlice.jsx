import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
    },
})

export default BrandSlice.reducer;