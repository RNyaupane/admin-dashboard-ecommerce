import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BlogCategoryService from "./bcategoryService";

export const getBlogCategory = createAsyncThunk(
    'blogCategory/get-categories',
    async (thunkAPI) => {
        try {
            return await BlogCategoryService.getBlogCategories();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const initialState = {
    blogCategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}


export const getBlogCategoriesSlice = createSlice({
    name: "blogCategory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogCategories = action.payload;
            })
            .addCase(getBlogCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
    },
})

export default getBlogCategoriesSlice.reducer;