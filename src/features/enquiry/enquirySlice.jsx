import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import EnquiryService from "./enquiryService";

export const getEnquiry = createAsyncThunk(
    'blogCategory/get-categories',
    async (thunkAPI) => {
        try {
            return await EnquiryService.getEnquiry();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const initialState = {
    enquiries: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}


export const getEnquiriesSlice = createSlice({
    name: "blogCategory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEnquiry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEnquiry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.enquiries = action.payload;
            })
            .addCase(getEnquiry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
    },
})

export default getEnquiriesSlice.reducer;