import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

export const uploadImg = createAsyncThunk(
    'upload/images',
    async (data,thunkAPI) => {
        try {
            return await uploadService.uploadImg(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const initialState = {
    images: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}


export const uploadsSlice = createSlice({
    name: "images",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadImg.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadImg.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.images = action.payload;
            })
            .addCase(uploadImg.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
    },
})

export default uploadsSlice.reducer;